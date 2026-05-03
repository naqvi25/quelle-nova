"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Target, Globe, Zap, TrendingUp, Users, CheckCircle, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, FadeIn2, SlateBackground,
  CTABanner, SectionLabel, Stagger, StaggerItem, GlassCard, PrimaryButton,
} from "@/components/ui/shared";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { label: "Automotive & Mobility",             href: "/industries/automotive",        desc: "Seating supply chains, interior materials & vehicle platforms" },
  { label: "Defence & Aerospace",               href: "/industries/defense-aerospace",  desc: "Build-to-print manufacturing, composites, avionics & simulation" },
  { label: "Industrial Manufacturing",          href: "/industries/industrial",         desc: "Automation, panels, CNC machined parts & fabrication" },
  { label: "Mining & Mineral Processing",       href: "/industries/mining",             desc: "Equipment, drilling tools & environmental control" },
  { label: "Electronics & Electrical",          href: "/industries/electronics",        desc: "Sensors, power distribution, switchgear & appliances" },
  { label: "Oil & Gas",                         href: "/industries/oil-gas",            desc: "Fittings, piping, valves, steam systems & power generation" },
  { label: "Drones & UAV Components",           href: "/industries/drones",             desc: "Propulsion, avionics, platforms & systems engineering" },
  { label: "Apparel & Footwear",                href: "/industries/apparel-footwear",   desc: "OEM, private label & export manufacturing" },
  { label: "Hunting & Outdoor",                 href: "/industries/hunting-outdoor",    desc: "Tactical gear, decoys, ropes & protective clothing" },
  { label: "Chemicals & Commodities",           href: "/industries/chemicals",          desc: "Fragrance, nutraceuticals, industrial amines & metals" },
  { label: "Hand Tools & Precision Instruments",href: "/industries/hand-tools",         desc: "Workshop tools, automotive tools & measuring instruments" },
];

const VALUES = [
  { icon: Shield,      title: "Integrity",              desc: "We operate with full transparency — on pricing, supplier capability, and sourcing realities. No hidden margins, no inflated claims." },
  { icon: Target,      title: "Precision",              desc: "Every engagement is driven by technical accuracy. We match buyers with manufacturers based on verified capability, not just availability." },
  { icon: Zap,         title: "Agility",                desc: "Complex supply chains demand speed. We move fast, communicate clearly, and cut through multi-tier procurement complexity." },
  { icon: Globe,       title: "Global Perspective",     desc: "With sourcing partnerships spanning major manufacturing hubs worldwide, we bridge regulatory, cultural and logistical barriers." },
  { icon: Users,       title: "Partnership",            desc: "We invest in long-term relationships, not single transactions. Our success is defined by the outcomes we create for clients." },
  { icon: TrendingUp,  title: "Continuous Improvement", desc: "Our supplier qualification standards, market intelligence, and sourcing methodologies are continuously refined through execution." },
];

const WHAT_WE_DO = [
  { title: "Verified Sourcing",           desc: "We identify, evaluate and connect buyers with reliable manufacturers — vetted for quality systems, process capability, traceability and export readiness." },
  { title: "Technical Alignment",         desc: "We translate buyer specifications into precise supplier requirements, ensuring material grades, tolerances, certifications and compliance are matched exactly." },
  { title: "Financial Advisory",          desc: "End-to-end financial support — strategic planning, capital structure advisory, M&A support and performance optimisation tailored to your growth stage." },
  { title: "Business Growth Services",   desc: "Market entry strategy, go-to-market planning, sales and partnership development, and scalable business model design for sustainable growth." },
];

