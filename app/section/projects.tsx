"use client";

import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Globe, Link } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl: string;
  accent: "emerald" | "sky" | "violet";
}

const FONT_JET_MONO = "JetBrains Mono, monospace";
const FONT_OUTFIT = "Outfit, sans-serif";
const FONT_INTER = "Inter, sans-serif";

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "My Bir Billing",
    category: "Full Stack Web Application",
    description:
      "My Bir Billing is a travel and adventure booking platform for Bir Billing, allowing users to book paragliding rides and certified training courses. The platform provides a seamless booking experience, intuitive navigation, and efficient course and reservation management.",
    stack: ["PHP", "Laravel", "Tailwind CSS", "MySQL"],
    image: "/projects/mybirbilling.png",
    liveUrl: "https://mybirbilling.com",
    accent: "emerald",
  },
  {
    id: 2,
    name: "Goa - Car Rental",
    category: "Landing Page",
    description:
      "Goa Car Rental is a modern landing page designed to showcase car rental services in Goa. It features a clean and responsive design, service highlights, vehicle showcases, and a user-friendly interface to enhance customer engagement.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Github", "Vercel"],
    image: "/projects/car-rental.png",
    liveUrl: "https://rented-cars-new.vercel.app/",
    accent: "sky",
  },
  {
    id: 3,
    name: "Aditya-Google Ads Expert",
    category: "Landing Page",
    description:
      "Aditya Google Ads Expert is a professional landing page designed to promote Google Ads and digital marketing services. It features a modern, responsive design, service highlights, and strategic call-to-action sections to drive client engagement.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Github", "Vercel"],
    image: "/projects/google-ads.png",
    liveUrl: "https://adityaadsexpert-ten.vercel.app",
    accent: "violet",
  },
  {
    id: 4,
    name: "GrowthPlug",
    category: "Landing Page",
    description:
      "GrowthPlug is a modern landing page designed for a digital marketing agency, showcasing its services, expertise, and brand value. It features a responsive design, engaging visuals, strategic call-to-action sections, and a user-focused experience.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Github", "Vercel"],
    image: "/projects/growthplug.png",
    liveUrl: "https://growthplugvercel.vercel.app",
    accent: "emerald",
  },
];

const ACCENT = {
  emerald: {
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    pill: "bg-emerald-500/[0.08] border-emerald-500/15 text-emerald-300",
    btnGradient: "from-emerald-500 to-sky-400",
    glow: "0 0 80px rgba(16,185,129,0.14)",
    radial: "rgba(16,185,129,0.07)",
    pillColor: "#10b981",
    dotShadow: "0 0 8px rgba(52,211,153,0.9)",
  },
  sky: {
    badge: "bg-sky-500/10 border-sky-500/20 text-sky-400",
    pill: "bg-sky-500/[0.08] border-sky-500/15 text-sky-300",
    btnGradient: "from-sky-500 to-violet-500",
    glow: "0 0 80px rgba(14,165,233,0.14)",
    radial: "rgba(14,165,233,0.07)",
    pillColor: "#0ea5e9",
    dotShadow: "0 0 8px rgba(56,189,248,0.9)",
  },
  violet: {
    badge: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    pill: "bg-violet-500/[0.08] border-violet-500/15 text-violet-300",
    btnGradient: "from-violet-500 to-sky-400",
    glow: "0 0 80px rgba(139,92,246,0.14)",
    radial: "rgba(139,92,246,0.07)",
    pillColor: "#8b5cf6",
    dotShadow: "0 0 8px rgba(167,139,250,0.9)",
  },
} as const;

const BrowserFrame = memo(function BrowserFrame({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f0f12] shadow-2xl transition-colors duration-500 group-hover:border-white/[0.14]">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#111115] border-b border-white/[0.06]">
        <div className="flex gap-[6px]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 bg-[#1c1c22] rounded-md px-3 py-[5px] w-full max-w-xs">
            <svg
              className="w-3 h-3 text-zinc-500 flex-shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M2 8h12M8 2C6.5 4.5 6.5 11.5 8 14M8 2c1.5 2.5 1.5 9.5 0 12" />
            </svg>
            <div className="h-[6px] bg-white/10 rounded-full flex-1" />
          </div>
        </div>
      </div>
      {/* Screenshot */}
      <div className="overflow-hidden relative h-52 sm:h-60 lg:h-72">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 57vw"
          className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12]/60 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
});

const NavButton = memo(function NavButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        w-11 h-11 rounded-full flex items-center justify-center
        bg-white/[0.05] border border-white/[0.09] text-zinc-400
        hover:bg-white/[0.1] hover:border-white/[0.18] hover:text-white
        hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]
        disabled:opacity-25 disabled:cursor-not-allowed
        transition-all duration-200 backdrop-blur-sm
      "
    >
      {children}
    </button>
  );
});

