"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default function OneOnOneBookingPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    email: "",
    phone: "",
  });
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState("");
  const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

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
    title: formValues.title ? "" : "Select a title.",
    firstName: formValues.firstName ? "" : "First name is required.",
    middleName: formValues.middleName ? "" : "Middle name is required.",
    lastName: formValues.lastName ? "" : "Last name is required.",
    gender: formValues.gender ? "" : "Select a gender.",
    maritalStatus: formValues.maritalStatus ? "" : "Select a marital status.",
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
          searchPlaceholder="Search mentors, topics, or sessions..."
          userName={userName}
          userRole={userRole}
        />
        <main className="flex-1 px-4 pb-5 pt-24 md:px-6 md:pb-6 lg:px-10 lg:pb-8">
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
              <form
                className="px-6 py-6 md:px-10 md:py-8 space-y-5"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setSubmitAttempted(true);
                  setSubmitStatus("idle");
                  setSubmitMessage("");
                  if (Object.values(errors).some(Boolean)) {
                    return;
                  }
                  setIsSubmitting(true);
                  try {
                    const response = await fetch(`${apiBaseUrl}/api/one-to-one`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        title: formValues.title,
                        firstName: formValues.firstName,
                        middleName: formValues.middleName,
                        surname: formValues.lastName,
                        gender: formValues.gender,
                        maritalStatus: formValues.maritalStatus,
                        email: formValues.email,
                        phone: formValues.phone,
                      }),
                    });
                    const payload = (await response.json()) as {
                      message?: string;
                    };
                    if (!response.ok) {
                      throw new Error(
                        payload.message || "Failed to submit one-on-one request.",
                      );
                    }
                    setSubmitStatus("success");
                    setSubmitMessage(
                      payload.message || "Session request submitted successfully.",
                    );
                    setFormValues({
                      title: "",
                      firstName: "",
                      middleName: "",
                      lastName: "",
                      gender: "",
                      maritalStatus: "",
                      email: "",
                      phone: "",
                    });
                    setTouchedFields({});
                    setSubmitAttempted(false);
                  } catch (error) {
                    const message =
                      error instanceof Error
                        ? error.message
                        : "Failed to submit one-on-one request.";
                    setSubmitStatus("error");
                    setSubmitMessage(message);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                        Title
                      </label>
                      <div className="relative">
                        <select
                          className="h-12 w-full appearance-none rounded-xl border border-[#e5e7f2] bg-white px-4 pr-10 text-sm text-[#111827] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                          required
                          value={formValues.title}
                          onChange={(event) =>
                            setFormValues((prev) => ({
                              ...prev,
                              title: event.target.value,
                            }))
                          }
                          onBlur={() =>
                            setTouchedFields((prev) => ({ ...prev, title: true }))
                          }
                        >
                          <option value="">Select title</option>
                          <option value="mr">Mr</option>
                          <option value="mrs">Mrs</option>
                          <option value="miss">Miss</option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] material-symbols-outlined text-base">
                          expand_more
                        </span>
                      </div>
                      {showError("title") ? (
                        <p className="text-[11px] text-[#ef4444]">{errors.title}</p>
                      ) : null}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                        First name
                      </label>
                      <input
                        className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                        placeholder="John"
                        type="text"
                        required
                        value={formValues.firstName}
                        onChange={(event) =>
                          setFormValues((prev) => ({
                            ...prev,
                            firstName: event.target.value,
                          }))
                        }
                        onBlur={() =>
                          setTouchedFields((prev) => ({
                            ...prev,
                            firstName: true,
                          }))
                        }
                      />
                      {showError("firstName") ? (
                        <p className="text-[11px] text-[#ef4444]">
                          {errors.firstName}
                        </p>
                      ) : null}
                    </div>
                  </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                        Middle name
                      </label>
                      <input
                        className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                        placeholder="Michael"
                        type="text"
                        required
                        value={formValues.middleName}
                        onChange={(event) =>
                          setFormValues((prev) => ({
                            ...prev,
                            middleName: event.target.value,
                          }))
                        }
                        onBlur={() =>
                          setTouchedFields((prev) => ({
                            ...prev,
                            middleName: true,
                          }))
                        }
                      />
                      {showError("middleName") ? (
                        <p className="text-[11px] text-[#ef4444]">
                          {errors.middleName}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                        Last name
                      </label>
                      <input
                        className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                        placeholder="Doe"
                        type="text"
                        required
                        value={formValues.lastName}
                        onChange={(event) =>
                          setFormValues((prev) => ({
                            ...prev,
                            lastName: event.target.value,
                          }))
                        }
                        onBlur={() =>
                          setTouchedFields((prev) => ({
                            ...prev,
                            lastName: true,
                          }))
                        }
                      />
                      {showError("lastName") ? (
                        <p className="text-[11px] text-[#ef4444]">
                          {errors.lastName}
                        </p>
                      ) : null}
                    </div>
                  </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          className="h-12 w-full appearance-none rounded-xl border border-[#e5e7f2] bg-white px-4 pr-10 text-sm text-[#111827] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                          required
                          value={formValues.gender}
                          onChange={(event) =>
                            setFormValues((prev) => ({
                              ...prev,
                              gender: event.target.value,
                            }))
                          }
                          onBlur={() =>
                            setTouchedFields((prev) => ({ ...prev, gender: true }))
                          }
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] material-symbols-outlined text-base">
                          expand_more
                        </span>
                      </div>
                      {showError("gender") ? (
                        <p className="text-[11px] text-[#ef4444]">{errors.gender}</p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">
                        Marital status
                      </label>
                      <div className="relative">
                        <select
                          className="h-12 w-full appearance-none rounded-xl border border-[#e5e7f2] bg-white px-4 pr-10 text-sm text-[#111827] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                          required
                          value={formValues.maritalStatus}
                          onChange={(event) =>
                            setFormValues((prev) => ({
                              ...prev,
                              maritalStatus: event.target.value,
                            }))
                          }
                          onBlur={() =>
                            setTouchedFields((prev) => ({
                              ...prev,
                              maritalStatus: true,
                            }))
                          }
                        >
                          <option value="">Select status</option>
                          <option value="married">Married</option>
                          <option value="single">Single</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] material-symbols-outlined text-base">
                          expand_more
                        </span>
                      </div>
                      {showError("maritalStatus") ? (
                        <p className="text-[11px] text-[#ef4444]">
                          {errors.maritalStatus}
                        </p>
                      ) : null}
                    </div>
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
                    <div className="space-y-2">
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
                <button
                  className="w-full rounded-2xl bg-[#2f5be7] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(46,91,231,0.24)] hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-70"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                {submitStatus !== "idle" ? (
                  <p
                    className={`text-center text-xs ${
                      submitStatus === "success"
                        ? "text-[#16a34a]"
                        : "text-[#ef4444]"
                    }`}
                  >
                    {submitMessage}
                  </p>
                ) : null}
              </form>
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
