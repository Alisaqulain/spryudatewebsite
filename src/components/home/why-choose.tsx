"use client";

import Image from "next/image";
import {
  Compass,
  Headphones,
  SlidersHorizontal,
  ShieldCheck,
  LineChart,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  FadeIn,
  MotionSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Expert Guidance",
    description:
      "Senior brokers anchor every mandate—no bait-and-switch to junior desks.",
    icon: Compass,
  },
  {
    title: "Fast Claims Support",
    description:
      "Playbooks for intimation, evidence, and insurer follow-ups to reduce cycle time.",
    icon: Headphones,
  },
  {
    title: "Customized Policies",
    description:
      "Wordings and limits shaped around your contracts, locations, and risk appetite.",
    icon: SlidersHorizontal,
  },
  {
    title: "Trusted Partners",
    description:
      "Long-standing insurer relationships with disciplined placement hygiene.",
    icon: ShieldCheck,
  },
  {
    title: "Data-led Renewals",
    description:
      "Benchmarking and loss trends translated into negotiation, not noise.",
    icon: LineChart,
  },
  {
    title: "Human Service Layer",
    description:
      "A named team that answers the phone—supported by clean digital workflows.",
    icon: UsersRound,
  },
];

export function WhyChoose() {
  return (
    <MotionSection className="relative isolate min-h-0 overflow-hidden py-16 sm:py-24 lg:py-28">
      <Image
        src="/images/bg-section-why.svg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        unoptimized
        priority={false}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/78 via-secondary/85 to-[#0f1210]/95"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_75%_15%,rgba(109,190,69,0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20"
        aria-hidden
      />

      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Why choose us
          </p>
          <h2 className="font-display mt-4 text-balance text-[1.75rem] font-bold tracking-tight text-white xs:text-3xl sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
            The brokerage experience, rebuilt for clarity
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
            Less jargon, more judgment—so decisions are defensible in the boardroom
            and at home.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem key={f.title}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className={cn(
                    "group h-full rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors duration-300 sm:p-6",
                    "hover:border-primary/45 hover:bg-white/[0.11]"
                  )}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/25 text-primary ring-1 ring-primary/35 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {f.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </MotionSection>
  );
}
