"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

const profileTabs = ["General", "Security", "Notifications", "Billing"];

const connectedAccounts = [
  { name: "Google Account", status: "Connected", active: true, icon: "public" },
  { name: "Ministry Calendar", status: "Not Linked", active: false, icon: "calendar_month" },
  { name: "Partner Tools", status: "Connected", active: true, icon: "handshake" },
];

const notificationPreferences = [
  {
    title: "Spiritual Growth Updates",
    description: "Receive daily devotionals and growth tracks",
    active: true,
  },
  {
    title: "Community Mentorship Alerts",
    description: "Get notified when a mentee requests guidance",
    active: true,
  },
  {
    title: "Weekly Ministry Reports",
    description: "Email summary of global mandate progress",
    active: false,
  },
];

export default function ProfileSettingsPage() {
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
            href="/dashboard"
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
                placeholder="Search settings..."
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
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
              <aside className="rounded-3xl border border-[#e6ebf3] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-[#e9eefc] text-[#2f5be7] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0f172a]">{userName}</p>
                    <p className="text-[10px] font-semibold text-[#2f5be7] uppercase tracking-[0.2em]">
                      Leadership Tier
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  {profileTabs.map((tab) => {
                    const isActive = tab === "General";
                    return (
                      <button
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold ${
                          isActive
                            ? "bg-[#eef3ff] text-[#2f5be7]"
                            : "text-[#5b6b83] hover:bg-[#f7f9fc]"
                        }`}
                        key={tab}
                        type="button"
                      >
                        <span>{tab}</span>
                        {isActive ? (
                          <span className="material-symbols-outlined text-base">chevron_right</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
                <button className="mt-6 w-full rounded-xl border border-[#e6ebf3] px-4 py-2 text-xs font-semibold text-[#e11d48]">
                  Log Out
                </button>
              </aside>
              <section className="rounded-3xl border border-[#e6ebf3] bg-white shadow-sm">
                <div className="flex flex-col gap-6 border-b border-[#edf1fb] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-full bg-[#e9eefc] text-[#2f5be7] flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl">person</span>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-[#0f172a]">Profile Settings</h1>
                      <p className="text-sm text-[#6b7280]">
                        Manage your spiritual and leadership identity
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#eef3ff] px-3 py-1 text-[10px] font-semibold text-[#2f5be7]">
                          Verified Leader
                        </span>
                        <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[10px] font-semibold text-[#64748b]">
                          Global Community
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="rounded-xl border border-[#e6ebf3] bg-[#f7f9ff] px-4 py-2 text-xs font-semibold text-[#2f5be7]">
                    Upload New Photo
                  </button>
                </div>
                <div className="px-6 py-6 md:px-8 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold text-[#0f172a]">Account Details</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-[#7b86b2] uppercase tracking-[0.2em]">
                          Full Name
                        </label>
                        <input
                          className="h-11 w-full rounded-xl border border-[#e6ebf3] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                          defaultValue={userName}
                          type="text"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-[#7b86b2] uppercase tracking-[0.2em]">
                          Professional Email
                        </label>
                        <input
                          className="h-11 w-full rounded-xl border border-[#e6ebf3] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                          defaultValue="john.doe@ministry.org"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-[#7b86b2] uppercase tracking-[0.2em]">
                        Leadership Bio
                      </label>
                      <textarea
                        className="min-h-[120px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                        defaultValue="Servant leader focused on community growth and spiritual mentorship. Dedicated to the Mandate of the Kingdom since 2018."
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold text-[#0f172a]">Connected Accounts</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {connectedAccounts.map((account) => (
                        <div
                          className="flex items-center justify-between rounded-2xl border border-[#edf1fb] bg-[#fafbff] px-4 py-4"
                          key={account.name}
                        >
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-white border border-[#e6ebf3] text-[#2f5be7] flex items-center justify-center">
                              <span className="material-symbols-outlined text-base">
                                {account.icon}
                              </span>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[#0f172a]">
                                {account.name}
                              </p>
                              <p className="text-[10px] text-[#7b86b2]">{account.status}</p>
                            </div>
                          </div>
                          <button
                            className={`relative h-6 w-11 rounded-full transition-colors ${
                              account.active ? "bg-[#2f5be7]" : "bg-[#d7dce6]"
                            }`}
                            type="button"
                          >
                            <span
                              className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                                account.active ? "translate-x-5" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold text-[#0f172a]">Notification Preferences</h2>
                    <div className="space-y-3">
                      {notificationPreferences.map((item) => (
                        <div
                          className="flex items-center justify-between rounded-2xl border border-[#edf1fb] bg-white px-4 py-4"
                          key={item.title}
                        >
                          <div>
                            <p className="text-xs font-semibold text-[#0f172a]">{item.title}</p>
                            <p className="text-[10px] text-[#7b86b2]">{item.description}</p>
                          </div>
                          <button
                            className={`relative h-6 w-11 rounded-full transition-colors ${
                              item.active ? "bg-[#2f5be7]" : "bg-[#d7dce6]"
                            }`}
                            type="button"
                          >
                            <span
                              className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                                item.active ? "translate-x-5" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 border-t border-[#edf1fb] pt-6 sm:flex-row sm:items-center sm:justify-end">
                    <button className="rounded-xl border border-[#e6ebf3] px-4 py-2 text-xs font-semibold text-[#64748b]">
                      Discard Changes
                    </button>
                    <button className="rounded-xl bg-[#2f5be7] px-5 py-2 text-xs font-semibold text-white shadow-[0_12px_20px_rgba(46,91,231,0.24)]">
                      Save Changes
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
