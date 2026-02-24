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
        avatar: ""
      },
      text: "The mentorship and teaching here transformed my leadership and daily walk with God.",
      href: "#"
    },
    {
      author: {
        name: "Daniel Okafor",
        handle: "Campus Director",
        avatar: ""
      },
      text: "I found clarity in purpose and practical tools to lead my community with excellence.",
      href: "#"
    },
    {
      author: {
        name: "Grace Mensah",
        handle: "Prayer Coordinator",
        avatar: ""
      },
      text: "The community is warm, the teachings are deep, and the impact is undeniable.",
      href: "#"
    },
    {
      author: {
        name: "Samuel Adeyemi",
        handle: "Youth Pastor",
        avatar: ""
      },
      text: "Every session strengthens my faith and equips me to serve with confidence.",
      href: "#"
    },
    {
      author: {
        name: "Ruth Abiola",
        handle: "Outreach Volunteer",
        avatar: ""
      },
      text: "I feel supported and empowered to fulfill my calling in every sphere.",
      href: "#"
    },
    {
      author: {
        name: "Michael Osei",
        handle: "Ministry Partner",
        avatar: ""
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
