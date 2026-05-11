import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type PrayerPayload = {
  name: string
  email: string
  phone?: string
  message: string
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Falta variable de entorno: ${name}`)
  }
  return value
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<PrayerPayload>
    const name = body.name?.trim() ?? ""
    const email = body.email?.trim() ?? ""
    const phone = body.phone?.trim() ?? ""
    const message = body.message?.trim() ?? ""

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, correo y petición son obligatorios." },
        { status: 400 },
      )
    }

    const smtpHost = getRequiredEnv("SMTP_HOST")
    const smtpPort = Number(getRequiredEnv("SMTP_PORT"))
    const smtpUser = getRequiredEnv("SMTP_USER")
    const smtpPass = getRequiredEnv("SMTP_PASS")
    const prayerToEmail = getRequiredEnv("PRAYER_REQUEST_TO_EMAIL")
    const mailFrom =
      process.env.PRAYER_FROM_EMAIL?.trim() || smtpUser

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: mailFrom,
      to: prayerToEmail,
      replyTo: email,
      subject: `Nueva petición de oración - ${name}`,
      text: [
        "Se recibió una nueva petición de oración:",
        "",
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Teléfono: ${phone || "-"}`,
        "",
        "Petición:",
        message,
      ].join("\n"),
      html: `
        <h2>Nueva petición de oración</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "-"}</p>
        <p><strong>Petición:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error enviando petición de oración:", error)
    return NextResponse.json(
      { error: "No se pudo enviar la petición por ahora." },
      { status: 500 },
    )
  }
}
