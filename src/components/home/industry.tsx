"use client";

import { Factory, Flame, Zap, Wheat, Box } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { FadeIn, MotionSection } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

const industries = [
  {
    name: "Power",
    icon: Zap,
    idle: "bg-gradient-to-br from-amber-500/10 to-orange-500/5",
    active: "bg-gradient-to-br from-amber-500/25 to-orange-500/18",
  },
  {
    name: "Oil & Gas",
    icon: Flame,
    idle: "bg-gradient-to-br from-sky-500/10 to-blue-600/5",
    active: "bg-gradient-to-br from-sky-500/25 to-blue-600/18",
  },
  {
    name: "Iron & Steel",
    icon: Factory,
    idle: "bg-gradient-to-br from-slate-500/10 to-zinc-600/5",
    active: "bg-gradient-to-br from-slate-500/25 to-zinc-600/18",
  },
  {
    name: "Sugar",
    icon: Wheat,
    idle: "bg-gradient-to-br from-primary/15 to-lime-500/8",
    active: "bg-gradient-to-br from-primary/30 to-lime-500/20",
  },
  {
    name: "Plywood",
    icon: Box,
    idle: "bg-gradient-to-br from-emerald-600/12 to-teal-500/8",
    active: "bg-gradient-to-br from-emerald-600/28 to-teal-500/18",
  },
];

function IndustryCard({
  ind,
  index,
}: {
  ind: (typeof industries)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const Icon = ind.icon;

  const row = Math.floor(index / 3);
  const fromBottom = row % 2 === 1;
  const zig = index % 2 === 0 ? -1 : 1;

  return (
    <motion.div
      ref={ref}
      initial={
        reduce
          ? { opacity: 0, y: 20 }
          : {
              opacity: 0,
              y: fromBottom ? 100 : -70,
              x: zig * 45,
              rotateX: fromBottom ? -18 : 12,
              rotateY: zig * 12,
              scale: 0.88,
            }
      }
      animate={
        isInView
          ? reduce
            ? { opacity: 1, y: 0 }
            : {
                opacity: 1,
                y: 0,
                x: 0,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
              }
          : false
      }
      transition={{
        type: "spring",
        stiffness: 72,
        damping: 14,
        mass: 0.85,
        delay: index * 0.07,
      }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -8,
              scale: 1.03,
              rotateX: -4,
              rotateY: zig * 4,
              transition: { type: "spring", stiffness: 400, damping: 20 },
            }
      }
      style={{ transformStyle: "preserve-3d" }}
      className="group relative"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/60 bg-white/90 p-6 text-center shadow-[0_14px_36px_-16px_rgba(47,47,47,0.12)] backdrop-blur-md transition-shadow duration-500",
          "hover:border-primary/25 hover:shadow-[0_22px_50px_-14px_rgba(109,190,69,0.2)]"
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            ind.idle
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            ind.active
          )}
        />

        <motion.div
          className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 text-primary shadow-[0_8px_24px_-8px_rgba(47,47,47,0.15)] ring-1 ring-secondary/10"
          whileHover={{ scale: 1.08, rotate: [0, -6, 6, 0] }}
          transition={{ duration: 0.45 }}
        >
          <Icon className="h-8 w-8" strokeWidth={1.55} />
        </motion.div>

        <p className="relative mt-5 font-display text-lg font-bold text-secondary">
          {ind.name}
        </p>
        <p className="relative mt-2 text-xs text-secondary/55">
          Tailored risk maps · loss prevention
        </p>

        <motion.div
          className="relative mx-auto mt-4 h-0.5 w-0 rounded-full bg-gradient-to-r from-primary to-emerald-500"
          initial={false}
          animate={isInView ? { width: "48%" } : { width: 0 }}
          transition={{
            delay: 0.25 + index * 0.06,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

export function Industry() {
  return (
    <MotionSection
      id="industry"
      className="relative overflow-hidden border-y border-secondary/6 bg-gradient-to-b from-surface via-white to-surface py-14 sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Sectors we understand
          </p>
          <h2 className="font-display mt-3 text-[1.65rem] font-bold tracking-tight text-secondary xs:text-3xl sm:text-4xl">
            Industry programs with operational context
          </h2>
          <p className="mt-4 text-sm text-secondary/65 sm:text-base">
            We speak the language of plants, supply chains, and regulatory
            exposures—so coverage matches how you actually run.
          </p>
        </FadeIn>

        <div
          className="mt-12 sm:mt-14"
          style={{ perspective: "1500px" }}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {industries.map((ind, i) => (
              <IndustryCard key={ind.name} ind={ind} index={i} />
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
