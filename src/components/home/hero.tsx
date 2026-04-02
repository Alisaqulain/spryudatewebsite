"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Strict 2s per slide — progress bar + interval stay in sync */
const SLIDE_INTERVAL_MS = 2000;
const BG_TRANSITION_S = 0.48;

const heroSlides = [
  {
    image: "/images/hero-1.svg",
    imageAlt: "Insurance protection and risk visualization",
    badge: "Licensed insurance brokers",
    titleBefore: "Smart Insurance Solutions for a",
    titleAccent: "Secure Future",
    description:
      "We help businesses and families identify, quantify, and transfer risk—so you can move forward with clarity, compliance, and confidence across every policy lifecycle.",
    trustPoints: ["IRDAI-registered", "Pan-India", "Claims-first"],
    floatTitle: "Coverage mapped",
    floatSubtitle: "End-to-end broking",
  },
  {
    image: "/images/hero-2.svg",
    imageAlt: "Corporate insurance and risk programs",
    badge: "Corporate & specialty lines",
    titleBefore: "Programs shaped around",
    titleAccent: "Your Operations",
    description:
      "From property and liability to industry-specific wordings—we structure limits, sub-limits, and endorsements so coverage follows your contracts and locations.",
    trustPoints: ["Multi-insurer quotes", "Renewal playbooks", "Loss control"],
    floatTitle: "Risk register",
    floatSubtitle: "Mapped to policies",
  },
  {
    image: "/images/hero-3.svg",
    imageAlt: "Family and retail insurance planning",
    badge: "Retail & family desk",
    titleBefore: "Protection that fits",
    titleAccent: "Real Life",
    description:
      "Health, motor, travel, life, and home—clear comparisons, fair pricing, and documentation support so you buy what you need—not what you are pushed.",
    trustPoints: ["Plain-language terms", "Cashless help", "Fast endorsements"],
    floatTitle: "Personal lines",
    floatSubtitle: "Curated plans",
  },
  {
    image: "/images/hero-4.svg",
    imageAlt: "Claims support and settlement guidance",
    badge: "Claims-first mindset",
    titleBefore: "Support that moves",
    titleAccent: "When It Matters",
    description:
      "Structured intimation, evidence kits, and insurer follow-ups—so settlements are fair, traceable, and as fast as the facts allow.",
    trustPoints: ["FNOL templates", "Advocacy", "Status tracking"],
    floatTitle: "Claims desk",
    floatSubtitle: "Document to closure",
  },
] as const;

const overlayCopy = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: "blur(6px)",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

const overlayLine = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

const trustStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const trustItem = {
  hidden: { opacity: 0, y: 12, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 26 },
  },
};

