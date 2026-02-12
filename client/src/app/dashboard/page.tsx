"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

export default function Dashboard() {
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
            href="/dashboard/prayer-requests"
            className="flex items-center gap-3 rounded-xl bg-[#2f5be7] text-white px-4 py-3 text-sm font-semibold"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Home
          </Link>
          <Link
            href="/dashboard/courses"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">menu_book</span>
            Courses / Library
          </Link>
          <Link
            href="/dashboard/calendar"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Calendar/Events
          </Link>
          <Link
            href="/dashboard/prayer-requests"
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
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="material-symbols-outlined text-lg">settings</span>
              Settings
            </Link>
            <button
              className="mt-4 w-full rounded-xl border border-[#e8ebf3] px-4 py-3 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc]"
              onClick={() => {
                setIsSidebarOpen(false);
                sessionStorage.removeItem("km-auth");
                sessionStorage.removeItem("km-onboarding");
                sessionStorage.removeItem("km-preferences");
                window.dispatchEvent(new Event("km-session"));
                router.push("/login");
              }}
            >
              Log Out
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
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl bg-[#2f5be7] text-white px-4 py-3 text-sm font-semibold"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Home
          </Link>
          <Link
            href="/dashboard/courses"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
          >
            <span className="material-symbols-outlined text-lg">menu_book</span>
            Courses / Library
          </Link>
          <Link
            href="/dashboard/calendar"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Calendar/Events
          </Link>
          <Link
            href="/dashboard/prayer-requests"
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
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            >
              <span className="material-symbols-outlined text-lg">settings</span>
              Settings
            </Link>
            <button
              className="mt-4 w-full rounded-xl border border-[#e8ebf3] px-4 py-3 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc]"
              onClick={() => {
                sessionStorage.removeItem("km-auth");
                sessionStorage.removeItem("km-onboarding");
                sessionStorage.removeItem("km-preferences");
                window.dispatchEvent(new Event("km-session"));
                router.push("/login");
              }}
            >
              Log Out
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
            <div className="flex items-center gap-3 w-full rounded-full border border-[#e8ebf3] bg-[#f7f9fc] px-4 py-2 focus-within:border-[#2f5be7] focus-within:ring-2 focus-within:ring-[#2f5be7]/20">
              <span className="material-symbols-outlined text-[#8fa1b6] text-base">
                search
              </span>
              <input
                className="w-full bg-transparent text-sm text-[#1f2a44] outline-none"
                placeholder="Search scriptures, courses, or events..."
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
        <main className="flex-1 px-4 py-5 md:px-6 md:py-6 lg:px-10 lg:py-8">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px]">
            <div className="flex flex-col gap-6">
              <section className="rounded-3xl border border-[#e8ebf3] bg-white p-6 lg:p-8 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d6e2ff] bg-[#eff4ff] px-3 py-1 text-xs font-semibold text-[#2f5be7]">
                  <span className="size-2 rounded-full bg-[#2f5be7]"></span>
                  Active Track
                </div>
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-4xl font-black text-[#0e121b]">
                      Welcome back,
                      <span className="block text-[#2f5be7]">Leader {userName}</span>
                    </h1>
                    <p className="mt-3 text-sm md:text-base text-[#5b6b83]">
                      You are currently excelling in the <span className="font-semibold italic">Apostolic Foundation</span> leadership path. Continue your journey to achieve your goals.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <button className="rounded-xl bg-[#2f5be7] px-5 py-3 text-sm font-semibold text-white shadow-md hover:brightness-110 w-full sm:w-auto">
                      Resume Course
                    </button>
                    <button className="rounded-xl border border-[#e8ebf3] px-5 py-3 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7f9fc] w-full sm:w-auto">
                      View Full Path
                    </button>
                  </div>
                </div>
              </section>
              <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-[#e8ebf3] bg-[#eef3ff] p-5 transition-transform duration-200 hover:-translate-y-1">
                  <div className="size-10 rounded-xl bg-[#2f5be7]/10 text-[#2f5be7] flex items-center justify-center">
                    <span className="material-symbols-outlined">event_available</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#0e121b]">Book a Session</h3>
                  <p className="mt-2 text-sm text-[#5b6b83]">
                    Schedule a 1-on-1 mentorship call with a ministry senior.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e8ebf3] bg-[#eef3ff] p-5 transition-transform duration-200 hover:-translate-y-1">
                  <div className="size-10 rounded-xl bg-[#2f5be7]/10 text-[#2f5be7] flex items-center justify-center">
                    <span className="material-symbols-outlined">volunteer_activism</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#0e121b]">Request Prayer</h3>
                  <p className="mt-2 text-sm text-[#5b6b83]">
                    Submit your prayer requests to our dedicated intercession team.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#e8ebf3] bg-white p-5 flex items-center justify-between md:col-span-2 xl:col-span-1 transition-transform duration-200 hover:-translate-y-1">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#8fa1b6]">
                      Profile Maturity
                    </p>
                    <p className="mt-3 text-2xl font-black text-[#0e121b]">65%</p>
                    <p className="text-xs text-[#5b6b83] uppercase font-semibold">Complete</p>
                  </div>
                  <div className="size-20 rounded-full border-[6px] border-[#e8ebf3] border-t-[#2f5be7] rotate-45"></div>
                </div>
              </section>
              <section className="rounded-3xl border border-[#e8ebf3] bg-white p-6 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#0e121b]">Active Courses</h3>
                  <Link href="/dashboard" className="text-sm font-semibold text-[#2f5be7]">
                    See all courses
                  </Link>
                </div>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-4 rounded-2xl border border-[#e8ebf3] bg-[#f8faff] p-4 md:flex-row md:items-center md:justify-between transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-2xl bg-[#2f5be7]/10 flex items-center justify-center text-[#2f5be7] font-bold">
                        10
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2f5be7]">FOUNDATION</p>
                        <p className="text-sm font-bold text-[#0e121b]">Leadership 101: Serving with Heart</p>
                        <p className="text-xs text-[#5b6b83]">Last accessed: 2 days ago</p>
                      </div>
                    </div>
                  <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                      <div className="w-full md:w-32">
                        <div className="h-2 w-full rounded-full bg-[#e8ebf3]">
                          <div className="h-2 w-[80%] rounded-full bg-[#2f5be7]"></div>
                        </div>
                        <p className="mt-2 text-xs text-[#2f5be7] font-semibold text-right">80%</p>
                      </div>
                      <button className="rounded-xl border border-[#e8ebf3] px-4 py-2 text-xs font-semibold text-[#1f2a44] hover:bg-white w-full md:w-auto">
                        Resume Lesson
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 rounded-2xl border border-[#e8ebf3] bg-[#f8faff] p-4 md:flex-row md:items-center md:justify-between transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-2xl bg-[#2f5be7]/10 flex items-center justify-center text-[#2f5be7] font-bold">
                        08
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2f5be7]">DISCOVERY</p>
                        <p className="text-sm font-bold text-[#0e121b]">The Art of Prophetic Ministry</p>
                        <p className="text-xs text-[#5b6b83]">Last accessed: 1 week ago</p>
                      </div>
                    </div>
                  <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                      <div className="w-full md:w-32">
                        <div className="h-2 w-full rounded-full bg-[#e8ebf3]">
                          <div className="h-2 w-[45%] rounded-full bg-[#2f5be7]"></div>
                        </div>
                        <p className="mt-2 text-xs text-[#2f5be7] font-semibold text-right">45%</p>
                      </div>
                      <button className="rounded-xl border border-[#e8ebf3] px-4 py-2 text-xs font-semibold text-[#1f2a44] hover:bg-white w-full md:w-auto">
                        Resume Lesson
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <aside className="flex flex-col gap-6 order-last xl:order-none">
              <div className="rounded-3xl border border-[#e8ebf3] bg-white p-6 text-center transition-transform duration-200 hover:-translate-y-1">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#8fa1b6]">
                  Profile Maturity
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <div className="relative size-32 rounded-full border-[10px] border-[#e8ebf3]">
                    <div className="absolute inset-2 rounded-full border-[10px] border-[#2f5be7] border-l-transparent border-b-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <p className="text-2xl font-black text-[#0e121b]">65%</p>
                      <p className="text-xs text-[#5b6b83] uppercase font-semibold">Complete</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-[#1f2a44]">
                  Nearly a &#39;Shepherd&#39;
                </p>
                <p className="mt-2 text-xs text-[#5b6b83]">
                  Complete your spiritual gift assessment to unlock the Shepherd badge.
                </p>
                <button className="mt-4 w-full rounded-xl bg-[#2f5be7] px-4 py-3 text-xs font-semibold text-white">
                  Complete Now
                </button>
              </div>
              <div className="rounded-3xl border border-[#e8ebf3] bg-white p-6 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#8fa1b6]">
                    Upcoming Events
                  </p>
                  <button className="text-[#8fa1b6]">
                    <span className="material-symbols-outlined text-base">more_horiz</span>
                  </button>
                </div>
                <div className="mt-4 flex items-start gap-4 rounded-2xl border border-[#e8ebf3] bg-[#f8faff] p-4 transition-transform duration-200 hover:-translate-y-1">
                  <div className="flex flex-col items-center rounded-xl bg-[#2f5be7] px-3 py-2 text-white">
                    <span className="text-xs font-semibold">24</span>
                    <span className="text-[10px]">OCT</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0e121b]">Prayer Vigil Night</p>
                    <p className="text-xs text-[#5b6b83]">8:00 PM · Main Hall & Zoom</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
