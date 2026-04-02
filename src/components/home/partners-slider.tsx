"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FadeIn, MotionSection } from "@/components/motion/fade-in";

const partnerLogos = [
  "/images/partners/max-life.png",
  "/images/partners/oriental-insurance.png",
  "/images/partners/partner-1.png",
  "/images/partners/partner-2.png",
  "/images/partners/partner-3.png",
  "/images/partners/pnb-metlife.png",
  "/images/partners/primerica.png",
  "/images/partners/sbi-life.png",
  "/images/partners/tata-aia.png",
  "/images/partners/united-india.png",
];

const duplicated = [...partnerLogos, ...partnerLogos];

export function PartnersSlider() {
  return (
    <MotionSection className="border-y border-secondary/6 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Insurer partners
          </p>
          <h2 className="font-display mt-3 text-[1.65rem] font-bold tracking-tight text-secondary xs:text-3xl sm:text-4xl">
            Backed by leading carriers
          </h2>
          <p className="mt-4 text-sm text-secondary/65 sm:text-base">
            Placement breadth across life, general, and health—without compromising
            independence.
          </p>
        </FadeIn>
      </div>

      <FadeIn className="mt-12" delay={0.06}>
        <div className="relative mx-auto max-w-[100vw] overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2.2}
            spaceBetween={24}
            loop
            speed={700}
            allowTouchMove
            autoplay={{
              delay: 1800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              480: { slidesPerView: 3.2, spaceBetween: 28 },
              768: { slidesPerView: 4.5, spaceBetween: 32 },
              1024: { slidesPerView: 6, spaceBetween: 40 },
            }}
            className="!overflow-visible py-4"
          >
            {duplicated.map((src, i) => (
              <SwiperSlide key={`${src}-${i}`} className="!flex items-center justify-center">
                <div className="group flex h-[4.5rem] w-full items-center justify-center rounded-xl border border-secondary/8 bg-surface/80 px-3 py-2 shadow-soft transition-all duration-300 active:scale-[0.98] hover:border-primary/25 hover:shadow-glow-sm sm:h-24 sm:px-4 sm:py-3">
                  <Image
                    src={src}
                    alt="Partner insurer logo"
                    width={140}
                    height={56}
                    className="max-h-10 w-auto object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 sm:max-h-14"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </FadeIn>
    </MotionSection>
  );
}
