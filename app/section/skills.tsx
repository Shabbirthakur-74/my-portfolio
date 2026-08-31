"use client";

import { useMemo, useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Code2,
  LayoutDashboard,
  Database,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./reveal";

interface Skill {
  name: string;
  level: number;
}

interface SkillGroup {
  category: string;
  label: string;
  tag: string;
  color: keyof typeof colorMap;
  icon: LucideIcon;
  items: Skill[];
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const colorMap = {
  emerald: {
    barFrom: "var(--color-emerald)",
    barTo: "var(--color-emerald-soft)",
    glow: "shadow-emerald-500/20",
    tag: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    icon: "text-emerald-400",
    activeBorder: "border-emerald-400/25",
    activeBg: "bg-panel-emerald",
    tabActive: "bg-emerald-400/10 text-emerald-400 border-emerald-400/25",
    dot: "bg-emerald-400",
  },
  sky: {
    barFrom: "var(--color-sky)",
    barTo: "var(--color-sky-soft)",
    glow: "shadow-sky-500/20",
    tag: "bg-sky-400/10 text-sky-400 border-sky-400/20",
    icon: "text-sky-400",
    activeBorder: "border-sky-400/25",
    activeBg: "bg-panel-sky",
    tabActive: "bg-sky-400/10 text-sky-400 border-sky-400/25",
    dot: "bg-sky-400",
  },
  violet: {
    barFrom: "var(--color-violet)",
    barTo: "var(--color-violet-soft)",
    glow: "shadow-violet-500/20",
    tag: "bg-violet-400/10 text-violet-400 border-violet-400/20",
    icon: "text-violet-400",
    activeBorder: "border-violet-400/25",
    activeBg: "bg-panel-violet",
    tabActive: "bg-violet-400/10 text-violet-400 border-violet-400/25",
    dot: "bg-violet-400",
  },
  amber: {
    barFrom: "var(--color-amber)",
    barTo: "var(--color-amber-soft)",
    glow: "shadow-amber-500/20",
    tag: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    icon: "text-amber-400",
    activeBorder: "border-amber-400/25",
    activeBg: "bg-panel-amber",
    tabActive: "bg-amber-400/10 text-amber-400 border-amber-400/25",
    dot: "bg-amber-400",
  },
} as const;

const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    label: "Frontend Development",
    tag: "UI / UX",
    color: "emerald",
    icon: Monitor,
    items: [
      { name: "HTML", level: 98 },
      { name: "CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 86 },
      { name: "Next.js", level: 82 },
      { name: "Tailwind CSS", level: 94 },
    ],
  },
  {
    category: "Backend",
    label: "Backend Development",
    tag: "APIs / Logic",
    color: "sky",
    icon: Code2,
    items: [
      { name: "PHP", level: 78 },
      { name: "Node.js", level: 84 },
      { name: "Laravel", level: 75 },
      { name: "REST API", level: 70 },
    ],
  },
  {
    category: "CMS & Ecommerce",
    label: "CMS & Platforms",
    tag: "Content",
    color: "violet",
    icon: LayoutDashboard,
    items: [
      { name: "WordPress", level: 88 },
      { name: "Magento", level: 65 },
    ],
  },
  {
    category: "Databases & Tools",
    label: "Databases & Tools",
    tag: "Data / Deploy",
    color: "amber",
    icon: Database,
    items: [
      { name: "MySQL", level: 84 },
      { name: "MongoDB", level: 78 },
      { name: "SQLite", level: 80 },
      { name: "Git", level: 93 },
      { name: "Vercel", level: 88 },
    ],
  },
];

const SkillBar = memo(function SkillBar({
  name,
  level,
  color,
  index,
}: {
  name: string;
  level: number;
  color: keyof typeof colorMap;
  index: number;
}) {
  const c = colorMap[color];

  return (
    <motion.div
      className="space-y-1.5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.06 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-text-2">{name}</span>
        <span className="text-[11px] tabular-nums text-text-7">{level}%</span>
      </div>

      <div className="h-[5px] rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${c.barFrom}, ${c.barTo})`,
            opacity: 0.85,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 + index * 0.06 }}
        />
      </div>
    </motion.div>
  );
});

export default function Skills() {
  const [active, setActive] = useState("Frontend");

  const group = useMemo(
    () => skillGroups.find((g) => g.category === active) ?? skillGroups[0],
    [active]
  );

  const c = colorMap[group.color];
  const Icon = group.icon;

  const cols = useMemo(
    () => (group.items.length > 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"),
    [group.items.length]
  );

  const handleSelect = useCallback((category: string) => {
    setActive(category);
  }, []);

  return (
    <section id="skills" className="bg-surface text-text py-24 px-5">
      <div className="w-full max-w-3xl mx-auto">
        <Reveal>
          <p className="text-center text-xs tracking-[0.25em] uppercase mb-3 text-emerald-soft">
            skills & expertise
          </p>

          <h2 className="text-center text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400">
              Tech Stack
            </span>
          </h2>

          <p className="text-center text-text-4 text-sm mb-12 max-w-xs mx-auto leading-relaxed">
            Technologies I use to build full-stack web projects  from design to
            deployment.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-2 mb-8">
          {skillGroups.map((g) => {
            const gc = colorMap[g.color];
            const isActive = active === g.category;

            return (
              <motion.button
                key={g.category}
                type="button"
                onClick={() => handleSelect(g.category)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? gc.tabActive
                    : "border-white/6 text-text-4 hover:bg-white/4 hover:text-text-2 hover:border-white/10"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? gc.dot : "bg-text-9"
                  }`}
                />
                {g.category}
              </motion.button>
            );
          })}
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={`rounded-2xl border ${c.activeBorder} ${c.activeBg} shadow-xl ${c.glow} p-7`}
          >
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/8 ${c.icon}`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-[15px] font-semibold text-text">
                    {group.label}
                  </p>

                  <p className="text-xs text-text-7 mt-0.5">
                    {group.items.length} technologies
                  </p>
                </div>
              </div>

              <span
                className={`hidden sm:inline-flex text-xs px-3 py-1 rounded-full border ${c.tag}`}
              >
                {group.tag}
              </span>
            </div>

            <div className={`grid ${cols} gap-x-10 gap-y-4`}>
              {group.items.map((item, i) => (
                <SkillBar
                  key={item.name}
                  index={i}
                  name={item.name}
                  level={item.level}
                  color={group.color}
                />
              ))}
            </div>
          </motion.div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-center text-xs mt-8 text-text-4">
            Always learning — this stack keeps growing
          </p>
        </Reveal>
      </div>
    </section>
  );
}
