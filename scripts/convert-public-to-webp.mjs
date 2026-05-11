/**
 * Convierte PNG/JPEG/GIF en `public/` a WebP y elimina el original.
 * Uso: node scripts/convert-public-to-webp.mjs
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, "..", "public")

const RASTER_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tif", ".tiff"])

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(full)
    else yield full
  }
}

let count = 0
for await (const file of walk(publicDir)) {
  const ext = path.extname(file).toLowerCase()
  if (!RASTER_EXT.has(ext)) continue
  const rel = path.relative(publicDir, file)
  const out = path.join(path.dirname(file), `${path.basename(file, path.extname(file))}.webp`)
  process.stdout.write(`${rel} → ${path.basename(out)}\n`)
  await sharp(file).webp({ quality: 86, effort: 4 }).toFile(out)
  await fs.unlink(file)
  count++
}
process.stdout.write(`Listo: ${count} archivo(s).\n`)
