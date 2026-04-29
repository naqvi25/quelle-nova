"use client";

import { useState, useEffect, useRef } from "react";
import {
  BarChart2, TrendingUp, Globe, Users, Settings,
  Target, Shield, Building2, Link2, Layers,
  ArrowRight, CheckCircle, ChevronRight, ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, FadeIn2, SlateBackground,
  CTABanner, SectionLabel, PrimaryButton,
} from "@/components/ui/shared";
import {FINANCIAL_ADVISORY} from "@/lib/images/base64";
import {CORPORATE_ADVISORY} from "@/lib/images/base64";
import {DEEP_TECH_COMMERCIALIZATION} from "@/lib/images/base64";



// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 30, stiffness: 120 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(to);
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [inView]);

  return (
    <span ref={ref}>{prefix}{display}{suffix}</span>
  );
}

// ─── ANIMATED SVG GROWTH CHART ────────────────────────────────────────────────

function GrowthChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Points: (x%, y%) — 0,0 = bottom-left
  const dataPoints = [
    [0, 20], [12, 18], [22, 28], [30, 24], [40, 42],
    [50, 38], [60, 55], [70, 62], [82, 74], [92, 82], [100, 90],
  ];

  const W = 600, H = 220;
  const toSVG = ([px, py]: number[]) => [px / 100 * W, H - (py / 100 * H)] as [number, number];
  const svgPts = dataPoints.map(toSVG);

  const linePath = svgPts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;

  // Smooth cubic bezier path
  const smoothPath = svgPts.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = arr[i - 1];
    const cp1x = px + (x - px) * 0.45;
    const cp2x = x - (x - px) * 0.45;
    return `${acc} C ${cp1x} ${py}, ${cp2x} ${y}, ${x} ${y}`;
  }, "");

  const smoothAreaPath = `${smoothPath} L ${W} ${H} L 0 ${H} Z`;

  const labels = ["Q1", "Q2", "Q3", "Q4", "Y1", "Y2", "Y3"];
  const yLabels = ["0%", "25%", "50%", "75%", "100%"];

  return (
    <div ref={ref} className="relative w-full">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between items-end pr-2 pointer-events-none">
        {[...yLabels].reverse().map((l) => (
          <span key={l} className="text-zinc-600 text-[10px] font-mono">{l}</span>
        ))}
      </div>

      <div className="ml-10">
        <svg viewBox={`0 0 ${W} ${H + 10}`} className="w-full overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <clipPath id="chartClip">
              <motion.rect
                x="0" y="0" height={H + 10}
                initial={{ width: 0 }}
                animate={inView ? { width: W } : { width: 0 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </clipPath>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((frac) => (
            <line key={frac} x1={0} y1={H * (1 - frac)} x2={W} y2={H * (1 - frac)}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4,4"
            />
          ))}

          {/* Area fill */}
          <motion.path d={smoothAreaPath} fill="url(#chartGradient)" clipPath="url(#chartClip)" />

          {/* Line */}
          <motion.path d={smoothPath} fill="none" stroke="#7c3aed" strokeWidth="2.5"
            clipPath="url(#chartClip)" filter="url(#glow)"
          />

          {/* Dots */}
          {svgPts.map(([x, y], i) => (
            <motion.circle key={i} cx={x} cy={y} r={4} fill="#7c3aed"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
              clipPath="url(#chartClip)"
            />
          ))}

          {/* Final point highlight */}
          <motion.circle cx={svgPts[svgPts.length - 1][0]} cy={svgPts[svgPts.length - 1][1]}
            r={8} fill="none" stroke="#7c3aed" strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: [0, 0.6, 0.2, 0.6], scale: [0, 1.5, 1, 1.5] } : {}}
            transition={{ delay: 2.2, duration: 1.5, repeat: Infinity }}
          />
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-1">
          {labels.map((l) => (
            <span key={l} className="text-zinc-600 text-[10px] font-mono">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BAR CHART ────────────────────────────────────────────────────────────────

function BarChart({ data }: { data: { label: string; before: number; after: number; color: string }[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-4">
      {data.map(({ label, before, after, color }, i) => (
        <div key={label}>
          <div className="flex justify-between mb-1.5">
            <span className="text-zinc-400 text-xs font-medium">{label}</span>
            <span className={`text-xs font-bold ${color}`}>+{after - before}%</span>
          </div>
          <div className="relative h-5 bg-white/[0.04] rounded-full overflow-hidden">
            {/* Before bar */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-white/10 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: `${before}%` } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* After bar */}
            <motion.div
              className={`absolute left-0 top-0 h-full rounded-full ${
                color.replace("text-", "bg-").replace("-400", "-500")
              } opacity-75`}
              initial={{ width: 0 }}
              animate={inView ? { width: `${after}%` } : {}}
              transition={{ delay: 0.6 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-zinc-700 text-[10px]">Before: {before}%</span>
            <span className="text-zinc-500 text-[10px]">After: {after}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const HERO_TRACKS = [
  {
    id: "financial", label: "Financial Advisory", color: "purple", icon: BarChart2,
    tagline: "Strategic financial planning & performance optimisation",
    services: [
      { icon: BarChart2,  name: "Financial Advisory & Planning" },
      { icon: TrendingUp, name: "Performance & Cost Optimisation" },
    ],
  },
  {
    id: "growth", label: "Business Growth", color: "blue", icon: TrendingUp,
    tagline: "Technology commercialization, market entry & investor readiness",
    services: [
      { icon: Globe,    name: "Commercialization Strategy" },
      { icon: Users,    name: "Customer Discovery & Validation" },
      { icon: Settings, name: "Investor Readiness & Funding" },
    ],
  },
  {
    id: "corporate", label: "Corporate Advisory", color: "amber", icon: Building2,
    tagline: "M&A, deal structuring & cross-border investment",
    services: [
      { icon: Building2, name: "Investment Banking" },
      { icon: Link2,     name: "Mergers & Acquisitions" },
      { icon: Layers,    name: "Deal Structuring" },
      { icon: Globe,     name: "Cross-Border Investments" },
    ],
  },
];

const FINANCIAL_PILLARS = [
  {
    icon: BarChart2, title: "Financial Advisory & Planning",
    desc: "Holistic financial planning aligned with your business objectives, capital structure and funding stage.",
    items: ["Strategic financial planning aligned with business objectives","Budgeting, forecasting & cash flow management","Capital structure and funding advisory","Scenario analysis and financial modelling"],
  },
  {
    icon: TrendingUp, title: "Performance & Cost Optimisation",
    desc: "Margin improvement, working capital efficiency and financial risk management for sustained profitability.",
    items: ["Profitability and margin analysis","Cost structure review and optimisation","Working capital management","Financial risk identification and mitigation"],
  },
];

const GROWTH_PILLARS = [
  {
    icon: Globe, title: "Commercialization & Go-To-Market",
    desc: "We help product and deep-tech startups move from technology to market, faster. We have already enabled two successful deployments — one in automotive and one in a defense-related product category.",
    items: [
      "Use-case and application prioritization",
      "GTM and market entry strategy",
      "Customer discovery and market validation",
      "Corporate partner and early adopter access",
      "Pilot and deployment pathway design",
      "Commercial proof assets — pilot briefs and partner-facing decks",
    ],
  },
  {
    icon: Users, title: "Sales & Partnership Development",
    desc: "We open the right industry doors and help startups gain early traction. Our network spans manufacturers, system integrators and industrial buyers across 11 verticals.",
    items: [
      "Sales strategy and pipeline structuring",
      "Channel and partnership development",
      "Corporate partner introductions",
      "Proposal, pitch and deal-structuring support",
      "Client acquisition and retention frameworks",
      "Access to Quelle Nova's verified manufacturer network",
    ],
  },
  {
    icon: Settings, title: "Investor Readiness & Funding Access",
    desc: "Beyond GTM execution, we help companies sharpen their growth narrative and connect with relevant funding portfolios and industry-aligned investors where strategic capital can support scale.",
    items: [
      "Growth narrative and investment story",
      "Funding portfolio mapping",
      "Industry-focused investor introductions",
      "Strategic capital and co-investor access",
      "Investor materials and readiness support",
      "Alignment of funding with commercial milestones",
    ],
  },
];

const ADVISORY_SERVICES = [
  {
    icon: Building2, title: "Investment Banking", color: "amber",
    desc: "We deliver customised financial advisory solutions that help clients navigate complex financial environments, enhance capital efficiency, and achieve their long-term strategic goals.",
    points: ["Capital raising — debt, equity & hybrid instruments","Financial structuring for growth and acquisition","Investor relations and deal execution support","Strategic M&A advisory and target identification"],
  },
  {
    icon: Link2, title: "Mergers & Acquisitions", color: "blue",
    desc: "Our team of specialists partners with clients through the intricacies of M&A — identifying opportunities, evaluating synergies, and ensuring successful integration.",
    points: ["Buy-side and sell-side M&A advisory","Target identification and screening","Due diligence coordination and valuation","Post-merger integration planning and support"],
  },
  {
    icon: Layers, title: "Deal Structuring", color: "purple",
    desc: "We utilise deep financial insight to design tailored deal structures that align with client goals, maximising benefits while minimising financial and commercial risks.",
    points: ["Transaction architecture and risk allocation","Negotiation support and term sheet design","Regulatory and compliance review","Closing and settlement coordination"],
  },
  {
    icon: Globe, title: "Cross-Border Investments", color: "green",
    desc: "We provide comprehensive advisory support to clients expanding their investment portfolios internationally, helping navigate the complexities of global markets.",
    points: ["Jurisdiction selection and market entry strategy","Foreign investment compliance and regulatory advisory","Cross-border deal facilitation and currency structuring","International partner identification and onboarding"],
  },
];

const HOW_WE_WORK = [
  { num: "01", title: "Discovery & Assessment",  desc: "We begin with a thorough understanding of your business objectives, financial position, and growth ambitions to ensure every recommendation is grounded in your specific context." },
  { num: "02", title: "Analysis & Modelling",    desc: "Deep financial and market analysis applied to your P&L, cash flows, competitive landscape and risk exposures — building a clear, evidence-based picture of where value lies." },
  { num: "03", title: "Strategy & Structure",    desc: "Tailored strategies, deal structures and growth plans aligned precisely with your objectives — designed to maximise value realisation while minimising financial and commercial risks." },
  { num: "04", title: "Execution & Support",     desc: "Hands-on support through deal processes, go-to-market execution, stakeholder negotiations and integration — enabling confident decision-making at every stage." },
  { num: "05", title: "Performance & Outcomes",  desc: "KPI frameworks and performance tracking to measure results, adapt to change and ensure every engagement delivers sustainable, long-term outcomes beyond the initial scope." },
];

const ACCENT: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  purple: { border: "border-purple-500/20", bg: "bg-purple-500/5",  text: "text-purple-400", glow: "rgba(147,51,234,0.12)" },
  blue:   { border: "border-blue-500/20",   bg: "bg-blue-500/5",    text: "text-blue-400",   glow: "rgba(59,130,246,0.12)"  },
  amber:  { border: "border-amber-500/20",  bg: "bg-amber-500/5",   text: "text-amber-400",  glow: "rgba(245,158,11,0.10)"  },
  cyan:   { border: "border-cyan-500/20",   bg: "bg-cyan-500/5",    text: "text-cyan-400",   glow: "rgba(6,182,212,0.12)"   },
  green:  { border: "border-green-500/20",  bg: "bg-green-500/5",   text: "text-green-400",  glow: "rgba(34,197,94,0.12)"   },
  indigo: { border: "border-indigo-500/20", bg: "bg-indigo-500/5",  text: "text-indigo-400", glow: "rgba(99,102,241,0.12)"  },
};

// ─── ADVISORY CARD ─────────────────────────────────────────────────────────────

function AdvisoryCard({ svc, index }: { svc: typeof ADVISORY_SERVICES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = svc.icon;
  const a = ACCENT[svc.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setOpen((v) => !v)}
      className={`rounded-2xl border cursor-pointer transition-all duration-300 ${a.border} ${a.bg} hover:border-opacity-60`}
    >
      <div className="flex items-start gap-4 p-6">
        <motion.div whileHover={{ rotate: 8, scale: 1.1 }}
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${a.border} ${a.bg}`}
        >
          <Icon className={`w-6 h-6 ${a.text}`} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <h3 className="text-white font-bold text-lg leading-tight">{svc.title}</h3>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={16} className="text-zinc-500 shrink-0" />
            </motion.div>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">{svc.desc}</p>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-white/5 mt-0">
              <div className="pt-5">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {svc.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-zinc-300 text-sm">
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${a.text}`} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative pt-30 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(147,51,234,0.08),transparent)]" />
        <motion.div className="absolute top-32 right-16 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 65%)" }}
          animate={{ y: [0, -20, 0], scale: [1, 1.06, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div className="pt-2">
              <FadeIn2 delay={0.08}>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-md mb-8">
                  <span className="relative flex h-2 w-2">
                    <motion.span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"
                      animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }} transition={{ duration: 2, repeat: Infinity }} />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                  </span>
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Manufacturers · Product Companies · Deep-Tech Startups</span>
                </div>
              </FadeIn2>
              <FadeIn2 delay={0.18}>
                <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold tracking-tighter text-white mb-5 leading-[0.95]">
                  Integrated Advisory for Financial Planning, Growth 
                  and
                  <br />

                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"> Cross-Border Expansion</span>
                </h1>
              </FadeIn2>
              <FadeIn2 delay={0.28}>
                <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-md">
                  Quelle Nova supports manufacturers, product companies and deep-tech startups across financial planning, commercialization, strategic transactions and cross-border growth — connecting strategy with real market execution.
                </p>
              </FadeIn2>
              <FadeIn2 delay={0.36} className="flex flex-wrap gap-4 mb-14">
                <Link href="/contact">
                  <PrimaryButton className="px-8 py-4 text-base" icon={ArrowRight}>Schedule a Consultation</PrimaryButton>
                </Link>
                <motion.a href="#financial" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 text-base font-semibold hover:bg-white/[0.08] hover:text-white transition-all"
                >
                  Explore Services <ChevronRight size={16} />
                </motion.a>
              </FadeIn2>
              {/* Stats */}
              <FadeIn2 delay={0.44}>
                <div className="flex gap-10">
                  {[
                    { val: 8,  suffix: "+", label: "Advisory Services" },
                    { val: 3,  suffix: "",  label: "Practice Areas"    },
                    { val: 11, suffix: "",  label: "Industries Served" },
                  ].map(({ val, suffix, label }) => (
                    <div key={label}>
                      <div className="text-3xl font-bold text-white font-mono">
                        <Counter to={val} suffix={suffix} />
                      </div>
                      <div className="text-zinc-600 text-xs mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn2>
            </div>

            {/* Right: three track cards */}
            <div className="space-y-4">
              {HERO_TRACKS.map((track, i) => {
                const Icon = track.icon;
                const a = ACCENT[track.color];
                return (
                  <motion.a key={track.id} href={`#${track.id}`}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.28 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ x: 6, boxShadow: `0 0 40px ${a.glow}` }}
                    className={`relative group rounded-2xl border p-6 transition-all duration-300 overflow-hidden block cursor-pointer ${a.border} ${a.bg}`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{ background: `radial-gradient(circle at 90% 50%, ${a.glow} 0%, transparent 65%)` }} />
                    <div className="flex items-center gap-3 mb-3 relative z-10">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${a.border} ${a.bg} shrink-0`}>
                        <Icon className={`w-5 h-5 ${a.text}`} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs font-mono tracking-widest uppercase mb-0.5 ${a.text}`}>Practice Area</div>
                        <div className="text-white font-bold text-base leading-tight">{track.label}</div>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${a.border} ${a.text}`}>
                        {track.services.length} services
                      </div>
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-4 relative z-10">{track.tagline}</p>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {track.services.map(({ icon: SIcon, name }) => (
                        <div key={name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/5 group-hover:border-white/10 transition-all">
                          <SIcon size={10} className="text-zinc-500" />
                          <span className="text-zinc-400 text-xs">{name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="absolute right-5 bottom-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight size={14} className={a.text} />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TRANSFORMATION — WHERE CLIENTS START vs. END
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-16">
            <SectionLabel text="The Transformation" />
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Where We Take You</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Every engagement is designed around a measurable shift — from your current position to a clearly defined destination.
            </p>
          </FadeIn>

          {/* On mobile: stacked. On desktop: 3 columns with arrow centered */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-10 lg:items-center">

            {/* ── Before ── */}
            <FadeIn delay={0.1}>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                  <span className="text-zinc-400 text-sm font-semibold uppercase tracking-widest">Before Advisory</span>
                </div>
                {[
                  { label: "Financial Clarity",     pct: 28 },
                  { label: "Revenue Growth",         pct: 22 },
                  { label: "Operational Efficiency", pct: 35 },
                  { label: "Market Position",        pct: 30 },
                  { label: "Risk Control",           pct: 25 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-zinc-300 text-base font-medium">{label}</span>
                      <span className="text-zinc-500 text-base font-bold font-mono">{pct}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-red-500/50 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* ── Arrow (centered vertically on desktop, horizontal on mobile) ── */}
            <FadeIn delay={0.2}>
              <div className="flex lg:flex-col items-center justify-center gap-4 py-4 lg:py-0">
                {/* Line above — desktop only */}
                <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />

                {/* Arrow circle */}
                <motion.div
                  className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0"
                  animate={{
                    scale: [1, 1.12, 1],
                    boxShadow: [
                      "0 0 0px rgba(147,51,234,0)",
                      "0 0 32px rgba(147,51,234,0.35)",
                      "0 0 0px rgba(147,51,234,0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Down arrow on mobile, right arrow on desktop */}
                  <svg className="lg:hidden w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <ArrowRight size={26} className="text-purple-400 hidden lg:block" />
                </motion.div>

                {/* Line below — desktop only */}
                <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />

                {/* Horizontal line — mobile only */}
                <div className="lg:hidden h-px w-12 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              </div>
            </FadeIn>

            {/* ── After ── */}
            <FadeIn delay={0.3}>
              <div className="p-8 rounded-2xl border border-purple-500/25 bg-purple-500/[0.06] space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                  <span className="text-purple-300 text-sm font-semibold uppercase tracking-widest">After Advisory</span>
                </div>
                {[
                  { label: "Financial Clarity",     pct: 88 },
                  { label: "Revenue Growth",         pct: 74 },
                  { label: "Operational Efficiency", pct: 81 },
                  { label: "Market Position",        pct: 79 },
                  { label: "Risk Control",           pct: 85 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white text-base font-medium">{label}</span>
                      <span className="text-purple-400 text-base font-bold font-mono">{pct}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINANCIAL ADVISORY
      ══════════════════════════════════════════════════ */}
      <section id="financial" className="relative py-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-12">
            <SectionLabel text="Practice Area 01" />
            <h2 className="text-4xl font-bold text-white mb-3">Financial Advisory</h2>
            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
              End-to-end financial support tailored to your size, industry and growth stage — from strategic planning and capital advisory through to performance optimisation and risk management.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
            {FINANCIAL_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={pillar.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl border border-purple-500/15 bg-white/[0.01] hover:border-purple-400/30 transition-all group"
                >
                  <motion.div whileHover={{ rotate: 8, scale: 1.1 }}
                    className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5"
                  >
                    <Icon className="w-6 h-6 text-purple-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{pillar.title}</h3>
                  <p className="text-zinc-500 text-sm mb-5 leading-relaxed">{pillar.desc}</p>
                  <ul className="space-y-3">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-zinc-300 text-sm">
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-purple-400" /> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Financial chart + image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

            {/* Growth chart */}
            <FadeIn delay={0.1}>
              <div className="p-7 rounded-2xl border border-purple-500/15 bg-[#07070c]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">Portfolio Performance</p>
                    <h4 className="text-white font-bold text-lg">Business Value Over Time</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-400 font-mono">
                      <Counter to={90} suffix="%" />
                    </div>
                    <div className="text-zinc-600 text-xs">avg. improvement</div>
                  </div>
                </div>
                <GrowthChart />
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-zinc-500 text-xs">Post-advisory trajectory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/15" />
                    <span className="text-zinc-500 text-xs">Baseline</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Image + stats */}
            <FadeIn delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden" style={{ height: "100%" }}>
                <img
                  src={FINANCIAL_ADVISORY}
                  alt="Financial advisory"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: 40, suffix: "%", label: "Cost Reduction" },
                      { val: 3,  suffix: "x", label: "ROI Achieved"  },
                      { val: 85, suffix: "%", label: "Risk Mitigated" },
                    ].map(({ val, suffix, label }) => (
                      <div key={label} className="text-center p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10">
                        <div className="text-xl font-bold text-purple-400 font-mono">
                          <Counter to={val} suffix={suffix} />
                        </div>
                        <div className="text-zinc-400 text-xs mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BUSINESS GROWTH
      ══════════════════════════════════════════════════ */}
      <section id="growth" className="relative py-24 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <FadeIn className="mb-14">
            <SectionLabel text="Practice Area 02" />
            <h2 className="text-4xl font-bold text-white mb-3">Business Growth</h2>
            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
              We help product and deep-tech startups move from technology to market, faster — connecting promising solutions with the right commercial pathways and accelerating real-world adoption.
            </p>
          </FadeIn>

          {/* Main narrative + proof */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">

            {/* Left: full narrative */}
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <div className="p-8 rounded-2xl border border-blue-500/15 bg-white/[0.01]">
                  <p className="text-zinc-300 text-base leading-relaxed mb-5">
Our strength lies in turning technical potential into real commercial pathways. We help companies validate target applications, identify early adopters, build pilot opportunities, access strategic partners, prepare for funding conversations and explore acquisition or JV-led growth where it makes sense.                  </p>
                  <p className="text-zinc-400 text-base leading-relaxed mb-5">
Our support goes beyond strategy documents. We help create the market logic, partner narrative, proof assets and outreach pathways needed to convert technology into customers, partnerships, capital and scale.
                  </p>
                  {/* <p className="text-zinc-400 text-base leading-relaxed">
                    We also support investor readiness by helping companies sharpen their growth narrative, map relevant funding portfolios and identify industry-focused investors or strategic capital partners where funding can support scale.
                  </p> */}
                </div>

                {/* Proof points */}
                {/* <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "2",        label: "Live Deployments",      color: "text-blue-400"   },
                    { val: "Automotive", label: "Sector: Deployment 1", color: "text-indigo-400" },
                    { val: "Defence",   label: "Sector: Deployment 2",  color: "text-purple-400" },
                    { val: "11",       label: "Industries We Reach",    color: "text-blue-400"   },
                  ].map(({ val, label, color }) => (
                    <motion.div key={label}
                      whileHover={{ y: -3 }}
                      className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] transition-all"
                    >
                      <div className={`text-2xl font-bold font-mono mb-0.5 ${color}`}>{val}</div>
                      <div className="text-zinc-500 text-xs">{label}</div>
                    </motion.div>
                  ))}
                </div> */}
              </div>
            </FadeIn>

            {/* Right: where we help */}
            <FadeIn delay={0.2}>
              <div className="p-8 rounded-2xl border border-blue-500/15 bg-[#07070c] h-full">
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">Full Scope</p>
                <h4 className="text-white font-bold text-lg mb-7">Where We Help</h4>
                <div className="space-y-3">
                  {[
                    { icon: Target,      label: "Customer discovery and market validation"                        },
                    { icon: Layers,      label: "Use-case and application prioritization"                         },
                    { icon: Globe,       label: "GTM and market entry strategy"                                   },
                    { icon: Users,       label: "Corporate partner and early adopter access"                      },
                    { icon: Settings,    label: "Pilot and deployment pathway design"                             },
                    { icon: TrendingUp,  label: "Sales and partnership development"                               },
                    { icon: BarChart2,   label: "Commercial proof assets — pilot briefs and partner-facing decks" },
                    { icon: Building2,   label: "Investor readiness and funding portfolio mapping"                 },
                    { icon: Link2,       label: "Strategic capital and industry-aligned investor introductions"    },
                  ].map(({ icon: Icon, label }, i) => (
                    <motion.div key={label}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-all group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-blue-400/30 transition-colors">
                        <Icon size={13} className="text-blue-400" />
                      </div>
                      <span className="text-zinc-300 text-sm leading-snug group-hover:text-white transition-colors self-center">{label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Bar chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-blue-500/15 bg-[#07070c] overflow-hidden h-full min-h-[300px] flex flex-col">
                {/* Image strip — top third */}
                <div className="relative h-94 overflow-hidden shrink-0">
                  <img
                    src={DEEP_TECH_COMMERCIALIZATION}
                    alt="Deep-tech commercialization"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07070c]/10 to-[#07070c]" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-mono uppercase tracking-widest">
                      Deep-Tech · Product
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-white font-bold text-lg mb-2">From prototype to market</p>
                  <p className="text-zinc-400 text-md leading-relaxed mb-3 flex-1">
                    We bridge the gap between technical readiness and commercial deployment — connecting deep-tech companies with Quelle Nova's verified manufacturer network, industry partners and aligned investors.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-7 rounded-2xl border border-blue-500/15 bg-[#07070c] h-full">
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">Impact Metrics</p>
                <h4 className="text-white font-bold text-lg mb-6">Commercialization KPIs — Before vs. After</h4>
                <BarChart data={[
                  { label: "Market Validation Speed", before: 15, after: 78, color: "text-blue-400"   },
                  { label: "Pilot Conversion Rate",   before: 10, after: 65, color: "text-indigo-400" },
                  { label: "Investor Readiness",      before: 20, after: 82, color: "text-purple-400" },
                  { label: "Partner Access",          before: 12, after: 70, color: "text-blue-400"   },
                  { label: "Commercial Proof Assets", before: 8,  after: 75, color: "text-cyan-400"   },
                ]} />
                <div className="flex items-center gap-6 mt-6 pt-5 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-2 rounded bg-white/15" />
                    <span className="text-zinc-600 text-xs">Before</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-2 rounded bg-blue-500 opacity-75" />
                    <span className="text-zinc-500 text-xs">After advisory</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CORPORATE ADVISORY
      ══════════════════════════════════════════════════ */}
      <section id="corporate" className="relative py-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Image banner at top */}
          <FadeIn className="mb-12">
            <div className="relative rounded-2xl overflow-hidden h-52 mb-8">
              <img
                src={CORPORATE_ADVISORY}
                alt="Corporate advisory"
                className="w-full  object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/70 to-transparent" />
              <div className="absolute inset-0 flex items-center px-10">
                <div>
                  <SectionLabel text="Practice Area 03" />
                  <h2 className="text-4xl font-bold text-white mt-2 mb-2">Corporate Advisory</h2>
                  <p className="text-zinc-400 text-base max-w-lg">
                    Specialist advisory for complex transactions, cross-border deals and capital markets.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Deal flow donut + services */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

            {/* Left: visual stat cluster */}
            <FadeIn delay={0.1}>
              <div className="p-7 rounded-2xl border border-amber-500/15 bg-[#07070c] space-y-6">
                <div>
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">Deal Coverage</p>
                  <h4 className="text-white font-bold text-lg">Services at a Glance</h4>
                </div>

                {/* Simple donut-style radial bars */}
                {[
                  { label: "Investment Banking",       pct: 82, color: "amber" },
                  { label: "Mergers & Acquisitions",   pct: 76, color: "blue"  },
                  { label: "Deal Structuring",         pct: 91, color: "purple"},
                  { label: "Cross-Border Investments", pct: 70, color: "green" },
                ].map(({ label, pct, color }, i) => {
                  const a = ACCENT[color];
                  return (
                    <div key={label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-zinc-400 text-xs">{label}</span>
                        <span className={`text-xs font-bold font-mono ${a.text}`}>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${a.text.replace("text-", "bg-").replace("-400", "-500")} opacity-80`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-white/5">
                  <div className="text-4xl font-bold text-amber-400 font-mono mb-1">
                    <Counter to={4} />
                  </div>
                  <div className="text-zinc-500 text-xs">Corporate advisory tracks — click below to explore each</div>
                </div>
              </div>
            </FadeIn>

            {/* Right: accordion services */}
            <div className="lg:col-span-2 space-y-3">
              {ADVISORY_SERVICES.map((svc, i) => (
                <AdvisoryCard key={svc.title} svc={svc} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          HOW WE WORK
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Our Approach" />
              <h2 className="text-4xl font-bold text-white mb-4">How Every Engagement Works</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                A structured, repeatable process from discovery through to measurable outcomes — applied consistently across every service engagement regardless of size or complexity.
              </p>
              <div className="relative border-l border-white/8 ml-4 space-y-10 pb-4">
                {HOW_WE_WORK.map((step, i) => (
                  <FadeIn key={step.num} delay={i * 0.08} className="relative pl-9 group">
                    <motion.div
                      className="absolute -left-[17px] top-0.5 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-purple-400"
                      whileInView={{ borderColor: "rgba(147,51,234,0.5)", boxShadow: "0 0 14px rgba(147,51,234,0.18)" }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.3 }}
                    >
                      {step.num}
                    </motion.div>
                    <h4 className="text-white font-bold text-lg mb-1.5 group-hover:text-purple-300 transition-colors">{step.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="sticky top-28 space-y-4">
                <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
                  <h3 className="text-white font-bold text-xl mb-6">Outcomes You Can Expect</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Target,     title: "Aligned Recommendations", desc: "Every output calibrated to your specific business context — no generic playbooks." },
                      { icon: Shield,     title: "Risk-Conscious Design",    desc: "Structures and strategies that maximise value while minimising financial and commercial risk." },
                      { icon: BarChart2,  title: "Measurable Performance",   desc: "Clear KPIs and tracking frameworks so you always know what's working and what needs adjusting." },
                      { icon: TrendingUp, title: "Sustainable Growth",       desc: "Outcomes built to last — we stay engaged until the strategy delivers, not just until it's designed." },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} whileHover={{ x: 4 }}
                          className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-purple-500/20 transition-all group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:border-purple-400/40 transition-colors">
                            <Icon className="w-4 h-4 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-purple-300 transition-colors">{item.title}</div>
                            <div className="text-zinc-500 text-xs leading-relaxed">{item.desc}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA card */}
                <motion.div
                  className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-500/[0.05]"
                  whileHover={{ borderColor: "rgba(147,51,234,0.4)" }}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 65%)", transform: "translate(30%, -30%)" }} />
                  <div className="relative p-6">
                    <p className="text-white font-bold text-base mb-2">Ready to start?</p>
                    <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
                      Our services are offered as standalone engagements or as an integrated programme — designed around your objectives.
                    </p>
                    <Link href="/contact">
                      <motion.button whileHover={{ x: 4 }}
                        className="flex items-center gap-2 text-purple-400 font-semibold text-sm"
                      >
                        Schedule a consultation <ArrowRight size={14} />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTABanner
        title="Start Your Advisory Engagement"
        subtitle="Share your business objectives and challenges. Our team will design a tailored service programme to maximise value and support sustainable growth."
      />
      <Footer />
    </main>
  );
}