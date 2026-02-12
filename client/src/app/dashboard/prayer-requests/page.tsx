"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

const prayerCategories = [
  "Healing",
  "Family",
  "Guidance",
  "Provision",
  "Salvation",
  "Thanksgiving",
];

export default function PrayerRequestsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prayer, setPrayer] = useState("");
  const [category, setCategory] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
            href="/dashboard/calendar"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#5b6b83] hover:bg-[#f1f4ff]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Calendar/Events
          </Link>
          <Link
            href="/dashboard/prayer-requests"
            className="flex items-center gap-3 rounded-xl bg-[#2f5be7] text-white px-4 py-3 text-sm font-semibold"
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
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="size-10 rounded-xl bg-[#2f5be7] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">dashboard</span>
          </div>
          <div>
            <p className="text-base font-bold">Kingdom Mandate</p>
            <p className="text-xs font-semibold text-[#2f5be7] uppercase tracking-widest">
              Leadership Hub
            </p>
          </div>
        </div>
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
            className="flex items-center gap-3 rounded-xl bg-[#2f5be7] text-white px-4 py-3 text-sm font-semibold"
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
                placeholder="Search prayer requests..."
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
          <section className="mx-auto w-full max-w-4xl">
            <div className="rounded-[28px] border border-[#e6ebf2] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] overflow-hidden transition-transform duration-200 hover:-translate-y-1">
              {isSubmitted ? (
                <div className="px-8 py-12 md:px-12 md:py-14 text-center">
                  <div className="mx-auto size-16 rounded-full bg-[#e9efff] flex items-center justify-center text-[#2f5be7]">
                    <span className="material-symbols-outlined text-3xl">check</span>
                  </div>
                  <h1 className="mt-6 text-2xl md:text-3xl font-bold text-[#111827]">
                    Request Sent
                  </h1>
                  <p className="mt-3 text-sm md:text-base text-[#6b7280]">
                    Your prayer request has been received. Our community and leadership are
                    standing in faith with you.
                  </p>
                  <div className="mt-8 flex flex-col gap-3">
                    <button
                      className="h-11 rounded-xl bg-[#2f5be7] text-white text-sm font-semibold hover:brightness-110"
                      onClick={() => setIsSubmitted(false)}
                    >
                      View Prayer Wall
                    </button>
                    <button
                      className="h-11 rounded-xl border border-[#d7deea] text-sm font-semibold text-[#2f5be7] hover:bg-[#f1f4ff]"
                      onClick={() => router.push("/dashboard")}
                    >
                      Back to Dashboard
                    </button>
                    <button
                      className="text-xs font-semibold text-[#9aa4b2]"
                      onClick={() => router.push("/dashboard")}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-b border-[#e9eef7] bg-[#f8faff] px-6 py-6 md:px-10">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#111827]">
                          Submit a Prayer Request
                        </h1>
                        <p className="mt-2 text-sm text-[#6b7280]">
                          We are here to stand with you in faith.
                        </p>
                      </div>
                      <button
                        className="size-8 rounded-full border border-[#e0e6f2] text-[#9aa4b2] flex items-center justify-center"
                        onClick={() => router.push("/dashboard")}
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    </div>
                  </div>
                  <form
                    className="px-6 py-6 md:px-10 md:py-8 space-y-6"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setIsSubmitted(true);
                    }}
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#2f5be7] text-base">
                          campaign
                        </span>
                        Your Prayer
                      </label>
                      <textarea
                        className="min-h-[140px] w-full rounded-2xl border border-[#e5e7f2] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                        placeholder="Share your heart..."
                        value={prayer}
                        onChange={(event) => setPrayer(event.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr]">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#2f5be7] text-base">
                            category
                          </span>
                          Prayer Category
                        </label>
                        <div className="relative">
                          <select
                            className="h-12 w-full appearance-none rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                          >
                            <option value="">Select Category</option>
                            {prayerCategories.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#9aa4b2] text-base">
                            expand_more
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#2f5be7] text-base">
                            lock
                          </span>
                          Privacy
                        </label>
                        <div className="flex items-center justify-between rounded-xl border border-[#e5e7f2] bg-white px-4 py-3">
                          <p className="text-sm font-semibold text-[#111827]">
                            Post Anonymously
                          </p>
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={isAnonymous}
                              onChange={(event) => setIsAnonymous(event.target.checked)}
                            />
                            <div className="h-6 w-11 rounded-full bg-[#e5e7f2] transition peer-checked:bg-[#2f5be7] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition after:content-[''] peer-checked:after:translate-x-5" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#9aa4b2] text-center italic">
                      “For where two or three are gathered together in my name, there am I
                      in the midst of them.” — Matthew 18:20
                    </p>
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                      <button
                        type="button"
                        className="h-11 rounded-xl border border-[#d7deea] px-6 text-sm font-semibold text-[#6b7280] hover:bg-[#f7f9fc]"
                        onClick={() => router.push("/dashboard")}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="h-11 rounded-xl bg-[#2f5be7] px-6 text-sm font-semibold text-white hover:brightness-110"
                      >
                        Send Request
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
