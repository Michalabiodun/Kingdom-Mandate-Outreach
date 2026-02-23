"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default function PrayerRequestsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [prayer, setPrayer] = useState("");
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
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

  const emailIsValid = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) {
      return digits;
    }
    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    if (digits.length <= 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return `+${digits.slice(0, 15)}`;
  };

  const phoneDigits = formValues.phone.replace(/\D/g, "");
  const errors = {
    prayer: prayer ? "" : "Prayer details are required.",
    fullName: formValues.fullName ? "" : "Full name is required.",
    email: !formValues.email
      ? "Email is required."
      : emailIsValid(formValues.email)
        ? ""
        : "Enter a valid email address.",
    phone: !formValues.phone
      ? "Phone number is required."
      : phoneDigits.length < 10
        ? "Enter a valid phone number."
        : "",
  };

  const showError = (field: keyof typeof errors) =>
    (submitAttempted || touchedFields[field]) && Boolean(errors[field]);

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
          searchPlaceholder="Search prayer requests..."
          userName={userName}
          userRole={userRole}
        />
        <main className="flex-1 px-4 pb-5 pt-24 md:px-6 md:pb-6 lg:px-10 lg:pb-8">
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
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setSubmitAttempted(true);
                      setSubmitError("");
                      if (Object.values(errors).some(Boolean)) {
                        return;
                      }
                      setIsSubmitting(true);
                      try {
                        const response = await fetch(
                          `${apiBaseUrl}/api/prayer-request`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              firstName: formValues.fullName,
                              email: formValues.email,
                              phone: formValues.phone,
                              message: prayer,
                            }),
                          },
                        );
                        const payload = (await response.json()) as {
                          message?: string;
                        };
                        if (!response.ok) {
                          throw new Error(
                            payload.message || "Failed to submit prayer request.",
                          );
                        }
                        setIsSubmitted(true);
                        setPrayer("");
                        setFormValues({ fullName: "", email: "", phone: "" });
                        setTouchedFields({});
                        setSubmitAttempted(false);
                      } catch (error) {
                        const message =
                          error instanceof Error
                            ? error.message
                            : "Failed to submit prayer request.";
                        setSubmitError(message);
                      } finally {
                        setIsSubmitting(false);
                      }
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
                        onBlur={() =>
                          setTouchedFields((prev) => ({ ...prev, prayer: true }))
                        }
                      />
                      {showError("prayer") ? (
                        <p className="text-[11px] text-[#ef4444]">{errors.prayer}</p>
                      ) : null}
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                          Full name
                        </label>
                        <input
                          className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                          placeholder="John Doe"
                          type="text"
                          required
                          value={formValues.fullName}
                          onChange={(event) =>
                            setFormValues((prev) => ({
                              ...prev,
                              fullName: event.target.value,
                            }))
                          }
                          onBlur={() =>
                            setTouchedFields((prev) => ({ ...prev, fullName: true }))
                          }
                        />
                        {showError("fullName") ? (
                          <p className="text-[11px] text-[#ef4444]">
                            {errors.fullName}
                          </p>
                        ) : null}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                          Email address
                        </label>
                        <input
                          className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                          placeholder="john@example.com"
                          type="email"
                          required
                          value={formValues.email}
                          onChange={(event) =>
                            setFormValues((prev) => ({
                              ...prev,
                              email: event.target.value,
                            }))
                          }
                          onBlur={() =>
                            setTouchedFields((prev) => ({ ...prev, email: true }))
                          }
                        />
                        {showError("email") ? (
                          <p className="text-[11px] text-[#ef4444]">{errors.email}</p>
                        ) : null}
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                          Phone number
                        </label>
                        <input
                          className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                          placeholder="+1 (555) 000-0000"
                          type="tel"
                          required
                          value={formValues.phone}
                          onChange={(event) =>
                            setFormValues((prev) => ({
                              ...prev,
                              phone: formatPhoneInput(event.target.value),
                            }))
                          }
                          onBlur={() =>
                            setTouchedFields((prev) => ({ ...prev, phone: true }))
                          }
                        />
                        {showError("phone") ? (
                          <p className="text-[11px] text-[#ef4444]">{errors.phone}</p>
                        ) : null}
                      </div>
                    </div>
                    <p className="text-xs text-[#9aa4b2] text-center italic">
                      “For where two or three are gathered together in my name, there am I
                      in the midst of them.” — Matthew 18:20
                    </p>
                    {submitError ? (
                      <p className="text-center text-xs text-[#ef4444]">
                        {submitError}
                      </p>
                    ) : null}
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
                        className="h-11 rounded-xl bg-[#2f5be7] px-6 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-70"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Request"}
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
