"use client";

import { Plane, Handshake, Landmark, Sprout, FileCheck } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { FadeIn, MotionSection } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Direct Broking",
    description:
      "Independent placement across insurers with transparent comparisons and negotiated terms.",
    icon: Handshake,
  },
  {
    title: "Claims Management",
    description:
      "Structured intake, documentation, and advocacy to accelerate fair settlements.",
    icon: FileCheck,
  },
  {
    title: "Lenders Advisory",
    description:
      "Collateral-aligned covers, covenant checks, and portfolio monitoring for lenders.",
    icon: Landmark,
  },
  {
    title: "Rural Insurance",
    description:
      "Schemes tailored for agri and rural enterprises with last-mile servicing awareness.",
    icon: Sprout,
  },
  {
    title: "Aviation Insurance",
    description:
      "Hull, liability, and operational risk programs for operators and allied services.",
    icon: Plane,
  },
];

function ServiceCard({
  s,
  index,
}: {
  s: (typeof services)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const Icon = s.icon;

  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={
        reduce
          ? { opacity: 0, y: 24 }
          : {
              opacity: 0,
              y: 72,
              rotateX: 14,
              x: fromLeft ? -50 : 50,
              scale: 0.92,
            }
      }
      animate={
        isInView
          ? reduce
            ? { opacity: 1, y: 0 }
            : {
                opacity: 1,
                y: 0,
                rotateX: 0,
                x: 0,
                scale: 1,
              }
          : false
      }
      transition={{
        type: "spring",
        stiffness: 65,
        damping: 15,
        mass: 0.9,
        delay: index * 0.08,
      }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -10,
              rotateX: -5,
              z: 24,
              transition: { type: "spring", stiffness: 380, damping: 20 },
            }
      }
      style={{ transformStyle: "preserve-3d" }}
      className="h-full"
    >
      <div
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-white/95 via-white to-surface/80 p-6 shadow-[0_16px_40px_-20px_rgba(47,47,47,0.14)] backdrop-blur-sm transition-shadow duration-500",
          "hover:border-primary/20 hover:shadow-[0_28px_56px_-20px_rgba(109,190,69,0.18)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-emerald-500/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-90" />

        <motion.div
          className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/18 to-primary/6 text-primary shadow-inner ring-1 ring-primary/15"
          whileHover={{ scale: 1.06, rotate: -8 }}
          transition={{ type: "spring", stiffness: 420, damping: 16 }}
        >
          <Icon className="h-7 w-7" strokeWidth={1.65} />
        </motion.div>

        <h3 className="relative font-display text-lg font-bold tracking-tight text-secondary">
          {s.title}
        </h3>
        <p className="relative mt-2 flex-1 text-[15px] leading-relaxed text-secondary/65">
          {s.description}
        </p>

        <div className="relative mt-5 h-px w-full overflow-hidden rounded-full bg-secondary/10">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "100%" } : { x: "-100%" }}
            transition={{
              duration: 1.2,
              delay: 0.35 + index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const reduce = useReducedMotion();

  return (
    <MotionSection
      id="services-offerings"
      className="relative overflow-hidden bg-surface py-14 sm:py-24"
    >
      <motion.div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        animate={
          reduce
            ? undefined
            : { opacity: [0.45, 0.8, 0.45], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Core offerings
          </p>
          <h2 className="font-display mt-3 text-[1.65rem] font-bold tracking-tight text-secondary xs:text-3xl sm:text-4xl">
            Corporate-grade broking, delivered like a product team
          </h2>
          <p className="mt-4 text-sm text-secondary/65 sm:text-base">
            From program structuring to renewals and claims—one accountable
            partner across lines.
          </p>
        </FadeIn>

        <div
          className="mt-12 sm:mt-14"
          style={{ perspective: reduce ? undefined : "1400px" }}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
