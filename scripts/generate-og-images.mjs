/**
 * Genera JPEG 1200×630 para Open Graph (WhatsApp y redes no muestran bien el WebP).
 * Uso: node scripts/generate-og-images.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, "..", "public")
const outDir = path.join(publicDir, "og")

const jobs = [
  ["images/fondo_main.webp", "inicio.jpg"],
  ["images/fondo_main.webp", "agenda.jpg"],
  ["images/fundadores.webp", "historia.jpg"],
  ["images/pastor-couple.webp", "pastores.jpg"],
  ["images/lo-que-creemos.webp", "creemos.jpg"],
  ["images/liderazgo.webp", "liderazgo.jpg"],
  ["images/kids.webp", "kids.jpg"],
  ["images/teens.webp", "teens.jpg"],
  ["images/jovenes.webp", "jovenes.jpg"],
  ["images/escogidas.webp", "escogidas.jpg"],
  ["images/red_hombres.webp", "red-hombres.jpg"],
  ["images/raices.webp", "raices.jpg"],
]

await fs.mkdir(outDir, { recursive: true })

for (const [src, name] of jobs) {
  const input = path.join(publicDir, src)
  const output = path.join(outDir, name)
  const info = await sharp(input)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 76, mozjpeg: true })
    .toFile(output)
  process.stdout.write(`${name} ${Math.round(info.size / 1024)} KB\n`)
}
