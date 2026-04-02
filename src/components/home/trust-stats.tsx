"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Calendar, Users, UserCheck } from "lucide-react";
import { MotionSection } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

const stats = [
  {
    value: 20,
    suffix: "+",
    label: "Years Experience",
    sub: "Deep market expertise",
    icon: Calendar,
  },
  {
    value: 500,
    suffix: "+",
    label: "Team",
    sub: "Specialists on deck",
    icon: Users,
  },
  {
    value: 5000,
    suffix: "+",
    label: "Clients",
    sub: "Trusted relationships",
    icon: UserCheck,
  },
];

function AnimatedNumber({
  value,
  suffix,
  play,
}: {
  value: number;
  suffix: string;
  play: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!play) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [play, value]);

  return (
    <span className="font-display text-4xl font-bold tabular-nums tracking-tight text-secondary sm:text-5xl lg:text-[3.25rem] lg:leading-none">
      {display}
      <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
        {suffix}
      </span>
    </span>
  );
}

function StatCard({
  s,
  index,
}: {
  s: (typeof stats)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [landed, setLanded] = useState(false);
  const Icon = s.icon;

  useEffect(() => {
    if (!isInView || reduce) {
      if (reduce && isInView) setLanded(true);
      return;
    }
    const t = window.setTimeout(() => setLanded(true), 400 + index * 120);
    return () => window.clearTimeout(t);
  }, [isInView, index, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <motion.div
        whileHover={
          reduce
            ? undefined
            : {
                scale: 1.05,
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 22 },
              }
        }
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-secondary/[0.08] bg-white/70 p-8 text-center shadow-[0_4px_24px_-8px_rgba(47,47,47,0.08)] backdrop-blur-xl",
          "bg-gradient-to-b from-white via-white to-surface/90",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/[0.06] before:via-transparent before:to-emerald-500/[0.04] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
          "hover:border-primary/25 hover:shadow-[0_24px_56px_-16px_rgba(109,190,69,0.22),0_0_0_1px_rgba(109,190,69,0.08)]"
        )}
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/18 to-primary/5 text-primary shadow-inner ring-1 ring-primary/12 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-7 w-7" strokeWidth={1.6} />
        </div>

        <div className="relative mt-6 flex flex-1 flex-col items-center">
          <AnimatedNumber
            value={s.value}
            suffix={s.suffix}
            play={landed}
          />
          <p className="mt-3 font-display text-lg font-bold tracking-tight text-secondary">
            {s.label}
          </p>
          <p className="mt-1.5 max-w-[14rem] text-sm leading-relaxed text-secondary/55">
            {s.sub}
          </p>
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-0 left-4 right-4 h-px origin-center bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: landed ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

export function TrustStats() {
  const reduce = useReducedMotion();

  return (
    <MotionSection
      id="about"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#f6f8f6] to-surface py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        <motion.div
          className="absolute right-0 top-1/4 h-[380px] w-[380px] translate-x-1/4 rounded-full bg-primary/[0.07] blur-3xl"
          animate={
            reduce
              ? undefined
              : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.05, 1] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[320px] w-[320px] -translate-x-1/3 translate-y-1/4 rounded-full bg-emerald-400/[0.08] blur-3xl"
          animate={
            reduce
              ? undefined
              : { y: [0, -16, 0], opacity: [0.4, 0.7, 0.4] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Why teams choose SPRY
          </p>
          <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-[-0.03em] text-secondary sm:mt-5 sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            Numbers that sit behind{" "}
            <span className="bg-gradient-to-r from-[#4a9e32] via-primary to-emerald-600 bg-clip-text text-transparent">
              every mandate
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-secondary/60 sm:mt-5 sm:text-base">
            Experience and reach—so your program gets disciplined placement,
            renewal rigor, and claims support that stays accountable.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-2xl"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-secondary/15 to-transparent" />
        </motion.div>

        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <StatCard key={s.label} s={s} index={i} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
