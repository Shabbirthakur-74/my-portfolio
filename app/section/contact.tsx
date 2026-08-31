"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp, FaLinkedin } from "react-icons/fa6";
import { Reveal, Stagger, StaggerItem } from "./reveal";

const links = [
  {
    label: "Email",
    href: "mailto:shabbirkumarshbi@gmail.com",
    icon: FiMail,
    hover: "hover:text-violet-400",
    external: false,
  },
  {
    label: "70181 57169",
    href: "tel:+917018157169",
    icon: FiPhone,
    hover: "hover:text-red-400",
    external: false,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917018157169",
    icon: FaWhatsapp,
    hover: "hover:text-green-400",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shabbir-kumar-9b7223366/",
    icon: FaLinkedin,
    hover: "hover:text-sky-400",
    external: true,
  },
] as const;

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-zinc-800 bg-black text-zinc-400"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-10">
        {/* Links */}
        <Stagger
          gap={0.08}
          className="flex flex-wrap items-center justify-center gap-8 text-lg"
        >
          {links.map(({ label, href, icon: Icon, hover, external }) => (
            <StaggerItem key={label}>
              <motion.a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                whileHover={{ y: -3 }}
                className={`flex items-center gap-2 transition ${hover}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Copyright */}
        <Reveal delay={0.1}>
          <p className="text-center text-sm text-zinc-600">
            © 2025 Shabbir Thakur. All Rights Reserved.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
