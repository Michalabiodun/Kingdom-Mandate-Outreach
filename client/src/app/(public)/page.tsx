"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PulseFitHero } from "@/components/ui/pulse-fit-hero";
import { BouncyCardsFeatures } from "@/components/ui/bouncy-card-features";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { GlobeFeatureSection } from "@/components/ui/globe-feature-section";

export default function Home() {
  const router = useRouter();

  const testimonials = [
    {
      quote: "The mentorship and teaching here transformed my leadership and daily walk with God.",
      name: "Faith Johnson",
      designation: "Community Leader",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop&crop=face",
    },
    {
      quote: "I found clarity in purpose and practical tools to lead my community with excellence.",
      name: "Daniel Okafor",
      designation: "Campus Director",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&crop=face",
    },
    {
      quote: "The community is warm, the teachings are deep, and the impact is undeniable.",
      name: "Grace Mensah",
      designation: "Prayer Coordinator",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face",
    },
    {
      quote: "Every session strengthens my faith and equips me to serve with confidence.",
      name: "Samuel Adeyemi",
      designation: "Youth Pastor",
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop&crop=face",
    },
    {
      quote: "I feel supported and empowered to fulfill my calling in every sphere.",
      name: "Ruth Abiola",
      designation: "Outreach Volunteer",
      src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&crop=face",
    },
    {
      quote: "Kingdom Mandate has been a steady source of wisdom and encouragement.",
      name: "Michael Osei",
      designation: "Ministry Partner",
      src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&h=800&fit=crop&crop=face",
    },
  ];

  const handleSubmitTestimony = () => {
    const auth = typeof window !== "undefined" ? sessionStorage.getItem("km-auth") : null;
    if (auth) {
      router.push("/dashboard/testimonies");
    } else {
      router.push("/register");
    }
  };

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
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-sans">
      <PulseFitHero
        title="Raising Kingdom Leaders. Establishing God's Mandate on Earth."
        subtitle="Empowering believers to lead with spiritual authority and integrity in every sphere of influence."
        primaryAction={{
          label: "Join Us",
          onClick: () => router.push("/register"),
        }}
        secondaryAction={{
          label: "Learn More",
          onClick: () => console.log("Learn More"),
        }}
        programs={[
          {
            image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&h=500&fit=crop",
            category: "SERMON SERIES",
            title: "Recent Sermons",
            onClick: () => console.log("Recent Sermons"),
          },
          {
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=500&fit=crop",
            category: "UPCOMING",
            title: "Conferences & Events",
            onClick: () => console.log("Events"),
          },
          {
            image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=500&fit=crop",
            category: "COMMUNITY",
            title: "Prayer Requests",
            onClick: () => console.log("Prayer Requests"),
          },
          {
            image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=500&fit=crop",
            category: "LEADERSHIP",
            title: "Discipleship Programs",
            onClick: () => console.log("Discipleship"),
          },
          {
            image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=500&fit=crop",
            category: "OUTREACH",
            title: "Global Mission",
            onClick: () => console.log("Mission"),
          },
        ]}
      />
      <main className="flex flex-col items-center flex-1 w-full mt-12 md:mt-24">
        <BouncyCardsFeatures />

        <section className="w-full flex flex-col items-center py-20 px-4 bg-white/30 backdrop-blur-sm mt-12 md:mt-24 overflow-hidden">
          <div className="w-full flex flex-col items-center text-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight text-[#0e121b]">
                Voices of Transformation
              </h2>
              <p className="text-md max-w-[600px] font-medium text-[#6b7280] sm:text-xl">
                Real stories from our global community of believers and leaders.
              </p>
            </div>
            <CircularTestimonials
              testimonials={testimonials}
              autoplay
            />
          </div>
        </section>
        <GlobeFeatureSection />
       
      </main>
    </div>
  );
}
