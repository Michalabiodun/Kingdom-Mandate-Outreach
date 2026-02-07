"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PulseFitHero } from "@/components/ui/pulse-fit-hero";
import { BouncyCardsFeatures } from "@/components/ui/bouncy-card-features";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { GlobeFeatureSection } from "@/components/ui/globe-feature-section";

export default function Home() {
  const router = useRouter();

  const handleSubmitTestimony = () => {
    const auth = typeof window !== "undefined" ? sessionStorage.getItem("km-auth") : null;
    if (auth) {
      router.push("/dashboard/testimonies");
    } else {
      router.push("/register");
    }
  };

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
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Voices of Transformation</h2>
            <p className="text-xl text-(--text-muted) max-w-2xl mx-auto">
              Real stories from our global community of believers and leaders.
            </p>
          </div>

          <CircularTestimonials
            testimonials={[
              {
                quote: "The leadership training at Kingdom Mandate transformed my approach to business. I now lead with a sense of purpose and divine stewardship.",
                name: "Dr. Samuel Okonkwo",
                designation: "CEO, Kingdom Tech Solutions",
                src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face",
              },
              {
                quote: "I found a community that truly supports my spiritual growth. The sermons are practical and life-changing for my entire family.",
                name: "Sarah Mitchell",
                designation: "Global Community Leader",
                src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop&crop=face",
              },
              {
                quote: "The mentorship program helped me discover my mandate. I am now actively serving in our youth ministry with profound confidence.",
                name: "Pastor Michael Wright",
                designation: "Youth Empowerment Mentor",
                src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop&crop=face",
              },
              {
                quote: "Kingdom Mandate has been a beacon of hope. Their commitment to spiritual integrity and global service is truly unmatched in this generation.",
                name: "Emma Thompson",
                designation: "International Ministry Partner",
                src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop&crop=face",
              },
            ]}
            autoplay={true}
            colors={{
              name: "#0044CC",
              designation: "#4a5568",
              testimony: "#1a202c",
              arrowBackground: "#0044CC",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "#0033aa",
              actionButtonBackground: "#ffffff",
              actionButtonForeground: "#0044CC",
            }}
            fontSizes={{
              name: "28px",
              designation: "18px",
              quote: "20px",
            }}
            actionButton={{
              label: "Submit Testimonies",
              onClick: handleSubmitTestimony,
            }}
          />
        </section>
        <GlobeFeatureSection />
      </main>
    </div>
  );
}
