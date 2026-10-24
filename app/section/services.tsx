"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Monitor,
  LayoutTemplate,
  Globe,
  ShoppingCart,
  BarChart3,
  Briefcase,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  CircleCheck,
  Search,
  PenTool,
  Code2,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./reveal";

interface Service {
  title: string;
  tagline: string;
  desc: string;
  idealFor: string;
  color: keyof typeof svcColor;
  deliverables: string[];
  stack: string[];
  icon: LucideIcon;
}

const svcColor = {
  emerald: {
    text: "text-emerald-400",
    tile: "bg-emerald-400/10 border-emerald-400/20",
    ring: "border-emerald-400/35",
    bar: "from-emerald-400 to-sky-400",
    glow: "bg-emerald-400/15",
    soft: "bg-emerald-400/[0.06]",
  },
  sky: {
    text: "text-sky-400",
    tile: "bg-sky-400/10 border-sky-400/20",
    ring: "border-sky-400/35",
    bar: "from-sky-400 to-violet-400",
    glow: "bg-sky-400/15",
    soft: "bg-sky-400/[0.06]",
  },
  violet: {
    text: "text-violet-400",
    tile: "bg-violet-400/10 border-violet-400/20",
    ring: "border-violet-400/35",
    bar: "from-violet-400 to-rose-400",
    glow: "bg-violet-400/15",
    soft: "bg-violet-400/[0.06]",
  },
  amber: {
    text: "text-amber-400",
    tile: "bg-amber-400/10 border-amber-400/20",
    ring: "border-amber-400/35",
    bar: "from-amber-400 to-rose-400",
    glow: "bg-amber-400/15",
    soft: "bg-amber-400/[0.06]",
  },
  rose: {
    text: "text-rose-400",
    tile: "bg-rose-400/10 border-rose-400/20",
    ring: "border-rose-400/35",
    bar: "from-rose-400 to-violet-400",
    glow: "bg-rose-400/15",
    soft: "bg-rose-400/[0.06]",
  },
  teal: {
    text: "text-teal-400",
    tile: "bg-teal-400/10 border-teal-400/20",
    ring: "border-teal-400/35",
    bar: "from-teal-400 to-emerald-400",
    glow: "bg-teal-400/15",
    soft: "bg-teal-400/[0.06]",
  },
} as const;

