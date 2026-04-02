"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  FadeIn,
  MotionSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

const posts = [
  {
    title: "How Insurtech Is Reshaping Claims for Mid-Market Firms",
    date: "Mar 12, 2026",
    excerpt:
      "Digital FNOL, better data hygiene, and broker-led advocacy—what actually moves the needle.",
    image: "/images/blog/insurtech-ai.png",
    href: "#blog",
  },
  {
    title: "Zero-GST Scenarios: What Policyholders Should Watch",
    date: "Feb 28, 2026",
    excerpt:
      "A plain-language look at invoicing, endorsements, and documentation when GST rules shift.",
    image: "/images/blog/zero-gst.png",
    href: "#blog",
  },
  {
    title: "Renewal Season Playbook for CFOs and Risk Teams",
    date: "Feb 14, 2026",
    excerpt:
      "Benchmarks, retention strategies, and how to align insurance spend with capital plans.",
    image: "/images/hero-2.png",
    href: "#blog",
  },
];

export function BlogSection() {
  return (
    <MotionSection id="blog" className="bg-surface py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Insights
            </p>
            <h2 className="font-display mt-3 text-[1.65rem] font-bold tracking-tight text-secondary xs:text-3xl sm:text-4xl">
              Practical notes from our broking desk
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-11 w-full rounded-xl sm:h-10 sm:w-fit"
          >
            <Link href="#blog">View all articles</Link>
          </Button>
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.title}>
              <motion.article
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-secondary/8 bg-white shadow-soft transition-shadow hover:border-primary/25 hover:shadow-glow-sm"
              >
                <Link href={post.href} className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <time
                    dateTime={post.date}
                    className="text-xs font-semibold uppercase tracking-wide text-primary"
                  >
                    {post.date}
                  </time>
                  <h3 className="font-display mt-3 text-lg font-bold leading-snug text-secondary group-hover:text-primary transition-colors">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary/65">
                    {post.excerpt}
                  </p>
                  <Button
                    asChild
                    variant="ghost"
                    className="mt-4 w-fit gap-1 px-0 text-primary hover:bg-transparent hover:text-primary/80"
                  >
                    <Link href={post.href}>
                      Read more
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </MotionSection>
  );
}
