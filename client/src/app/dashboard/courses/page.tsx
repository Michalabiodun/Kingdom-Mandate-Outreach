"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

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

  const onboardingFlag = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem("km-onboarding"),
    () => null,
  );

  useEffect(() => {
    if (!rawUser) {
      router.replace("/login");
    }
  }, [rawUser, router]);

  if (!rawUser) {
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
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] flex-col border-r border-[#e8ebf3] bg-white shadow-xl transition-transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className="size-10 rounded-xl bg-[#2f5be7] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">dashboard</span>
            </div>
            <div>
              <p className="text-base font-bold">Kingdom Mandate</p>
              <p className="text-xs font-semibold text-[#2f5be7] uppercase tracking-widest">
                Leadership Hub
              </p>
            </div>
          </Link>
          <button
            className="size-10 rounded-full border border-[#e8ebf3] text-[#5b6b83] flex items-center justify-center"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-4">
          <Link
            href="/dashboard/calendar"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Home
          </Link>
          <Link
            href="/dashboard/courses"
            className="flex items-center gap-3 rounded-xl bg-[#2f5be7] text-white px-4 py-3 text-sm font-semibold"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">menu_book</span>
            Courses / Library
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Calendar/Events
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">volunteer_activism</span>
            Prayer Requests
          </Link>
          <Link
            href="/dashboard/one-on-one"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">schedule</span>
            One-on-One Booking
          </Link>
          <Link
            href="/dashboard/testimonies"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">auto_stories</span>
            Testimonies
          </Link>
          <Link
            href="/dashboard/sermons"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">mic</span>
            Sermons
          </Link>
        </nav>
        <div className="mt-auto px-4 pb-6">
          <div className="border-t border-[#e8ebf3] pt-5">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-lg">settings</span>
              Settings
            </Link>
            <button className="mt-4 w-full rounded-xl border border-[#e8ebf3] px-4 py-3 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc]">
              View Profile
            </button>
          </div>
        </div>
      </aside>
      <aside className="hidden lg:flex w-[280px] flex-col border-r border-[#e8ebf3] bg-white">
        <Link href="/" className="flex items-center gap-3 px-6 py-6">
          <div className="size-10 rounded-xl bg-[#2f5be7] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">dashboard</span>
          </div>
          <div>
            <p className="text-base font-bold">Kingdom Mandate</p>
            <p className="text-xs font-semibold text-[#2f5be7] uppercase tracking-widest">
              Leadership Hub
            </p>
          </div>
        </Link>
        <nav className="flex flex-col gap-1 px-4">
          <Link
            href="/dashboard/calendar"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Home
          </Link>
          <Link
            href="/dashboard/courses"
            className="flex items-center gap-3 rounded-xl bg-[#2f5be7] text-white px-4 py-3 text-sm font-semibold"
          >
            <span className="material-symbols-outlined text-lg">menu_book</span>
            Courses / Library
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Calendar/Events
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
          >
            <span className="material-symbols-outlined text-lg">volunteer_activism</span>
            Prayer Requests
          </Link>
          <Link
            href="/dashboard/one-on-one"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
          >
            <span className="material-symbols-outlined text-lg">schedule</span>
            One-on-One Booking
          </Link>
          <Link
            href="/dashboard/testimonies"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
          >
            <span className="material-symbols-outlined text-lg">auto_stories</span>
            Testimonies
          </Link>
          <Link
            href="/dashboard/sermons"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
          >
            <span className="material-symbols-outlined text-lg">mic</span>
            Sermons
          </Link>
        </nav>
        <div className="mt-auto px-4 pb-6">
          <div className="border-t border-[#e8ebf3] pt-5">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            >
              <span className="material-symbols-outlined text-lg">settings</span>
              Settings
            </Link>
            <button className="mt-4 w-full rounded-xl border border-[#e8ebf3] px-4 py-3 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc]">
              View Profile
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex flex-col gap-4 border-b border-[#e8ebf3] bg-white px-4 py-4 md:px-6 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex items-center gap-3 w-full md:max-w-2xl">
            <button
              className="size-10 rounded-xl bg-[#2f5be7] text-white flex items-center justify-center lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex items-center gap-3 w-full rounded-full border border-[#e8ebf3] bg-[#f7f9fc] px-4 py-2">
              <span className="material-symbols-outlined text-[#8fa1b6] text-base">
                search
              </span>
              <input
                className="w-full bg-transparent text-sm text-[#1f2a44] outline-none"
                placeholder="Search courses or lessons..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button className="size-10 rounded-full border border-[#e8ebf3] text-[#5b6b83] flex items-center justify-center">
              <span className="material-symbols-outlined text-base">notifications</span>
            </button>
            <button className="size-10 rounded-full border border-[#e8ebf3] text-[#5b6b83] flex items-center justify-center">
              <span className="material-symbols-outlined text-base">chat_bubble</span>
            </button>
            <Link
              href="/dashboard/profile"
              className="hidden md:flex items-center gap-3 border-l border-[#e8ebf3] pl-4"
            >
              <div className="text-right">
                <p className="text-sm font-bold text-[#1f2a44]">{userName}</p>
                <p className="text-xs text-[#5b6b83]">{userRole}</p>
              </div>
              <div className="size-10 rounded-full bg-[#2f5be7] text-white flex items-center justify-center">
                <span className="material-symbols-outlined">person</span>
              </div>
            </Link>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-10 lg:py-10">
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
              <div className="rounded-2xl border border-[#e5e7f2] bg-white px-6 py-5">
                <div className="flex items-center justify-between text-sm font-semibold text-[#1f2a44]">
                  <span>Overall Course Progress</span>
                  <span className="text-[#2f5be7]">65%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-[#e8ecf6]">
                  <div className="h-2 w-[65%] rounded-full bg-[#2f5be7]" />
                </div>
                <p className="mt-2 text-xs text-[#94a3b8]">12 of 18 lessons completed</p>
              </div>
              <div className="rounded-3xl border border-[#e5e7f2] bg-white p-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0f172a]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop")',
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
                        className="flex items-center justify-between rounded-2xl border border-[#e8ebf3] bg-[#f8faff] px-4 py-3"
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
            <aside className="rounded-3xl border border-[#e5e7f2] bg-white p-5 md:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] h-fit">
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
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
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
    </div>
  );
}
