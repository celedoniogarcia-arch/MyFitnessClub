/**
 * Genera iconos PNG para el manifest de la PWA.
 * Uso: node scripts/gen-icons.mjs
 */
import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const OUT   = join(__dir, '..', 'public')

// SVG del logo TrainClub: fondo morado, letra T donde la barra central son unas pesas
function makeSVG(size) {
  const pad  = Math.round(size * 0.12)
  const cx   = size / 2
  const cy   = size / 2

  // Proporciones
  const barH     = size * 0.09   // grosor barra vertical
  const barW     = size * 0.12   // grosor pilar vertical
  const topBarH  = size * 0.09   // grosor barra horizontal
  const topBarW  = size * 0.60   // ancho barra horizontal
  const dumbbellW = size * 0.68  // ancho total mancuerna (barra central de la T)
  const dumbbellH = size * 0.10  // alto mancuerna
  const plateW   = size * 0.09   // ancho disco
  const plateH   = size * 0.18   // alto disco

  // Posiciones
  const topBarY  = cy - size * 0.22  // barra superior de la T
  const midBarY  = cy + size * 0.04  // barra media (mancuerna)
  const stemX    = cx - barW / 2
  const stemY    = topBarY + topBarH
  const stemH    = midBarY + dumbbellH - stemY  // pilar hasta la mancuerna

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- Fondo con esquinas redondeadas -->
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#6366f1"/>

  <!-- Barra horizontal superior de la T -->
  <rect x="${cx - topBarW/2}" y="${topBarY}" width="${topBarW}" height="${topBarH}" rx="${topBarH/2}" fill="white"/>

  <!-- Pilar vertical de la T -->
  <rect x="${stemX}" y="${stemY}" width="${barW}" height="${stemH}" rx="${barW/2}" fill="white"/>

  <!-- Mancuerna (barra central = barra media de la T) -->
  <!-- barra central -->
  <rect x="${cx - dumbbellW/2 + plateW}" y="${midBarY}" width="${dumbbellW - plateW*2}" height="${dumbbellH}" rx="${dumbbellH/2}" fill="white"/>
  <!-- disco izquierdo -->
  <rect x="${cx - dumbbellW/2}" y="${midBarY - (plateH-dumbbellH)/2}" width="${plateW}" height="${plateH}" rx="${plateW*0.3}" fill="white"/>
  <!-- disco derecho -->
  <rect x="${cx + dumbbellW/2 - plateW}" y="${midBarY - (plateH-dumbbellH)/2}" width="${plateW}" height="${plateH}" rx="${plateW*0.3}" fill="white"/>
</svg>`
}

for (const size of [192, 512]) {
  const svg  = makeSVG(size)
  const buf  = Buffer.from(svg)
  const png  = await sharp(buf).png().toBuffer()
  const path = join(OUT, `icon-${size}.png`)
  writeFileSync(path, png)
  console.log(`✅ ${path} (${png.length} bytes)`)
}

// Apple touch icon (180x180)
const svgApple = makeSVG(180)
const pngApple = await sharp(Buffer.from(svgApple)).png().toBuffer()
writeFileSync(join(OUT, 'apple-touch-icon.png'), pngApple)
console.log(`✅ public/apple-touch-icon.png`)

console.log('\nIconos generados correctamente.')
