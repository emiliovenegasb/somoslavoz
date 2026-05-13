import type { LeadFormKind } from "@/lib/lead-form"

type SheetPayload = {
  type: LeadFormKind
  name: string
  email: string
  phone: string
  message: string
  webhookSecret?: string
}

/**
 * Envía el registro a un Google Apps Script publicado como “aplicación web”
 * que hace `appendRow` en una hoja. Ver `scripts/sheet-webapp-append.gs`.
 */
export async function appendLeadToGoogleSheet(
  payload: Omit<SheetPayload, "webhookSecret">,
): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL?.trim()
  if (!url) {
    throw new Error("Falta GOOGLE_SHEETS_WEBAPP_URL")
  }

  const secret = process.env.GOOGLE_SHEETS_WEBAPP_SECRET?.trim()
  const body: SheetPayload = { ...payload }
  if (secret) {
    body.webhookSecret = secret
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const raw = await response.text()
  if (!response.ok) {
    throw new Error(`Webhook Sheet HTTP ${response.status}: ${raw.slice(0, 240)}`)
  }

  let data: { ok?: boolean; error?: string }
  try {
    data = JSON.parse(raw) as { ok?: boolean; error?: string }
  } catch {
    throw new Error("Respuesta inválida del webhook (no es JSON).")
  }

  if (data.ok === false) {
    throw new Error(data.error || "El script respondió con error.")
  }
}

export function isGoogleSheetWebhookConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SHEETS_WEBAPP_URL?.trim())
}
