"use client";

import { useState } from "react";
import {
  Shield, Layers, Wrench, Zap, Mountain,
  Eye, Box, Shirt, ChevronRight, Package,
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
    id: "optics",
    label: "Optics & Detection",
    color: "blue",
    description: "Thermal imaging scopes, handheld monoculars, thermal cores for OEM integration and day optics for hunting — private-label ready across multiple platform configurations.",
    products: [
      {
        icon: Eye,
        title: "Thermal Imaging Rifle Scopes",
        image: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&q=80",
        items: [
          "Uncooled thermal cores with multiple palette options",
          "Recording features for documentation & review",
          "OEM & private-label configuration across lens & UI",
          "Rugged, field-deployable construction",
          "Positioned for retail & distributor programs",
        ],
      },
      {
        icon: Eye,
        title: "Handheld Thermal Monoculars",
        image: "https://images.unsplash.com/photo-1569288052389-dac9b0ac9eac?w=600&q=80",
        items: [
          "Portable thermal imagers for scouting & wildlife",
          "Fast detection in low light & obscured conditions",
          "Compact form factor for field carry",
          "Multiple detection range options",
          "Suitable for hunting, patrol & observation use",
        ],
      },
      {
        icon: Zap,
        title: "Thermal Cores & Modules (OEM Integration)",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: [
          "Calibrated imaging engine for OEM system integration",
          "Shortens development cycles for scope & handheld builds",
          "Standard interfaces for rapid system integration",
          "Uncooled thermal core technology",
          "Suitable for scopes, handhelds & UAV payloads",
        ],
      },
      {
        icon: Eye,
        title: "Rifle Scopes (Day Optics for Hunting)",
        image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&q=80",
        items: [
          "Day hunting scopes for target identification & shot placement",
          "Optical clarity & low-light performance focus",
          "Variable magnification range configurations",
          "Weather-sealed & durable for field exposure",
          "Repeatable field use construction",
        ],
      },
      {
        icon: Zap,
        title: "UV LED Inspection Torch",
        image: "https://images.unsplash.com/photo-1565728744382-61accd4aa148?w=600&q=80",
        items: [
          "Handheld UV-A LED torch for inspection & detection",
          "Durable construction for field use",
          "Rechargeable operation for extended field deployment",
          "Used where UV response adds detection value",
          "Suitable for outdoor & tactical inspection tasks",
        ],
      },
    ],
  },
  {
    id: "tactical",
    label: "Tactical Gear & Accessories",
    color: "amber",
    description: "Rucksacks, tactical rainwear, sleeping bags, helmet modification kits, weapon accessories and hunting decoys — designed for demanding outdoor and field operations.",
    products: [
      {
        icon: Package,
        title: "Rucksacks (Rugged Pack Systems)",
        image: "https://images.unsplash.com/photo-1478827387698-1527781a4887?w=600&q=80",
        items: [
          "Rugged field packs for outdoor & extended missions",
          "Durable fabrics & reinforced stitching construction",
          "Ergonomic load distribution for multi-day carry",
          "Modular storage & hydration compatibility",
          "Day hunt through multi-day rough terrain carry",
        ],
      },
      {
        icon: Shield,
        title: "Sleeping Bags (Tactical / Field Systems)",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
        items: [
          "Cold-weather sleeping systems for outdoor use",
          "Insulation performance & packability focus",
          "Moisture resistance & reliable warmth in variable conditions",
          "Durable construction for repeated field use",
          "Compatible with layering & ground insulation strategies",
        ],
      },
      {
        icon: Shirt,
        title: "Tactical Rainwear (Technical Fabrics)",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
        items: [
          "Waterproof & wind-resistant for harsh outdoor use",
          "Seam-sealed construction for reliable weather protection",
          "Mobility-focused cut for trekking, hunting & field work",
          "Durable outer fabrics for repeated wear",
          "Sourced from technical outdoor fabric specialists",
        ],
      },
      {
        icon: Shield,
        title: "Helmet Modification Kits",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: [
          "Mounts for night-vision & lights on helmet platforms",
          "Stable fitment & safe weight distribution",
          "Extended movement & night operation compatible",
          "Modular accessory system compatible",
          "Outdoor & tactical-style outdoor use",
        ],
      },
      {
        icon: Wrench,
        title: "Weapon Accessories",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: [
          "Buttstocks, grips & flash hiders for field platforms",
          "Mounting accessories for optics & lights",
          "Improves handling, comfort & field compatibility",
          "Hunting & outdoor firearm platform focus",
          "Durable construction for repeatable field use",
        ],
      },
      {
        icon: Shield,
        title: "Gun Slings & Tactical Accessories",
        image: "https://images.unsplash.com/photo-1551882547-ff40c4fe1fa7?w=600&q=80",
        items: [
          "Gun slings, swivels & QD attachment systems",
          "Tactical holsters & magazine pouches",
          "Shooting rests, bipods & monopods",
          "Hunting backpacks & load-bearing frames",
          "Range bags & tactical vest platforms"],
      },
    ],
  },
  {
    id: "decoys-ropes",
    label: "Decoys, Ropes & Hardware",
    color: "green",
    description: "Hunting decoys in multiple formats, climbing and mountaineering ropes, machined Picatinny rails, paracord and outdoor hardware — manufactured to specification for OEM and export programs.",
    products: [
      {
        icon: Box,
        title: "Hunting Decoys (Foam / Plastic / Windsock / Silhouette)",
        image: "https://images.unsplash.com/photo-1520176098513-65d9d25d8c0d?w=600&q=80",
        items: [
          "Multiple decoy formats — foam, plastic, windsock & silhouette",
          "Realism, packability & quick deployment optimised",
          "Duck, goose & turkey bird decoy ranges",
          "Fiberglass, resin & moulded animal decoys",
          "Effective spread creation across terrain & weather"],
      },
      {
        icon: Layers,
        title: "Climbing & Mountaineering Ropes",
        image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=600&q=80",
        items: [
          "Technical ropes for climbing, rescue & rope access",
          "Stretch behaviour chosen for application safety",
          "Abrasion resistance & handling under load focus",
          "Static & dynamic rope construction options",
          "Mil-spec narrow woven webbings & paracord also available"],
      },
      {
        icon: Wrench,
        title: "Machined Metal Components & Picatinny Rails",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: [
          "Precision machined accessory components & rail interfaces",
          "Picatinny & M-LOK rail systems to specification",
          "Consistent tolerances & corrosion resistance",
          "Reliable alignment & fitment for optics & accessories",
          "Aluminium CNC-machined receivers & scope mounts"],
      },
      {
        icon: Mountain,
        title: "Outdoor Tents & Shelter Systems",
        image: "https://images.unsplash.com/photo-1478827387698-1527781a4887?w=600&q=80",
        items: [
          "Backpacking, camping & family tent configurations",
          "Canopies, gazebos & event shelter structures",
          "Glamping structures & canvas bell tents",
          "Bivouacs & emergency field shelters",
          "Tent poles, pegs & repair component kits"],
      },
      {
        icon: Layers,
        title: "Hardware, Buckles & Outdoor Fittings",
        image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80",
        items: [
          "Outdoor carabiners, D-rings & snap hooks",
          "Buckles, quick-release clips & load adjusters",
          "Camping hardware & tent fitting sets",
          "Stainless & aluminium outdoor hardware",
          "OEM hardware supply for sporting goods brands"],
      },
    ],
  },
  {
    id: "apparel",
    label: "Protective Apparel",
    color: "purple",
    description: "Cold-weather outerwear, heated apparel using flexible heating textiles, camouflage hunting clothing and high-visibility protective garments for outdoor and occupational use.",
    products: [
      {
        icon: Shirt,
        title: "Cold-Weather Garments & Protective Clothing",
        image: "https://images.unsplash.com/photo-1551882547-ff40c4fe1fa7?w=600&q=80",
        items: [
          "Cold-weather clothing built on performance fabrics",
          "Layered-system design for harsh outdoor conditions",
          "Comfort & mobility focus for extended outdoor use",
          "Waterproof & wind-resistant shell variants",
          "Hunting camouflage & high-visibility options"],
      },
      {
        icon: Zap,
        title: "Heated Apparel (Thin Heating Textiles)",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
        items: [
          "Ultra-thin flexible heating textiles integrated into jackets",
          "Faster warm-up & more uniform heat distribution",
          "Compact power systems for field deployment",
          "Low-profile design for outdoor gear integration",
          "Suitable for hunting jackets, vests & base layers"],
      },
      {
        icon: Shield,
        title: "Tactical Uniforms & BDU Garments",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
        items: [
          "Tactical uniforms & battle dress uniforms (BDU)",
          "Durable construction for field & occupational use",
          "Ripstop & technical fabric options",
          "OEM & private-label program supply",
          "High-visibility & occupational safety clothing variants"],
      },
    ],
  },
];

