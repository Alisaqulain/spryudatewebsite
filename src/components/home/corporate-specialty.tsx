"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileSearch,
  Headphones,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

const features = [
  "Multi-insurer quotes",
  "Renewal playbooks",
  "Loss control",
  "Risk register mapped to policies",
] as const;

const floatCards = [
  {
    title: "Multi Insurer Quotes",
    sub: "Compare & place",
    icon: Layers,
    className:
      "left-0 top-[8%] sm:top-[12%] w-[min(100%,240px)]",
    delay: 0,
  },
  {
    title: "Risk Analysis",
    sub: "Mapped to coverages",
    icon: BarChart3,
    className:
      "right-0 top-[38%] w-[min(100%,220px)] sm:w-[min(100%,260px)]",
    delay: 0.15,
  },
  {
    title: "Claims Support",
    sub: "Advocacy & follow-through",
    icon: Headphones,
    className:
      "left-[4%] bottom-[6%] sm:left-[8%] w-[min(100%,240px)]",
    delay: 0.3,
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function FloatingCard({
  title,
  sub,
  icon: Icon,
  className,
  delay,
}: {
  title: string;
  sub: string;
  icon: typeof Layers;
  className: string;
  delay: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("absolute z-10", className)}
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : { y: [0, -10, 0] }
        }
        transition={{
          duration: 5 + delay * 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={reduce ? undefined : { scale: 1.03, y: -4 }}
        className={cn(
          "rounded-2xl border border-white/70 bg-white/65 p-4 shadow-[0_20px_50px_-20px_rgba(47,47,47,0.12),0_0_0_1px_rgba(109,190,69,0.06)] backdrop-blur-xl",
          "ring-1 ring-secondary/[0.04] transition-shadow duration-300 hover:shadow-[0_28px_60px_-18px_rgba(109,190,69,0.2)]"
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/15">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="font-display text-sm font-bold tracking-tight text-secondary">
              {title}
            </p>
            <p className="mt-0.5 text-xs text-secondary/55">{sub}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CorporateSpecialty() {
  const reduce = useReducedMotion();
  const rightRef = useRef<HTMLDivElement>(null);
  const rightInView = useInView(rightRef, { once: true, margin: "-80px" });

  return (
    <MotionSection
      id="corporate"
      className="relative overflow-hidden bg-[#fafbf9] py-20 sm:py-24 lg:py-28"
    >
      {/* Abstract blobs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl"
          animate={
            reduce
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full bg-gradient-to-tl from-emerald-400/15 via-primary/10 to-transparent blur-3xl"
          animate={
            reduce
              ? undefined
              : { y: [0, 20, 0], opacity: [0.4, 0.65, 0.4] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left column */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-xl lg:max-w-none"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Corporate programs
              </span>
            </motion.div>

            <motion.h2
              variants={item}
              className="font-display mt-5 text-balance text-3xl font-bold tracking-[-0.03em] text-secondary sm:mt-6 sm:text-4xl lg:text-5xl xl:text-[3.25rem] xl:leading-[1.08]"
            >
              Corporate &{" "}
              <span className="bg-gradient-to-r from-[#4a9e32] via-primary to-emerald-500 bg-clip-text text-transparent">
                Specialty Lines
              </span>
            </motion.h2>

            <motion.p
              variants={item}
              className="font-display mt-4 text-lg font-semibold tracking-tight text-secondary/85 sm:text-xl"
            >
              Programs shaped around your operations
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-lg text-[15px] leading-relaxed text-secondary/65 sm:text-base sm:leading-relaxed"
            >
              From property and liability to industry-specific wordings—we
              structure limits, sub-limits, and endorsements so coverage follows
              your contracts, locations, and risk appetite with clarity.
            </motion.p>

            <motion.ul
              variants={item}
              className="mt-8 grid gap-3 sm:mt-10 sm:max-w-md sm:gap-3.5"
            >
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 rounded-xl border border-secondary/[0.06] bg-white/60 px-3.5 py-2.5 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/20 hover:bg-white/90"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm font-medium text-secondary/90 sm:text-[15px]">
                    {f}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-2xl bg-primary px-8 text-base font-semibold text-secondary shadow-[0_12px_40px_-12px_rgba(109,190,69,0.45)] transition-all hover:bg-primary/92 hover:shadow-[0_16px_48px_-12px_rgba(109,190,69,0.5)]"
              >
                <Link href="#contact" className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-2xl border-2 border-secondary/10 bg-white/80 px-8 text-base font-semibold text-secondary shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-white"
              >
                <Link href="#services-offerings">Explore Plans</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column — floating glass stack */}
          <div
            ref={rightRef}
            className="relative mx-auto aspect-[4/5] w-full max-w-md lg:mx-0 lg:max-w-none lg:aspect-auto lg:min-h-[520px]"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/40 via-white/20 to-primary/[0.06] ring-1 ring-secondary/[0.06]" />

            <motion.div
              initial={false}
              animate={
                rightInView && !reduce
                  ? { opacity: [0.15, 0.28, 0.15], scale: [1, 1.02, 1] }
                  : {}
              }
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
            />

            {/* Decorative frame */}
            <div className="absolute inset-4 rounded-3xl border border-dashed border-secondary/10 sm:inset-6" />

            {floatCards.map((c) => (
              <FloatingCard key={c.title} {...c} />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute left-1/2 top-1/2 z-0 hidden w-36 -translate-x-1/2 -translate-y-1/2 sm:block lg:w-44"
            >
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 to-white/80 p-4 shadow-lg backdrop-blur-md">
                <FileSearch className="mx-auto h-10 w-10 text-primary lg:h-12 lg:w-12" strokeWidth={1.25} />
                <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-wider text-secondary/50">
                  Program review
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
