"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default function TestimoniesPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    fullName: "",
    email: "",
    story: "",
  });
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState("");

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

  const errors = {
    title: formValues.title ? "" : "Title is required.",
    fullName:
      anonymous || formValues.fullName ? "" : "Full name is required.",
    email: !formValues.email
      ? "Email is required."
      : emailIsValid(formValues.email)
        ? ""
        : "Enter a valid email address.",
    story: formValues.story ? "" : "Testimony details are required.",
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
          searchPlaceholder="Search testimonies..."
          userName={userName}
          userRole={userRole}
        />
        <main className="flex-1 px-4 pb-5 pt-24 md:px-6 md:pb-6 lg:px-10 lg:pb-8">
          <section className="mx-auto w-full max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-semibold tracking-[0.32em] text-[#8fa1b6] uppercase">
                Share The Light
              </p>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold text-[#111827]">
                Share Your Story of Faith
              </h1>
              <p className="mt-3 text-sm md:text-base text-[#6b7280]">
                Your testimony encourages others and strengthens the Kingdom family.
              </p>
            </div>
            <div className="mt-10 rounded-[32px] bg-white border border-[#e6ebf2] shadow-[0_30px_80px_rgba(15,23,42,0.12)] px-6 py-8 md:px-10 md:py-10 transition-transform duration-200 hover:-translate-y-1">
              <form
                className="space-y-6"
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
                    const response = await fetch(`${apiBaseUrl}/api/testimonies`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        fullName: anonymous ? "Anonymous" : formValues.fullName,
                        email: formValues.email,
                        message: formValues.story,
                        title: formValues.title,
                        isAnonymous: anonymous,
                      }),
                    });
                    const payload = (await response.json()) as {
                      message?: string;
                    };
                    if (!response.ok) {
                      throw new Error(
                        payload.message || "Failed to submit testimony.",
                      );
                    }
                    setSubmitStatus("success");
                    setSubmitMessage(
                      anonymous 
                        ? "Your anonymous testimony has been submitted successfully and will appear on the landing page!"
                        : payload.message || "Testimony submitted successfully."
                    );
                    setFormValues({ title: "", fullName: "", email: "", story: "" });
                    setTouchedFields({});
                    setSubmitAttempted(false);
                  } catch (error) {
                    const message =
                      error instanceof Error
                        ? error.message
                        : "Failed to submit testimony.";
                    setSubmitStatus("error");
                    setSubmitMessage(message);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-[0.2em] text-[#1f2a44] uppercase">
                    Title of your testimony
                  </label>
                  <input
                    className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                    placeholder="How God changed my life..."
                    type="text"
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
                  />
                  {showError("title") ? (
                    <p className="text-[11px] text-[#ef4444]">{errors.title}</p>
                  ) : null}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-[0.2em] text-[#1f2a44] uppercase">
                      Full name
                    </label>
                    <input
                      className="h-12 w-full rounded-xl border border-[#e5e7f2] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                      placeholder="John Doe"
                      type="text"
                      required={!anonymous}
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
                      <p className="text-[11px] text-[#ef4444]">{errors.fullName}</p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-[0.2em] text-[#1f2a44] uppercase">
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
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-[0.2em] text-[#1f2a44] uppercase">
                    Your story
                  </label>
                  <textarea
                    className="min-h-[180px] w-full rounded-2xl border border-[#e5e7f2] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9aa4b2] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
                    placeholder="Share the details of God’s work in your life..."
                    rows={6}
                    required
                    value={formValues.story}
                    onChange={(event) =>
                      setFormValues((prev) => ({
                        ...prev,
                        story: event.target.value,
                      }))
                    }
                    onBlur={() =>
                      setTouchedFields((prev) => ({ ...prev, story: true }))
                    }
                  />
                  {showError("story") ? (
                    <p className="text-[11px] text-[#ef4444]">{errors.story}</p>
                  ) : null}
                </div>
                <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-[0.2em] text-[#1f2a44] uppercase">
                      Add photo or video (optional)
                    </label>
                    <label className="flex h-36 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-[#d9deea] bg-[#f8faff] text-center">
                      <input className="hidden" type="file" />
                      <div className="flex flex-col items-center gap-2 text-[#8fa1b6]">
                        <span className="material-symbols-outlined text-3xl">upload</span>
                        <span className="text-xs font-semibold">Click to upload media</span>
                      </div>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-[0.2em] text-[#1f2a44] uppercase">
                      Privacy
                    </label>
                    <div className="flex items-center justify-between rounded-2xl border border-[#e5e7f2] bg-white px-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">Post Anonymously</p>
                        <p className="mt-1 text-xs text-[#6b7280]">
                          Hide your name from the public testimony feed.
                        </p>
                      </div>
                      <button
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          anonymous ? "bg-[#2f5be7]" : "bg-[#d7dce6]"
                        }`}
                        type="button"
                        onClick={() => setAnonymous((value) => !value)}
                      >
                        <span
                          className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                            anonymous ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full rounded-2xl bg-[#0b2d6e] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(15,23,42,0.18)] hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-70"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  {isSubmitting ? "Submitting..." : "Submit Testimony"}
                </button>
                {submitStatus !== "idle" ? (
                  <p
                    className={`text-center text-xs ${
                      submitStatus === "success" ? "text-[#16a34a]" : "text-[#ef4444]"
                    }`}
                  >
                    {submitMessage}
                  </p>
                ) : null}
                <p className="text-center text-xs text-[#9aa4b2]">
                  Your story may be shared to inspire the global community.
                </p>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
