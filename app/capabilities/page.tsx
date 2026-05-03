"use client";

import { Wrench, Flame, Box, Cpu, Layers, Zap, Shield, Settings, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, FadeIn2, SlateBackground,
  ProductCard, CTABanner, SectionLabel, Stagger, StaggerItem,
} from "@/components/ui/shared";

const CAPABILITIES = [
  {
    icon: Wrench,
    title: "CNC Machining",
    image: "/images/pexels-daniel-smyth-83914874-8865187-1.jpg",
    items: ["5-axis CNC milling & multi-spindle turning", "±0.005mm tolerances on complex geometries", "Titanium, Inconel, aluminium & steel alloys", "First-article inspection & batch production", "Aerospace, industrial & defence applications"],
  },
  {
    icon: Flame,
    title: "Fabrication & Welding",
    image: "/images/pexels-criticalimagery-29386088.jpg",
    items: ["TIG, MIG & SAW welding processes", "Structural steel & sheet metal fabrication", "CWI-certified & ASME IX qualified welders", "Pressure vessel & process equipment fabrication", "NDT inspection & weld procedure qualification"],
  },
  {
    icon: Box,
    title: "Casting & Forging",
    image: "/images/pexels-yasin-onus-520099596-31004832.jpg",
    items: ["Sand, investment & die casting routes", "Drop & open-die forging capability", "Aluminium, cast iron, steel & stainless grades", "NDT-qualified castings with full traceability", "0.1kg to 5,000kg part weight range"],
  },
  {
    icon: Cpu,
    title: "Electronics Manufacturing",
    image: "/images/pexels-optlasers-7097230.jpg",
    items: ["SMT & through-hole (THT) assembly", "IPC Class II & III compliant production", "X-ray, AOI & functional testing", "Box-build system integration", "Conformal coating & potting"],
  },
  {
    icon: Layers,
    title: "Injection Moulding",
    image: "/images/pexels-bence-szemerey-337043-6804265.jpg",
    items: ["Engineering thermoplastic moulding", "Insert moulding & over-moulding", "Tooling design & development in-house", "Rapid prototyping & production tooling", "High-volume repeatable production runs"],
  },
  {
    icon: Zap,
    title: "Surface Treatment",
    image: "/images/pexels-shoreline-vehicles-2027799586-31759165.jpg",
    items: ["Hard anodising & Type II anodising", "Electrostatic powder coating", "Hot-dip galvanising & passivation", "Phosphating & chromate conversion", "Thermal spray & speciality coatings"],
  },
  {
    icon: Shield,
    title: "Advanced Composites",
    image: "/images/advancedComposite.jpg",
    items: ["Prepreg layup & wet layup processes", "Autoclave & out-of-autoclave (OOA) processing", "Carbon fibre, GFRP & hybrid structures", "Sandwich panel & foam core construction", "NDT & structural validation"],
  },
  {
    icon: Settings,
    title: "Assembly & Integration",
    image: "/images/Multi-partkittingsub-assembly.jpg",
    items: ["Multi-part kitting & sub-assembly", "Full mechanical assembly to drawing", "Functional testing & quality assurance", "JIT delivery & sequenced supply programmes", "Kanban-managed supply chain integration"],
  },
];

const VETTING_STEPS = [
  { num: "01", title: "Document Review",        desc: "Quality certifications, financial statements, export licences and compliance records verified upfront." },
  { num: "02", title: "Technical Assessment",   desc: "Manufacturing process capability, equipment list, and tolerance verification against buyer requirements." },
  { num: "03", title: "Factory Audit",          desc: "On-site or virtual audit of shop floor, quality systems, capacity and delivery performance history." },
  { num: "04", title: "Sample Qualification",   desc: "First-article inspection and sample evaluation against buyer-provided drawings and specifications." },
  { num: "05", title: "Performance Monitoring", desc: "Ongoing KPI tracking on quality, lead time, communication and order fulfilment accuracy." },
];

const CERTIFICATIONS = [
  "ISO 9001:2015", "AS9100 Rev D", "IATF 16949", "ISO 14001",
  "OHSAS 18001", "IPC-A-610 Class III", "NADCAP", "API Q1",
  "ASME PED", "CE Marking", "BIS & DGQA Approved", "REACH & RoHS",
  "Mil-Spec Compliant", "UL Listed",
];

