import { NextResponse } from "next/server"
import { appendLeadToGoogleSheet, isGoogleSheetWebhookConfigured } from "@/lib/append-lead-to-sheet"
import { parseLeadFromJson } from "@/lib/lead-form"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const parsed = parseLeadFromJson(body)
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 })
    }

    if (!isGoogleSheetWebhookConfigured()) {
      return NextResponse.json(
        {
          error:
            "El formulario de contacto no está configurado. Añade GOOGLE_SHEETS_WEBAPP_URL en el servidor.",
        },
        { status: 503 },
      )
    }

    await appendLeadToGoogleSheet({
      type: "contact",
      name: parsed.lead.name,
      email: parsed.lead.email,
      phone: parsed.lead.phone,
      message: parsed.lead.message,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error en contacto / Sheet:", error)
    return NextResponse.json(
      { error: "No se pudo guardar tu mensaje por ahora. Intenta nuevamente." },
      { status: 500 },
    )
  }
}
