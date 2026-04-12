"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const INDUSTRIES = [
  { label: "Automotive",                 href: "/industries/automotive" },
  { label: "Defence & Aerospace",        href: "/industries/defense-aerospace" },
  { label: "Apparel & Footwear",         href: "/industries/apparel-footwear" },
  { label: "Drones & Components",        href: "/industries/drones" },
  { label: "Oil & Gas",                  href: "/industries/oil-gas" },
  { label: "Industrial Manufacturing",   href: "/industries/industrial" },
  { label: "Electronics & Electrical",   href: "/industries/electronics" },
  { label: "Mining",                     href: "/industries/mining" },
  { label: "Hunting & Outdoor",          href: "/industries/hunting-outdoor" },
  { label: "Chemicals & Commodities",    href: "/industries/chemicals" },
  { label: "Hand Tools",                 href: "/industries/hand-tools" },
];

const SERVICES = [
  { label: "Financial Services",        href: "/services/financial" },
  { label: "Business Growth Services",  href: "/services/growth" },
];

const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "Industries",   href: "/industries",  dropdown: INDUSTRIES },
  { label: "Services",     href: "/services",    dropdown: SERVICES },
  { label: "Capabilities", href: "/capabilities" },
  { label: "About Us",     href: "/about" },
  { label: "Contact Us",   href: "/contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => scrollY.on("change", (v) => setIsScrolled(v > 50)), [scrollY]);
  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-black/75 backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              <div className="w-3 h-3 bg-[#020202] rounded-sm" />
            </motion.div>
            <span className="group-hover:text-blue-300 transition-colors duration-300">Quelle Nova</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-400">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(link.label)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button
                    className={`flex items-center gap-1 py-2 transition-colors hover:text-white ${
                      pathname.startsWith(link.href) && link.href !== "/" ? "text-white" : ""
                    }`}
                  >
                    {link.label}
                    <motion.div
                      animate={{ rotate: hoveredMenu === link.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={13} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {hoveredMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-[#0a0a0a]/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden ${
                          link.label === "Industries" ? "w-[520px]" : "w-52"
                        }`}
                      >
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                        <div className={`p-3 ${link.label === "Industries" ? "grid grid-cols-3 gap-1" : "flex flex-col gap-1"}`}>
                          {link.dropdown.map((item, i) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.025 }}
                            >
                              <Link
                                href={item.href}
                                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm transition-all group/item ${
                                  pathname === item.href
                                    ? "bg-blue-500/10 text-blue-400"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                }`}
                              >
                                <ArrowRight
                                  size={9}
                                  className="opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-blue-500 shrink-0"
                                />
                                {item.label}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-2 group transition-colors hover:text-white ${
                    pathname === link.href ? "text-white" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-blue-500 transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )
            )}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden lg:block">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute left-[-100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-900" />
                <span className="relative z-10">Submit RFQ</span>
              </motion.button>
            </Link>

            <button
              className="lg:hidden text-zinc-400 hover:text-white transition-colors p-1"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[60px] inset-x-0 z-30 bg-[#080808]/98 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
                      >
                        {link.label}
                        <motion.div
                          animate={{ rotate: mobileExpanded === link.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={14} className="text-zinc-500" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-0.5 overflow-hidden"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Link href="/contact">
                  <button className="relative group w-full py-3 rounded-full text-sm font-semibold text-white overflow-hidden border border-white/10 bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80" />
                    <span className="relative z-10">Submit RFQ</span>
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}