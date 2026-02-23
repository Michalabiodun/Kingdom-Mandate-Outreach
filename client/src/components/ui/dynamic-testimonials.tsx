"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TestimonialCard } from "@/components/ui/testimonial-card";

interface DynamicTestimonialsProps {
  title: string;
  description: string;
  className?: string;
}

export function DynamicTestimonials({
  title,
  description,
  className
}: DynamicTestimonialsProps) {
  const formattedTestimonials = [
    {
      author: {
        name: "Faith Johnson",
        handle: "Community Leader",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop&crop=face"
      },
      text: "The mentorship and teaching here transformed my leadership and daily walk with God.",
      href: "#"
    },
    {
      author: {
        name: "Daniel Okafor",
        handle: "Campus Director",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&crop=face"
      },
      text: "I found clarity in purpose and practical tools to lead my community with excellence.",
      href: "#"
    },
    {
      author: {
        name: "Grace Mensah",
        handle: "Prayer Coordinator",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face"
      },
      text: "The community is warm, the teachings are deep, and the impact is undeniable.",
      href: "#"
    },
    {
      author: {
        name: "Samuel Adeyemi",
        handle: "Youth Pastor",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop&crop=face"
      },
      text: "Every session strengthens my faith and equips me to serve with confidence.",
      href: "#"
    },
    {
      author: {
        name: "Ruth Abiola",
        handle: "Outreach Volunteer",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&crop=face"
      },
      text: "I feel supported and empowered to fulfill my calling in every sphere.",
      href: "#"
    },
    {
      author: {
        name: "Michael Osei",
        handle: "Ministry Partner",
        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&h=800&fit=crop&crop=face"
      },
      text: "Kingdom Mandate has been a steady source of wisdom and encouragement.",
      href: "#"
    }
  ];

  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-12 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee-reverse flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                formattedTestimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  );
}