const ACCENT: Record<string, string> = {
  blue:   "border-blue-500/25 bg-blue-500/5 text-blue-400",
  amber:  "border-amber-500/25 bg-amber-500/5 text-amber-400",
  green:  "border-green-500/25 bg-green-500/5 text-green-400",
  purple: "border-purple-500/25 bg-purple-500/5 text-purple-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  blue:   "border-blue-500 bg-blue-500/15 text-blue-300",
  amber:  "border-amber-500 bg-amber-500/15 text-amber-300",
  green:  "border-green-500 bg-green-500/15 text-green-300",
  purple: "border-purple-500 bg-purple-500/15 text-purple-300",
};

export default function HuntingOutdoorPage() {
  const [activeCategory, setActiveCategory] = useState("optics");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;
  const total = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Hunting & Outdoor"
        title="Tactical, Outdoor &"
        titleAccent="Hunting Product Sourcing"
        subtitle="Thermal optics, tactical gear, hunting decoys, climbing ropes, heated apparel and machined accessories — OEM, private-label and export sourcing for outdoor, hunting and tactical product programs worldwide."
        image="https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?w=1600&q=80"
        breadcrumb="Industries / Hunting & Outdoor"
      />

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Performance-Driven{" "}
                <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  Outdoor Manufacturing
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                We provide comprehensive OEM, private-label and export sourcing for outdoor, hunting, tactical and recreational products — partnering with specialised manufacturers focused on durable, high-performance materials and scalable production.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                From thermal optics and tactical gear through to decoys, technical ropes, heated apparel and machined components, our verified supplier network covers the full spectrum of hunting and outdoor product requirements.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-1 gap-4">
                {[
                  ["Optics & Detection",       "Thermal scopes, monoculars, OEM thermal cores & day optics"],
                  ["Tactical Gear",            "Rucksacks, sleeping bags, rainwear, helmet kits & weapon accessories"],
                  ["Decoys, Ropes & Hardware", "Hunting decoys, climbing ropes, Picatinny rails & outdoor fittings"],
                  ["Protective Apparel",       "Cold-weather outerwear, heated apparel & tactical uniforms"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(52,211,153,0.35)" }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-green-300 transition-colors">{title}</div>
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
            <SectionLabel text="Product Coverage" />
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
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  className={`w-full p-5 rounded-2xl border text-left transition-all group ${ACCENT[cat.color]} hover:scale-[1.02]`}
                >
                  <div className="text-xs font-mono tracking-widest uppercase mb-2 opacity-60">
                    {cat.products.length} products
                  </div>
                  <div className="font-bold text-white text-sm leading-snug mb-2 group-hover:brightness-125 transition-all">
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
          "Outdoor Brands & Retailers",
          "Hunting Equipment Distributors",
          "Tactical & Defence Accessories Brands",
          "Thermal Optics OEMs & Integrators",
          "Sporting Goods Importers",
          "Private Label Brands",
          "E-commerce Outdoor Retailers",
          "Government & Law Enforcement",
          "Rope Access & Safety Equipment Companies",
        ]}
      />

      <CTABanner
        title="Source Outdoor & Tactical Products"
        subtitle="Share your product specifications, quantity requirements and target markets. We will connect you with export-ready manufacturers delivering consistent quality."
      />
      <Footer />
    </main>
  );
}