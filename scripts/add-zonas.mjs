/**
 * Añade campo `zona` a cada ejercicio en fitcron_exercises_local.json
 * inferido a partir del nombre + grupo muscular.
 *
 * Uso: node scripts/add-zonas.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const PATH   = join(__dir, '..', 'src', 'fitcron_exercises_local.json')

const exercises = JSON.parse(readFileSync(PATH, 'utf-8'))

// ── Reglas por músculo ────────────────────────────────────────────────────
// Cada regla es [zona, [...palabras_clave_en_nombre_lowercase]]
// Se evalúan en orden; gana la primera que hace match.

const REGLAS = {
  Pecho: [
    ['alto',    ['inclinado', 'incline', 'clavicular', 'upper']],
    ['bajo',    ['declinado', 'decline', 'abdominal']],
    ['interno', ['aperturas', 'fly', 'flye', 'cruce', 'crossover', 'pec deck', 'mariposa', 'butterfly', 'polea']],
    ['medio',   []],
  ],
  Hombros: [
    ['posterior', ['traseras', 'trasero', 'posterior', 'rear', 'inversa', 'inversas', 'pajaro', 'pájaro', 'face pull', 'inclinado', 'inclinada']],
    ['lateral',   ['lateral', 'laterales', 'upright', 'remo al menton', 'remo al mentón']],
    ['anterior',  ['frontal', 'frontales', 'front', 'press', 'arnold', 'militar', 'military', 'overhead', 'circular']],
    ['anterior',  []],
  ],
  Bíceps: [
    ['braquial',     ['inverso', 'invertido', 'reverse', 'cross body', 'cruzado', 'martillo', 'hammer']],
    ['cabeza_corta', ['concentrado', 'concentration', 'predicador', 'scott', 'polea', 'cable', 'cerrado', 'estrecho', 'close']],
    ['cabeza_larga', []],
  ],
  Tríceps: [
    ['cabeza_larga', ['francés', 'frances', 'french', 'sobre la cabeza', 'overhead', 'tumbado', 'lying', 'skull', 'trasfondo', 'trasfondo']],
    ['medial',       ['cerrado', 'close grip', 'fondos', 'dips', 'banco', 'bench']],
    ['lateral',      ['jalón', 'jalon', 'polea', 'pushdown', 'cable', 'cuerda', 'patada', 'kickback']],
    ['cabeza_larga', []],
  ],
  Espalda: [
    ['lumbar',    ['peso muerto', 'deadlift', 'hiperextensión', 'hiperextension', 'extensión lumbar', 'extension lumbar', 'buenos días', 'buenos dias', 'good morning']],
    ['trapecio',  ['encogimiento', 'shrug', 'remo al mentón', 'remo al menton', 'face pull']],
    ['dorsal',    ['jalón', 'jalon', 'dominada', 'pulldown', 'pull-down', 'pull down', 'chin up', 'chin-up', 'dorsal', 'lat']],
    ['romboides', ['remo', 'row', 'romboides', 'retracción', 'retraccion']],
    ['dorsal',    []],
  ],
  Pierna: [
    ['gemelos',         ['pantorrilla', 'gemelo', 'calf', 'soleo', 'sóleo']],
    ['gluteos',         ['hip thrust', 'puente de glúteo', 'puente de gluteo', 'patada trasera', 'abducción', 'abduccion', 'gluteo', 'glúteo', 'donkey', 'patada', 'kickback', 'sumo']],
    ['isquiotibiales',  ['curl femoral', 'peso muerto rumano', 'rumano', 'romanian', 'stiff', 'nordic', 'femoral', 'semitendinoso', 'leg curl']],
    ['cuadriceps',      ['sentadilla', 'squat', 'prensa', 'leg press', 'extensión de pierna', 'extension de pierna', 'leg extension', 'zancada', 'lunge', 'hack', 'búlgara', 'bulgara', 'step']],
    ['cuadriceps',      []],
  ],
  Abdominales: [
    ['oblicuos',   ['oblicuo', 'oblicua', 'lateral', 'giro', 'rotación', 'rotacion', 'twist', 'russian', 'leñador', 'woodchop', 'inclinación', 'inclinacion']],
    ['transverso', ['plancha', 'plank', 'hollow', 'vacío', 'vacio', 'bird dog', 'dead bug', 'rueda', 'ab wheel']],
    ['recto',      []],
  ],
  Lumbar: [
    ['lumbar', []],
  ],
  Antebrazos: [
    ['extensores', ['inverso', 'invertido', 'reverse', 'extensión', 'extension', 'extensor']],
    ['flexores',   []],
  ],
  Cuello: [
    ['cuello', []],
  ],
  Cardio: [
    ['cardio', []],
  ],
  Otros: [
    ['general', []],
  ],
}

function inferirZona(musculo, nombre) {
  const reglas = REGLAS[musculo] || [['general', []]]
  const n = nombre.toLowerCase()
  for (const [zona, keywords] of reglas) {
    if (keywords.length === 0) return zona   // default
    if (keywords.some(kw => n.includes(kw))) return zona
  }
  return 'general'
}

let stats = {}
const updated = exercises.map(ex => {
  const zona = inferirZona(ex.musculo, ex.nombre)
  stats[ex.musculo] = stats[ex.musculo] || {}
  stats[ex.musculo][zona] = (stats[ex.musculo][zona] || 0) + 1
  return { ...ex, zona }
})

writeFileSync(PATH, JSON.stringify(updated, null, 2))

console.log('✅ Zonas añadidas\n')
for (const [musculo, zonas] of Object.entries(stats)) {
  console.log(`  ${musculo}:`)
  for (const [zona, count] of Object.entries(zonas)) {
    console.log(`    ${zona}: ${count} ejercicios`)
  }
}
