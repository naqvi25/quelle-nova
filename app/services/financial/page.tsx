"use client";

import { BarChart2, TrendingUp, Shield, Target, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, FadeIn2, SlateBackground,
  CTABanner, SectionLabel, PrimaryButton, Stagger, StaggerItem, GlassCard,
} from "@/components/ui/shared";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SERVICE_PILLARS = [
  {
    icon: BarChart2,
    title: "Financial Advisory & Planning",
    color: "purple",
    items: [
      "Strategic financial planning aligned with business objectives",
      "Budgeting, forecasting & cash flow management",
      "Capital structure and funding advisory",
      "Scenario analysis and financial modelling",
    ],
  },
  {
    icon: TrendingUp,
    title: "Performance & Cost Optimisation",
    color: "blue",
    items: [
      "Profitability and margin analysis",
      "Cost structure review and optimisation",
      "Working capital management",
      "Financial risk identification and mitigation",
    ],
  },
];

const HOW_WE_WORK = [
  {
    num: "01",
    title: "Opportunity Assessment",
    desc: "We identify value-creating opportunities and evaluate financial and operational synergies relevant to your business objectives.",
  },
  {
    num: "02",
    title: "Financial Analysis & Modelling",
    desc: "Deep financial insight applied across your P&L, cash flow, capital structure and risk exposures to build a clear picture of where value lies.",
  },
  {
    num: "03",
    title: "Deal Structure Design",
    desc: "Tailored deal structures aligned with client objectives — ensuring optimal value realisation while minimising financial and commercial risks.",
  },
  {
    num: "04",
    title: "Execution & Integration Support",
    desc: "Hands-on support through complex deal processes, stakeholder negotiations and post-deal integration, enabling confident decision-making at every stage.",
  },
  {
    num: "05",
    title: "Sustainable Growth Outcomes",
    desc: "We enable businesses to make informed decisions, strengthen financial outcomes and achieve sustainable growth well beyond the initial engagement.",
  },
];

const WHY = [
  { icon: Target,    title: "Aligned to Your Objectives",    desc: "Every financial recommendation is calibrated to your size, industry and growth stage — not a generic framework." },
  { icon: Shield,    title: "Risk-Conscious Deal Design",     desc: "We minimise financial and commercial risks through rigorous scenario analysis and tailored structure design." },
  { icon: BarChart2, title: "Deep Financial Insight",         desc: "Our team brings hands-on experience guiding organisations through strategic transactions and complex deal processes." },
  { icon: TrendingUp,"title": "End-to-End Support",          desc: "From opportunity identification through execution and integration — we stay engaged until sustainable growth is achieved." },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function FinancialServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-10%,rgba(147,51,234,0.09),transparent)]" />
        <motion.div
          className="absolute top-24 right-16 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(147,51,234,0.05) 0%, transparent 70%)" }}
          animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* Left */}
          <div>
            <FadeIn2 delay={0.1}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-md mb-8">
                <span className="relative flex h-2 w-2">
                  <motion.span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }} transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Financial Advisory Services</span>
              </div>
            </FadeIn2>
            <FadeIn2 delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.04]">
                Strategic Financial{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Advisory
                </span>
              </h1>
            </FadeIn2>
            <FadeIn2 delay={0.3}>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                End-to-end financial support tailored to the size, industry and growth stage of your business — supporting strategic transactions and growth initiatives from opportunity assessment through to execution and integration.
              </p>
            </FadeIn2>
            <FadeIn2 delay={0.4}>
              <Link href="/contact">
                <PrimaryButton className="px-8 py-4 text-base" icon={ArrowRight}>
                  Schedule a Consultation
                </PrimaryButton>
              </Link>
            </FadeIn2>
          </div>

          {/* Right: intro paragraph */}
          <FadeIn2 delay={0.5}>
            <div className="p-8 rounded-2xl border border-purple-500/15 bg-purple-500/[0.03]">
              <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                Our team helps identify value-creating opportunities, evaluate financial and operational synergies, and guide organisations through complex deal processes.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Using deep financial insight, we design tailored deal structures aligned with client objectives, ensuring optimal value realisation while minimising financial and commercial risks.
              </p>
              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                {[
                  ["Advisory & Planning", "Strategic financial frameworks"],
                  ["Cost Optimisation",   "Margin & working capital focus"],
                  ["Deal Structuring",    "Risk-minimised transaction design"],
                  ["Integration Support", "Post-deal execution guidance"],
                ].map(([title, desc]) => (
                  <motion.div key={title} whileHover={{ y: -2 }} className="group">
                    <div className="text-purple-300 font-semibold text-sm mb-0.5 group-hover:text-purple-200 transition-colors">{title}</div>
                    <div className="text-zinc-600 text-xs">{desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn2>
        </div>
      </section>

      {/* ── Service Pillars ───────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="mb-12">
            <SectionLabel text="What We Offer" />
            <h2 className="text-4xl font-bold text-white mb-4">Our Financial Services</h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Two core service pillars covering the full spectrum of financial advisory — from strategic planning through to performance and cost optimisation.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICE_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <FadeIn key={pillar.title} delay={i * 0.15}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className={`h-full p-10 rounded-2xl border bg-white/[0.01] transition-all ${
                      pillar.color === "purple"
                        ? "border-purple-500/15 hover:border-purple-400/30"
                        : "border-blue-500/15 hover:border-blue-400/30"
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                        pillar.color === "purple"
                          ? "bg-purple-500/10 border border-purple-500/20"
                          : "bg-blue-500/10 border border-blue-500/20"
                      }`}
                    >
                      <Icon className={`w-7 h-7 ${pillar.color === "purple" ? "text-purple-400" : "text-blue-400"}`} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-6">{pillar.title}</h3>
                    <ul className="space-y-4">
                      {pillar.items.map((item) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 text-zinc-300"
                        >
                          <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${pillar.color === "purple" ? "text-purple-400" : "text-blue-400"}`} />
                          <span className="text-sm leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How We Work ───────────────────────────────────── */}
      <section className="relative py-24 bg-[#020202]">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <SectionLabel text="Our Approach" />
            <h2 className="text-4xl font-bold text-white mt-3">How We Work</h2>
            <p className="text-zinc-400 mt-4 text-lg max-w-xl mx-auto">
              A structured engagement model from initial opportunity assessment through to sustainable financial outcomes.
            </p>
          </FadeIn>
          <div className="relative border-l border-white/8 ml-4 space-y-12 pb-8">
            {HOW_WE_WORK.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.08} className="relative pl-10 group">
                <motion.div
                  className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#020202] border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-purple-500"
                  whileInView={{ borderColor: "rgba(147,51,234,0.5)", boxShadow: "0 0 16px rgba(147,51,234,0.2)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.3 }}
                >
                  {step.num}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed max-w-xl">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="mb-12 text-center">
            <SectionLabel text="Why Choose Us" />
            <h2 className="text-4xl font-bold text-white mt-3">The Quelle Nova Financial Advantage</h2>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHY.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <GlassCard>
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5"
                      whileHover={{ rotate: 8, scale: 1.1 }}
                    >
                      <Icon className="w-6 h-6 text-purple-400" />
                    </motion.div>
                    <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <CTABanner
        title="Start Your Financial Engagement"
        subtitle="Share your business objectives and financial challenges. Our advisory team will design a tailored strategy to maximise value and support sustainable growth."
      />
      <Footer />
    </main>
  );
}