const OFFICES = [
  { city: "New Delhi", flag: "🇮🇳", role: "Global Headquarters",  detail: "India Operations" },
  { city: "Dubai",     flag: "🇦🇪", role: "Middle East & Africa",  detail: "MEA Hub" },
  { city: "Singapore", flag: "🇸🇬", role: "Asia-Pacific",          detail: "APAC Sourcing" },
  { city: "Frankfurt", flag: "🇩🇪", role: "European Operations",   detail: "EU Market" },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY     = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden pt-20">
        <motion.div className="absolute inset-0 z-0 scale-110" style={{ y: bgY }}>
          <img
            src="/images/pexels-yankrukov-7793692.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/85 to-[#020202]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/60" />
        </motion.div>
        <div className="absolute inset-0 scanlines pointer-events-none z-[1]" />

        <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <FadeIn2 delay={0.05}>
            <p className="text-zinc-500 text-sm mb-6 tracking-widest uppercase font-mono">
              <Link href="/" className="text-blue-500 hover:text-blue-400 transition-colors">Home</Link>
              {" / "}<span className="text-zinc-400">About Us</span>
            </p>
          </FadeIn2>
          <FadeIn2 delay={0.15}>
            <motion.div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-8" whileHover={{ scale: 1.02 }}>
              <span className="relative flex h-2 w-2">
                <motion.span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }} transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Who We Are</span>
            </motion.div>
          </FadeIn2>
          <FadeIn2 delay={0.25}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.04] max-w-4xl">
              The Intelligence Behind{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Complex Sourcing
              </span>
            </h1>
          </FadeIn2>
          <FadeIn2 delay={0.35}>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              A specialised B2B sourcing platform enabling OEMs, EPCs, integrators and distributors to identify, evaluate and engage with reliable manufacturers across critical global industries.
            </p>
          </FadeIn2>
        </motion.div>
      </section>

      {/* ── What We Are ───────────────────────────────────── */}
      <section className="relative py-24 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Our Platform" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Specialists in Complex{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Industrial Supply Chains
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                Quelle Nova is a specialised B2B sourcing platform enabling OEMs, EPC contractors, system integrators and distributors to identify and engage with verified manufacturers across critical industries.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                From materials and sub-assemblies to fully engineered systems, we support end-to-end procurement with technical alignment, export readiness and supplier verification — across eleven industries and all major global manufacturing regions.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Alongside our sourcing platform, we offer Financial Advisory and Business Growth Services — delivering strategic and operational support that goes well beyond connecting buyers to manufacturers.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="space-y-4">
                {WHAT_WE_DO.map(({ title, desc }) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(59,130,246,0.3)" }}
                      className="flex gap-5 p-5 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-bold text-sm mb-1.5 group-hover:text-blue-300 transition-colors">{title}</div>
                        <div className="text-zinc-500 text-sm leading-relaxed">{desc}</div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ───────────────────────────── */}
      <section className="relative py-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-14">
            <SectionLabel text="Industry Coverage" />
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Eleven Industries. One Network.
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
              Our supplier network spans all critical industrial sectors — with domain expertise, verified manufacturers and sourcing capability in each.
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <StaggerItem key={ind.label}>
                <Link href={ind.href}>
                  <motion.div
                    whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.3)" }}
                    className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.01] transition-all group cursor-pointer h-full"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono text-blue-500 group-hover:border-blue-400/50 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm mb-1 group-hover:text-blue-300 transition-colors leading-snug">{ind.label}</div>
                      <div className="text-zinc-500 text-xs leading-relaxed">{ind.desc}</div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn delay={0.2} className="mt-8 text-center">
            <Link href="/industries">
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 text-sm font-semibold hover:bg-white/[0.08] hover:text-white transition-all"
              >
                Explore All Industries <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Why Source Through Us ─────────────────────────── */}
      <section className="relative py-24 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <SectionLabel text="Why Quelle Nova" />
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                What Makes Our Sourcing Different
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                Unlike general procurement platforms, we combine deep technical domain knowledge with active supplier relationship management — ensuring every manufacturer we recommend can actually deliver to your specification.
              </p>
              <Stagger className="space-y-4">
                {[
                  ["Verified, Capability-Mapped Manufacturers",   "Every supplier passes a 5-stage vetting process before engagement."],
                  ["Industry-Specific Sourcing Expertise",        "Deep domain knowledge in each vertical — not a generic database."],
                  ["Technical Alignment Support",                  "We translate buyer specs into precise supplier requirements."],
                  ["Export-Ready Suppliers with Certifications",  "Compliance documentation reviewed before recommending suppliers."],
                  ["Single Platform for Multi-Industry Sourcing", "11 industries, one sourcing relationship — from components to systems."],
                ].map(([title, desc]) => (
                  <StaggerItem key={title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold text-sm">{title} — </span>
                      <span className="text-zinc-400 text-sm">{desc}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="relative rounded-2xl overflow-hidden h-[500px]">
                <motion.img
                  src="/images/pexels-towfiqu-barbhuiya-3440682-11412596.jpg"
                  alt="Manufacturing"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/80 via-transparent to-transparent" />
                <motion.div
                  className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#020202]/80 backdrop-blur-xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-white font-semibold text-sm">Verified Sourcing Platform</span>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Every manufacturer passes a rigorous multi-stage qualification — quality systems, process capability, traceability and export compliance verified before engagement.
                  </p>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Our Values ────────────────────────────────────── */}
      <section className="relative py-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-14 text-center">
            <SectionLabel text="Our Values" />
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-2">What We Stand For</h2>
            <p className="text-zinc-400 mt-4 text-lg max-w-xl mx-auto">
              The principles that guide every sourcing engagement and every supplier relationship we manage.
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <StaggerItem key={val.title}>
                  <GlassCard>
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5"
                      whileHover={{ rotate: 8, scale: 1.1 }}
                    >
                      <Icon className="w-6 h-6 text-blue-400" />
                    </motion.div>
                    <h3 className="text-white font-bold text-xl mb-3">{val.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">{val.desc}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ── Advisory Services ─────────────────────────────── */}
      <section className="relative py-24 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-14">
            <SectionLabel text="Beyond Sourcing" />
            <h2 className="text-4xl font-bold text-white mt-2">Strategic Advisory Services</h2>
            <p className="text-zinc-400 mt-4 text-lg max-w-xl mx-auto">
              Alongside our sourcing platform, we provide financial advisory and business growth services for clients at every stage.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                title:  "Financial Advisory",
                href:   "/services/financial",
                accent: "purple",
                items:  [
                  "Strategic financial planning & capital structure advisory",
                  "Budgeting, forecasting & cash flow management",
                  "Scenario analysis & financial modelling",
                  "M&A support — due diligence, valuation & deal structuring",
                  "Performance, cost optimisation & risk management",
                ],
              },
              {
                title:  "Business Growth Services",
                href:   "/services/growth",
                accent: "blue",
                items:  [
                  "Market entry strategy & opportunity assessment",
                  "Go-to-market planning & revenue model design",
                  "Sales strategy, channel & partnership development",
                  "Business process mapping & KPI framework design",
                  "Scalable business model evaluation & refinement",
                ],
              },
            ].map((svc) => (
              <FadeIn key={svc.title}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className={`h-full p-8 rounded-2xl border bg-white/[0.01] transition-all ${
                    svc.accent === "purple"
                      ? "border-purple-500/15 hover:border-purple-400/30"
                      : "border-blue-500/15 hover:border-blue-400/30"
                  }`}
                >
                  <h3 className={`text-2xl font-bold mb-6 ${svc.accent === "purple" ? "text-purple-300" : "text-blue-300"}`}>
                    {svc.title}
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed">
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${svc.accent === "purple" ? "text-purple-400" : "text-blue-400"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={svc.href}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                        svc.accent === "purple" ? "text-purple-400 hover:text-purple-300" : "text-blue-400 hover:text-blue-300"
                      }`}
                    >
                      Learn More <ArrowRight size={14} />
                    </motion.button>
                  </Link>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      <CTABanner
        title="Partner With Quelle Nova"
        subtitle="Share your sourcing requirement and get connected to qualified suppliers aligned with your technical, commercial and compliance needs."
      />
      <Footer />
    </main>
  );
}