const services: Service[] = [
  {
    title: "Modern Web Applications",
    tagline: "Full-stack apps built to scale",
    desc: "Modern web applications built with React, Next.js, Node.js, and TypeScript for speed, scalability, and great user experience.",
    idealFor: "Startups & SaaS products",
    color: "emerald",
    deliverables: [
      "Custom Web App",
      "Responsive Design",
      "Authentication",
      "Deployment",
    ],
    stack: ["Next.js", "React", "Node.js", "TypeScript", "MongoDB"],
    icon: Monitor,
  },
  {
    title: "Custom Landing Pages",
    tagline: "Pages that turn visitors into leads",
    desc: "Fast, responsive, and conversion-focused landing pages that help businesses showcase their products and services.",
    idealFor: "Product launches & campaigns",
    color: "sky",
    deliverables: [
      "Responsive Layout",
      "SEO Friendly",
      "Fast Loading",
      "Modern Animations",
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    icon: LayoutTemplate,
  },
  {
    title: "Business Websites",
    tagline: "Your brand online, easy to update",
    desc: "Professional websites that establish your online presence with clean design, responsive layouts, and optimized performance across all devices.",
    idealFor: "Local businesses & agencies",
    color: "violet",
    deliverables: [
      "Responsive Website",
      "CMS Integration",
      "Contact Forms",
      "SEO Optimization",
    ],
    stack: ["WordPress", "PHP", "Tailwind CSS", "MySQL"],
    icon: Globe,
  },
  {
    title: "E-Commerce Platforms",
    tagline: "Stores that sell around the clock",
    desc: "Complete online stores with secure payments, product management and seamless shopping experiences for your customers.",
    idealFor: "Retail & D2C brands",
    color: "amber",
    deliverables: [
      "Shopping Cart",
      "Payment Gateway",
      "Product Management",
      "Order Tracking",
    ],
    stack: ["Magento", "WordPress", "Laravel", "MySQL"],
    icon: ShoppingCart,
  },
  {
    title: "Custom Dashboards",
    tagline: "Your data, clear at a glance",
    desc: "Interactive admin panels and analytics dashboards designed to simplify data management with intuitive interfaces and real-time insights.",
    idealFor: "Teams & internal tools",
    color: "rose",
    deliverables: [
      "Admin Dashboard",
      "Analytics",
      "Role Management",
      "Data Visualization",
    ],
    stack: ["React", "Node.js", "REST API", "MySQL"],
    icon: BarChart3,
  },
  {
    title: "Portfolio Websites",
    tagline: "Show your work at its best",
    desc: "Modern portfolio websites that showcase your work, skills, and achievements with engaging visuals, smooth animations, and optimized performance.",
    idealFor: "Creators & professionals",
    color: "teal",
    deliverables: [
      "Personal Branding",
      "Project Showcase",
      "Smooth Animations",
      "SEO Ready",
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    icon: Briefcase,
  },
];

const process: { step: string; title: string; desc: string; icon: LucideIcon }[] = [
  { step: "01", title: "Discover", desc: "We talk goals, audience and scope.", icon: Search },
  { step: "02", title: "Design", desc: "Wireframes and a look you sign off on.", icon: PenTool },
  { step: "03", title: "Develop", desc: "Clean, tested code with regular updates.", icon: Code2 },
  { step: "04", title: "Deliver", desc: "Launch, handover and ongoing support.", icon: Rocket },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const num = (i: number) => String(i + 1).padStart(2, "0");

/* ── Shared bits ─────────────────────────────────────────────────── */

function Deliverables({ s, large = false }: { s: Service; large?: boolean }) {
  const c = svcColor[s.color];
  return (
    <ul className={`grid grid-cols-2 ${large ? "gap-3" : "gap-2"}`}>
      {s.deliverables.map((d) => (
        <li
          key={d}
          className={`flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] text-text-3 ${
            large ? "px-4 py-3 text-sm" : "px-3 py-2.5 text-xs"
          }`}
        >
          <CircleCheck className={`h-4 w-4 shrink-0 ${c.text}`} />
          {d}
        </li>
      ))}
    </ul>
  );
}

function Stack({ s }: { s: Service }) {
  return (
    <div>
      <p className="mb-2 text-[11px] uppercase tracking-widest text-text-6">
        Typical stack
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {s.stack.map((t) => (
          <li
            key={t}
            className="rounded-md border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-text-3"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Phones & tablets: accordion ─────────────────────────────────── */

function ServiceAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Stagger gap={0.07} amount={0.05} className="mx-auto flex max-w-2xl flex-col gap-3 lg:hidden">
      {services.map((s, i) => {
        const c = svcColor[s.color];
        const Icon = s.icon;
        const isOpen = open === i;

        return (
          <StaggerItem key={s.title}>
            <div
              className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${
                isOpen ? `${c.ring} bg-card` : "border-white/8 bg-card/50"
              }`}
            >
              {isOpen && (
                <span className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${c.bar}`} />
              )}

              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-3.5 p-4 text-left"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${c.tile} ${c.text}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold leading-snug text-text">
                    {s.title}
                  </p>
                  <p className="truncate text-xs text-text-6">{s.tagline}</p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                    isOpen ? `rotate-180 ${c.text}` : "text-text-7"
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <div className="flex flex-col gap-4 px-4 pb-5">
                      <p className="text-sm leading-relaxed text-text-5">{s.desc}</p>
                      <p className="text-xs text-text-6">
                        Ideal for{" "}
                        <span className={`font-medium ${c.text}`}>{s.idealFor}</span>
                      </p>
                      <Deliverables s={s} />
                      <Stack s={s} />
                      <Link
                        href="#contact"
                        className={`mt-1 flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold active:scale-[0.98] transition ${c.ring} ${c.soft} ${c.text}`}
                      >
                        Start this project
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/* ── Desktop: list + detail explorer ─────────────────────────────── */

function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const s = services[active];
  const c = svcColor[s.color];
  const Icon = s.icon;

  return (
    <Reveal amount={0.15} className="hidden lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
      {/* List */}
      <div role="tablist" aria-label="Services" className="flex flex-col gap-2">
        {services.map((item, i) => {
          const ic = svcColor[item.color];
          const ItemIcon = item.icon;
          const isActive = i === active;

          return (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`group relative flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 cursor-pointer ${
                isActive
                  ? "border-white/12 bg-card"
                  : "border-transparent hover:border-white/8 hover:bg-card/50"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="svc-indicator"
                  className={`absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b ${ic.bar}`}
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span
                className={`font-mono text-xs ${isActive ? ic.text : "text-text-8"}`}
              >
                {num(i)}
              </span>
              <ItemIcon
                className={`h-5 w-5 shrink-0 transition-colors ${
                  isActive ? ic.text : "text-text-7 group-hover:text-text-4"
                }`}
                strokeWidth={1.7}
              />
              <span className="min-w-0 flex-1">
                <span
                  className={`block font-semibold transition-colors ${
                    isActive ? "text-text" : "text-text-4 group-hover:text-text-2"
                  }`}
                >
                  {item.title}
                </span>
                <span className="block truncate text-xs text-text-7">{item.tagline}</span>
              </span>
              <ArrowRight
                className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                  isActive
                    ? `${ic.text} translate-x-0 opacity-100`
                    : "-translate-x-2 opacity-0 group-hover:opacity-50"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-9 ${c.ring}`}
          >
            <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.bar}`} />
            <span
              className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${c.glow}`}
            />
            <span className="pointer-events-none absolute bottom-2 right-6 select-none font-mono text-[8rem] font-bold leading-none text-white/[0.035]">
              {num(active)}
            </span>

            <div className="relative flex flex-1 flex-col gap-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${c.tile} ${c.text}`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-xs text-text-6">
                    Ideal for{" "}
                    <span className={`font-medium ${c.text}`}>{s.idealFor}</span>
                  </p>
                  <h3 className="text-2xl xl:text-3xl font-bold tracking-tight text-text">
                    {s.title}
                  </h3>
                </div>
              </div>

              <p className="max-w-xl leading-relaxed text-text-4">{s.desc}</p>

              <Deliverables s={s} large />
              <Stack s={s} />

              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-on-emerald transition-colors hover:bg-emerald-300"
                >
                  Start this project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 px-6 py-3 text-sm font-semibold text-text-2 transition-colors hover:bg-white/5"
                >
                  See my work
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/* ── Section ─────────────────────────────────────────────────────── */

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative px-5 sm:px-6 md:px-12 py-14 md:py-24 max-w-6xl mx-auto w-full"
    >
      {/* Header */}
      <Reveal className="mb-8 md:mb-12 flex flex-col items-center gap-4 text-center">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase mb-3 text-emerald-400">
            what I offer
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text leading-tight">
            Services{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400">
              I Provide
            </span>
          </h2>
        </div>
        <p className="text-text-4 text-sm leading-relaxed max-w-lg mx-auto">
          From a single landing page to a full-stack web application — I
          deliver clean, maintainable, and production-ready work on time.
        </p>
      </Reveal>

      <ServiceAccordion />
      <ServiceExplorer />

      <div className="mb-14 md:mb-20" />

      {/* Process */}
      <Reveal className="mb-8 text-center">
        <p className="text-xs tracking-[0.25em] uppercase mb-3 text-sky-400">
          how I work
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-text">
          From idea to launch in 4 steps
        </h3>
      </Reveal>

      {/* Phones: vertical timeline. sm: 2×2 cards. lg: one row with connector. */}
      <Stagger
        gap={0.1}
        className="relative mb-14 grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:mb-20 lg:grid-cols-4"
      >
        <span className="pointer-events-none absolute left-[12%] right-[12%] top-9 hidden h-px bg-gradient-to-r from-emerald-400/40 via-sky-400/40 to-violet-400/40 lg:block" />
        {process.map(({ step, title, desc, icon: StepIcon }, i) => (
          <StaggerItem key={step}>
            <div className="relative flex h-full gap-4 pb-7 sm:flex-col sm:items-center sm:gap-0 sm:rounded-2xl sm:border sm:border-white/8 sm:bg-card/60 sm:p-5 sm:text-center sm:backdrop-blur-sm">
              {i < process.length - 1 && (
                <span className="absolute left-[17px] top-11 bottom-1 w-px bg-gradient-to-b from-emerald-400/50 to-sky-400/10 sm:hidden" />
              )}
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 text-on-emerald shadow-lg shadow-emerald-400/20 sm:mb-4">
                <StepIcon className="h-4 w-4" strokeWidth={2.2} />
              </div>
              <div className="pt-0.5 sm:pt-0">
                <span className="mb-0.5 block font-mono text-[11px] tracking-widest text-text-6">
                  STEP {step}
                </span>
                <h4 className="mb-1 font-semibold text-text">{title}</h4>
                <p className="text-sm leading-relaxed text-text-5 sm:text-xs">{desc}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* CTA */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 p-px">
          <div className="relative flex flex-col items-center justify-between gap-6 rounded-[calc(1.5rem-1px)] bg-card px-6 py-8 text-center md:flex-row md:px-10 md:text-left">
            <span className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-violet-400/10 blur-3xl" />

            <div className="relative">
              <p className="mb-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest text-emerald-400 md:justify-start">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                available for freelance work
              </p>
              <h3 className="mb-1 text-2xl font-bold text-text">
                Ready for the next flight?
              </h3>
              <p className="text-sm text-text-4">
                Tell me about your idea — I&apos;ll reply within 24 hours with
                next steps.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative shrink-0 w-full sm:w-auto"
            >
              <Link
                href="#contact"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-on-emerald transition-colors hover:bg-emerald-300"
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
