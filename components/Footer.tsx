"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const INDUSTRIES = [
  { label: "Automotive",            href: "/industries/automotive" },
  { label: "Defence & Aerospace",   href: "/industries/defense-aerospace" },
  { label: "Industrial",            href: "/industries/industrial" },
  { label: "Mining",                href: "/industries/mining" },
  { label: "Electronics",           href: "/industries/electronics" },
  { label: "Oil & Gas",             href: "/industries/oil-gas" },
  { label: "Hunting & Outdoor",     href: "/industries/hunting-outdoor" },
  { label: "Chemicals",             href: "/industries/chemicals" },
  { label: "Apparel & Footwear",    href: "/industries/apparel-footwear" },
  { label: "Drones & Components",   href: "/industries/drones" },
  { label: "Hand Tools",            href: "/industries/hand-tools" },
  { label: "Packaging Films",       href: "/industries/packaging-films" },
];

const COMPANY = [
  { label: "About Us",           href: "/about" },
  { label: "Capabilities",       href: "/capabilities" },
  { label: "Services",           href: "/services" },
  { label: "Contact Us",         href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#020202] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(147,51,234,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            {/* Logo */}
          <Link href="/">
            <motion.img
              src="/LOGO_MAIN_QUELLENOVA@2x.png"
              alt="Quelle Nova"
              className="h-14 w-auto object-contain"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              B2B sourcing platform connecting global buyers with verified manufacturers across complex industrial supply chains.
            </p>
            <div className="space-y-2.5 text-sm text-zinc-500">
              {[
  { Icon: Mail,   text: "info@filmsfocus.com",                                                          href: "mailto:info@filmsfocus.com" },
  { Icon: Phone,  text: "+1 (443) 416-2928",                                                            href: "tel:+14434162928" },
  { Icon: MapPin, text: "7677 Canton Center Dr Baltimore, Maryland 21202",                              href: "https://www.google.com/maps/search/?api=1&query=7677+Canton+Center+Dr+Baltimore%2C+MD+21202" },
].map(({ Icon, text, href }) => (
  <a key={text} href={href} target="_blank" rel="noopener noreferrer"
    className="flex items-start gap-2 hover:text-zinc-300 transition-colors cursor-pointer"
  >
    <Icon size={13} className="text-blue-500/70 shrink-0 mt-0.5" />
    <span>{text}</span>
  </a>
))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Industries</h4>
            <ul className="space-y-2.5">
              {INDUSTRIES.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-zinc-500 hover:text-white transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    <ArrowRight
                      size={10}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-blue-500"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-2.5">
              {COMPANY.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-zinc-500 hover:text-white transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    <ArrowRight
                      size={10}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-blue-500"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Start Sourcing</h4>
            <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
              Submit your requirement and get connected to manufacturers aligned to your exact specifications.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-sm font-semibold text-white overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Submit RFQ <ArrowRight size={14} />
                </span>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} Quelle Nova. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {["Terms of Service", "Privacy Policy"].map((item) => (
              <span key={item} className="hover:text-zinc-400 transition-colors cursor-pointer">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}