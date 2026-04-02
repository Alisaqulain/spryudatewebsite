import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

const company = [
  { href: "#about", label: "About Us" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const services = [
  { href: "#corporate", label: "Corporate Broking" },
  { href: "#retail", label: "Retail Insurance" },
  { href: "#industry", label: "Industry Programs" },
  { href: "#corporate", label: "Claims Support" },
];

const social = [
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-secondary text-white/90"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/images/logo.png"
              alt="SPRY Insurance Brokers Pvt. Ltd."
              width={320}
              height={96}
              className="h-14 w-auto opacity-95 sm:h-16 md:h-[4.25rem]"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              SPRY Insurance Brokers Pvt. Ltd. — independent advisory across
              life, general, and health lines with a claims-first service model.
            </p>
            <div className="mt-6 flex gap-3">
              {social.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 transition-colors hover:border-primary/50 hover:bg-white/5 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Company
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {company.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Services
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {services.map((s) => (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Contact
              </p>
              <ul className="mt-4 space-y-4 text-sm text-white/70">
                <li className="flex gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    Corporate Office, India
                    <br />
                    <span className="text-white/50">
                      (Replace with your address)
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a href="tel:+911800000000" className="hover:text-white">
                    +91 1800 000 0000
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <a
                    href="mailto:hello@spryinsurance.com"
                    className="hover:text-white"
                  >
                    hello@spryinsurance.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SPRY Insurance Brokers Pvt. Ltd. All
            rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="hover:text-white/70">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white/70">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-white/70">
              IRDAI Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
