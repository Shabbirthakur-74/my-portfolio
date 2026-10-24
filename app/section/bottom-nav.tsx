"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  House,
  Code2,
  Briefcase,
  FolderKanban,
  Mail,
  type LucideIcon,
} from "lucide-react";

const items: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: House },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "contact", label: "Contact", icon: Mail },
];

/** Fixed tab bar for small screens; highlights the section in view. */
export default function BottomNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // a thin band across the middle of the viewport
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Mobile"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-header/85 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5 h-16">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <Link
                href={`#${id}`}
                onClick={() => setActive(id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative h-full flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors duration-300 ${
                  isActive ? "text-emerald-400" : "text-text-6 hover:text-text-2"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-pill"
                    className="absolute top-1.5 h-8 w-12 rounded-full bg-emerald-400/12"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} className="relative" />
                <span className="relative">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
