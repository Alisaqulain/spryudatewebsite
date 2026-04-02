"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#corporate", label: "Corporate" },
  { href: "#retail", label: "Retail" },
  { href: "#industry", label: "Industry" },
  { href: "#about", label: "About" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const navList = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const navItem = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const navListReduced = {
  hidden: {},
  show: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

const navItemReduced = {
  hidden: { opacity: 1, x: 0 },
  show: { opacity: 1, x: 0 },
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-secondary/8 bg-white/80 shadow-soft backdrop-blur-xl"
          : "border-b border-transparent bg-white/50 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex min-h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:min-h-[5rem] sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative flex shrink-0 items-center transition-opacity hover:opacity-90 active:scale-[0.99]"
        >
          <Image
            src="/images/logo.png"
            alt="SPRY Insurance Brokers Pvt. Ltd."
            width={280}
            height={84}
            className="h-12 w-auto sm:h-16 md:h-[4.25rem]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-secondary/75 transition-all hover:bg-primary/10 hover:text-secondary xl:px-3.5"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="rounded-xl px-6">
              <Link href="#contact">Get Consultation</Link>
            </Button>
          </motion.div>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-secondary/10 bg-white/90 text-secondary shadow-sm active:scale-95 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-secondary/8 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              variants={reduce ? navListReduced : navList}
              initial="hidden"
              animate="show"
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
            >
              {links.map((l) => (
                <motion.div key={l.href} variants={reduce ? navItemReduced : navItem}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3.5 text-base font-medium text-secondary/90 transition-colors active:bg-primary/15"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={reduce ? navItemReduced : navItem}
                className="pt-1"
              >
                <Button asChild className="h-12 w-full rounded-xl text-base" size="lg">
                  <Link href="#contact" onClick={() => setOpen(false)}>
                    Get Consultation
                  </Link>
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
