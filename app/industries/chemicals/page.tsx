"use client";

import { useState } from "react";
import { Leaf, FlaskConical, Shield, Droplet, Layers, ChevronRight } from "lucide-react";
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
    id: "fragrance",
    label: "Fragrance Ingredients",
    color: "purple",
    description: "Specialty fragrance materials for fine fragrance, personal care and air care formulations — supplied to purity specification for OEM perfumery programs.",
    products: [
      {
        icon: Leaf,
        title: "Rose Oxide",
        image: "https://images.unsplash.com/photo-1490750967868-88df5691cc5d?w=600&q=80",
        items: [
          "Specialty fragrance ingredient for fine fragrance & personal care",
          "Creates bright rose/green top notes in floral accords",
          "Lifts floral compositions & provides freshness",
          "Used in perfumery, air care & cosmetic formulations",
          "Supplied to specification for OEM fragrance programs",
        ],
      },
      {
        icon: Leaf,
        title: "Woody Cyclohexanone (Kephalis)",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80",
        items: [
          "Woody/musky fragrance material for warmth & substantivity",
          "Acts as a fixative-like base note in perfumery compositions",
          "Adds depth & longevity to fragrance formulations",
          "Used in fine fragrance, personal care & air care",
          "Supplied to purity specification for perfumery use",
        ],
      },
    ],
  },
  {
    id: "food-nutra",
    label: "Food, Cocoa & Nutraceuticals",
    color: "amber",
    description: "Natural cocoa ingredients and nutraceutical-grade extracts for confectionery, personal care, dietary supplements and functional food applications.",
    products: [
      {
        icon: FlaskConical,
        title: "Cocoa Butter",
        image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&q=80",
        items: [
          "Natural cocoa fat for confectionery & personal care",
          "Confectionery grade — texture & melt profile sourcing",
          "Personal care grade — emollient base ingredient",
          "Sourced to grade & specification for end application",
          "Deodorised & natural variants available",
        ],
      },
      {
        icon: FlaskConical,
        title: "Raw Cocoa Mass (Cocoa Liquor)",
        image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&q=80",
        items: [
          "Ground cocoa nib paste — cocoa solids & cocoa butter",
          "Base ingredient for chocolate & cocoa products",
          "Used in specialty/raw formulation positioning",
          "Sourced to fat content & sensory specifications",
          "Supply for confectionery manufacturers & brand OEMs",
        ],
      },
      {
        icon: Leaf,
        title: "Curcumin (Turmeric Extract) — Nutraceutical Grade",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
        items: [
          "Standardised turmeric extract — curcuminoids",
          "Nutraceutical & dietary supplement ingredient",
          "Functional food & beverage applications",
          "Anti-inflammatory & antioxidant market positioning",
          "Supplied to curcuminoid % specification",
        ],
      },
    ],
  },
  {
    id: "industrial",
    label: "Industrial Chemicals & Amines",
    color: "blue",
    description: "Commodity and specialty industrial amines for detergents, coatings, gas treating, corrosion inhibition, epoxy curing and water treatment applications.",
    products: [
      {
        icon: FlaskConical,
        title: "Ethanolamines — MEA / DEA / TEA",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
        items: [
          "Monoethanolamine (MEA), diethanolamine (DEA) & triethanolamine (TEA)",
          "Detergents, surfactants & personal care applications",
          "Gas treating & corrosion inhibition use cases",
          "Chemical intermediates — alkanolamines family",
          "Commodity supply to purity specification",
        ],
      },
      {
        icon: FlaskConical,
        title: "Polyamines — TETA / TEPA (Ethyleneamines)",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80",
        items: [
          "Triethylenetetramine (TETA) & tetraethylenepentamine (TEPA)",
          "Epoxy curing agents for coatings, adhesives & composites",
          "Corrosion inhibitors for oilfield & water treatment",
          "Intermediates for surfactants & sealants",
          "Supplied to specification for coatings & composites industries",
        ],
      },
    ],
  },
  {
    id: "metals-env",
    label: "Strategic Metals & Environmental",
    color: "cyan",
    description: "Tungsten intermediates for hardmetal and defence supply chains, and environmental control chemicals for coal and mineral stockpile management.",
    products: [
      {
        icon: Layers,
        title: "Tungsten / Tungstate Products",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: [
          "Ammonium paratungstate (APT) — tungsten intermediate",
          "Tungstate salts for specialty chemical applications",
          "Tungsten metal powder & consolidated forms",
          "Feeds hardmetals, aerospace & defence applications",
          "Electronics, catalysts, pigments & metal finishing use cases",
        ],
      },
      {
        icon: Droplet,
        title: "DustDew 9219 — Dust Suppressant",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
        items: [
          "Water-based polymer dust suppressant for coal & mineral handling",
          "Reduces PM emissions at mines, ports & power plant stockpiles",
          "Deployable with standard spray infrastructure",
          "Reduces water consumption vs conventional sprinkling",
          "Effective on stockpiles, haul roads & transfer points",
        ],
      },
      {
        icon: Shield,
        title: "DustDew A — Oxidation Barrier",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80",
        items: [
          "Hydrophobic oxidation barrier for coal stockpile management",
          "Limits oxygen diffusion & heat build-up in stockpiles",
          "Preserves gross calorific value (GCV) during storage",
          "Reduces spontaneous combustion risk",
          "Compatible with DustDew 9219 for integrated stockpile programs",
        ],
      },
    ],
  },
];

