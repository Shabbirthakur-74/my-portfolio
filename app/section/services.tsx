"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  LayoutTemplate,
  Globe,
  ShoppingCart,
  BarChart3,
  Briefcase,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./reveal";

interface Service {
  title: string;
  desc: string;
  color: keyof typeof svcColor;
  deliverables: string[];
  icon: LucideIcon;
}

const svcColor = {
  emerald: {
    icon: "text-emerald-400",
    border: "hover:border-emerald-400/30",
    glow: "hover:shadow-emerald-500/10",
    check: "text-emerald-400",
  },
  sky: {
    icon: "text-sky-400",
    border: "hover:border-sky-400/30",
    glow: "hover:shadow-sky-500/10",
    check: "text-sky-400",
  },
  violet: {
    icon: "text-violet-400",
    border: "hover:border-violet-400/30",
    glow: "hover:shadow-violet-500/10",
    check: "text-violet-400",
  },
  amber: {
    icon: "text-amber-400",
    border: "hover:border-amber-400/30",
    glow: "hover:shadow-amber-500/10",
    check: "text-amber-400",
  },
  rose: {
    icon: "text-rose-400",
    border: "hover:border-rose-400/30",
    glow: "hover:shadow-rose-500/10",
    check: "text-rose-400",
  },
  teal: {
    icon: "text-teal-400",
    border: "hover:border-teal-400/30",
    glow: "hover:shadow-teal-500/10",
    check: "text-teal-400",
  },
} as const;

const services: Service[] = [
  {
    title: "Modern Web Applications",
    desc: "Modern web applications built with React, Next.js, Node.js, and TypeScript for speed, scalability, and great user experience.",
    color: "emerald",
    deliverables: [
      "Custom Web App",
      "Responsive Design",
      "Authentication",
      "Deployment",
    ],
    icon: Monitor,
  },
  {
    title: "Custom Landing Pages",
    desc: "Fast, responsive, and conversion-focused landing pages that help businesses showcase their products and services.",
    color: "sky",
    deliverables: [
      "Responsive Layout",
      "SEO Friendly",
      "Fast Loading",
      "Modern Animations",
    ],
    icon: LayoutTemplate,
  },
  {
    title: "Business Websites",
    desc: "Professional websites that establish your online presence with clean design, responsive layouts, and optimized performance across all devices.",
    color: "violet",
    deliverables: [
      "Responsive Website",
      "CMS Integration",
      "Contact Forms",
      "SEO Optimization",
    ],
    icon: Globe,
  },
  {
    title: "E-Commerce Platforms",
    desc: "Complete online stores with secure payments, product management and seamless shopping experiences for your customers.",
    color: "amber",
    deliverables: [
      "Shopping Cart",
      "Payment Gateway",
      "Product Management",
      "Order Tracking",
    ],
    icon: ShoppingCart,
  },
  {
    title: "Custom Dashboards",
    desc: "Interactive admin panels and analytics dashboards designed to simplify data management with intuitive interfaces and real-time insights.",
    color: "rose",
    deliverables: [
      "Admin Dashboard",
      "Analytics",
      "Role Management",
      "Data Visualization",
    ],
    icon: BarChart3,
  },
  {
    title: "Portfolio Websites",
    desc: "Modern portfolio websites that showcase your work, skills, and achievements with engaging visuals, smooth animations, and optimized performance.",
    color: "teal",
    deliverables: [
      "Personal Branding",
      "Project Showcase",
      "Smooth Animations",
      "SEO Ready",
    ],
    icon: Briefcase,
  },
];

const ServiceCard = memo(function ServiceCard({ s }: { s: Service }) {
  const c = svcColor[s.color];
  const Icon = s.icon;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group h-full rounded-2xl border border-white/6 bg-card p-6 flex flex-col transition-colors duration-300 hover:bg-card-hover hover:shadow-xl ${c.border} ${c.glow}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/8 flex-shrink-0 ${c.icon}`}
        >
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </div>

        <h3 className="text-base font-semibold text-text leading-snug">
          {s.title}
        </h3>
      </div>

      <p className="text-xs text-text-5 leading-relaxed mb-5 flex-1 text-justify">
        {s.desc}
      </p>

      <ul className="space-y-1.5 mb-4">
        {s.deliverables.map((d) => (
          <li key={d} className="flex items-center gap-2">
            <CircleCheck className={`w-4 h-4 ${c.check}`} />
            <span className="text-xs text-text-4">{d}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
});

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="min-h-screen px-6 md:px-12 pt-28 pb-16 max-w-5xl mx-auto w-full"
    >
      <Reveal>
        <p className="text-xs tracking-[0.25em] uppercase mb-3 text-emerald-400 text-center">
          what I offer
        </p>

        <div className="flex flex-col items-center gap-6 mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-text leading-tight text-center">
            Services{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400">
              I Provide
            </span>
          </h2>
        </div>

        <div className="text-center">
          <p className="text-text-4 text-sm mb-12 max-w-lg mx-auto leading-relaxed">
            From a single landing page to a full-stack web application — I
            deliver clean, maintainable, and production-ready work on time.
          </p>
        </div>
      </Reveal>

      <Stagger
        gap={0.09}
        amount={0.15}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
      >
        {services.map((s) => (
          <StaggerItem key={s.title} className="h-full">
            <ServiceCard s={s} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal>
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/4 p-8 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-center sm:text-left">
          <div>
            <p className="text-[11px] text-emerald-400 tracking-widest uppercase mb-1">
              let&apos;s work together
            </p>

            <h3 className="text-xl font-semibold text-text mb-1">
              Ready for the next flight?
            </h3>

            <p className="text-sm text-text-4">
              I&apos;m currently available for freelance work. Let&apos;s build
              something great.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="#contact"
              className="px-4 py-2 md:text-xs rounded-xl bg-emerald-400 text-surface text-sm font-semibold hover:bg-emerald-300 transition-colors cursor-pointer"
            >
              Contact Me →
            </Link>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
