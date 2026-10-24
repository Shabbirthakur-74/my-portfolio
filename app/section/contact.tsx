"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { FaWhatsapp, FaLinkedin } from "react-icons/fa6";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import type { ContactField, ContactState } from "../lib/contact";

/** Posts the form to the /api/contact serverless function. */
async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  try {
    const res = await fetch("/api/contact", { method: "POST", body: formData });
    return (await res.json()) as ContactState;
  } catch {
    return {
      status: "error",
      message: "Couldn't reach the server. Check your connection and try again.",
      values: Object.fromEntries(
        ["name", "email", "phone", "subject", "message"].map((k) => [
          k,
          String(formData.get(k) ?? ""),
        ]),
      ),
    };
  }
}

const links = [
  {
    label: "Email",
    value: "shabbirkumarshbi@gmail.com",
    short: "Send an email",
    href: "mailto:shabbirkumarshbi@gmail.com",
    icon: FiMail,
    color: "text-violet-400",
    border: "hover:border-violet-400/30",
    external: false,
  },
  {
    label: "Phone",
    value: "+91 98828 15441",
    short: "+91 98828 15441",
    href: "tel:+919882815441",
    icon: FiPhone,
    color: "text-red-400",
    border: "hover:border-red-400/30",
    external: false,
  },
  {
    label: "WhatsApp",
    value: "Chat with me",
    short: "Chat with me",
    href: "https://wa.me/919882815441",
    icon: FaWhatsapp,
    color: "text-green-400",
    border: "hover:border-green-400/30",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Shabbir Kumar",
    short: "Shabbir Kumar",
    href: "https://www.linkedin.com/in/shabbir-kumar-9b7223366/",
    icon: FaLinkedin,
    color: "text-sky-400",
    border: "hover:border-sky-400/30",
    external: true,
  },
] as const;

const initialState: ContactState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-text placeholder:text-text-7 outline-none transition-colors duration-200 focus:border-emerald-400/60 focus:bg-white/[0.05]";

function Field({
  name,
  label,
  state,
  textarea = false,
  ...rest
}: {
  name: ContactField;
  label: string;
  state: ContactState;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const error = state.errors?.[name];
  const props = {
    id: name,
    name,
    defaultValue: state.values?.[name] ?? "",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${name}-error` : undefined,
    className: `${inputClass} ${error ? "border-rose-400/60" : "border-white/10"}`,
    ...rest,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-medium text-text-3">
        {label}
      </label>
      {textarea ? (
        <textarea rows={5} {...props} className={`${props.className} resize-none`} />
      ) : (
        <input {...props} />
      )}
      {error && (
        <p id={`${name}-error`} className="text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  return (
    <section
      id="contact"
      className="px-5 sm:px-6 md:px-12 py-14 md:py-24 max-w-5xl mx-auto w-full"
    >
      <Reveal>
        <p className="text-xs tracking-[0.25em] uppercase mb-3 text-emerald-400 text-center">
          get in touch
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-text leading-tight text-center mb-4">
          Let&apos;s{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400">
            Work Together
          </span>
        </h2>

        <p className="text-text-4 text-sm mb-8 md:mb-12 max-w-lg mx-auto leading-relaxed text-center">
          Have a project in mind or just want to say hi? Send me a message and
          I&apos;ll get back to you within 24 hours.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Contact details */}
        <Stagger gap={0.08} className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
          {links.map(({ label, value, short, href, icon: Icon, color, border, external }) => (
            <StaggerItem key={label}>
              <motion.a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                whileHover={{ y: -3 }}
                className={`flex h-full flex-col items-start gap-3 rounded-2xl border border-white/6 bg-card p-4 transition-colors duration-300 hover:bg-card-hover active:scale-[0.98] sm:flex-row sm:items-center sm:gap-4 ${border}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/8 shrink-0 ${color}`}
                >
                  <Icon size={20} />
                </div>
                <div className="min-w-0 w-full">
                  <p className="text-[11px] uppercase tracking-widest text-text-6">
                    {label}
                  </p>
                  <p className="text-[13px] sm:text-sm text-text truncate">
                    <span className="sm:hidden">{short}</span>
                    <span className="hidden sm:inline">{value}</span>
                  </p>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Form */}
        <Reveal delay={0.1} className="lg:col-span-3">
          <form
            action={formAction}
            noValidate
            className="h-full rounded-2xl border border-white/6 bg-card p-5 sm:p-6 md:p-8 flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                name="name"
                label="Name"
                placeholder="Your name"
                autoComplete="name"
                required
                state={state}
              />
              <Field
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                state={state}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                name="phone"
                label="Phone Number"
                type="tel"
                inputMode="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                required
                state={state}
              />
              <Field
                name="subject"
                label="Subject (optional)"
                placeholder="What's this about?"
                state={state}
              />
            </div>

            <Field
              name="message"
              label="Message"
              placeholder="Tell me about your project..."
              textarea
              required
              state={state}
            />

            {/* Honeypot for bots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            {state.message && (
              <p
                aria-live="polite"
                className={`flex items-center gap-2 text-sm ${
                  state.status === "success" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {state.status === "success" ? (
                  <FiCheckCircle className="shrink-0" />
                ) : (
                  <FiAlertCircle className="shrink-0" />
                )}
                {state.message}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={pending}
              whileHover={pending ? undefined : { scale: 1.02 }}
              whileTap={pending ? undefined : { scale: 0.97 }}
              className="mt-1 inline-flex w-full items-center justify-center gap-2 self-center rounded-xl sm:w-auto bg-emerald-400 px-6 py-3 text-sm font-semibold text-on-emerald transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {pending ? "Sending..." : "Send Message"}
              <FiSend size={16} />
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
