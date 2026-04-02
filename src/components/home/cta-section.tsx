"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, MotionSection } from "@/components/motion/fade-in";

export function CtaSection() {
  const reduce = useReducedMotion();

  return (
    <MotionSection
      id="contact"
      className="relative isolate min-h-0 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <Image
        src="/images/bg-section-cta.svg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        unoptimized
        priority={false}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-secondary/88 to-black/85"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_120%,rgba(109,190,69,0.2),transparent_45%)]"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl"
        animate={
          reduce
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        animate={
          reduce
            ? undefined
            : { y: [0, 16, 0], opacity: [0.25, 0.45, 0.25] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Start a conversation
          </p>
          <h2 className="font-display mt-4 text-balance text-[1.85rem] font-bold tracking-tight text-white xs:text-3xl sm:text-4xl lg:text-[2.85rem] lg:leading-[1.1]">
            Get the right cover—without the runaround
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/75 sm:text-lg">
            Share your context. We will reply with a clear next step, timeline, and
            the documents we need so nothing stalls on our side.
          </p>

          <div className="mt-8 flex flex-col items-center gap-5 sm:mt-10">
            <div className="flex flex-col items-stretch gap-3 min-[480px]:flex-row min-[480px]:justify-center min-[480px]:gap-4">
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="group h-12 w-full min-w-[200px] rounded-xl border border-primary/20 bg-primary px-8 text-base font-semibold text-secondary shadow-[0_16px_48px_-12px_rgba(109,190,69,0.45)] hover:bg-primary/92 min-[480px]:w-auto"
                >
                  <Link href="#contact" className="gap-2">
                    Contact Us
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 w-full min-w-[200px] rounded-xl border-2 border-white/25 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:border-primary/40 hover:bg-white/15 min-[480px]:w-auto"
                >
                  <Link href="#corporate" className="gap-2">
                    Explore corporate
                  </Link>
                </Button>
              </motion.div>
            </div>

            <p className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/45 sm:text-sm">
              <Phone className="h-4 w-4 shrink-0 text-primary/90" aria-hidden />
              <span>Prefer a call? Mention it in your message—we will coordinate.</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </MotionSection>
  );
}
