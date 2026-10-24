import nodemailer from "nodemailer";
import {
  readContactForm,
  validateContact,
  type ContactState,
  type ContactValues,
} from "../../lib/contact";

// nodemailer needs Node APIs (net/tls), so this can't run on the edge.
export const runtime = "nodejs";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Strip line breaks from anything that ends up in a header (subject, names).
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const json = (body: ContactState, status = 200) => Response.json(body, { status });

function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);
  return {
    user,
    transporter: nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port,
      secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
      auth: { user, pass },
    }),
  };
}

/* ── Email templates ─────────────────────────────────────────────── */

const shell = (body: string) => `
<div style="background:#09090b;padding:32px 16px;font-family:Poppins,Segoe UI,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#0e1420;border:1px solid #1f2937;border-radius:16px;overflow:hidden">
    <div style="height:4px;background:linear-gradient(90deg,#34d399,#38bdf8,#a78bfa)"></div>
    <div style="padding:28px 28px 24px;color:#c4cad6;font-size:15px;line-height:1.6">${body}</div>
  </div>
</div>`;

function ownerEmail(v: ContactValues, subject: string) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px 8px 0;color:#6b7589;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:8px 0;color:#e8eaf0">${value}</td>
    </tr>`;

  return {
    subject: `[Portfolio] ${oneLine(subject)}`,
    text: [
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone}`,
      `Subject: ${subject}`,
      "",
      v.message,
    ].join("\n"),
    html: shell(`
      <p style="margin:0 0 4px;color:#34d399;font-size:12px;letter-spacing:2px;text-transform:uppercase">New enquiry</p>
      <h1 style="margin:0 0 20px;color:#e8eaf0;font-size:20px">${escapeHtml(subject)}</h1>
      <table style="border-collapse:collapse;width:100%;margin-bottom:20px">
        ${row("Name", escapeHtml(v.name))}
        ${row("Email", `<a href="mailto:${escapeHtml(v.email)}" style="color:#38bdf8">${escapeHtml(v.email)}</a>`)}
        ${row("Phone", `<a href="tel:${escapeHtml(v.phone.replace(/[^\d+]/g, ""))}" style="color:#38bdf8">${escapeHtml(v.phone)}</a>`)}
      </table>
      <div style="background:#09090b;border:1px solid #1f2937;border-radius:12px;padding:16px;white-space:pre-wrap;color:#e8eaf0">${escapeHtml(v.message)}</div>
      <p style="margin:20px 0 0;color:#6b7589;font-size:12px">Hit reply to answer ${escapeHtml(v.name)} directly.</p>
    `),
  };
}

function thankYouEmail(v: ContactValues) {
  const first = v.name.split(/\s+/)[0];
  return {
    subject: "Thanks for reaching out — Shabbir Thakur",
    text: [
      `Hi ${first},`,
      "",
      "Thanks for getting in touch! I've received your message and will get back to you within 24 hours.",
      "",
      "Here's a copy of what you sent:",
      "",
      v.message,
      "",
      "If it's urgent, you can also reach me on WhatsApp: https://wa.me/919882815441",
      "",
      "— Shabbir Thakur",
      "Full-Stack Developer",
    ].join("\n"),
    html: shell(`
      <h1 style="margin:0 0 12px;color:#e8eaf0;font-size:22px">Thanks, ${escapeHtml(first)}! 👋</h1>
      <p style="margin:0 0 16px">I've received your message and will get back to you <strong style="color:#e8eaf0">within 24 hours</strong>.</p>
      <p style="margin:0 0 8px;color:#6b7589;font-size:13px">Here's a copy of what you sent:</p>
      <div style="background:#09090b;border:1px solid #1f2937;border-radius:12px;padding:16px;white-space:pre-wrap;color:#a1a1aa;font-size:14px">${escapeHtml(v.message)}</div>
      <p style="margin:20px 0">If it's urgent, message me on
        <a href="https://wa.me/919882815441" style="color:#34d399">WhatsApp</a>.</p>
      <p style="margin:0;color:#e8eaf0">— Shabbir Thakur<br/><span style="color:#6b7589;font-size:13px">Full-Stack Developer</span></p>
    `),
  };
}

/* ── Handler ─────────────────────────────────────────────────────── */

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ status: "error", message: "Invalid request." }, 400);
  }

  // Honeypot — real visitors never see or fill this field.
  if (String(formData.get("company") ?? "")) {
    return json({ status: "success", message: "Thanks! Your message has been sent." });
  }

  const values = readContactForm(formData);
  const errors = validateContact(values);
  if (errors && Object.keys(errors).length > 0) {
    return json(
      { status: "error", message: "Please fix the highlighted fields.", errors, values },
      422,
    );
  }

  const mail = getTransport();
  if (!mail) {
    console.error("[contact] SMTP_USER / SMTP_PASS are not set");
    return json(
      {
        status: "error",
        message: "The message service isn't available right now. Please email me directly.",
        values,
      },
      503,
    );
  }

  const owner = process.env.CONTACT_TO_EMAIL ?? mail.user;
  const subject = values.subject || `New enquiry from ${values.name}`;
  const name = oneLine(values.name).replace(/"/g, "");

  // 1. Form data to me — this one has to succeed.
  try {
    await mail.transporter.sendMail({
      from: { name: "Portfolio Contact", address: mail.user },
      to: owner,
      replyTo: { name, address: values.email },
      ...ownerEmail(values, subject),
    });
  } catch (err) {
    console.error("[contact] failed to send owner email", err);
    return json(
      {
        status: "error",
        message: "Something went wrong sending your message. Please try again.",
        values,
      },
      502,
    );
  }

  // 2. Thank-you to the visitor — best effort; their message already reached me.
  try {
    await mail.transporter.sendMail({
      from: { name: "Shabbir Thakur", address: mail.user },
      to: { name, address: values.email },
      replyTo: owner,
      ...thankYouEmail(values),
    });
  } catch (err) {
    console.error("[contact] failed to send thank-you email", err);
  }

  return json({
    status: "success",
    message: "Thanks! Your message has been sent — check your inbox for a confirmation.",
  });
}
