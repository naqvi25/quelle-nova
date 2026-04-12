"use client";

import { Zap, Cable, Box, Server, Layout, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, SlateBackground,
  PageHero, ProductCard, BuyerSegments, CTABanner, SectionLabel, StatPill,
} from "@/components/ui/shared";

const PRODUCTS = [
  {
    icon: Zap,
    title: "Power Distribution",
    items: [
      "Busbar trunking systems (LV power distribution)",
      "Busducts & power busbars",
      "UPS & critical power infrastructure",
      "Metered & intelligent rack PDUs",
      "Static transfer switches (STS)",
    ],
  },
  {
    icon: Cable,
    title: "Cabling & Connectivity",
    items: [
      "LV/MV power cables, FRLS & LSZH building wire",
      "Structured cabling — Cat6 / Cat6A / Cat8",
      "Optical fibre cables (OFC) & passive components",
      "Fiber patch cords, pigtails & LIUs",
      "Fibre management systems (FMS)",
    ],
  },
  {
    icon: Layout,
    title: "Cable Management",
    items: [
      "Cable trays — ladder, perforated, wire mesh",
      "Raceways, supports & strut systems",
      "Cable hangers & seismic-rated supports",
      "Junction boxes & fabricated steel accessories",
      "Firestop systems & penetration seals",
    ],
  },
  {
    icon: Server,
    title: "IT Infrastructure",
    items: [
      "Server racks, network cabinets & 19\" enclosures",
      "Open racks & outdoor enclosures",
      "Raised access flooring systems",
      "Hot/cold aisle containment systems",
      "In-row and overhead cooling units",
    ],
  },
  {
    icon: Box,
    title: "Panel & Interface",
    items: [
      "Terminal blocks & DIN rail interfaces",
      "Cable lugs & compression connectors",
      "Cable glands & sealing systems",
      "Earthing & grounding accessories",
      "Surge protection devices (SPD)",
    ],
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    items: [
      "FM-200 & Novec fire suppression systems",
      "VESDA early smoke detection",
      "Water leak detection cables",
      "ESD protection flooring & mats",
      "Access control & DCIM integration",
    ],
  },
];

export default function DataCentersPage() {
  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Data Centers & Digital Infrastructure"
        title="Mission-Critical"
        titleAccent="Infrastructure Sourcing"
        subtitle="Power distribution, structured cabling, IT racks and cable management components for hyperscale, enterprise, colocation and industrial data center environments."
        image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
        breadcrumb="Industries / Data Centers"
      />

      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-50 leading-tight mb-6">
                End-to-End Data Center{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Component Sourcing</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                We source mission-critical electrical, power, cabling, and IT infrastructure components used across hyperscale, enterprise, colocation, and industrial data center environments.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Our sourcing capability supports the full lifecycle of data center development — from initial build and expansion to ongoing upgrades — ensuring reliability, scalability, and compliance with global infrastructure standards.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "99.999%", label: "Uptime Targets" },
                  { value: "Tier I–IV", label: "Data Center Types" },
                  { value: "LSZH", label: "Cable Compliance" },
                  { value: "Global", label: "Manufacturer Network" },
                ].map((s) => (
                  <StatPill key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-12">
            <SectionLabel text="Product & System Coverage" />
            <h2 className="text-4xl font-bold text-white mb-4">Infrastructure We Source</h2>
            <p className="text-zinc-400 max-w-2xl text-lg">Core power distribution, structured cabling and rack infrastructure for uninterrupted, high-density data center operations.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.title} {...p} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <BuyerSegments segments={[
        "Data Center Developers", "EPC Contractors", "Electrical System Integrators",
        "ICT System Integrators", "Hyperscale Operators", "Colocation Providers",
        "Enterprise IT Teams", "Cloud Infrastructure Companies",
      ]} />

      <CTABanner
        title="Source Data Center Infrastructure"
        subtitle="Share your bill of materials, specifications or project requirements. We will identify qualified manufacturers and solution providers ready to support your timeline."
      />
      <Footer />
    </main>
  );
}