export default function CapabilitiesPage() {
  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-5%,rgba(59,130,246,0.09),transparent)]" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <FadeIn2 delay={0.1}>
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <span className="relative flex h-2 w-2">
                <motion.span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }} transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Manufacturing Capabilities</span>
            </motion.div>
          </FadeIn2>
          <FadeIn2 delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.04]">
              Core Manufacturing{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h1>
          </FadeIn2>
          <FadeIn2 delay={0.3}>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Our supplier network handles complex fabrication, precision machining and specialised material processing with verified accuracy — across eight core manufacturing disciplines, spanning all major industrial regions.
            </p>
          </FadeIn2>
        </div>
      </section>

      {/* ── Capabilities Grid ─────────────────────────────── */}
      <section className="relative py-8 pb-24 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-visible auto-rows-fr">
            {CAPABILITIES.map((cap, i) => (
              <ProductCard key={cap.title} {...cap} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Supplier Vetting ──────────────────────────────── */}
      <section className="py-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: vetting steps */}
            <FadeIn>
              <SectionLabel text="Supplier Qualification" />
              <h2 className="text-4xl font-bold text-white mb-4">How We Vet Every Supplier</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                Every manufacturer in our network passes a rigorous multi-stage qualification process before being approved for buyer engagement.
              </p>
              <div className="relative border-l border-white/8 ml-4 space-y-10 pb-4">
                {VETTING_STEPS.map((step, i) => (
                  <FadeIn key={step.num} delay={i * 0.08} className="relative pl-8 group">
                    <motion.div
                      className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#020202] border border-white/10 flex items-center justify-center text-xs font-bold font-mono text-blue-500"
                      whileInView={{ borderColor: "rgba(59,130,246,0.5)", boxShadow: "0 0 16px rgba(59,130,246,0.2)" }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.3 }}
                    >
                      {step.num}
                    </motion.div>
                    <h4 className="text-white font-bold text-lg mb-1.5 group-hover:text-blue-300 transition-colors">{step.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

            {/* Right: buyer benefit + network note */}
            <FadeIn delay={0.25}>
              <div className="sticky top-28 space-y-5">
                <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
                  <h3 className="text-white font-bold text-xl mb-6">What This Means For You</h3>
                  <Stagger className="space-y-4">
                    {[
                      "No quality surprises after an order is placed",
                      "Suppliers have already proven they can meet your spec",
                      "Traceability in place before production starts",
                      "Export compliance reviewed — no customs issues",
                      "Performance tracked on every subsequent order",
                    ].map((item) => (
                      <StaggerItem key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>

                <motion.div
                  className="p-6 rounded-2xl border border-blue-500/15 bg-blue-500/[0.03]"
                  whileHover={{ borderColor: "rgba(59,130,246,0.3)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div className="w-2 h-2 rounded-full bg-blue-500"
                      animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-blue-400 font-mono text-xs tracking-widest uppercase">Active Network</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Our supplier network spans all major industrial manufacturing regions — India, China, Europe, South-East Asia and the Americas — with localised teams managing ongoing relationships and quality oversight.
                  </p>
                </motion.div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["8", "Core manufacturing disciplines"],
                    ["5-Stage", "Supplier vetting process"],
                    ["Global", "Manufacturing region coverage"],
                    ["14+", "Quality certifications supported"],
                  ].map(([val, label]) => (
                    <motion.div
                      key={label}
                      whileHover={{ y: -3, borderColor: "rgba(59,130,246,0.3)" }}
                      className="p-5 rounded-xl border border-white/5 bg-white/[0.01] transition-all"
                    >
                      <div className="text-blue-400 font-bold text-2xl mb-1">{val}</div>
                      <div className="text-zinc-500 text-xs leading-relaxed">{label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Certifications Strip ──────────────────────────── */}
      <section className="py-16 bg-slate-900 border-y border-white/5">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-10">
            <SectionLabel text="Standards & Certifications" />
            <h3 className="text-2xl font-bold text-white mb-2">Certifications in Our Network</h3>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm">
              Our suppliers collectively hold certifications spanning aerospace, automotive, industrial and electronics manufacturing.
            </p>
          </FadeIn>
          <Stagger className="flex flex-wrap justify-center gap-3">
            {CERTIFICATIONS.map((cert) => (
              <StaggerItem key={cert}>
                <motion.div
                  whileHover={{ scale: 1.06, borderColor: "rgba(59,130,246,0.5)", y: -3 }}
                  className="px-4 py-2 rounded-lg border border-blue-500/15 bg-blue-500/5 text-zinc-300 text-sm font-mono tracking-wide transition-all cursor-default"
                >
                  {cert}
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABanner
        title="Access Our Manufacturing Network"
        subtitle="Submit your technical drawings, specifications or RFQ and our team will match you with qualified manufacturers from our verified global network."
      />
      <Footer />
    </main>
  );
}