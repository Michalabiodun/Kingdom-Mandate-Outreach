"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

const calendarDays = [
  null,
  null,
  null,
  null,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];

const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

export default function OneOnOneBookingPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(4);
  const [selectedTime, setSelectedTime] = useState("11:30 AM");
  const availableDays = new Set(
    calendarDays.filter((day): day is number => Boolean(day)),
  );

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
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">menu_book</span>
            Courses / Library
          </Link>
          <Link
            href="/dashboard/prayer-requests"
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
            className="flex items-center gap-3 rounded-xl bg-[#2f5be7] text-white px-4 py-3 text-sm font-semibold"
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
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
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
            className="flex items-center gap-3 rounded-xl bg-[#2f5be7] text-white px-4 py-3 text-sm font-semibold"
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
                placeholder="Search mentors, topics, or sessions..."
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
          <section className="mx-auto w-full max-w-5xl">
            <div className="rounded-[32px] border border-[#e6ebf2] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] overflow-hidden transition-transform duration-200 hover:-translate-y-1">
              <div className="flex flex-col gap-2 border-b border-[#e9eef7] bg-[#f8faff] px-6 py-6 md:px-10">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#111827]">
                    Book a One-on-One Session
                  </h1>
                  <button className="size-8 rounded-full border border-[#e0e6f2] text-[#9aa4b2] flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
                <p className="text-sm text-[#6b7280]">
                  Connect with our spiritual leaders for personalized growth and divine guidance.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
                <div className="px-6 py-6 md:px-10 md:py-8 space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                      Full name
                    </label>
                    <input
                      className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                        Email address
                      </label>
                      <input
                        className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                        placeholder="john@example.com"
                        type="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                        Phone number
                      </label>
                      <input
                        className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                      Topic of discussion
                    </label>
                    <div className="relative">
                      <select className="h-12 w-full appearance-none rounded-xl border border-[#e5e7f2] bg-white px-4 pr-10 text-sm text-[#111827] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20">
                        <option>Spiritual Growth & Disciplines</option>
                        <option>Leadership & Ministry Strategy</option>
                        <option>Prayer & Intercession</option>
                        <option>Marketplace Influence</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] material-symbols-outlined text-base">
                        expand_more
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#e6ecf7] bg-[#f1f5ff] p-4 transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-start gap-3">
                      <div className="size-9 rounded-full bg-[#2f5be7]/10 text-[#2f5be7] flex items-center justify-center">
                        <span className="material-symbols-outlined text-base">info</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1f2a44]">
                          Sessions are conducted via video call or in-person at our hub.
                        </p>
                        <p className="mt-1 text-xs text-[#6b7280]">
                          You will receive a confirmation link after booking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#e9eef7] lg:border-t-0 lg:border-l px-6 py-6 md:px-8 md:py-8 space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                      Select date & time
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="size-8 rounded-full border border-[#e5e7f2] text-[#94a3b8] flex items-center justify-center">
                        <span className="material-symbols-outlined text-base">chevron_left</span>
                      </button>
                      <button className="size-8 rounded-full border border-[#e5e7f2] text-[#94a3b8] flex items-center justify-center">
                        <span className="material-symbols-outlined text-base">chevron_right</span>
                      </button>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#e5e7f2] bg-white p-4 transition-transform duration-200 hover:-translate-y-1">
                    <div className="text-center text-sm font-semibold text-[#111827]">
                      October 2024
                    </div>
                    <div className="mt-4 grid grid-cols-7 gap-2 text-[11px] font-semibold text-[#9aa4b2]">
                      {["S", "M", "T", "W", "T", "F", "S"].map((label, index) => (
                        <div className="text-center" key={`${label}-${index}`}>
                          {label}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 grid grid-cols-7 gap-2 text-xs">
                      {calendarDays.map((day, index) => {
                        const isSelected = day === selectedDay;
                        const isDisabled = !day || !availableDays.has(day);
                        return (
                          <button
                            className={`h-8 rounded-lg text-xs font-semibold ${
                              isSelected
                                ? "bg-[#2f5be7] text-white"
                                : isDisabled
                                  ? "text-[#cbd5e1]"
                                  : "text-[#64748b] hover:bg-[#eef3ff]"
                            }`}
                            disabled={isDisabled}
                            key={`${day ?? "empty"}-${index}`}
                            type="button"
                            onClick={() => setSelectedDay(day)}
                          >
                            {day ?? ""}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => {
                      const isSelected = slot === selectedTime;
                      return (
                        <button
                          className={`h-11 rounded-xl border text-sm font-semibold ${
                            isSelected
                              ? "border-[#2f5be7] bg-[#eaf1ff] text-[#2f5be7]"
                              : "border-[#e5e7f2] text-[#1f2a44] hover:bg-[#f7f9fc]"
                          }`}
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    className="w-full rounded-2xl bg-[#2f5be7] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(46,91,231,0.24)] hover:brightness-110 flex items-center justify-center gap-2"
                    type="button"
                  >
                    Confirm Booking
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-[#9aa4b2]">
                    <span className="size-1.5 rounded-full bg-[#2f5be7]" />
                    Available for immediate scheduling
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center text-xs text-[#8b95a7]">
              Need help?{" "}
              <Link className="font-semibold text-[#2f5be7]" href="/contact">
                Contact Support
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
