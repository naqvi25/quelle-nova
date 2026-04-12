"use client";

import { useState } from "react";
import { Shirt, Star, Package, Zap, Box, Shield, Scissors, Layers, ChevronRight } from "lucide-react";
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
    id: "apparel",
    label: "Apparel",
    color: "pink",
    description: "Men's, women's and kids' clothing across casual, formal, performance and seasonal categories — from everyday garments to technical activewear.",
    products: [
      {
        icon: Shirt,
        title: "Men's Apparel",
        image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80",
        items: ["Casual & formal shirts, trousers & chinos","T-shirts, polos & knitwear","Denim jeans & workwear","Suits, blazers & formal wear","Seasonal & fashion collections"],
      },
      {
        icon: Star,
        title: "Women's Apparel",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: ["Dresses, blouses & tops","Trousers, leggings & skirts","Outerwear, jackets & coats","Athleisure & activewear","Seasonal fashion collections"],
      },
      {
        icon: Package,
        title: "Kids' Clothing",
        image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
        items: ["Infant & toddler apparel","Children's casual & school uniforms","Kidswear sets & onesies","Kids' outerwear & rainwear","Children's sportswear & activewear"],
      },
      {
        icon: Zap,
        title: "Performance & Athleisure",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
        items: ["Moisture-wicking sportswear","Compression & base layer garments","Running, yoga & gym wear","Cycling & outdoor sports apparel","Technical performance knitwear"],
      },
    ],
  },
  {
    id: "footwear",
    label: "Footwear",
    color: "purple",
    description: "Casual, sports, formal and occupational footwear for men, women and children — manufactured to specification for OEM, private-label and export programs.",
    products: [
      {
        icon: Box,
        title: "Casual Footwear",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
        items: ["Sneakers & lifestyle shoes","Sandals, flip-flops & slippers","Loafers, moccasins & espadrilles","Canvas & platform shoes","Private-label casual footwear programs"],
      },
      {
        icon: Shield,
        title: "Sports & Formal Footwear",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
        items: ["Running, training & court shoes","Leather oxfords, derbies & dress shoes","Hiking boots & trail runners","Safety & occupational footwear","Basketball & sports performance shoes"],
      },
    ],
  },
  {
    id: "oem",
    label: "OEM, Private Label & Manufacturing",
    color: "blue",
    description: "End-to-end OEM and private-label program management — from design, sampling and tech pack development through to bulk manufacturing, branding, packaging and export.",
    products: [
      {
        icon: Scissors,
        title: "OEM & Private Label Programs",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
        items: ["Full private-label program management","Custom branding, labeling & hang tags","Sampling & tech pack development","Bulk OEM manufacturing to specification","Quality inspection & compliance documentation"],
      },
      {
        icon: Layers,
        title: "Manufacturing Capabilities",
        image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=600&q=80",
        items: ["Design, sampling & pattern making","Cutting, stitching, assembly & finishing","Branding, packaging & export preparation","FOB & CIF delivery options","Knitting, weaving & fabric sourcing"],
      },
    ],
  },
];

const ACCENT: Record<string, string> = {
  pink:   "border-pink-500/25 bg-pink-500/5 text-pink-400",
  purple: "border-purple-500/25 bg-purple-500/5 text-purple-400",
  blue:   "border-blue-500/25 bg-blue-500/5 text-blue-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  pink:   "border-pink-500 bg-pink-500/15 text-pink-300",
  purple: "border-purple-500 bg-purple-500/15 text-purple-300",
  blue:   "border-blue-500 bg-blue-500/15 text-blue-300",
};

export default function ApparelFootwearPage() {
  const [activeCategory, setActiveCategory] = useState("apparel");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;
  const total = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Apparel & Footwear"
        title="Integrated Apparel &"
        titleAccent="Footwear Sourcing"
        subtitle="End-to-end apparel and footwear production — from design to export-ready bulk supply — for brands, retailers and institutional buyers worldwide."
        image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80"
        breadcrumb="Industries / Apparel & Footwear"
      />

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Design, Function &{" "}
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Scalable Production
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                The Apparel & Footwear industry is driven by evolving consumer lifestyles, fashion trends, and growing demand for comfort, durability and sustainability. We operate at the intersection of design, functionality and efficient manufacturing.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                With end-to-end capabilities, we support brands, retailers and institutional buyers with products that meet international quality standards across fashion, lifestyle and utility segments.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-1 gap-4">
                {[
                  ["Integrated Production", "Design through manufacturing under managed supply chains"],
                  ["OEM & Private Label",   "Custom branding programs with sampling and compliance support"],
                  ["Export Ready",          "Documentation, logistics and international compliance"],
                  ["Scalable Runs",         "Bulk production for retail and institutional programs"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(236,72,153,0.35)" }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-pink-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-pink-300 transition-colors">{title}</div>
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
            <SectionLabel text="Product Portfolio" />
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
          "Fashion Brands & Retailers",
          "Sporting Goods Brands",
          "Institutional & Uniform Buyers",
          "E-commerce Apparel Brands",
          "Department Store Chains",
          "Private Label Importers",
          "Workwear & Safety Suppliers",
        ]}
      />

      <CTABanner
        title="Source Apparel & Footwear"
        subtitle="Share your style references, tech packs or quantity requirements. We will connect you with production-ready, export-compliant manufacturers."
      />
      <Footer />
    </main>
  );
}