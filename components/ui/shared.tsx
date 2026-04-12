"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
  useScroll,
  useInView,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── BACKGROUNDS ──────────────────────────────────────────────────────────────

export const BackgroundDesign = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#020202]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_-20%,rgba(30,41,59,0.3),rgba(0,0,0,1))]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
  </div>
);

export const SlateBackground = () => (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f010_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f010_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
);

// ─── CURSOR GLOW ──────────────────────────────────────────────────────────────

export const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 300, mass: 0.5 });

  React.useEffect(() => {
    const update = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, rgba(59,130,246,0.08), rgba(147,51,234,0.03) 30%, transparent 70%)`;
  return <motion.div className="pointer-events-none fixed inset-0 z-50" style={{ background }} />;
};

// ─── BUTTONS ──────────────────────────────────────────────────────────────────

export const PrimaryButton = ({
  children,
  className = "",
  icon: Icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  className?: string;
  icon?: any;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => (
  <motion.button
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white overflow-hidden bg-white/5 border border-white/10 transition-shadow duration-500 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.7)] ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-400" />
    <div className="absolute left-[-100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out" />
    <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
      {children}
      {Icon && <Icon size={18} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </span>
  </motion.button>
);

export const SecondaryButton = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`relative group inline-flex items-center justify-center rounded-full font-semibold text-zinc-300 bg-white/[0.02] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/25 ${className}`}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </motion.button>
);

// ─── ANIMATION PRIMITIVES ─────────────────────────────────────────────────────

export const FadeIn = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 28 : 0,
    x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn2 = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Stagger wrapper — wraps a list so children animate in cascade
export const Stagger = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── CARDS ────────────────────────────────────────────────────────────────────

export const SpotlightCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const cardRef = useRef<HTMLDivElement>(null);
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 200 });
  const rotateY = useTransform(smoothX, [-1, 1], [-10, 10]);
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const spotBg = useMotionTemplate`radial-gradient(280px circle at ${spotX}px ${spotY}px, rgba(59,130,246,0.15), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03, z: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
className={`relative group rounded-2xl border border-white/5 bg-[#0a0a0a] overflow-hidden hover:border-blue-400/20 hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)] transition-colors duration-300 h-full ${className}`}      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background: spotBg }}
        />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div
          className="relative p-7 z-10 h-full flex flex-col"
          style={{ transform: "translateZ(30px)" }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const GlassCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    className={`relative group rounded-2xl border border-white/5 bg-white/[0.015] backdrop-blur-md overflow-hidden hover:border-blue-400/20 hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] transition-all duration-400 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative p-7 z-10 h-full flex flex-col">{children}</div>
  </motion.div>
);

// ─── PRODUCT CARD (used in every industry page) ───────────────────────────────

export const ProductCard = ({
  icon: Icon,
  title,
  items,
  delay = 0,
  image,
}: {
  icon: any;
  title: string;
  items: string[];
  delay?: number;
  image?: string;
}) => {
  if (image) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 200 });
    const rotateY = useTransform(smoothX, [-1, 1], [-10, 10]);
    const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 900 }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={(e) => {
            const rect = cardRef.current?.getBoundingClientRect();
            if (!rect) return;
            mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
            mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
          }}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.03, z: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative group rounded-2xl overflow-hidden cursor-pointer h-80 shadow-lg"        >
          {/* Photo */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Base overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          {/* Border sweep */}
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-400/50 transition-all duration-500" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          {/* Glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "radial-gradient(circle at 50% 85%, rgba(59,130,246,0.25) 0%, transparent 65%)" }}
          />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 z-10" style={{ transform: "translateZ(30px)" }}>
            {/* Icon — always visible */}
            <div className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center mb-3">
              <Icon className="w-5 h-5 text-blue-400" />
            </div>
            {/* Title — always visible */}
            <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md leading-snug">{title}</h3>
            {/* Items — slide up on hover */}
            <motion.ul
              className="space-y-1 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100"
            >
            {items.slice(0, 5).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Fallback — icon card for pages without images
  return (
    <SpotlightCard delay={delay}>
      <motion.div
        className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5"
        whileHover={{ rotate: 6, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Icon className="w-6 h-6 text-blue-400" />
      </motion.div>
      <h3 className="text-white font-bold text-lg mb-4 leading-snug">{title}</h3>
      <ul className="space-y-2.5 flex-1">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 + delay }}
            className="flex items-start gap-2.5 text-zinc-400 text-sm leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-[6px] shrink-0" />
            {item}
          </motion.li>
        ))}
      </ul>
    </SpotlightCard>
  );
};

// ─── PAGE HERO (parallax, scanlines, breadcrumb) ──────────────────────────────

export const PageHero = ({
  badge,
  title,
  titleAccent,
  subtitle,
  image,
  breadcrumb,
}: {
  badge: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  image: string;
  breadcrumb?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[72vh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0 scale-110" style={{ y: bgY }}>
        <img src={image} alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/82 to-[#020202]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/55" />
      </motion.div>

      {/* Scanlines */}
      <div className="absolute inset-0 z-[1] scanlines pointer-events-none" />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full"
      >
        {/* Breadcrumb */}
        {breadcrumb && (
          <FadeIn2 delay={0.05}>
            <p className="text-zinc-500 text-sm mb-6 tracking-widest uppercase font-mono">
              <Link href="/" className="text-blue-500 hover:text-blue-400 transition-colors">Home</Link>
              {" / "}
              <span className="text-zinc-400">{breadcrumb}</span>
            </p>
          </FadeIn2>
        )}

        {/* Badge */}
        <FadeIn2 delay={0.1}>
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">{badge}</span>
          </motion.div>
        </FadeIn2>

        {/* Heading */}
        <FadeIn2 delay={0.2}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.04] max-w-4xl">
            {title}{" "}
            {titleAccent && (
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {titleAccent}
              </span>
            )}
          </h1>
        </FadeIn2>

        {/* Subtitle */}
        <FadeIn2 delay={0.3}>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">{subtitle}</p>
        </FadeIn2>
      </motion.div>
    </section>
  );
};

// ─── SECTION LABEL ────────────────────────────────────────────────────────────

export const SectionLabel = ({ text }: { text: string }) => (
  <motion.div
    className="flex items-center gap-3 mb-4"
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="h-[1px] bg-blue-500"
      initial={{ width: 0 }}
      whileInView={{ width: 32 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
    />
    <span className="text-blue-500 font-mono text-sm tracking-widest uppercase">{text}</span>
  </motion.div>
);

// ─── BUYER SEGMENTS ───────────────────────────────────────────────────────────

export const BuyerSegments = ({ segments }: { segments: string[] }) => (
  <section className="relative py-20 bg-[#020202]">
    <div className="max-w-7xl mx-auto px-6">
      <FadeIn className="mb-12 text-center">
        <SectionLabel text="Who We Source For" />
        <h2 className="text-4xl font-bold text-white mt-3">Buyer Segments Served</h2>
      </FadeIn>
      <Stagger className="flex flex-wrap justify-center gap-3">
        {segments.map((seg) => (
          <StaggerItem key={seg}>
            <motion.div
              whileHover={{ scale: 1.06, y: -3 }}
              className="px-6 py-3 rounded-full border border-blue-500/20 bg-blue-500/5 text-zinc-300 text-sm font-medium hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-white transition-all cursor-default"
            >
              {seg}
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);

// ─── CTA BANNER ───────────────────────────────────────────────────────────────

export const CTABanner = ({
  title = "Ready to Source?",
  subtitle = "Share your technical requirements and get connected with verified manufacturers aligned to your exact specifications.",
}: {
  title?: string;
  subtitle?: string;
}) => (
  <section className="relative py-28 overflow-hidden border-t border-white/5 bg-[#020202]">
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse, rgba(59,130,246,0.11) 0%, rgba(147,51,234,0.06) 50%, transparent 70%)",
      }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <FadeIn>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">{title}</h2>
        <p className="text-zinc-400 mb-12 text-xl max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        <Link href="/contact">
          <PrimaryButton className="px-10 py-5 text-lg" icon={ArrowRight}>
            Submit RFQ
          </PrimaryButton>
        </Link>
      </FadeIn>
    </div>
  </section>
);