export type LeadFormKind = "contact" | "prayer"

export type ParsedLead = {
  name: string
  email: string
  phone: string
  message: string
}

export function parseLeadFromJson(
  body: Record<string, unknown>,
): { ok: true; lead: ParsedLead } | { ok: false; error: string } {
  const name = String(body.name ?? "").trim()
  const email = String(body.email ?? "").trim()
  const phone = String(body.phone ?? "").trim()
  const message = String(body.message ?? "").trim()

  if (!name || !email || !message) {
    return { ok: false, error: "Nombre, correo y mensaje son obligatorios." }
  }

  return { ok: true, lead: { name, email, phone, message } }
}
