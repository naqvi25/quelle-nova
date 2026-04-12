"use client";

import { useState } from "react";
import {
  Settings, Package, Layers, Zap, Shield,
  Wrench, BarChart2, Box, Droplet, Target, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, SlateBackground,
  PageHero, ProductCard, BuyerSegments, CTABanner, SectionLabel,
  Stagger, StaggerItem,
} from "@/components/ui/shared";

const CATEGORIES = [
  {
    id: "equipment",
    label: "Mining Equipment & Systems",
    color: "amber",
    description: "Heavy-duty equipment, systems, wear parts and consumables for surface and underground mining — built for extreme loads and continuous-duty operations.",
    products: [
      {
        icon: Settings,
        title: "Bulk Material Handling",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        items: ["Belt conveyors & troughing idler sets","Bucket elevators & chain conveyors","Stacker reclaimers & tripper cars","Conveyor belting & vulcanising materials","Conveyor drives, pulleys & take-up systems"],
      },
      {
        icon: Zap,
        title: "Crushing & Screening",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Jaw crushers & cone crushers (fixed & mobile)","Impact crushers & HSI breakers","Vibrating screens & banana screening units","Grizzly feeders & apron feeders","Mobile screening & crushing combinations"],
      },
      {
        icon: Layers,
        title: "Mineral Processing",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Ball mills, SAG mills & rod mills","Flotation cells & froth separation systems","Thickeners, cyclones & classifiers","Leaching tanks & agitation systems","Gravity separation & jig concentrators"],
      },
      {
        icon: Package,
        title: "Pumps & Dewatering",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: ["Slurry pumps — centrifugal & submersible","Dewatering pumps & drainage systems","High-pressure process pump systems","Pump liners, impellers & wear part kits","Underground dewatering pump stations"],
      },
      {
        icon: Shield,
        title: "GET & Wear Parts",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        items: ["Ground engaging tools — teeth, adapters & shrouds","Bucket lips, blade edges & side cutters","Ripper shanks & tip systems","Dozer & grader cutting blades","Carbide wear inserts & buttons"],
      },
      {
        icon: BarChart2,
        title: "Mill Liners & Grinding",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Rubber, steel & composite mill liners","Grinding media — balls, rods & cylpebs","Pulp lifters & discharge systems","Liner bolt & anchoring systems","Linerbolt torque management tooling"],
      },
      {
        icon: Box,
        title: "Underground Equipment",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        items: ["LHD loaders & underground dump trucks","Rock bolts, mesh & shotcrete systems","Ventilation fans & underground ducting","Underground trackless mining equipment","Continuous miners & longwall systems"],
      },
    ],
  },
  {
    id: "drilling",
    label: "Drilling Tools & Rigs",
    color: "blue",
    description: "Rotary, DTH, RC and top-hammer drilling tools alongside surface and underground drill rigs — matched to formation, application and cost-per-metre targets for mining and exploration programmes.",
    products: [
      {
        icon: Target,
        title: "Rotary Tricone Bits (TCI / Milled Tooth)",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["TCI & milled tooth tricone bits for blast-hole drilling","Multiple bearing & protection options per formation","Balances penetration rate & durability across rock types","Soft to hard rock formation coverage","Reduces drilling cost per metre in rotary programmes"],
      },
      {
        icon: Wrench,
        title: "DTH Hammers & DTH Button Bits",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Down-the-hole hammer systems for hard rock drilling","Matched button bits for productivity & durability focus","Reduces drilling cost per metre in hard formations","Multiple hammer sizes for blast-hole & exploration","Reliable performance in abrasive & fractured rock"],
      },
      {
        icon: Settings,
        title: "Reverse Circulation (RC) Tools",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        items: ["RC hammers, bits & drill rods for exploration","Sample quality focus — reduces contamination & downtime","Designed for mineral exploration programmes","Matched tooling for consistent sample return","Suitable for greenfield & brownfield RC drilling"],
      },
      {
        icon: Wrench,
        title: "Top Hammer Tools (Shank Adapters / Bits)",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["Efficient energy transfer in top-hammer drilling","Durable threaded connections for quarrying & mining","Shank adapters matched to rig & drill steel","Button & cross bits for rock formation","Suitable for surface & underground face drilling"],
      },
      {
        icon: Box,
        title: "Drill Rods (API / BECO / DIBH Thread Options)",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["High-strength alloy drill rods for harsh environments","API, BECO & DIBH thread standards available","Hardening processes to extend service life","Multiple diameter & length options","Suitable for rotary, DTH & RC drilling programmes"],
      },
      {
        icon: Settings,
        title: "Surface & Underground Drill Rigs",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        items: ["Surface blast-hole & dewatering rig platforms","Underground face drilling & long-hole rig configurations","Exploration rig platforms for RC & core drilling","Configurable platforms with tool integration","Matched to formation depth & application requirements"],
      },
      {
        icon: Wrench,
        title: "Drilling Rigs & Drilling Tools (Integrated)",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["Integrated rig platform & tooling selection","Consumables matched to rig & formation specification","Single-source supply for rig + tooling programmes","Reduces procurement complexity for drilling contractors","Formation and application-driven product matching"],
      },
    ],
  },
  {
    id: "environmental",
    label: "Environmental & Dust Control",
    color: "green",
    description: "Integrated dust suppression and oxidation control chemicals for coal and mineral stockpile management — reducing PM emissions, preserving GCV and cutting water consumption at mines, ports and power plants.",
    products: [
      {
        icon: Droplet,
        title: "DustDew 9219 — Coal & Mineral Dust Suppressant",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
        items: ["Water-based polymer — agglomerates fines & forms semi-permeable crust","Cuts water usage ~70–90% vs continuous sprinkling","Long-residual dust control on stockpiles & haul roads","Deployable on existing spray bars, tankers & mist cannons","RoHS-aligned, no intentionally added heavy metals or halogenated solvents"],
      },
      {
        icon: Shield,
        title: "DustDew A — Hydrophobic Oxidation Barrier",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80",
        items: ["Hydrophobic barrier limiting oxygen ingress into coal stockpiles","Mitigates spontaneous heating & GCV loss during storage","Reduces PM emissions from oxidation & surface disturbance","Used in conjunction with DustDew 9219 for integrated stockpile management","ICT Mumbai approval cited for soil biology & plant growth compatibility"],
      },
      {
        icon: Droplet,
        title: "DustDew Integrated Stockpile Control Programme",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        items: ["Combined DustDew 9219 + DustDew A deployment programme","Addresses both airborne dust & subsurface oxidation simultaneously","Suitable for mines, ports, road construction & thermal power plant stockpiles","Reduces operational water dependency in arid & water-stressed sites","Programme design, application support & dosing guidance available"],
      },
    ],
  },
];

