"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
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

  const errors = {
    firstName: formValues.firstName ? "" : "First name is required.",
    lastName: formValues.lastName ? "" : "Last name is required.",
    email: !formValues.email
      ? "Email is required."
      : emailIsValid(formValues.email)
        ? ""
        : "Enter a valid email address.",
    subject: formValues.subject ? "" : "Subject is required.",
    message: formValues.message ? "" : "Message is required.",
  };

  const showError = (field: keyof typeof errors) =>
    (submitAttempted || touchedFields[field]) && Boolean(errors[field]);

  return (
    <div className="min-h-screen bg-[#eef2fb] text-[#0e121b] flex flex-col flex-1 items-center justify-center p-6 py-12">
      <div className="w-full max-w-[640px] rounded-[32px] bg-white shadow-[0_30px_80px_rgba(28,38,74,0.18)] border border-[#e6e9f5] px-8 py-10 md:px-10 md:py-12">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
            Contact Us
          </h1>
          <p className="mt-3 text-sm text-[#6370a6]">
            Share your questions, prayer needs, or partnership ideas.
          </p>
        </div>
        <form
          className="mt-8 space-y-5"
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
              const response = await fetch(`${apiBaseUrl}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  firstName: formValues.firstName,
                  lastName: formValues.lastName,
                  email: formValues.email,
                  subject: formValues.subject,
                  message: formValues.message,
                }),
              });
              const payload = (await response.json()) as { message?: string };
              if (!response.ok) {
                throw new Error(payload.message || "Failed to send message.");
              }
              setSubmitStatus("success");
              setSubmitMessage(payload.message || "Message sent successfully.");
              setFormValues({
                firstName: "",
                lastName: "",
                email: "",
                subject: "",
                message: "",
              });
              setTouchedFields({});
              setSubmitAttempted(false);
            } catch (error) {
              const message =
                error instanceof Error ? error.message : "Failed to send message.";
              setSubmitStatus("error");
              setSubmitMessage(message);
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-[0.2em] text-[#343f6b] uppercase">
                First name
              </label>
              <input
                className="h-12 w-full rounded-xl border border-[#cfd6ea] bg-white px-4 text-sm text-[#0f172a] placeholder:text-[#9aa3c8] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
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
                  setTouchedFields((prev) => ({ ...prev, firstName: true }))
                }
              />
              {showError("firstName") ? (
                <p className="text-[11px] text-[#ef4444]">{errors.firstName}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-[0.2em] text-[#343f6b] uppercase">
                Last name
              </label>
              <input
                className="h-12 w-full rounded-xl border border-[#cfd6ea] bg-white px-4 text-sm text-[#0f172a] placeholder:text-[#9aa3c8] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
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
                  setTouchedFields((prev) => ({ ...prev, lastName: true }))
                }
              />
              {showError("lastName") ? (
                <p className="text-[11px] text-[#ef4444]">{errors.lastName}</p>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-[0.2em] text-[#343f6b] uppercase">
              Email address
            </label>
            <input
              className="h-12 w-full rounded-xl border border-[#cfd6ea] bg-white px-4 text-sm text-[#0f172a] placeholder:text-[#9aa3c8] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
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
            <label className="text-xs font-semibold tracking-[0.2em] text-[#343f6b] uppercase">
              Subject
            </label>
            <input
              className="h-12 w-full rounded-xl border border-[#cfd6ea] bg-white px-4 text-sm text-[#0f172a] placeholder:text-[#9aa3c8] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
              placeholder="How can we help?"
              type="text"
              required
              value={formValues.subject}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  subject: event.target.value,
                }))
              }
              onBlur={() =>
                setTouchedFields((prev) => ({ ...prev, subject: true }))
              }
            />
            {showError("subject") ? (
              <p className="text-[11px] text-[#ef4444]">{errors.subject}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-[0.2em] text-[#343f6b] uppercase">
              Message
            </label>
            <textarea
              className="min-h-[140px] w-full rounded-2xl border border-[#cfd6ea] bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#9aa3c8] focus:border-[#2f5be7] focus:outline-none focus:ring-2 focus:ring-[#2f5be7]/20"
              placeholder="Share your message..."
              required
              value={formValues.message}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  message: event.target.value,
                }))
              }
              onBlur={() =>
                setTouchedFields((prev) => ({ ...prev, message: true }))
              }
            />
            {showError("message") ? (
              <p className="text-[11px] text-[#ef4444]">{errors.message}</p>
            ) : null}
          </div>
          <button
            className="w-full rounded-2xl bg-[#2f5be7] py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(46,91,231,0.2)] hover:brightness-110 disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
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
        </form>
      </div>
    </div>
  );
}