export default function App() {
  const [active, setActive] = useState(0);
  const [wrapW, setWrapW] = useState(1100);
  const wrapRef = useRef<HTMLDivElement>(null);
  const touchX = useRef(0);
  const touchY = useRef(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWrapW(e.contentRect.width));
    ro.observe(el);
    setWrapW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const isMobile = wrapW < 640;
  const isTablet = wrapW >= 640 && wrapW < 1024;

  const { cardW, trackX } = useMemo(() => {
    const cardFrac = isMobile ? 0.92 : isTablet ? 0.88 : 0.82;
    const gap = 24;
    const w = wrapW * cardFrac;
    const x = (wrapW - w) / 2 - active * (w + gap);
    return { cardW: w, trackX: x };
  }, [wrapW, isMobile, isTablet, active]);

  const prev = useCallback(() => {
    setActive((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setActive((i) => Math.min(PROJECTS.length - 1, i + 1));
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchX.current;
      const dy = e.changedTouches[0].clientY - touchY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
        dx < 0 ? next() : prev();
      }
    },
    [next, prev]
  );

  const handleSelect = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  const currentAccent = ACCENT[PROJECTS[active].accent];

  return (
    <div
      className="min-h-screen bg-[#09090b] overflow-x-hidden"
      style={{ fontFamily: FONT_INTER }}
    >
      {/* ── Background layer ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full bg-emerald-500/[0.045] blur-[140px]" />
        <div className="absolute top-0 right-[-20%] w-[55vw] h-[55vw] rounded-full bg-sky-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-violet-500/[0.035] blur-[110px]" />
        {/* Grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Section ── */}
      <section id="projects" className="relative py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center mb-16 lg:mb-18">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.09] backdrop-blur-sm mb-7">
              <span
                className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                style={{ boxShadow: "0 0 7px rgba(52,211,153,0.85)" }}
              />
              <span
                className="text-[13px] font-medium text-zinc-300 tracking-widest uppercase"
                style={{ fontFamily: FONT_JET_MONO }}
              >
                Featured Projects
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-[2.6rem] sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.08] tracking-tight text-white mb-5"
              style={{ fontFamily: FONT_OUTFIT }}
            >
              Things{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                I&apos;ve Built
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-400 text-lg leading-relaxed max-w-[640px]">
              A collection of projects that showcase clean code, intuitive
              user experiences, and scalable solutions.
            </p>
          </div>

          {/* ── Carousel ── */}
          <div
            ref={wrapRef}
            className="relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Active card radial glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-700"
              style={{
                background: `radial-gradient(ellipse 55% 45% at 50% 55%, ${currentAccent.radial} 0%, transparent 65%)`,
              }}
            />

            {/* Side fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

            {/* Track */}
            <motion.div
              className="flex"
              style={{ gap: 24 }}
              animate={{ x: trackX }}
              transition={{ type: "spring", stiffness: 280, damping: 34, mass: 0.85 }}
            >
              {PROJECTS.map((project, idx) => {
                const isActive = idx === active;
                const a = ACCENT[project.accent];
                return (
                  <motion.div
                    key={project.id}
                    className="flex-none group cursor-pointer"
                    style={{ width: cardW }}
                    animate={{
                      scale: isActive ? 1 : 0.93,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                    onClick={() => handleSelect(idx)}
                  >
                    {/* Card */}
                    <div
                      className="relative rounded-2xl border bg-white/[0.025] backdrop-blur-md p-6 lg:p-8 transition-all duration-500"
                      style={{
                        borderColor: isActive
                          ? "rgba(255,255,255,0.11)"
                          : "rgba(255,255,255,0.05)",
                        boxShadow: isActive ? a.glow : "none",
                      }}
                    >
                      {/* Inner gradient tint for active card */}
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          style={{
                            background: `linear-gradient(135deg, ${a.radial.replace(
                              "0.07",
                              "0.05"
                            )} 0%, transparent 55%)`,
                          }}
                        />
                      )}

                      {/* Two-column layout */}
                      <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Left — browser mockup */}
                        <div className="w-full lg:w-[57%] flex-shrink-0">
                          <BrowserFrame
                            src={project.image}
                            alt={`${project.name} screenshot`}
                          />
                        </div>

                        {/* Right — project info */}
                        <div className="flex flex-col justify-between flex-1 min-w-0 pt-1">
                          <div>
                            {/* Category */}
                            <span
                              className={`inline-flex items-center px-3 py-[5px] rounded-full text-[11px] font-semibold border tracking-wide uppercase mb-4 ${a.badge}`}
                              style={{ fontFamily: FONT_JET_MONO }}
                            >
                              {project.category}
                            </span>

                            {/* Name */}
                            <h3
                              className="text-2xl lg:text-[1.7rem] font-bold text-white mb-3 leading-tight tracking-tight "
                              style={{ fontFamily: FONT_OUTFIT }}
                            >
                              {project.name}
                            </h3>

                            {/* Description */}
                            <p className="text-zinc-400 text-sm lg:text-[15px] leading-relaxed mb-5 text-justify">
                              {project.description}
                            </p>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2 mb-7">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.05] border border-white/[0.08] text-zinc-300 tracking-wide"
                                  style={{ fontFamily: FONT_JET_MONO }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* CTA buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${a.btnGradient} text-white font-semibold text-[13.5px] shadow-lg hover:opacity-90 hover:shadow-xl active:scale-[0.97] transition-all duration-200`}
                            >
                              <Globe className="w-4 h-4" />
                              Visit
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-center gap-7 mt-10">
            <NavButton onClick={prev} disabled={active === 0}>
              <ChevronLeft className="w-5 h-5" />
            </NavButton>

            {/* Pagination pills */}
            <div className="flex items-center gap-2">
              {PROJECTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                  style={{
                    width: idx === active ? 28 : 8,
                    height: 8,
                    borderRadius: 999,
                    backgroundColor:
                      idx === active ? currentAccent.pillColor : "rgba(255,255,255,0.18)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow:
                      idx === active ? `0 0 10px ${currentAccent.pillColor}66` : "none",
                  }}
                />
              ))}
            </div>

            <NavButton onClick={next} disabled={active === PROJECTS.length - 1}>
              <ChevronRight className="w-5 h-5" />
            </NavButton>
          </div>
        </div>
      </section>
    </div>
  );
}