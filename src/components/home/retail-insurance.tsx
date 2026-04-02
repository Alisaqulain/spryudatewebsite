"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FadeIn, MotionSection } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const RETAIL_AUTO_MS = 4800;

const retail = [
  {
    id: "health",
    label: "Health Care",
    image: "/images/retail/health-care.png",
    blurb:
      "Cashless networks, wellness riders, and family floater structures—simplified.",
  },
  {
    id: "life",
    label: "Life Care",
    image: "/images/retail/life-care.png",
    blurb:
      "Term, savings-linked, and group life programs aligned to liabilities and goals.",
  },
  {
    id: "motor",
    label: "Motor Care",
    image: "/images/retail/motor-care.png",
    blurb:
      "Comprehensive and third-party covers with quick endorsements and support.",
  },
  {
    id: "travel",
    label: "Travel Care",
    image: "/images/retail/travel-care.png",
    blurb:
      "Medical, baggage, and trip disruption protection for leisure and business travel.",
  },
  {
    id: "home",
    label: "Home Insurance",
    image: "/images/retail/home-insurance.png",
    blurb:
      "Structure, contents, and allied perils—documented for faster recovery.",
  },
] as const;

type RetailItem = (typeof retail)[number];
type RetailId = RetailItem["id"];

function RetailPanel({ item }: { item: RetailItem }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
      <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-secondary/10 shadow-soft lg:aspect-[4/3]">
        <Image
          src={item.image}
          alt={item.label}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <p className="font-display text-2xl font-bold text-white sm:text-3xl">
            {item.label}
          </p>
          <p className="mt-2 max-w-md text-sm text-white/85 sm:text-base">
            {item.blurb}
          </p>
          <Button
            asChild
            className="mt-5 rounded-xl bg-white text-secondary hover:bg-white/95"
          >
            <Link href="#contact">View Plans</Link>
          </Button>
        </div>
      </div>

      <div className="hidden lg:block">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Retail desk
        </p>
        <h3 className="font-display mt-3 text-2xl font-bold text-secondary">
          Personal lines, enterprise clarity
        </h3>
        <p className="mt-4 leading-relaxed text-secondary/65">
          Categories rotate automatically—you can tap a tab or dot anytime to
          jump. We compare wordings and keep renewals painless.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-secondary/75">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Needs-based sizing—not one-size premiums
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Digital-first documentation with human review
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Claims guidance from first intimation to closure
          </li>
        </ul>
      </div>
    </div>
  );
}

export function RetailInsurance() {
  const [tab, setTab] = useState<RetailId>(retail[0].id);

  useEffect(() => {
    const ids: RetailId[] = retail.map((r) => r.id);
    const id = window.setInterval(() => {
      setTab((current) => {
        const i = ids.indexOf(current);
        return ids[(i + 1) % ids.length];
      });
    }, RETAIL_AUTO_MS);
    return () => window.clearInterval(id);
  }, []);

  const activeItem = retail.find((r) => r.id === tab) ?? retail[0];

  return (
    <MotionSection id="retail" className="bg-white py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            For you & your family
          </p>
          <h2 className="font-display mt-3 text-[1.65rem] font-bold tracking-tight text-secondary xs:text-3xl sm:text-4xl">
            Retail insurance, designed for real life
          </h2>
          <p className="mt-4 text-sm text-secondary/65 sm:text-base">
            Health Care, Life Care, Motor Care, Travel Care, and Home
            Insurance—auto-rotating with images from your{" "}
            <span className="font-medium text-secondary">public</span> folder.
            Swipe on mobile or use tabs on desktop.
          </p>
        </FadeIn>

        <FadeIn className="mt-10 hidden lg:mt-12 lg:block" delay={0.06}>
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as RetailId)}
            className="w-full"
          >
            <div className="flex justify-center overflow-x-auto pb-1">
              <TabsList className="h-auto min-h-11 flex-wrap justify-center gap-1 bg-secondary/5 p-2 sm:inline-flex">
                {retail.map((r) => (
                  <TabsTrigger
                    key={r.id}
                    value={r.id}
                    className="rounded-lg px-4 py-2 transition-all data-[state=active]:shadow-soft"
                  >
                    {r.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <RetailPanel item={activeItem} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex justify-center gap-1.5">
            {retail.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-label={`Show ${r.label}`}
                onClick={() => setTab(r.id)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  tab === r.id
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-secondary/20 hover:bg-secondary/35"
                )}
              />
            ))}
          </div>
        </FadeIn>

        <div className="mt-8 lg:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1.08}
            centeredSlides
            loop
            speed={650}
            autoplay={{
              delay: 4200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="retail-swiper !pb-10"
          >
            {retail.map((r) => (
              <SwiperSlide key={r.id}>
                <Link
                  href="#contact"
                  className="group relative block overflow-hidden rounded-2xl border border-secondary/10 shadow-soft active:scale-[0.99]"
                >
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={r.image}
                      alt={r.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/88 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-display text-xl font-bold text-white">
                        {r.label}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-white/85">
                        {r.blurb}
                      </p>
                      <span className="mt-3 inline-flex text-sm font-semibold text-primary">
                        View Plans →
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </MotionSection>
  );
}
