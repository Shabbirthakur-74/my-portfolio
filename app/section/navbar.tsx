"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";

const nav: { label: string; href: string }[] = [
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Call",
    href: "tel:+917018157169",
    icon: Phone,
    hoverClass: "hover:text-red-400",
    external: false,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917018157169",
    icon: FaWhatsapp,
    hoverClass: "hover:text-green-400",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shabbir-kumar-9b7223366/",
    icon: FaLinkedin,
    hoverClass: "hover:text-sky-400",
    external: true,
  },
] as const;

const socialIconBaseClass =
  "w-11 h-11 rounded-full flex items-center justify-center border border-white/10 text-white/70 hover:bg-white/10 transition-all duration-300";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0B0B0D]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-18 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={56}
              height={56}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          <span className="font-serif-display text-[13px] lg:text-[20px] font-semibold tracking-tight text-white">
            Shabbir{" "}
            <span className="italic font-normal text-white/60">Thakur</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-10">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-[15px] font-medium text-white/70 hover:text-white transition-colors duration-300"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center justify-end gap-3">
          {socialLinks.map(({ label, href, icon: Icon, hoverClass, external }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`${socialIconBaseClass} ${hoverClass}`}
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="flex justify-end md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-[#0B0B0D]/95 backdrop-blur-2xl border-t border-white/10">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="text-white/80 hover:text-white text-lg font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}