function bgSlideVariants(reduceMotion: boolean) {
  return {
    initial: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            rotateY: dir > 0 ? -52 : 52,
            x: dir > 0 ? "32%" : "-32%",
            z: -160,
            scale: 0.86,
          },
    animate: {
      opacity: 1,
      rotateY: 0,
      x: 0,
      z: 0,
      scale: 1,
    },
    exit: (dir: number) =>
      reduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            rotateY: dir > 0 ? 38 : -38,
            x: dir > 0 ? "-28%" : "28%",
            z: -100,
            scale: 0.92,
          },
  };
}

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  /** Pause auto-advance only while interacting with thumbnails (not whole hero) */
  const [thumbHover, setThumbHover] = useState(false);

  const slide = heroSlides[index];
  const bgVariants = useMemo(
    () => bgSlideVariants(Boolean(reduce)),
    [reduce]
  );

  const goTo = useCallback((i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }, [index]);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % heroSlides.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (reduce || thumbHover) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce, thumbHover]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const progressPaused = Boolean(reduce) || thumbHover;

  return (
    <section className="relative isolate flex min-h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[#0a0c0a] sm:max-h-none sm:min-h-[min(100svh,880px)]">
      {/* 3D background slider */}
      <div
        className="absolute inset-0"
        style={{ perspective: reduce ? undefined : 1500 }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slide.image}
            custom={direction}
            variants={bgVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: reduce ? 0.2 : BG_TRANSITION_S,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="absolute inset-0"
            style={{
              transformStyle: reduce ? undefined : "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                className="object-cover object-[center_40%] sm:object-center"
                sizes="100vw"
                priority={index === 0}
                unoptimized
              />
            </motion.div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-secondary/40"
              aria-hidden
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Premium scrims */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/[0.88] via-black/65 to-black/35 sm:from-black/[0.82] sm:via-black/55 sm:to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_0%_50%,rgba(109,190,69,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(109,190,69,0.06)_100%)]"
        aria-hidden
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern
            id="hero-overlay-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="white"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-overlay-grid)" />
      </svg>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-y-auto overscroll-contain px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-4 lg:px-8 lg:pb-6 lg:pt-5">
        <div className="flex min-h-0 w-full flex-col gap-3 sm:gap-4 lg:gap-5">
          {/* Compact top bar: counter + progress hint + chips */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white/45 backdrop-blur-md sm:px-2.5 sm:text-[11px]">
              <span className="font-mono tabular-nums text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono tabular-nums text-white/35">
                {String(heroSlides.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 rounded-lg border border-white/12 bg-white/[0.05] px-2 py-1 backdrop-blur-md">
                <Image
                  src="/globe.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="opacity-90 invert"
                  unoptimized
                />
                <span className="hidden text-[9px] font-semibold uppercase tracking-wide text-white/75 xs:inline sm:text-[10px]">
                  Pan-India
                </span>
              </span>
              <span className="flex items-center rounded-lg border border-white/12 bg-white/[0.05] p-1 backdrop-blur-md">
                <Image
                  src="/file.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="opacity-90 invert"
                  unoptimized
                />
              </span>
            </div>
          </div>

          <div className="min-h-0 w-full max-w-none lg:max-w-[min(100%,48rem)] xl:max-w-[min(100%,52rem)]">
            {/* Segmented progress */}
            <div
              className="mb-3 flex w-full max-w-md gap-1 sm:mb-4 sm:max-w-lg sm:gap-1.5"
              role="tablist"
              aria-label="Slide progress"
            >
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "group relative h-1 min-w-0 flex-1 overflow-hidden rounded-full transition-all duration-300 sm:h-1.5",
                    i === index
                      ? "bg-white/25 ring-1 ring-primary/30"
                      : i < index
                        ? "bg-primary/50"
                        : "bg-white/10 hover:bg-white/20"
                  )}
                >
                  {i === index && (
                    <span
                      key={`fill-${index}`}
                      className={cn(
                        "absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-primary via-emerald-400 to-primary",
                        !reduce && "animate-hero-slide-progress",
                        progressPaused && "hero-slide-progress-paused"
                      )}
                      style={
                        {
                          "--hero-slide-ms": `${SLIDE_INTERVAL_MS}ms`,
                        } as CSSProperties
                      }
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-emerald-500/10 opacity-50 blur-2xl sm:-inset-3"
                aria-hidden
              />

              <div
                className="relative overflow-hidden rounded-2xl border border-white/[0.16] bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-white/[0.02] p-4 shadow-[0_24px_64px_-28px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl ring-1 ring-white/10 sm:rounded-[1.35rem] sm:p-5 md:p-6"
                style={{
                  transformStyle: reduce ? undefined : "preserve-3d",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/18 blur-2xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_0%,rgba(255,255,255,0.08),transparent_50%)]"
                  aria-hidden
                />

                <div
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent sm:inset-x-8"
                  aria-hidden
                />

                <div className="absolute right-2 top-2 z-20 hidden flex-col gap-1 md:flex">
                  <motion.button
                    type="button"
                    aria-label="Previous slide"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goPrev}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-black/25 text-white/90 backdrop-blur-md hover:border-primary/35"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    type="button"
                    aria-label="Next slide"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goNext}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-black/25 text-white/90 backdrop-blur-md hover:border-primary/35"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>

                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={overlayCopy}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="flex flex-col pr-0 md:pr-10"
                    style={{
                      transformStyle: reduce ? undefined : "preserve-3d",
                    }}
                  >
                    <motion.div
                      variants={overlayLine}
                      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex w-fit max-w-full items-center gap-2 rounded-full border border-primary/40 bg-gradient-to-r from-primary/22 to-primary/8 py-1.5 pl-2.5 pr-3 shadow-[0_0_20px_-8px_rgba(109,190,69,0.4)] backdrop-blur-md sm:py-2 sm:pl-3 sm:pr-3.5">
                        <span className="relative flex h-2 w-2 shrink-0">
                          {!reduce && (
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 opacity-50" />
                          )}
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(109,190,69,0.95)]" />
                        </span>
                        <motion.span
                          animate={
                            reduce ? undefined : { rotate: [0, 12, -10, 0] }
                          }
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="text-primary"
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white sm:text-[11px]">
                          {slide.badge}
                        </span>
                      </div>
                    </motion.div>

                    <motion.h1
                      variants={overlayLine}
                      className="font-display mt-3 text-balance text-[1.35rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-white [text-shadow:0_1px_24px_rgba(0,0,0,0.35)] xs:text-[1.5rem] sm:mt-4 sm:text-2xl sm:leading-[1.1] md:text-3xl lg:text-[1.875rem] lg:leading-[1.08] xl:text-4xl"
                    >
                      {slide.titleBefore}{" "}
                      <span
                        className={cn(
                          "bg-gradient-to-r from-emerald-200 via-primary to-lime-200 bg-clip-text text-transparent",
                          !reduce && "animate-hero-shimmer"
                        )}
                        style={{ backgroundSize: "200% auto" }}
                      >
                        {slide.titleAccent}
                      </span>
                    </motion.h1>

                    <motion.p
                      variants={overlayLine}
                      className="mt-2.5 max-w-none text-[13px] leading-relaxed text-white/85 sm:mt-3 sm:text-sm sm:leading-relaxed md:text-[15px]"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.ul
                      variants={trustStagger}
                      className="mt-3 grid grid-cols-1 gap-1.5 sm:mt-4 sm:grid-cols-3 sm:gap-2"
                    >
                      {slide.trustPoints.map((t) => (
                        <motion.li
                          key={t}
                          variants={trustItem}
                          className="list-none"
                        >
                          <span className="flex min-h-0 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-2 py-1.5 text-[11px] font-semibold leading-tight text-white/92 backdrop-blur-sm sm:gap-2 sm:px-2.5 sm:py-2 sm:text-xs">
                            <CheckCircle2
                              className="h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4"
                              strokeWidth={2.5}
                            />
                            <span className="text-balance">{t}</span>
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    <motion.div
                      variants={overlayLine}
                      className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-0.5 border-t border-white/10 pt-3 text-[11px] sm:mt-4 sm:pt-3.5 sm:text-xs"
                    >
                      <span className="font-semibold text-primary">
                        {slide.floatTitle}
                      </span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/50">{slide.floatSubtitle}</span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-3 flex shrink-0 flex-col gap-2 sm:mt-4 sm:gap-3"
            >
              <p className="text-[11px] text-white/45 sm:text-xs">
                No obligation · Same-day reply typical
              </p>
              <div className="flex w-full max-w-md flex-col gap-2 min-[420px]:max-w-lg min-[420px]:flex-row min-[420px]:gap-3">
                <motion.div
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-[420px]:flex-1"
                >
                  <Button
                    asChild
                    size="lg"
                    className="group relative h-11 w-full overflow-hidden rounded-xl border border-primary/25 bg-primary px-6 text-sm font-semibold text-secondary shadow-[0_12px_36px_-10px_rgba(109,190,69,0.5)] after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:to-white/20 after:opacity-0 after:transition-opacity hover:bg-primary/92 hover:after:opacity-100 sm:h-12 sm:rounded-2xl sm:text-base"
                  >
                    <Link href="#contact" className="relative z-10 gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:h-[1.125rem] sm:w-[1.125rem]" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-[420px]:flex-1"
                >
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-11 w-full rounded-xl border-2 border-white/30 bg-white/[0.06] px-6 text-sm font-semibold text-white backdrop-blur-md hover:border-primary/45 hover:bg-white/10 sm:h-12 sm:rounded-2xl sm:text-base"
                  >
                    <Link href="#corporate">Explore Plans</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div
            className="mt-auto flex shrink-0 flex-col items-center gap-1.5 pt-2 sm:gap-2 sm:pt-3"
            onMouseEnter={() => setThumbHover(true)}
            onMouseLeave={() => setThumbHover(false)}
            onFocusCapture={() => setThumbHover(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setThumbHover(false);
              }
            }}
          >
            <div
              className="flex justify-center gap-1.5 sm:gap-2"
              role="tablist"
              aria-label="Hero highlights"
            >
              {heroSlides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show slide ${i + 1}: ${s.imageAlt}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "relative h-9 w-9 overflow-hidden rounded-lg border-2 shadow-md backdrop-blur-md transition-all duration-300 sm:h-10 sm:w-10 sm:rounded-xl",
                    i === index
                      ? "scale-105 border-primary ring-1 ring-primary/40 ring-offset-1 ring-offset-black/50"
                      : "border-white/20 bg-white/10 opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="40px"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