const ACCENT: Record<string, string> = {
  amber: "border-amber-500/25 bg-amber-500/5 text-amber-400",
  blue:  "border-blue-500/25 bg-blue-500/5 text-blue-400",
  green: "border-green-500/25 bg-green-500/5 text-green-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  amber: "border-amber-500 bg-amber-500/15 text-amber-300",
  blue:  "border-blue-500 bg-blue-500/15 text-blue-300",
  green: "border-green-500 bg-green-500/15 text-green-300",
};

export default function MiningPage() {
  const [activeCategory, setActiveCategory] = useState("equipment");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;
  const total = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Mining & Mineral Processing"
        title="Mining Equipment,"
        titleAccent="Drilling & Environmental"
        subtitle="Heavy-duty mining equipment, precision drilling tools and rigs, wear parts and integrated environmental control systems — sourced from verified manufacturers for surface, underground and exploration operations."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
        breadcrumb="Industries / Mining"
      />

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Built for the{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Harshest Environments
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                We source heavy-duty mining equipment, precision drilling tools and rigs, and integrated environmental control chemicals across the full mining value chain — supporting productivity, safety and operational continuity in surface, underground and exploration operations.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                From bulk material handling systems and wear parts through to tricone bits, DTH hammers, RC tools and stockpile dust control programmes, our verified supplier network covers every operational requirement.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-1 gap-4">
                {[
                  ["Mining Equipment & Systems", "Bulk handling, crushing, processing, pumps, wear parts & underground equipment"],
                  ["Drilling Tools & Rigs",      "Rotary, DTH, RC & top-hammer tools plus surface & underground drill rigs"],
                  ["Environmental & Dust Control","Polymer dust suppressant & oxidation barrier for stockpile management"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(251,191,36,0.35)" }}
                      className="flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-amber-300 transition-colors">{title}</div>
                        <div className="text-zinc-500 text-xs leading-relaxed">{desc}</div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Category Navigator ─────────────────────────────── */}
      <section id="products-section" className="relative py-20 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <SectionLabel text="Product & Capability Coverage" />
            <h2 className="text-4xl font-bold text-white mb-2">What We Source</h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              {total} product categories across {CATEGORIES.length} segments. Select a segment to explore.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mb-10">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat.id
                      ? ACCENT_ACTIVE[cat.color]
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full border ${
                    activeCategory === cat.id ? ACCENT_ACTIVE[cat.color] : "border-white/10 text-zinc-500"
                  }`}>
                    {cat.products.length}
                  </span>
                </motion.button>
              ))}
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`flex items-start gap-3 p-5 rounded-xl border mb-8 ${ACCENT[active.color]}`}>
                <ChevronRight size={16} className="mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">{active.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-visible auto-rows-fr">
                {active.products.map((p, i) => (
                  <ProductCard key={p.title} {...p} delay={i * 0.06} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Segments Summary ───────────────────────────────── */}
      <section className="relative py-16 bg-slate-900 border-y border-white/5">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">All Sourcing Segments</h3>
            <p className="text-zinc-500 mt-2 text-sm">Click any segment to explore its products.</p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => (
              <StaggerItem key={cat.id}>
                <motion.button
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setTimeout(() => {
                      document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 50);
                  }}
                  whileHover={{ y: -4 }}
                  className={`w-full p-6 rounded-2xl border text-left transition-all group ${ACCENT[cat.color]} hover:scale-[1.02]`}
                >
                  <div className="text-xs font-mono tracking-widest uppercase mb-2 opacity-60">
                    {cat.products.length} products
                  </div>
                  <div className="font-bold text-white text-base leading-snug mb-2 group-hover:brightness-125 transition-all">
                    {cat.label}
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </motion.button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <BuyerSegments
        segments={[
          "Mining Operators",
          "EPC & Plant Engineering Firms",
          "Drilling Contractors",
          "Mine Developers & Exploration Companies",
          "Coal & Metals Mining Companies",
          "Mineral Processing Plants",
          "Port & Stockpile Operators",
          "OEM Service & Spares Buyers",
          "Thermal Power Plant Operators",
        ]}
      />

      <CTABanner
        title="Source Mining Equipment & Tools"
        subtitle="Share your equipment specs, drilling programme requirements or stockpile management brief. Our mining sourcing team will identify verified manufacturers ready to supply."
      />
      <Footer />
    </main>
  );
}