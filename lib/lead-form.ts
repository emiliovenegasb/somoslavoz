export type LeadFormKind = "contact" | "prayer"

export type ParsedLead = {
  name: string
  email: string
  phone: string
  message: string
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^\+?[0-9][0-9\s()-]{6,18}$/

function asCleanString(value: unknown): string | null {
  if (typeof value !== "string") return null
  return value
    .normalize("NFC")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim()
}

/** Evita que Google Sheets interprete el texto como una fórmula. */
function plainCell(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value
}

function limited(value: string, max: number, newlines: boolean): string | null {
  const collapsed = newlines
    ? value.replace(/[^\S\n]+/g, " ").replace(/\n{3,}/g, "\n\n").trim()
    : value.replace(/\s+/g, " ").trim()
  if (!collapsed || collapsed.length > max) return null
  return plainCell(collapsed)
}

export function parseLeadFromJson(
  body: Record<string, unknown>,
): { ok: true; lead: ParsedLead } | { ok: false; error: string } {
  const name = limited(asCleanString(body.name) ?? "", 80, false)
  const email = limited(asCleanString(body.email) ?? "", 120, false)
  const phoneRaw = asCleanString(body.phone) ?? ""
  const phone = phoneRaw ? limited(phoneRaw, 20, false) : ""
  const message = limited(asCleanString(body.message) ?? "", 2000, true)

  if (!name || name.length < 2) {
    return { ok: false, error: "Escribe tu nombre." }
  }
  if (!email || !EMAIL.test(email)) {
    return { ok: false, error: "Escribe un correo válido." }
  }
  if (phoneRaw && (!phone || !PHONE.test(phone.replace(/^'/, "")))) {
    return { ok: false, error: "El teléfono solo puede incluir números y un prefijo." }
  }
  if (!message || message.length < 8) {
    return { ok: false, error: "El mensaje es demasiado corto." }
  }

  return {
    ok: true,
    lead: { name, email: email.toLowerCase(), phone, message },
  }
}
