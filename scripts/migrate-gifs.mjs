/**
 * Descarga todos los GIFs de fitcron.com y los sube a Supabase Storage.
 * Descarga secuencial con pausa para evitar rate-limiting.
 *
 * Uso:
 *   node scripts/migrate-gifs.mjs
 *
 * Requiere en .env.local:
 *   VITE_SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))

// ── Leer .env.local ───────────────────────────────────────────────────────
const envPath = join(__dir, '..', '.env.local')
const envVars = Object.fromEntries(
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => [l.split('=')[0].trim(), l.split('=').slice(1).join('=').trim()])
)

const SUPABASE_URL = envVars['VITE_SUPABASE_URL']
const SERVICE_KEY  = envVars['SUPABASE_SERVICE_ROLE_KEY']
const BUCKET       = 'exercise-gifs'
const DELAY_MS     = 300  // pausa entre descargas

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌  Falta VITE_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/gif,image/*,*/*;q=0.8',
  'Accept-Language': 'es-ES,es;q=0.9',
  'Referer': 'https://fitcron.com/',
}

// ── Crear bucket si no existe ─────────────────────────────────────────────
async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets()
  if (!buckets?.find(b => b.name === BUCKET)) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true })
    if (error) { console.error('❌  Error creando bucket:', error.message); process.exit(1) }
    console.log(`✅  Bucket '${BUCKET}' creado`)
  } else {
    console.log(`ℹ️   Bucket '${BUCKET}' ya existe`)
  }
}

// ── Descargar un GIF con reintentos ──────────────────────────────────────
async function downloadGif(url, intentos = 4) {
  for (let i = 0; i < intentos; i++) {
    try {
      const res = await fetch(url, {
        headers: HEADERS,
        signal: AbortSignal.timeout(20000),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return Buffer.from(await res.arrayBuffer())
    } catch (e) {
      if (i === intentos - 1) throw e
      await new Promise(r => setTimeout(r, 1000 * (i + 2)))
    }
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// ── Main ──────────────────────────────────────────────────────────────────
const exercises = JSON.parse(
  readFileSync(join(__dir, '..', 'src', 'fitcron_exercises.json'), 'utf-8')
)

// Cargar JSON local si ya existe (para reanudar)
let localPath = join(__dir, '..', 'src', 'fitcron_exercises_local.json')
let updated
try {
  updated = JSON.parse(readFileSync(localPath, 'utf-8'))
  console.log('ℹ️   Reanudando desde fitcron_exercises_local.json existente')
} catch {
  updated = [...exercises]
}

await ensureBucket()

// Listar archivos ya subidos
const { data: existing } = await supabase.storage.from(BUCKET).list('', { limit: 10000 })
const uploaded = new Set((existing || []).map(f => f.name))
console.log(`ℹ️   ${uploaded.size} GIFs ya en Storage`)

const pending = exercises.filter(e => {
  if (!e.gif) return false
  const filename = e.gif.split('/').pop()
  return !uploaded.has(filename)
})

console.log(`🔄  ${pending.length} GIFs pendientes de subir\n`)

let done = 0, errors = 0

for (const ex of pending) {
  const filename = ex.gif.split('/').pop()

  try {
    const buffer = await downloadGif(ex.gif)
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, buffer, { contentType: 'image/gif', upsert: false })

    if (error && !error.message.includes('already exists')) throw error

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename)

    // Actualizar URL en el array
    const idx = updated.findIndex(e => e.gif === ex.gif)
    if (idx >= 0) updated[idx] = { ...updated[idx], gif: data.publicUrl }

    done++
    if (done % 10 === 0) {
      console.log(`   ✅  ${done}/${pending.length} subidos...`)
      // Guardar progreso parcial cada 10
      writeFileSync(localPath, JSON.stringify(updated, null, 2))
    }
  } catch (e) {
    console.error(`⚠️   ${filename}: ${e.message}`)
    errors++
  }

  await sleep(DELAY_MS)
}

// Guardar JSON final
writeFileSync(localPath, JSON.stringify(updated, null, 2))

console.log(`\n✅  Migración completada`)
console.log(`   Subidos esta ejecución: ${done}`)
console.log(`   Errores:                ${errors}`)
console.log(`   Total en Storage:       ${uploaded.size + done}`)
console.log(`\n👉  Cuando llegue a 750, cambia el import en App.jsx:`)
console.log(`   import fitcronEjercicios from './fitcron_exercises_local.json'`)
