/**
 * One-off asset compressor for faster production loads.
 * Run: node scripts/optimize-assets.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve('asset')

/** Max width per folder (display size is much smaller; 2–3x retina is enough). */
const RULES = [
  { match: /projects[/\\]/i, width: 900, quality: 78 },
  { match: /education[/\\]/i, width: 700, quality: 80 },
  { match: /skill-bubble[/\\]/i, width: 320, quality: 80 },
  { match: /idle[/\\]/i, width: 640, quality: 85 },
  { match: /run[/\\]/i, width: 640, quality: 85 },
  { match: /sitting[/\\]/i, width: 640, quality: 85 },
  { match: /sushi[/\\]/i, width: 640, quality: 85 },
]

/** Line-art about assets must stay full-res; resizing destroys the strokes. */
const SKIP = [/aboutme[/\\]/i]

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (/\.png$/i.test(entry.name)) files.push(full)
  }
  return files
}

function ruleFor(file) {
  return RULES.find((rule) => rule.match.test(file)) ?? { width: 1200, quality: 80 }
}

async function optimize(file) {
  if (SKIP.some((pattern) => pattern.test(file))) {
    console.log(`skip  ${path.relative(ROOT, file)} (protected)`)
    const size = (await fs.stat(file)).size
    return { before: size, after: size }
  }

  const before = (await fs.stat(file)).size
  const { width, quality } = ruleFor(file)
  const input = await fs.readFile(file)
  const image = sharp(input, { failOn: 'none' })
  const meta = await image.metadata()

  let pipeline = sharp(input, { failOn: 'none' })
  if (meta.width && meta.width > width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true })
  }

  const output = await pipeline
    .png({
      compressionLevel: 9,
      quality,
      palette: false,
      effort: 10,
    })
    .toBuffer()

  // Keep original if compression somehow got larger.
  if (output.length >= before) {
    console.log(`skip  ${path.relative(ROOT, file)} (${(before / 1024).toFixed(0)} KB)`)
    return { before, after: before }
  }

  await fs.writeFile(file, output)
  console.log(
    `ok    ${path.relative(ROOT, file)}  ${(before / 1024).toFixed(0)} → ${(output.length / 1024).toFixed(0)} KB`,
  )
  return { before, after: output.length }
}

const files = await walk(ROOT)
let beforeTotal = 0
let afterTotal = 0

for (const file of files) {
  const { before, after } = await optimize(file)
  beforeTotal += before
  afterTotal += after
}

console.log(
  `\nTotal: ${(beforeTotal / 1024 / 1024).toFixed(2)} MB → ${(afterTotal / 1024 / 1024).toFixed(2)} MB`,
)
