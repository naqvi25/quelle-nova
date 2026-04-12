"use client";

import { TrendingUp, Globe, Users, Settings, Target, BarChart2, CheckCircle, ArrowRight } from "lucide-react";
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
    icon: Globe,
    title: "Market Entry & Growth Strategy",
    color: "blue",
    items: [
      "Market research and opportunity assessment",
      "Go-to-market strategy development",
      "Pricing and revenue model design",
      "Expansion and diversification planning",
    ],
  },
  {
    icon: Users,
    title: "Sales & Partnership Development",
    color: "indigo",
    items: [
      "Sales strategy and pipeline structuring",
      "Channel and partnership development",
      "Client acquisition and retention frameworks",
      "Proposal, pitch, and deal-structuring support",
    ],
  },
  {
    icon: Settings,
    title: "Business Process & Capability Building",
    color: "purple",
    items: [
      "Business model evaluation and refinement",
      "Process mapping and operational efficiency",
      "KPI design and performance tracking",
      "Leadership and team alignment support",
    ],
  },
];

const OUTCOMES = [
  { icon: Target,    title: "Stand Out in Target Markets",   desc: "By refining your value proposition and competitive positioning, we help your business differentiate effectively in the markets you care about." },
  { icon: TrendingUp,title: "Scalable Business Models",      desc: "We design models with efficient processes, resilient revenue streams and clear performance metrics to support profitable, long-term growth." },
  { icon: BarChart2, title: "Adapt and Grow Profitably",     desc: "Clear financial and operational metrics allow organisations to monitor performance, adapt to market changes and sustain growth over time." },
  { icon: Globe,     title: "Long-Term Success",             desc: "Our engagement goes beyond strategy — we support execution so organisations can achieve long-term success, not just short-term gains." },
];

const HOW_WE_WORK = [
  { num: "01", title: "Market Analysis",       desc: "Thorough research into your target markets, competitive landscape, and growth opportunity sizing to ground every recommendation in reality." },
  { num: "02", title: "Strategic Planning",    desc: "Co-developing a growth strategy with clear priorities, resource allocation, and 90-day action plans to generate early momentum." },
  { num: "03", title: "Value Proposition",     desc: "Refining your competitive positioning so your offering resonates clearly with target customers and stands apart from alternatives." },
  { num: "04", title: "Execution Support",     desc: "Hands-on support through business development, channel setup, partnership activation and sales pipeline building." },
  { num: "05", title: "Performance Tracking",  desc: "KPI frameworks and performance metrics to track progress, identify issues early and refine the growth approach as the market evolves." },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function GrowthServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-10%,rgba(59,130,246,0.08),transparent)]" />
        <motion.div
          className="absolute top-20 left-16 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)" }}
          animate={{ y: [0, 20, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* Left */}
          <div>
            <FadeIn2 delay={0.1}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md mb-8">
                <span className="relative flex h-2 w-2">
                  <motion.span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }} transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Business Growth Services</span>
              </div>
            </FadeIn2>
            <FadeIn2 delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.04]">
                Accelerate Sustainable{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Business Growth
                </span>
              </h1>
            </FadeIn2>
            <FadeIn2 delay={0.3}>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                We help organisations identify and pursue sustainable growth opportunities through market analysis, strategic planning and financial insight — enabling businesses to grow profitably, adapt to change and achieve long-term success.
              </p>
            </FadeIn2>
            <FadeIn2 delay={0.4}>
              <Link href="/contact">
                <PrimaryButton className="px-8 py-4 text-base" icon={ArrowRight}>
                  Start Growing
                </PrimaryButton>
              </Link>
            </FadeIn2>
          </div>

          {/* Right: intro paragraph */}
          <FadeIn2 delay={0.5}>
            <div className="p-8 rounded-2xl border border-blue-500/15 bg-blue-500/[0.03]">
              <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                By refining value propositions and competitive positioning, we enable businesses to stand out in their target markets.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                We also design scalable business models with efficient processes, resilient revenue streams and clear performance metrics — allowing organisations to grow profitably, adapt to change and achieve long-term success.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  ["Market Entry & Growth Strategy",          "Research, GTM, pricing & diversification planning"],
                  ["Sales & Partnership Development",         "Pipeline, channels, acquisition & deal structuring"],
                  ["Business Process & Capability Building",  "Model refinement, KPIs, process & leadership alignment"],
                ].map(([title, desc]) => (
                  <motion.div
                    key={title}
                    whileHover={{ x: 4, borderColor: "rgba(59,130,246,0.3)" }}
                    className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-xs group-hover:text-blue-300 transition-colors">{title}</div>
                      <div className="text-zinc-600 text-xs">{desc}</div>
                    </div>
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
            <h2 className="text-4xl font-bold text-white mb-4">Our Growth Services</h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Three service pillars addressing the full growth journey — from market entry and sales through to business model optimisation.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SERVICE_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              const colors: Record<string, string> = {
                blue:   "border-blue-500/15 hover:border-blue-400/30",
                indigo: "border-indigo-500/15 hover:border-indigo-400/30",
                purple: "border-purple-500/15 hover:border-purple-400/30",
              };
              const iconColors: Record<string, string> = {
                blue:   "bg-blue-500/10 border-blue-500/20 text-blue-400",
                indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
                purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
              };
              const checkColors: Record<string, string> = {
                blue: "text-blue-400", indigo: "text-indigo-400", purple: "text-purple-400",
              };
              return (
                <FadeIn key={pillar.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className={`h-full p-8 rounded-2xl border bg-white/[0.01] transition-all ${colors[pillar.color]}`}
                  >
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${iconColors[pillar.color]}`}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-5">{pillar.title}</h3>
                    <ul className="space-y-3">
                      {pillar.items.map((item) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 text-zinc-300"
                        >
                          <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${checkColors[pillar.color]}`} />
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

      {/* ── What You Achieve ──────────────────────────────── */}
      <section className="relative py-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-14 text-center">
            <SectionLabel text="Growth Outcomes" />
            <h2 className="text-4xl font-bold text-white mt-3">What Our Clients Achieve</h2>
            <p className="text-zinc-400 mt-4 text-lg max-w-xl mx-auto">
              The results we design every engagement to deliver — measurable, sustainable and built to last.
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OUTCOMES.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <GlassCard>
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5"
                      whileHover={{ rotate: 8, scale: 1.1 }}
                    >
                      <Icon className="w-6 h-6 text-blue-400" />
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

      {/* ── How We Work ───────────────────────────────────── */}
      <section className="relative py-24 bg-slate-900">
        <SlateBackground />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-16">
            <SectionLabel text="Our Approach" />
            <h2 className="text-4xl font-bold text-white mt-3">How a Growth Engagement Works</h2>
            <p className="text-zinc-400 mt-4 text-lg max-w-xl mx-auto">
              A structured, collaborative process from market analysis through to measurable performance outcomes.
            </p>
          </FadeIn>
          <div className="relative border-l border-white/8 ml-4 space-y-12 pb-8">
            {HOW_WE_WORK.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.08} className="relative pl-10 group">
                <motion.div
                  className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-blue-500"
                  whileInView={{ borderColor: "rgba(59,130,246,0.5)", boxShadow: "0 0 16px rgba(59,130,246,0.2)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.3 }}
                >
                  {step.num}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed max-w-xl">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Accelerate Your Growth"
        subtitle="Share your growth ambitions and current challenges. Our team will design a tailored programme that delivers measurable results from the first 90 days."
      />
      <Footer />
    </main>
  );
}