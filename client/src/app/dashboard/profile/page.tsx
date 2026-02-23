"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

const profileTabs = ["General", "Security", "Notifications", "Billing"];

const initialConnectedAccounts = [
  { name: "Google Account", status: "Connected", active: true, icon: "public" },
  { name: "Ministry Calendar", status: "Not Linked", active: false, icon: "calendar_month" },
  { name: "Partner Tools", status: "Connected", active: true, icon: "handshake" },
];

const initialNotificationPreferences = [
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
  const [connectedAccounts, setConnectedAccounts] = useState(initialConnectedAccounts);
  const [notificationPreferences, setNotificationPreferences] = useState(
    initialNotificationPreferences,
  );
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
          searchPlaceholder="Search settings..."
          userName={userName}
          userRole={userRole}
        />
        <main className="flex-1 px-4 pb-5 pt-24 md:px-6 md:pb-6 lg:px-10 lg:pb-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 gap-6">
              <section className="rounded-3xl border border-[#e6ebf3] bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1">
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
                      {connectedAccounts.map((account, index) => (
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
                            onClick={() => {
                              setConnectedAccounts((prev) =>
                                prev.map((item, itemIndex) =>
                                  itemIndex === index
                                    ? {
                                        ...item,
                                        active: !item.active,
                                        status: item.active ? "Not Linked" : "Connected",
                                      }
                                    : item,
                                ),
                              );
                            }}
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
                      {notificationPreferences.map((item, index) => (
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
                            onClick={() => {
                              setNotificationPreferences((prev) =>
                                prev.map((pref, prefIndex) =>
                                  prefIndex === index
                                    ? { ...pref, active: !pref.active }
                                    : pref,
                                ),
                              );
                            }}
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