const ACCENT: Record<string, string> = {
  purple: "border-purple-500/25 bg-purple-500/5 text-purple-400",
  amber:  "border-amber-500/25 bg-amber-500/5 text-amber-400",
  blue:   "border-blue-500/25 bg-blue-500/5 text-blue-400",
  cyan:   "border-cyan-500/25 bg-cyan-500/5 text-cyan-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  purple: "border-purple-500 bg-purple-500/15 text-purple-300",
  amber:  "border-amber-500 bg-amber-500/15 text-amber-300",
  blue:   "border-blue-500 bg-blue-500/15 text-blue-300",
  cyan:   "border-cyan-500 bg-cyan-500/15 text-cyan-300",
};

export default function ChemicalsPage() {
  const [activeCategory, setActiveCategory] = useState("fragrance");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;
  const total = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Chemicals & Commodities"
        title="Specialty Chemicals,"
        titleAccent="Ingredients & Commodities"
        subtitle="Fragrance materials, natural food ingredients, nutraceuticals, industrial amines, strategic metals and environmental control chemicals — sourced to specification for OEM, industrial and export programs."
        image="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=80"
        breadcrumb="Industries / Chemicals & Commodities"
      />

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Verified Supply for{" "}
                <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  Specialty & Industrial Chemicals
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                We connect buyers with verified chemical manufacturers and commodity suppliers across fragrance ingredients, natural food and nutraceutical materials, industrial amines, strategic metals and environmental chemicals — each sourced to the grade, specification and compliance requirements of the end application.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Full documentation support including certificates of analysis, safety data sheets and compliance declarations is provided as standard across all chemical supply programs.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-1 gap-4">
                {[
                  ["Fragrance Ingredients",          "Rose oxide & woody materials for perfumery & personal care"],
                  ["Food, Cocoa & Nutraceuticals",   "Cocoa butter, cocoa mass & curcumin to grade/spec"],
                  ["Industrial Amines",              "Ethanolamines & polyamines for coatings, gas treating & more"],
                  ["Metals & Environmental",         "Tungsten intermediates & stockpile dust control chemicals"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(52,211,153,0.35)" }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-teal-300 transition-colors">{title}</div>
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
              {total} products across {CATEGORIES.length} segments. Select a segment to explore.
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
          "Fragrance & Flavour Houses",
          "Personal Care & Cosmetics Manufacturers",
          "Confectionery & Food Ingredient Buyers",
          "Nutraceutical & Supplement Brands",
          "Coatings, Adhesives & Sealants Manufacturers",
          "Oilfield & Water Treatment Chemical Companies",
          "Hardmetal & Aerospace Supply Chains",
          "Mining, Port & Power Plant Operators",
          "Detergent & Surfactant Manufacturers",
          "Export Trading Companies",
        ]}
      />

      <CTABanner
        title="Source Chemicals & Commodities"
        subtitle="Share your chemical name, specification, grade requirements and quantity. Our team will identify vetted suppliers with full documentation and compliance support."
      />
      <Footer />
    </main>
  );
}