// Shared by the contact form (client) and /api/contact (server).

export type ContactField = "name" | "email" | "phone" | "subject" | "message";

export type ContactValues = Record<ContactField, string>;

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<ContactField, string>>;
  /** submitted values, echoed back so the form keeps them on error */
  values?: Partial<ContactValues>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// digits with optional leading +, spaces, dashes, dots or brackets
const PHONE_RE = /^\+?[0-9\s\-().]{7,20}$/;

export function readContactForm(formData: FormData): ContactValues {
  const get = (key: string) => String(formData.get(key) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    subject: get("subject"),
    message: get("message"),
  };
}

export function validateContact(v: ContactValues): ContactState["errors"] {
  const errors: NonNullable<ContactState["errors"]> = {};

  if (v.name.length < 2) errors.name = "Please enter your name.";
  else if (v.name.length > 100) errors.name = "Name is too long.";

  if (!EMAIL_RE.test(v.email) || v.email.length > 254)
    errors.email = "Please enter a valid email.";

  const phoneDigits = v.phone.replace(/\D/g, "").length;
  if (!v.phone) errors.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(v.phone) || phoneDigits < 7 || phoneDigits > 15)
    errors.phone = "Please enter a valid phone number.";

  if (v.subject.length > 150) errors.subject = "Subject is too long.";

  if (v.message.length < 10)
    errors.message = "Message should be at least 10 characters.";
  else if (v.message.length > 5000) errors.message = "Message is too long.";

  return errors;
}
