"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

const lessonResources = [
  {
    name: "Leadership_Basics_Study_Guide.pdf",
    size: "4.2 MB · PDF Document",
    icon: "picture_as_pdf",
  },
  {
    name: "Weekly_Ministry_Goals.docx",
    size: "1.5 MB · Word Doc",
    icon: "description",
  },
];

const modules = [
  {
    title: "Module 1: Foundations",
    status: "4/4 Completed",
    lessons: [
      { title: "Introduction to Mandate", time: "12:40" },
      { title: "Core Spiritual Principles", time: "15:20" },
    ],
  },
  {
    title: "Module 2: Servant Leadership",
    status: "Active",
    lessons: [
      { title: "The Heart of a Servant", time: "Now Playing", active: true },
      { title: "Authority & Submission", time: "21:05" },
      { title: "Conflict Resolution", time: "18:30" },
    ],
  },
  {
    title: "Module 3: Vision Casting",
    status: "Locked",
    lessons: [
      { title: "Clarity in Purpose", time: "16:10" },
      { title: "Building the Team", time: "19:00" },
    ],
  },
];

export default function CoursesPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") {
      return () => {};
    }
    const handler = () => callback();
    window.addEventListener("storage", handler);
    window.addEventListener("km-session", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("km-session", handler);
    };
  };

  const rawUser = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem("km-auth"),
    () => null,
  );

  const rawToken = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem("km-token"),
    () => null,
  );

  const onboardingFlag = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem("km-onboarding"),
    () => null,
  );

  useEffect(() => {
    if (!rawUser || !rawToken) {
      router.replace("/login");
    }
  }, [rawUser, rawToken, router]);

  useEffect(() => {
    let isActive = true;
    const verify = async () => {
      if (!rawUser || !rawToken) {
        return;
      }
      try {
        const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
          headers: { Authorization: `Bearer ${rawToken}` },
        });
        if (!response.ok) {
          if (response.status === 401) {
            const refreshResponse = await fetch(`${apiBaseUrl}/api/auth/refresh`, {
              method: "POST",
              credentials: "include",
            });
            const refreshPayload = (await refreshResponse.json()) as { token?: string };
            if (!refreshResponse.ok || !refreshPayload.token) {
              throw new Error("Unauthorized");
            }
            sessionStorage.setItem("km-token", refreshPayload.token);
            const retry = await fetch(`${apiBaseUrl}/api/auth/me`, {
              headers: { Authorization: `Bearer ${refreshPayload.token}` },
            });
            if (!retry.ok) {
              throw new Error("Unauthorized");
            }
          } else {
            throw new Error("Unauthorized");
          }
        }
        if (isActive) {
          setIsAuthReady(true);
        }
      } catch (error) {
        sessionStorage.removeItem("km-auth");
        sessionStorage.removeItem("km-token");
        sessionStorage.removeItem("km-onboarding");
        sessionStorage.removeItem("km-preferences");
        window.dispatchEvent(new Event("km-session"));
        router.replace("/login");
      }
    };
    verify();
    return () => {
      isActive = false;
    };
  }, [apiBaseUrl, rawToken, rawUser, router]);

  if (!rawUser || !isAuthReady) {
    return <div className="min-h-screen bg-[#f4f7fb]" />;
  }

  let userName = "Leader";
  let userRole = "Member";

  try {
    const parsed = JSON.parse(rawUser) as { name?: string; role?: string };
    userName = parsed.name || "Leader";
    userRole = parsed.role || "Member";
  } catch {
    userName = "Leader";
    userRole = "Member";
  }

  const handleLogout = () => {
    setIsSidebarOpen(false);
    fetch(`${apiBaseUrl}/api/auth/logout`, { method: "POST", credentials: "include" });
    sessionStorage.removeItem("km-auth");
    sessionStorage.removeItem("km-token");
    sessionStorage.removeItem("km-onboarding");
    sessionStorage.removeItem("km-preferences");
    window.dispatchEvent(new Event("km-session"));
    router.push("/login");
  };

  if (onboardingFlag === "true") {
    return (
      <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[720px] rounded-[32px] bg-white border border-[#e6e9f5] shadow-[0_30px_80px_rgba(28,38,74,0.18)] px-10 py-12">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.24em] text-[#8fa1b6] uppercase">
              Onboarding
            </p>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#0f172a]">
              Welcome, {userName}
            </h1>
            <p className="mt-3 text-sm md:text-base text-[#6370a6]">
              Let us personalize your leadership journey before you enter the dashboard.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#e8ebf3] bg-[#f8faff] p-5">
              <p className="text-xs font-semibold text-[#2f5be7]">Step 1</p>
              <h3 className="mt-2 text-lg font-bold text-[#0e121b]">Profile Setup</h3>
              <p className="mt-2 text-sm text-[#5b6b83]">
                Confirm your name, ministry focus, and leadership role.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e8ebf3] bg-white p-5">
              <p className="text-xs font-semibold text-[#2f5be7]">Step 2</p>
              <h3 className="mt-2 text-lg font-bold text-[#0e121b]">Choose a Track</h3>
              <p className="mt-2 text-sm text-[#5b6b83]">
                Select a leadership path tailored to your calling.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e8ebf3] bg-[#f8faff] p-5">
              <p className="text-xs font-semibold text-[#2f5be7]">Step 3</p>
              <h3 className="mt-2 text-lg font-bold text-[#0e121b]">Set Goals</h3>
              <p className="mt-2 text-sm text-[#5b6b83]">
                Define outcomes for discipleship, mentorship, and growth.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 h-12 rounded-xl border border-[#e8ebf3] text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc]"
              onClick={() => {
                sessionStorage.setItem("km-onboarding", "false");
                window.dispatchEvent(new Event("km-session"));
              }}
            >
              Skip for Now
            </button>
            <button
              className="flex-1 h-12 rounded-xl bg-[#2f5be7] text-white text-sm font-semibold hover:brightness-110"
              onClick={() => {
                sessionStorage.setItem("km-onboarding", "false");
                window.dispatchEvent(new Event("km-session"));
              }}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f4f7fb] text-[#0e121b]">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col lg:pl-[280px]">
        <DashboardHeader
          onOpenSidebar={() => setIsSidebarOpen(true)}
          searchPlaceholder="Search courses or lessons..."
          userName={userName}
          userRole={userRole}
        />
        <main className="flex-1 px-4 pb-5 pt-24 md:px-6 md:pb-6 lg:px-10 lg:pb-8">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8fa1b6]">
                <Link className="hover:text-[#2f5be7]" href="/dashboard">
                  Dashboard
                </Link>
                <span>/</span>
                <span className="text-[#2f5be7]">Kingdom Leadership 101</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-[#111827]">
                Kingdom Leadership 101
              </h1>
              <div className="rounded-2xl border border-[#e5e7f2] bg-white px-6 py-5 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between text-sm font-semibold text-[#1f2a44]">
                  <span>Overall Course Progress</span>
                  <span className="text-[#2f5be7]">65%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-[#e8ecf6]">
                  <div className="h-2 w-[65%] rounded-full bg-[#2f5be7]" />
                </div>
                <p className="mt-2 text-xs text-[#94a3b8]">12 of 18 lessons completed</p>
              </div>
              <div className="rounded-3xl border border-[#e5e7f2] bg-white p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0f172a]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("")',
                    }}
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <button className="absolute inset-0 m-auto size-16 rounded-full bg-[#2f5be7] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(46,91,231,0.35)]">
                    <span className="material-symbols-outlined text-3xl">play_arrow</span>
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span>08:45 / 24:00</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 rounded-full bg-white/30">
                        <div className="h-1.5 w-[35%] rounded-full bg-white" />
                      </div>
                      <button className="size-8 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-base">settings</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h2 className="text-lg font-bold text-[#111827]">Lesson Resources</h2>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {lessonResources.map((resource) => (
                      <div
                        className="flex items-center justify-between rounded-2xl border border-[#e8ebf3] bg-[#f8faff] px-4 py-3 transition-transform duration-200 hover:-translate-y-1"
                        key={resource.name}
                      >
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-white border border-[#e5e7f2] flex items-center justify-center text-[#2f5be7]">
                            <span className="material-symbols-outlined text-xl">
                              {resource.icon}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#111827]">
                              {resource.name}
                            </p>
                            <p className="text-xs text-[#8b95a7]">{resource.size}</p>
                          </div>
                        </div>
                        <button className="size-10 rounded-xl border border-[#e5e7f2] text-[#2f5be7] flex items-center justify-center">
                          <span className="material-symbols-outlined text-lg">download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <aside className="rounded-3xl border border-[#e5e7f2] bg-white p-5 md:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] h-fit transition-transform duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#94a3b8] uppercase">
                    Course Content
                  </p>
                  <p className="mt-1 text-sm text-[#6b7280]">
                    18 lessons across 4 modules
                  </p>
                </div>
                <div className="size-10 rounded-full bg-[#eef3ff] text-[#2f5be7] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">menu_book</span>
                </div>
              </div>
              <div className="mt-6 space-y-5">
                {modules.map((module) => (
                  <div className="space-y-3" key={module.title}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#94a3b8] text-base">
                          expand_more
                        </span>
                        <p className="text-sm font-semibold text-[#111827]">{module.title}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                          module.status === "Active"
                            ? "bg-[#eaf1ff] text-[#2f5be7]"
                            : module.status === "Locked"
                              ? "bg-[#f1f5f9] text-[#94a3b8]"
                              : "bg-[#eef3ff] text-[#2f5be7]"
                        }`}
                      >
                        {module.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <div
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-transform duration-200 hover:-translate-y-1 ${
                            lesson.active
                              ? "border-[#cdd9ff] bg-[#eef3ff]"
                              : "border-[#e8ebf3] bg-[#f8faff]"
                          }`}
                          key={lesson.title}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`size-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                                lesson.active ? "bg-[#2f5be7] text-white" : "bg-white text-[#94a3b8]"
                              }`}
                            >
                              {lesson.active ? "▶" : "•"}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-[#111827]">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-[#8b95a7]">{lesson.time}</p>
                            </div>
                          </div>
                          {lesson.active ? (
                            <span className="rounded-full bg-[#2f5be7] px-3 py-1 text-[10px] font-semibold text-white">
                              Now Playing
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full rounded-2xl bg-[#2f5be7] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(46,91,231,0.24)] hover:brightness-110">
                Mark as Complete
              </button>
            </aside>
          </div>
        </main>
      </div>
      {isComingSoonOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
          <div
            className="absolute inset-0 bg-[#0f172a]/60"
            onClick={() => setIsComingSoonOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-3xl border border-[#e5e7f2] bg-white px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] text-[#8fa1b6] uppercase">
                  Courses & Library
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#0f172a]">
                  Coming Soon
                </h2>
                <p className="mt-2 text-sm text-[#6370a6]">
                  We are preparing course content and resources for you. Check back
                  soon for updates.
                </p>
              </div>
              <button
                className="size-10 rounded-full border border-[#e8ebf3] text-[#5b6b83] flex items-center justify-center"
                onClick={() => setIsComingSoonOpen(false)}
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                className="h-11 rounded-xl border border-[#e8ebf3] px-4 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc]"
                onClick={() => setIsComingSoonOpen(false)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
