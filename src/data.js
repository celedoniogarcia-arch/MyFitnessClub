// tipo: 'peso'|'tiempo'|'reps'|'peso_reps'
// Días: principiante=Lun/Mié/Vie · intermedio=Lun/Mar/Jue/Vie · avanzado=Lun-Vie

const FC = 'https://fitcron.com/wp-content/uploads'
const G = {
  pb:   `${FC}/2021/03/00251301-Barbell-Bench-Press_Chest-FIX_720.gif`,
  pi:   `${FC}/2021/03/03241301-Dumbbell-Incline-Palm-in-Press_Chest_720.gif`,
  fo:   `${FC}/2021/03/02511301-Chest-Dip_Chest_720.gif`,
  ap:   `${FC}/2021/03/02271301-Cable-Standing-Fly_Chest_720.gif`,
  et:   `${FC}/2021/04/37191301-Cable-Standing-High-Cross-Triceps-Extension_Upper-Arms_720.gif`,
  pf:   `${FC}/2021/04/01861301-Cable-Lying-Triceps-Extension-II_Upper-Arms_720.gif`,
  jp:   `${FC}/2021/04/01971301-Cable-Pulldown-pro-lat-bar_Back_720.gif`,
  rb:   `${FC}/2021/04/00491301-Barbell-Incline-Row_Back_720.gif`,
  rs:   `${FC}/2021/04/01891301-Cable-One-Arm-Bent-over-Row_Back-FIX_720.gif`,
  je:   `${FC}/2021/04/26161301-Cable-Lateral-Pulldown-with-V-bar_Back_720.gif`,
  cb:   `${FC}/2021/04/04461301-EZ-Barbell-Close-grip-Curl_Upper-Arms_720-1.gif`,
  cm:   `${FC}/2021/04/02981301-Dumbbell-Cross-Body-Hammer-Curl_Forearms_720.gif`,
  sq:   `${FC}/2021/04/01241301-Barbell-Wide-Squat_Thighs_720.gif`,
  pr:   `${FC}/2021/04/07401301-Sled-45%C2%B0-Leg-Wide-Press_Thighs_720.gif`,
  pmr:  `${FC}/2021/04/00851301-Barbell-Romanian-Deadlift_Hips_720.gif`,
  cf:   `${FC}/2021/04/05861301-Lever-Lying-Leg-Curl_Thighs_720.gif`,
  ec:   `${FC}/2021/04/05851301-Lever-Leg-Extension_Thighs_720.gif`,
  gp:   `${FC}/2021/04/01081301-Barbell-Standing-Leg-Calf-Raise_Calf_720.gif`,
  pm:   `${FC}/2021/04/07881301-Standing-Behind-Neck-Press_Shoulders_720.gif`,
  el:   `${FC}/2021/04/03111301-Dumbbell-Full-Can-Lateral-Raise_Shoulders_720.gif`,
  pp:   `${FC}/2021/04/03781301-Dumbbell-Rear-Fly_Shoulders_720.gif`,
  fp:   `${FC}/2021/04/02201301-Cable-Shrug_Back_720.gif`,
  entr: `${FC}/2021/04/02201301-Cable-Shrug_Back_720.gif`,
  pl:   `${FC}/2021/04/04631301-Front-Plank_waist-FIX_720.gif`,
  crp:  `${FC}/2021/04/01741301-Cable-Judo-Flip_waist_720.gif`,
  evp:  `${FC}/2021/04/17641301-Hanging-Leg-Hip-Raise_Waist_720.gif`,
  sg:   `${FC}/2021/04/01241301-Barbell-Wide-Squat_Thighs_720.gif`,
  pman: `${FC}/2021/03/02891301-Dumbbell-Bench-Press_Chest_720.gif`,
  rman: `${FC}/2021/04/02921301-Dumbbell-Bent-over-Row_back_Back_720.gif`,
  pmk:  `${FC}/2021/04/00321301-Barbell-Deadlift_Hips-FIX_720.gif`,
  planv:`${FC}/2021/04/04631301-Front-Plank_waist-FIX_720.gif`,
}

export const CICLOS = [
  { id: 'hiper',     nombre: 'Hipertrofia', semanas: 4, color: '#6366f1', bg: '#eef2ff', descripcion: 'Volumen alto · 3–4 series · 8–12 reps · Descanso 60–90 seg', objetivo: 'Maximizar el volumen de trabajo para estimular el crecimiento muscular.' },
  { id: 'fuerza',    nombre: 'Fuerza',      semanas: 4, color: '#ef4444', bg: '#fef2f2', descripcion: 'Carga alta · 4–5 series · 4–6 reps · Descanso 2–3 min',       objetivo: 'Aumentar la fuerza máxima con pesos más elevados y menos repeticiones.' },
  { id: 'definicion',nombre: 'Definición',  semanas: 4, color: '#10b981', bg: '#ecfdf5', descripcion: 'Ritmo alto · 3 series · 12–20 reps · Descanso 45 seg',         objetivo: 'Quemar grasa preservando músculo con mayor densidad de trabajo.' },
  { id: 'deload',    nombre: 'Deload',      semanas: 1, color: '#f59e0b', bg: '#fffbeb', descripcion: 'Recuperación · 2–3 series · 50% del peso habitual',             objetivo: 'Semana de recuperación activa para superar la fatiga acumulada.' },
]

const MOD = {
  hiper:      { seriesMod: 0,  repsMod: '' },
  fuerza:     { seriesMod: +1, repsMod: '4–6' },
  definicion: { seriesMod: -1, repsMod: '12–20' },
  deload:     { seriesMod: -1, repsMod: 'deload' },
}

const USER_MOD = {
  perder:       { principiante: { seriesMod: -1, repsOverride: '12–15', tipExtra: 'Descanso 45-60s para mantener ritmo cardíaco elevado.' }, intermedio: { seriesMod: 0, repsOverride: '12–15', tipExtra: 'Supersets y descanso de 60s para mayor densidad metabólica.' }, avanzado: { seriesMod: 0, repsOverride: '10–15', tipExtra: 'Drop sets y tempo 3-0-1 para máxima densidad.' } },
  ganar:        { principiante: { seriesMod: -1, repsOverride: '8–12',  tipExtra: 'Progresión doble: completa todas las reps → sube el peso.' }, intermedio: { seriesMod: 0, repsOverride: '8–12',  tipExtra: 'RIR 2-3. Último set al fallo técnico.' }, avanzado: { seriesMod: +1, repsOverride: '6–10',  tipExtra: 'RIR 1. Añade rest-pause o myo-reps.' } },
  fuerza:       { principiante: { seriesMod: 0,  repsOverride: '5–8',   tipExtra: 'Foco en técnica perfecta. Descanso 2-3 min.' }, intermedio: { seriesMod: +1, repsOverride: '4–6',   tipExtra: 'Aumenta carga cada sesión. Descanso 3 min.' }, avanzado: { seriesMod: +1, repsOverride: '3–5',   tipExtra: 'Periodización ondulante: varía 3, 4 y 5 reps.' } },
  recomposicion:{ principiante: { seriesMod: -1, repsOverride: '10–15', tipExtra: 'Déficit calórico leve. Proteína ≥2g/kg.' }, intermedio: { seriesMod: 0, repsOverride: '8–12',  tipExtra: 'Alterna días de mayor y menor volumen.' }, avanzado: { seriesMod: 0, repsOverride: '6–12',  tipExtra: 'Bloques 3-4 sem: volumen + fuerza.' } },
}

// ─────────────────────────────────────────────────────────────────────────────
// PLANTILLAS POR OBJETIVO × NIVEL
// Reglas aplicadas (fuente: RP Strength + NSCA + Legion Athletics research):
//   · Principiante 3d (Lun/Mié/Vie): full body, cada músculo 3×/sem, ~3 sets/ses = 9/sem
//   · Intermedio   4d (Lun/Mar/Jue/Vie): upper-lower, 2×/sem, ~5 sets/ses = 10/sem
//   · Avanzado     5d (Lun-Vie): PPL, 2×/sem, ~7 sets/ses = 14/sem
//   · Burpees = cardio, NO series de fuerza
//   · Máx 6-8 sets directos por músculo por sesión
//   · Sin ejercicios redundantes en la misma sesión (ej. peso muerto + RDL)
// ─────────────────────────────────────────────────────────────────────────────

// ── PERDER GRASA ──────────────────────────────────────────────────────────────

const PERDER_PRINCIPIANTE = [
  {
    id: 'lunes', nombre: 'Lunes', enfoque: 'Full Body A — Tren superior + cardio', color: '#10b981', bg: '#ecfdf5', emoji: '🔥',
    cardio: 'Caminata inclinada 10% – 20 min al finalizar (zona 2, 65-70% FCmax)',
    ejercicios: [
      { id: 'sg',   nombre: 'Sentadilla goblet',         musculo: 'Cuádriceps, glúteos',   series: 3, reps: '12',  tipo: 'peso',   gif: G.sg,   tip: 'Kettlebell al pecho, pecho erguido. Muslo paralelo al suelo.', alternativas: [{ nombre: 'Sentadilla con peso corporal', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pman', nombre: 'Press mancuernas banco',    musculo: 'Pecho (fibras medias)', series: 3, reps: '12',  tipo: 'peso',   gif: G.pman, tip: 'Baja 2 seg, empuja sin impulso. Pecho completo.', alternativas: [{ nombre: 'Flexiones en suelo', musculo: 'Pecho' }] },
      { id: 'rman', nombre: 'Remo mancuerna unilateral', musculo: 'Espalda media',         series: 3, reps: '12',  tipo: 'peso',   gif: G.rman, tip: 'Apóyate en el banco. Codo pegado, tira hacia la cadera.', alternativas: [{ nombre: 'Remo con banda elástica', musculo: 'Espalda' }] },
      { id: 'el',   nombre: 'Elevaciones laterales',     musculo: 'Deltoides lateral',     series: 2, reps: '15',  tipo: 'peso',   gif: G.el,   tip: 'Peso ligero, pulgares abajo. No subas más de 90°.', alternativas: [{ nombre: 'Elevaciones con banda', musculo: 'Hombros' }] },
      { id: 'pl',   nombre: 'Plancha isométrica',        musculo: 'Core completo',         series: 3, reps: '30',  tipo: 'tiempo', gif: G.pl,   tip: 'Cuerpo recto, glúteos apretados. Respira controlado.', alternativas: [{ nombre: 'Plancha sobre rodillas', musculo: 'Core' }] },
    ]
  },
  {
    id: 'miercoles', nombre: 'Miércoles', enfoque: 'Full Body B — Tren inferior + core', color: '#10b981', bg: '#ecfdf5', emoji: '🦵',
    cardio: 'Bicicleta estática – 20 min ritmo constante al 65-70% FCmax',
    ejercicios: [
      { id: 'pr',   nombre: 'Prensa 45°',                musculo: 'Cuádriceps, glúteos',   series: 3, reps: '15',  tipo: 'peso',   gif: G.pr,   tip: 'No bloquees rodillas. Rango completo de movimiento.', alternativas: [{ nombre: 'Zancadas con mancuernas', musculo: 'Cuádriceps' }] },
      { id: 'pmr',  nombre: 'Peso muerto rumano',        musculo: 'Isquiotibiales, glúteos',series:3, reps: '12',  tipo: 'peso',   gif: G.pmr,  tip: 'Bisagra de cadera. Espalda neutra, barra cerca del cuerpo.', alternativas: [{ nombre: 'Peso muerto rumano con mancuernas', musculo: 'Isquiotibiales' }] },
      { id: 'pi',   nombre: 'Press inclinado mancuernas',musculo: 'Pecho (parte superior)',series: 3, reps: '12',  tipo: 'peso',   gif: G.pi,   tip: 'Banco a 30°. Codos a 45° del cuerpo, no en ángulo recto.', alternativas: [{ nombre: 'Flexiones con pies elevados', musculo: 'Pecho superior' }] },
      { id: 'jp',   nombre: 'Jalón al pecho (polea)',    musculo: 'Dorsal ancho',          series: 3, reps: '12',  tipo: 'peso',   gif: G.jp,   tip: 'Tira hacia la clavícula. Pecho erguido, no te balancees.', alternativas: [{ nombre: 'Jalón con banda', musculo: 'Dorsal' }] },
      { id: 'crp',  nombre: 'Crunch en polea',           musculo: 'Abdominales',           series: 3, reps: '15',  tipo: 'peso',   gif: G.crp,  tip: 'Contrae hacia las rodillas. No uses el cuello.', alternativas: [{ nombre: 'Crunch en suelo', musculo: 'Abdominales' }] },
      { id: 'gp',   nombre: 'Gemelos de pie',            musculo: 'Gemelos',               series: 3, reps: '20',  tipo: 'peso',   gif: G.gp,   tip: 'Rango completo. Aguanta 1 seg arriba.', alternativas: [{ nombre: 'Elevación de talones sentado', musculo: 'Sóleo' }] },
    ]
  },
  {
    id: 'viernes', nombre: 'Viernes', enfoque: 'Full Body C — Hinge + Pull + Core', color: '#10b981', bg: '#ecfdf5', emoji: '💪',
    cardio: 'HIIT en cinta – 15 min (1 min al 85% FCmax / 2 min suave × 5 rondas)',
    ejercicios: [
      { id: 'cf',   nombre: 'Curl femoral tumbado',      musculo: 'Isquiotibiales',        series: 3, reps: '12',  tipo: 'peso',   gif: G.cf,   tip: 'No levantes las caderas. Aprieta al final del recorrido.', alternativas: [{ nombre: 'Curl femoral de pie', musculo: 'Isquiotibiales' }] },
      { id: 'ec',   nombre: 'Extensión de cuádriceps',   musculo: 'Cuádriceps (aislado)',  series: 3, reps: '15',  tipo: 'peso',   gif: G.ec,   tip: 'Control total en la bajada. No uses impulso.', alternativas: [{ nombre: 'Sentadilla con silla', musculo: 'Cuádriceps' }] },
      { id: 'rs',   nombre: 'Remo sentado en polea',     musculo: 'Espalda media',         series: 3, reps: '12',  tipo: 'peso',   gif: G.rs,   tip: 'No te balancees. Codos pegados, tira al ombligo.', alternativas: [{ nombre: 'Remo en máquina', musculo: 'Espalda media' }] },
      { id: 'pp',   nombre: 'Pájaros con mancuernas',    musculo: 'Deltoides posterior',   series: 2, reps: '15',  tipo: 'peso',   gif: G.pp,   tip: 'Inclinado hacia adelante. Alas abiertas, codos semiflexionados.', alternativas: [{ nombre: 'Face pull con banda', musculo: 'Deltoides posterior' }] },
      { id: 'evp',  nombre: 'Elevación de piernas',      musculo: 'Abdomen inferior',      series: 3, reps: '12',  tipo: 'reps',   gif: G.evp,  tip: 'Sube lento, baja más lento todavía. Abdomen contraído.', alternativas: [{ nombre: 'Elevación de rodillas tumbado', musculo: 'Abdomen inferior' }] },
    ]
  },
]

const PERDER_INTERMEDIO = [
  {
    id: 'lunes', nombre: 'Lunes', enfoque: 'Upper A — Push + Bíceps', color: '#10b981', bg: '#ecfdf5', emoji: '💪',
    cardio: 'Caminata inclinada 10 min antes como calentamiento activo',
    ejercicios: [
      { id: 'pb',   nombre: 'Press banca plano',         musculo: 'Pecho (fibras medias)', series: 4, reps: '12',  tipo: 'peso',   gif: G.pb,   tip: 'Escápulas juntas, arco técnico. Carga moderada, reps altas para definición.', alternativas: [{ nombre: 'Press mancuernas banco', musculo: 'Pecho' }] },
      { id: 'pi',   nombre: 'Press inclinado mancuernas',musculo: 'Pecho (parte superior)',series: 3, reps: '12',  tipo: 'peso',   gif: G.pi,   tip: 'Banco 30°. Descanso 60s para mantener ritmo cardíaco.', alternativas: [{ nombre: 'Press inclinado en máquina', musculo: 'Pecho superior' }] },
      { id: 'pm',   nombre: 'Press militar mancuernas',  musculo: 'Deltoides anterior',    series: 3, reps: '12',  tipo: 'peso',   gif: G.pm,   tip: 'Core tenso. No arquees la espalda.', alternativas: [{ nombre: 'Press Arnold', musculo: 'Hombros completo' }] },
      { id: 'el',   nombre: 'Elevaciones laterales',     musculo: 'Deltoides lateral',     series: 3, reps: '15',  tipo: 'peso',   gif: G.el,   tip: 'Peso ligero, muchas reps. Superset con press para mayor gasto calórico.', alternativas: [{ nombre: 'Elevaciones en polea', musculo: 'Deltoides lateral' }] },
      { id: 'et',   nombre: 'Extensión tríceps polea',   musculo: 'Tríceps (cabeza lateral)',series:3, reps: '15', tipo: 'peso',   gif: G.et,   tip: 'Codos pegados. Extiende completamente, no uses impulso.', alternativas: [{ nombre: 'Fondos en banco', musculo: 'Tríceps' }] },
      { id: 'cb',   nombre: 'Curl bíceps barra EZ',      musculo: 'Bíceps (cabeza larga)', series: 3, reps: '15',  tipo: 'peso',   gif: G.cb,   tip: 'No balancees. Superset con tríceps para mayor densidad.', alternativas: [{ nombre: 'Curl con mancuernas', musculo: 'Bíceps' }] },
    ]
  },
  {
    id: 'martes', nombre: 'Martes', enfoque: 'Lower A — Cuádriceps + Glúteos', color: '#f97316', bg: '#fff7ed', emoji: '🦵',
    cardio: 'Bicicleta estática – 20 min zona 2 (65-70% FCmax) al finalizar',
    ejercicios: [
      { id: 'sq',   nombre: 'Sentadilla con barra',      musculo: 'Cuádriceps, glúteos',   series: 4, reps: '12',  tipo: 'peso',   gif: G.sq,   tip: 'Muslo paralelo. Descanso 75s para mantener ritmo metabólico.', alternativas: [{ nombre: 'Sentadilla goblet', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pr',   nombre: 'Prensa 45° pies altos',    musculo: 'Cuádriceps, glúteos',   series: 3, reps: '15',  tipo: 'peso',   gif: G.pr,   tip: 'Pies altos para mayor activación de glúteos. Reps altas.', alternativas: [{ nombre: 'Zancadas caminando', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'cf',   nombre: 'Curl femoral tumbado',      musculo: 'Isquiotibiales',        series: 3, reps: '15',  tipo: 'peso',   gif: G.cf,   tip: 'No levantes caderas. Control total.', alternativas: [{ nombre: 'Curl femoral de pie', musculo: 'Isquiotibiales' }] },
      { id: 'ec',   nombre: 'Extensión cuádriceps',      musculo: 'Cuádriceps (aislado)',  series: 3, reps: '20',  tipo: 'peso',   gif: G.ec,   tip: 'Reps altas para máxima quema local. Sin impulso.', alternativas: [{ nombre: 'Sentadilla con salto suave', musculo: 'Cuádriceps' }] },
      { id: 'gp',   nombre: 'Gemelos de pie',            musculo: 'Gemelos',               series: 4, reps: '20',  tipo: 'peso',   gif: G.gp,   tip: '20 reps lentas. Pausa 1 seg arriba, estira abajo.', alternativas: [{ nombre: 'Elevación de talones sentado', musculo: 'Sóleo' }] },
    ]
  },
  {
    id: 'jueves', nombre: 'Jueves', enfoque: 'Upper B — Pull + Hombros posteriores', color: '#10b981', bg: '#ecfdf5', emoji: '🔙',
    cardio: 'Elíptica o remo – 15 min ritmo moderado al acabar',
    ejercicios: [
      { id: 'jp',   nombre: 'Jalón al pecho',            musculo: 'Dorsal ancho',          series: 4, reps: '12',  tipo: 'peso',   gif: G.jp,   tip: 'Tira hacia la clavícula. Pecho erguido. Descanso 60s.', alternativas: [{ nombre: 'Dominadas asistidas', musculo: 'Dorsal' }] },
      { id: 'rb',   nombre: 'Remo con barra',            musculo: 'Espesor de espalda',    series: 3, reps: '12',  tipo: 'peso',   gif: G.rb,   tip: 'Espalda paralela al suelo. Tira al ombligo.', alternativas: [{ nombre: 'Remo mancuerna unilateral', musculo: 'Espalda media' }] },
      { id: 'rs',   nombre: 'Remo sentado polea',        musculo: 'Espalda media',         series: 3, reps: '15',  tipo: 'peso',   gif: G.rs,   tip: 'No te balancees. 15 reps controladas.', alternativas: [{ nombre: 'Remo en máquina', musculo: 'Espalda media' }] },
      { id: 'pp',   nombre: 'Pájaros con mancuernas',    musculo: 'Deltoides posterior',   series: 3, reps: '15',  tipo: 'peso',   gif: G.pp,   tip: 'Ligera flexión de codos. Mueve como alas.', alternativas: [{ nombre: 'Face pull con cuerda', musculo: 'Deltoides posterior' }] },
      { id: 'cm',   nombre: 'Curl martillo',             musculo: 'Bíceps (braquial)',     series: 3, reps: '15',  tipo: 'peso',   gif: G.cm,   tip: 'Agarre neutro. Trabaja braquial y supinador.', alternativas: [{ nombre: 'Curl martillo en polea', musculo: 'Braquial' }] },
      { id: 'pf',   nombre: 'Press francés mancuernas',  musculo: 'Tríceps (cabeza larga)',series: 3, reps: '15',  tipo: 'peso',   gif: G.pf,   tip: 'Codos al techo. Contrae tríceps al extender.', alternativas: [{ nombre: 'Extensión sobre cabeza en polea', musculo: 'Tríceps' }] },
    ]
  },
  {
    id: 'viernes', nombre: 'Viernes', enfoque: 'Lower B — Isquios + Core + HIIT', color: '#f97316', bg: '#fff7ed', emoji: '🔥',
    cardio: 'HIIT final – 15 min (20s sprint / 40s caminata × 15 rondas). Sin pesas en cardio.',
    ejercicios: [
      { id: 'pmr',  nombre: 'Peso muerto rumano',        musculo: 'Isquiotibiales, glúteos',series:4, reps: '12',  tipo: 'peso',   gif: G.pmr,  tip: 'Bisagra de cadera. Siente el estiramiento en isquios. Espalda neutra.', alternativas: [{ nombre: 'Peso muerto rumano con mancuernas', musculo: 'Isquiotibiales' }] },
      { id: 'sg',   nombre: 'Sentadilla goblet',         musculo: 'Cuádriceps, glúteos',   series: 3, reps: '15',  tipo: 'peso',   gif: G.sg,   tip: 'Complemento a sentadilla con barra del martes. Reps altas.', alternativas: [{ nombre: 'Sentadilla con peso corporal', musculo: 'Cuádriceps' }] },
      { id: 'pl',   nombre: 'Plancha isométrica',        musculo: 'Core completo',         series: 3, reps: '45',  tipo: 'tiempo', gif: G.pl,   tip: 'Glúteos apretados, cuerpo en línea recta. Respira.', alternativas: [{ nombre: 'Plancha sobre rodillas', musculo: 'Core' }] },
      { id: 'crp',  nombre: 'Crunch en polea',           musculo: 'Abdominales',           series: 3, reps: '20',  tipo: 'peso',   gif: G.crp,  tip: 'Contrae fuerte. 20 reps rápidas para mantener ritmo.', alternativas: [{ nombre: 'Crunch en suelo', musculo: 'Abdominales' }] },
      { id: 'evp',  nombre: 'Elevación de piernas',      musculo: 'Abdomen inferior',      series: 3, reps: '15',  tipo: 'reps',   gif: G.evp,  tip: 'Lento y controlado. Abdomen apretado todo el recorrido.', alternativas: [{ nombre: 'Elevación de rodillas', musculo: 'Abdomen inferior' }] },
    ]
  },
]

const PERDER_AVANZADO = [
  {
    id: 'lunes', nombre: 'Lunes', enfoque: 'Push — Pecho + Hombros + Tríceps', color: '#10b981', bg: '#ecfdf5', emoji: '💪',
    cardio: 'Caminata inclinada – 10 min calentamiento activo',
    ejercicios: [
      { id: 'pb',   nombre: 'Press banca plano',         musculo: 'Pecho (fibras medias)', series: 4, reps: '12',  tipo: 'peso',   gif: G.pb,   tip: 'Arco técnico, escápulas juntas. Carga moderada-alta con reps de definición.', alternativas: [{ nombre: 'Press mancuernas', musculo: 'Pecho' }] },
      { id: 'pi',   nombre: 'Press inclinado mancuernas',musculo: 'Pecho (parte superior)',series: 3, reps: '12',  tipo: 'peso',   gif: G.pi,   tip: 'Banco 30°. Pausa 1 seg abajo para mayor tensión.', alternativas: [{ nombre: 'Press inclinado barra', musculo: 'Pecho superior' }] },
      { id: 'pm',   nombre: 'Press militar barra de pie',musculo: 'Deltoides anterior',    series: 4, reps: '12',  tipo: 'peso',   gif: G.pm,   tip: 'De pie para máxima activación de core. No arquees la espalda.', alternativas: [{ nombre: 'Press Arnold sentado', musculo: 'Hombros completo' }] },
      { id: 'el',   nombre: 'Elevaciones laterales',     musculo: 'Deltoides lateral',     series: 4, reps: '15',  tipo: 'peso',   gif: G.el,   tip: 'Drop set en la última serie: peso normal + reducción 30% al fallo.', alternativas: [{ nombre: 'Elevaciones en polea', musculo: 'Deltoides lateral' }] },
      { id: 'et',   nombre: 'Extensión tríceps polea',   musculo: 'Tríceps (cabeza lateral)',series:3, reps: '15', tipo: 'peso',   gif: G.et,   tip: 'Superset con bíceps del día pull para mayor quema calórica.', alternativas: [{ nombre: 'Fondos en paralelas', musculo: 'Tríceps' }] },
      { id: 'pf',   nombre: 'Press francés',             musculo: 'Tríceps (cabeza larga)',series: 3, reps: '12',  tipo: 'peso',   gif: G.pf,   tip: 'Barra EZ, codos al techo. Último ejercicio del día.', alternativas: [{ nombre: 'Extensión sobre cabeza mancuerna', musculo: 'Tríceps' }] },
    ]
  },
  {
    id: 'martes', nombre: 'Martes', enfoque: 'Pull — Espalda + Bíceps + Posterior', color: '#10b981', bg: '#ecfdf5', emoji: '🔙',
    cardio: 'Bicicleta HIIT – 15 min (30s al 90% / 60s suave × 10) al finalizar',
    ejercicios: [
      { id: 'jp',   nombre: 'Jalón al pecho',            musculo: 'Dorsal ancho',          series: 4, reps: '12',  tipo: 'peso',   gif: G.jp,   tip: 'Tira hacia la clavícula. Pecho erguido. Descanso 60s.', alternativas: [{ nombre: 'Dominadas con banda asistida', musculo: 'Dorsal' }] },
      { id: 'rb',   nombre: 'Remo con barra',            musculo: 'Espesor de espalda',    series: 4, reps: '12',  tipo: 'peso',   gif: G.rb,   tip: 'Espalda paralela al suelo. Tira al ombligo. Pausa en el top.', alternativas: [{ nombre: 'Remo mancuerna unilateral', musculo: 'Espalda media' }] },
      { id: 'rs',   nombre: 'Remo sentado polea',        musculo: 'Espalda media',         series: 3, reps: '15',  tipo: 'peso',   gif: G.rs,   tip: '15 reps controladas. No te balancees.', alternativas: [{ nombre: 'Remo máquina', musculo: 'Espalda media' }] },
      { id: 'pp',   nombre: 'Pájaros con mancuernas',    musculo: 'Deltoides posterior',   series: 3, reps: '15',  tipo: 'peso',   gif: G.pp,   tip: 'Salud del manguito rotador = clave para perder grasa sin lesiones.', alternativas: [{ nombre: 'Face pull cuerda', musculo: 'Deltoides posterior' }] },
      { id: 'cb',   nombre: 'Curl bíceps barra EZ',      musculo: 'Bíceps (cabeza larga)', series: 3, reps: '15',  tipo: 'peso',   gif: G.cb,   tip: 'No balancees. Aprieta en el top.', alternativas: [{ nombre: 'Curl con mancuernas', musculo: 'Bíceps' }] },
      { id: 'cm',   nombre: 'Curl martillo',             musculo: 'Bíceps (braquial)',     series: 3, reps: '15',  tipo: 'peso',   gif: G.cm,   tip: 'Agarre neutro. Superset con curl normal para mayor bombeo.', alternativas: [{ nombre: 'Curl martillo en polea', musculo: 'Braquial' }] },
    ]
  },
  {
    id: 'miercoles', nombre: 'Miércoles', enfoque: 'Lower — Pierna Completa', color: '#f97316', bg: '#fff7ed', emoji: '🦵',
    cardio: 'Caminata inclinada – 20 min zona 2 al finalizar (no HIIT: piernas ya trabajadas)',
    ejercicios: [
      { id: 'sq',   nombre: 'Sentadilla con barra',      musculo: 'Cuádriceps, glúteos',   series: 4, reps: '12',  tipo: 'peso',   gif: G.sq,   tip: 'Reps altas para definición. Descanso 75s máximo.', alternativas: [{ nombre: 'Sentadilla goblet', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pr',   nombre: 'Prensa 45°',                musculo: 'Cuádriceps, glúteos',   series: 3, reps: '15',  tipo: 'peso',   gif: G.pr,   tip: 'Pies altos para glúteo. No bloquees rodillas.', alternativas: [{ nombre: 'Zancadas caminando', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pmr',  nombre: 'Peso muerto rumano',        musculo: 'Isquiotibiales, glúteos',series:3, reps: '12',  tipo: 'peso',   gif: G.pmr,  tip: 'Bisagra de cadera. Espalda neutra, siente el estiramiento.', alternativas: [{ nombre: 'RDL con mancuernas', musculo: 'Isquiotibiales' }] },
      { id: 'cf',   nombre: 'Curl femoral tumbado',      musculo: 'Isquiotibiales',        series: 3, reps: '15',  tipo: 'peso',   gif: G.cf,   tip: 'No levantes caderas. Control total en la bajada.', alternativas: [{ nombre: 'Curl femoral de pie', musculo: 'Isquiotibiales' }] },
      { id: 'gp',   nombre: 'Gemelos de pie',            musculo: 'Gemelos',               series: 4, reps: '20',  tipo: 'peso',   gif: G.gp,   tip: 'Rango completo. Estira en el fondo, aguanta 1s arriba.', alternativas: [{ nombre: 'Gemelos en prensa', musculo: 'Gemelos/Sóleo' }] },
    ]
  },
  {
    id: 'jueves', nombre: 'Jueves', enfoque: 'Upper C — Segunda estimulación + Core', color: '#10b981', bg: '#ecfdf5', emoji: '⚡',
    cardio: 'Elíptica – 15 min ritmo constante al finalizar',
    ejercicios: [
      { id: 'pman', nombre: 'Press mancuernas banco',    musculo: 'Pecho (fibras medias)', series: 3, reps: '15',  tipo: 'peso',   gif: G.pman, tip: 'Segunda sesión de pecho esta semana. Mayor RIR, más reps.', alternativas: [{ nombre: 'Flexiones', musculo: 'Pecho' }] },
      { id: 'rman', nombre: 'Remo mancuerna unilateral', musculo: 'Espalda media',         series: 3, reps: '15',  tipo: 'peso',   gif: G.rman, tip: 'Segunda sesión de espalda. Enfoca en la conexión muscular.', alternativas: [{ nombre: 'Remo con banda', musculo: 'Espalda' }] },
      { id: 'je',   nombre: 'Jalón agarre estrecho',     musculo: 'Dorsal y bíceps',       series: 3, reps: '15',  tipo: 'peso',   gif: G.je,   tip: 'Agarre neutro. Lleva codos hacia las caderas.', alternativas: [{ nombre: 'Dominadas agarre estrecho', musculo: 'Dorsal/Bíceps' }] },
      { id: 'fp',   nombre: 'Face pull en polea',        musculo: 'Rotadores, trapecio',   series: 3, reps: '20',  tipo: 'peso',   gif: G.fp,   tip: 'Salud del hombro. Codos arriba, polea a altura de ojos.', alternativas: [{ nombre: 'Rotaciones externas banda', musculo: 'Manguito rotador' }] },
      { id: 'pl',   nombre: 'Plancha isométrica',        musculo: 'Core completo',         series: 3, reps: '45',  tipo: 'tiempo', gif: G.pl,   tip: 'Core fuerte = mejor transferencia a todos los ejercicios.', alternativas: [{ nombre: 'Plancha lateral alternada', musculo: 'Oblicuos' }] },
      { id: 'evp',  nombre: 'Elevación de piernas',      musculo: 'Abdomen inferior',      series: 3, reps: '15',  tipo: 'reps',   gif: G.evp,  tip: 'Sube lento y baja más lento. Sin balanceo.', alternativas: [{ nombre: 'Elevación de rodillas colgado', musculo: 'Abdomen inferior' }] },
    ]
  },
  {
    id: 'viernes', nombre: 'Viernes', enfoque: 'Lower B — Isquios + Glúteos + HIIT', color: '#f97316', bg: '#fff7ed', emoji: '🔥',
    cardio: 'HIIT final – 20 min (1 min al 85% / 2 min suave × 7 rondas). Los burpees van aquí, no en series.',
    ejercicios: [
      { id: 'sg',   nombre: 'Sentadilla goblet',         musculo: 'Cuádriceps, glúteos',   series: 3, reps: '15',  tipo: 'peso',   gif: G.sg,   tip: 'Segunda sesión de pierna. Menos carga, más reps para definición.', alternativas: [{ nombre: 'Sentadilla con peso corporal', musculo: 'Cuádriceps' }] },
      { id: 'ec',   nombre: 'Extensión cuádriceps',      musculo: 'Cuádriceps (aislado)',  series: 3, reps: '20',  tipo: 'peso',   gif: G.ec,   tip: 'Aislamiento para quemar localmente. 20 reps lentas.', alternativas: [{ nombre: 'Sentadilla con salto controlado', musculo: 'Cuádriceps' }] },
      { id: 'entr', nombre: 'Encogimientos trapecio',    musculo: 'Trapecio',              series: 3, reps: '15',  tipo: 'peso',   gif: G.entr, tip: 'Hombros hacia las orejas. Pausa arriba.', alternativas: [{ nombre: 'Encogimientos con barra', musculo: 'Trapecio' }] },
      { id: 'crp',  nombre: 'Crunch en polea',           musculo: 'Abdominales',           series: 3, reps: '20',  tipo: 'peso',   gif: G.crp,  tip: 'Contrae hacia las rodillas. Sin usar el cuello.', alternativas: [{ nombre: 'Crunch en suelo', musculo: 'Abdominales' }] },
    ]
  },
]

// ── GANAR MÚSCULO ─────────────────────────────────────────────────────────────

const GANAR_PRINCIPIANTE = [
  {
    id: 'lunes', nombre: 'Lunes', enfoque: 'Full Body A — Sentadilla + Push + Pull', color: '#6366f1', bg: '#eef2ff', emoji: '💪',
    cardio: 'Caminata 8-10 min de calentamiento. Mínimo cardio: el objetivo es ganar músculo.',
    ejercicios: [
      { id: 'sg',   nombre: 'Sentadilla goblet',         musculo: 'Cuádriceps, glúteos',   series: 3, reps: '8–12', tipo: 'peso',   gif: G.sg,   tip: 'Aprender el patrón correctamente es lo más importante. Sin peso hasta dominar la técnica.', alternativas: [{ nombre: 'Sentadilla con peso corporal', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pman', nombre: 'Press mancuernas banco',    musculo: 'Pecho (fibras medias)', series: 3, reps: '8–12', tipo: 'peso',   gif: G.pman, tip: 'Baja 2 seg, pausa leve en el pecho, sube explosivo. Progresión doble.', alternativas: [{ nombre: 'Flexiones en suelo', musculo: 'Pecho' }] },
      { id: 'rman', nombre: 'Remo mancuerna unilateral', musculo: 'Espalda media',         series: 3, reps: '8–12', tipo: 'peso',   gif: G.rman, tip: 'Codo pegado al cuerpo. Cuando completes 12 reps todas las series, sube el peso.', alternativas: [{ nombre: 'Remo en máquina', musculo: 'Espalda media' }] },
      { id: 'et',   nombre: 'Extensión tríceps polea',   musculo: 'Tríceps (cabeza lateral)',series:2, reps: '12',  tipo: 'peso',   gif: G.et,   tip: 'Aislamiento de tríceps. Codos fijos.', alternativas: [{ nombre: 'Fondos en banco', musculo: 'Tríceps' }] },
      { id: 'pl',   nombre: 'Plancha isométrica',        musculo: 'Core completo',         series: 2, reps: '30',  tipo: 'tiempo', gif: G.pl,   tip: 'Core fuerte = más fuerza en todos los ejercicios.', alternativas: [{ nombre: 'Plancha sobre rodillas', musculo: 'Core' }] },
    ]
  },
  {
    id: 'miercoles', nombre: 'Miércoles', enfoque: 'Full Body B — Bisagra + Press + Jalón', color: '#6366f1', bg: '#eef2ff', emoji: '🔙',
    cardio: 'Caminata 8-10 min calentamiento.',
    ejercicios: [
      { id: 'pmr',  nombre: 'Peso muerto rumano mancuernas', musculo: 'Isquiotibiales, glúteos', series: 3, reps: '8–12', tipo: 'peso', gif: G.pmr, tip: 'Bisagra de cadera perfecta. Mancuernas para aprender el patrón sin riesgo de espalda.', alternativas: [{ nombre: 'Good morning con banda', musculo: 'Isquiotibiales' }] },
      { id: 'pi',   nombre: 'Press inclinado mancuernas',musculo: 'Pecho (parte superior)',series: 3, reps: '8–12', tipo: 'peso',   gif: G.pi,   tip: 'Banco 30°. Ángulo diferente al lunes para estimular más fibras.', alternativas: [{ nombre: 'Flexiones con pies elevados', musculo: 'Pecho superior' }] },
      { id: 'jp',   nombre: 'Jalón al pecho (polea)',    musculo: 'Dorsal ancho',          series: 3, reps: '8–12', tipo: 'peso',   gif: G.jp,   tip: 'Aprende la mecánica del jalón antes de pasar a dominadas. Pecho al frente.', alternativas: [{ nombre: 'Jalón con banda', musculo: 'Dorsal' }] },
      { id: 'cb',   nombre: 'Curl bíceps mancuernas',    musculo: 'Bíceps (cabeza larga)', series: 2, reps: '12',  tipo: 'peso',   gif: G.cb,   tip: 'No balancees. Supina la muñeca en el top.', alternativas: [{ nombre: 'Curl con banda', musculo: 'Bíceps' }] },
      { id: 'crp',  nombre: 'Crunch en suelo',           musculo: 'Abdominales',           series: 2, reps: '15',  tipo: 'reps',   gif: G.crp,  tip: 'Contrae el abdomen antes de subir. No jalones el cuello.', alternativas: [{ nombre: 'Crunch en polea', musculo: 'Abdominales' }] },
    ]
  },
  {
    id: 'viernes', nombre: 'Viernes', enfoque: 'Full Body C — Pierna + Upper total', color: '#6366f1', bg: '#eef2ff', emoji: '⚡',
    cardio: 'Caminata 10 min calentamiento.',
    ejercicios: [
      { id: 'pr',   nombre: 'Prensa 45°',                musculo: 'Cuádriceps, glúteos',   series: 3, reps: '10',  tipo: 'peso',   gif: G.pr,   tip: 'Alternativa segura a la sentadilla para el tercer estímulo de pierna semanal.', alternativas: [{ nombre: 'Sentadilla goblet', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'cf',   nombre: 'Curl femoral tumbado',      musculo: 'Isquiotibiales',        series: 3, reps: '12',  tipo: 'peso',   gif: G.cf,   tip: 'Isquiotibiales. Complemento al peso muerto rumano del miércoles.', alternativas: [{ nombre: 'Curl femoral con banda', musculo: 'Isquiotibiales' }] },
      { id: 'rs',   nombre: 'Remo sentado polea',        musculo: 'Espalda media',         series: 3, reps: '10',  tipo: 'peso',   gif: G.rs,   tip: 'Tercer estímulo de espalda. No te balancees.', alternativas: [{ nombre: 'Remo en máquina', musculo: 'Espalda media' }] },
      { id: 'el',   nombre: 'Elevaciones laterales',     musculo: 'Deltoides lateral',     series: 2, reps: '15',  tipo: 'peso',   gif: G.el,   tip: 'Hombros: solo trabajo directo del viernes. Peso ligero, forma perfecta.', alternativas: [{ nombre: 'Elevaciones con banda', musculo: 'Hombros' }] },
      { id: 'gp',   nombre: 'Gemelos de pie',            musculo: 'Gemelos',               series: 3, reps: '15',  tipo: 'peso',   gif: G.gp,   tip: 'Rango completo. Los gemelos necesitan frecuencia alta para crecer.', alternativas: [{ nombre: 'Elevación de talones sentado', musculo: 'Sóleo' }] },
    ]
  },
]

const GANAR_INTERMEDIO = [
  {
    id: 'lunes', nombre: 'Lunes', enfoque: 'Push — Pecho + Hombros + Tríceps', color: '#6366f1', bg: '#eef2ff', emoji: '💪',
    cardio: 'Caminata 10 min calentamiento. Cardio mínimo en días de músculo.',
    ejercicios: [
      { id: 'pb',   nombre: 'Press banca plano (barra)',  musculo: 'Pecho (fibras medias)', series: 4, reps: '8–10', tipo: 'peso',  gif: G.pb,   tip: 'Ejercicio principal. Escápulas juntas. Progresión lineal semanal.', alternativas: [{ nombre: 'Press mancuernas', musculo: 'Pecho' }] },
      { id: 'pi',   nombre: 'Press inclinado mancuernas',musculo: 'Pecho (parte superior)',series: 3, reps: '10',  tipo: 'peso',   gif: G.pi,   tip: 'Banco 30°. Desarrolla pectoral superior.', alternativas: [{ nombre: 'Press inclinado barra', musculo: 'Pecho superior' }] },
      { id: 'pm',   nombre: 'Press militar barra de pie',musculo: 'Deltoides anterior',    series: 3, reps: '8–10', tipo: 'peso',  gif: G.pm,   tip: 'De pie: mayor activación del core. No arquees la espalda.', alternativas: [{ nombre: 'Press Arnold sentado', musculo: 'Hombros completo' }] },
      { id: 'el',   nombre: 'Elevaciones laterales',     musculo: 'Deltoides lateral',     series: 3, reps: '12',  tipo: 'peso',   gif: G.el,   tip: 'Peso ligero, rango completo. Deltoides lateral = anchura.', alternativas: [{ nombre: 'Elevaciones en polea', musculo: 'Deltoides lateral' }] },
      { id: 'fo',   nombre: 'Fondos en paralelas',       musculo: 'Pecho inferior y tríceps',series:3,reps: '8–10',tipo:'peso_reps',gif:G.fo,  tip: 'Inclínate para pecho. Peso en cinturón si puedes hacer 10+ reps.', alternativas: [{ nombre: 'Fondos asistidos', musculo: 'Pecho/Tríceps' }] },
      { id: 'et',   nombre: 'Extensión tríceps polea',   musculo: 'Tríceps (cabeza lateral)',series:3, reps: '12', tipo: 'peso',   gif: G.et,   tip: 'Aislamiento final. Codos pegados al cuerpo.', alternativas: [{ nombre: 'Press francés', musculo: 'Tríceps' }] },
    ]
  },
  {
    id: 'martes', nombre: 'Martes', enfoque: 'Pull — Espalda + Bíceps + Posterior', color: '#6366f1', bg: '#eef2ff', emoji: '🔙',
    cardio: 'Caminata 10 min calentamiento.',
    ejercicios: [
      { id: 'jp',   nombre: 'Jalón al pecho',            musculo: 'Dorsal ancho',          series: 4, reps: '8',   tipo: 'peso',   gif: G.jp,   tip: 'Tira hacia la clavícula. Pecho erguido.', alternativas: [{ nombre: 'Dominadas asistidas', musculo: 'Dorsal' }] },
      { id: 'rb',   nombre: 'Remo con barra',            musculo: 'Espesor de espalda',    series: 4, reps: '8',   tipo: 'peso',   gif: G.rb,   tip: 'Espalda paralela al suelo. Tira al ombligo. Pausa en el top.', alternativas: [{ nombre: 'Remo mancuerna unilateral', musculo: 'Espalda media' }] },
      { id: 'rs',   nombre: 'Remo sentado polea',        musculo: 'Espalda media',         series: 3, reps: '10',  tipo: 'peso',   gif: G.rs,   tip: 'No te balancees. Codos pegados al cuerpo.', alternativas: [{ nombre: 'Remo en máquina', musculo: 'Espalda media' }] },
      { id: 'pp',   nombre: 'Pájaros con mancuernas',    musculo: 'Deltoides posterior',   series: 3, reps: '15',  tipo: 'peso',   gif: G.pp,   tip: 'Salud del hombro. No skips.', alternativas: [{ nombre: 'Face pull con cuerda', musculo: 'Deltoides posterior' }] },
      { id: 'cb',   nombre: 'Curl bíceps barra EZ',      musculo: 'Bíceps (cabeza larga)', series: 3, reps: '10',  tipo: 'peso',   gif: G.cb,   tip: 'No balancees. Aprieta en el top.', alternativas: [{ nombre: 'Curl con mancuernas', musculo: 'Bíceps' }] },
      { id: 'cm',   nombre: 'Curl martillo',             musculo: 'Bíceps (braquial)',     series: 2, reps: '12',  tipo: 'peso',   gif: G.cm,   tip: 'Agarre neutro. Trabaja braquial.', alternativas: [{ nombre: 'Curl martillo en polea', musculo: 'Braquial' }] },
    ]
  },
  {
    id: 'jueves', nombre: 'Jueves', enfoque: 'Legs — Pierna Completa', color: '#f97316', bg: '#fff7ed', emoji: '🦵',
    cardio: 'Caminata 10 min calentamiento. Sin cardio pesado: piernas piden recuperación.',
    ejercicios: [
      { id: 'sq',   nombre: 'Sentadilla con barra',      musculo: 'Cuádriceps, glúteos',   series: 4, reps: '8–10', tipo: 'peso',  gif: G.sq,   tip: 'Ejercicio rey. Espalda recta, muslo paralelo. Progresión semanal.', alternativas: [{ nombre: 'Sentadilla goblet', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pr',   nombre: 'Prensa 45°',                musculo: 'Cuádriceps, glúteos',   series: 4, reps: '10',  tipo: 'peso',   gif: G.pr,   tip: 'Accesorio de cuádriceps. No bloquees rodillas.', alternativas: [{ nombre: 'Hack squat', musculo: 'Cuádriceps' }] },
      { id: 'pmr',  nombre: 'Peso muerto rumano',        musculo: 'Isquiotibiales, glúteos',series:3, reps: '10',  tipo: 'peso',   gif: G.pmr,  tip: 'Bisagra de cadera. Barra cerca de las piernas.', alternativas: [{ nombre: 'RDL con mancuernas', musculo: 'Isquiotibiales' }] },
      { id: 'cf',   nombre: 'Curl femoral tumbado',      musculo: 'Isquiotibiales',        series: 3, reps: '12',  tipo: 'peso',   gif: G.cf,   tip: 'Aislamiento de isquios. No levantes caderas.', alternativas: [{ nombre: 'Curl femoral de pie', musculo: 'Isquiotibiales' }] },
      { id: 'ec',   nombre: 'Extensión cuádriceps',      musculo: 'Cuádriceps (aislado)',  series: 3, reps: '15',  tipo: 'peso',   gif: G.ec,   tip: 'Finalizador de cuádriceps. Control total.', alternativas: [{ nombre: 'Sentadilla con peso corporal', musculo: 'Cuádriceps' }] },
      { id: 'gp',   nombre: 'Gemelos de pie',            musculo: 'Gemelos',               series: 4, reps: '15',  tipo: 'peso',   gif: G.gp,   tip: 'Rango completo. Aguanta 1 seg arriba.', alternativas: [{ nombre: 'Gemelos en prensa', musculo: 'Gemelos/Sóleo' }] },
    ]
  },
  {
    id: 'viernes', nombre: 'Viernes', enfoque: 'Upper Full — Segunda estimulación Push + Pull', color: '#6366f1', bg: '#eef2ff', emoji: '⚡',
    cardio: 'Caminata 10 min calentamiento.',
    ejercicios: [
      { id: 'pman', nombre: 'Press mancuernas banco',    musculo: 'Pecho (fibras medias)', series: 3, reps: '12',  tipo: 'peso',   gif: G.pman, tip: '2ª sesión de pecho esta semana. Mayor RIR que el lunes, más reps.', alternativas: [{ nombre: 'Aperturas en polea', musculo: 'Pecho' }] },
      { id: 'rman', nombre: 'Remo mancuerna unilateral', musculo: 'Espalda media',         series: 3, reps: '12',  tipo: 'peso',   gif: G.rman, tip: '2ª sesión de espalda. Conexión muscular, no peso máximo.', alternativas: [{ nombre: 'Remo en máquina', musculo: 'Espalda media' }] },
      { id: 'je',   nombre: 'Jalón agarre estrecho',     musculo: 'Dorsal y bíceps',       series: 3, reps: '12',  tipo: 'peso',   gif: G.je,   tip: 'Agarre neutro. Lleva codos hacia las caderas.', alternativas: [{ nombre: 'Dominadas agarre estrecho', musculo: 'Dorsal/Bíceps' }] },
      { id: 'fp',   nombre: 'Face pull en polea',        musculo: 'Rotadores, trapecio',   series: 3, reps: '15',  tipo: 'peso',   gif: G.fp,   tip: 'Polea a altura de ojos. Codos arriba. Salud del hombro.', alternativas: [{ nombre: 'Rotaciones externas banda', musculo: 'Manguito rotador' }] },
      { id: 'pf',   nombre: 'Press francés',             musculo: 'Tríceps (cabeza larga)',series: 3, reps: '12',  tipo: 'peso',   gif: G.pf,   tip: '2ª sesión de tríceps. Barra EZ, codos al techo.', alternativas: [{ nombre: 'Extensión sobre cabeza mancuerna', musculo: 'Tríceps' }] },
      { id: 'pl',   nombre: 'Plancha isométrica',        musculo: 'Core completo',         series: 3, reps: '45',  tipo: 'tiempo', gif: G.pl,   tip: 'Core fuerte = mejor desempeño en todos los levantamientos.', alternativas: [{ nombre: 'Plancha lateral', musculo: 'Oblicuos' }] },
    ]
  },
]

const GANAR_AVANZADO = [
  {
    id: 'lunes', nombre: 'Lunes', enfoque: 'Push A — Pecho énfasis', color: '#6366f1', bg: '#eef2ff', emoji: '💪',
    cardio: 'Movilidad de hombros 8 min. Sin cardio en días de fuerza máxima.',
    ejercicios: [
      { id: 'pb',   nombre: 'Press banca plano (barra)',  musculo: 'Pecho (fibras medias)', series: 5, reps: '6–8', tipo: 'peso',   gif: G.pb,   tip: 'Ejercicio principal. Arco técnico, leg drive. Progresión semanal obligatoria.', alternativas: [{ nombre: 'Press mancuernas', musculo: 'Pecho' }] },
      { id: 'pi',   nombre: 'Press inclinado barra',      musculo: 'Pecho (parte superior)',series: 4, reps: '8',   tipo: 'peso',   gif: G.pi,   tip: 'Banco 30°. Accesorio principal de pecho superior.', alternativas: [{ nombre: 'Press inclinado mancuernas', musculo: 'Pecho superior' }] },
      { id: 'fo',   nombre: 'Fondos con lastre',          musculo: 'Pecho inferior y tríceps',series:3,reps:'8',  tipo:'peso_reps',gif:G.fo,   tip: 'Cinturón con 10-20kg. Máxima sobrecarga en pecho inferior.', alternativas: [{ nombre: 'Fondos en paralelas', musculo: 'Pecho/Tríceps' }] },
      { id: 'pm',   nombre: 'Press militar barra de pie', musculo: 'Deltoides anterior',    series: 4, reps: '6–8', tipo: 'peso',   gif: G.pm,   tip: 'De pie. Progresión lineal. Descanso 3 min.', alternativas: [{ nombre: 'Press Arnold sentado', musculo: 'Hombros completo' }] },
      { id: 'et',   nombre: 'Extensión tríceps polea',    musculo: 'Tríceps (cabeza lateral)',series:3,reps: '10', tipo: 'peso',   gif: G.et,   tip: 'Aislamiento de tríceps. RIR 2.', alternativas: [{ nombre: 'Press francés', musculo: 'Tríceps' }] },
      { id: 'pf',   nombre: 'Press francés',              musculo: 'Tríceps (cabeza larga)',series: 3, reps: '10',  tipo: 'peso',   gif: G.pf,   tip: 'Cabeza larga del tríceps. Barra EZ.', alternativas: [{ nombre: 'Extensión sobre cabeza mancuerna', musculo: 'Tríceps' }] },
    ]
  },
  {
    id: 'martes', nombre: 'Martes', enfoque: 'Pull A — Espalda énfasis', color: '#6366f1', bg: '#eef2ff', emoji: '🔙',
    cardio: 'Movilidad de hombros y cadena posterior 8 min.',
    ejercicios: [
      { id: 'jp',   nombre: 'Dominadas con lastre',       musculo: 'Dorsal ancho',          series: 4, reps: '6–8', tipo: 'peso_reps', gif: G.jp, tip: 'Cinturón con 5-15kg. Baja en 3 seg para máxima tensión.', alternativas: [{ nombre: 'Jalón al pecho', musculo: 'Dorsal' }] },
      { id: 'rb',   nombre: 'Remo Pendlay (barra)',       musculo: 'Espesor de espalda',    series: 4, reps: '6',   tipo: 'peso',   gif: G.rb,   tip: 'Remo desde el suelo (Pendlay): explosivo, máxima carga. Espalda paralela.', alternativas: [{ nombre: 'Remo con barra convencional', musculo: 'Espalda media' }] },
      { id: 'rs',   nombre: 'Remo sentado polea',         musculo: 'Espalda media',         series: 3, reps: '10',  tipo: 'peso',   gif: G.rs,   tip: 'Desarrolla el espesor de la espalda. No te balancees.', alternativas: [{ nombre: 'Remo máquina', musculo: 'Espalda media' }] },
      { id: 'je',   nombre: 'Jalón agarre estrecho',      musculo: 'Dorsal y bíceps',       series: 3, reps: '10',  tipo: 'peso',   gif: G.je,   tip: 'Agarre neutro. Lleva codos a las caderas.', alternativas: [{ nombre: 'Dominadas agarre neutro', musculo: 'Dorsal/Bíceps' }] },
      { id: 'cb',   nombre: 'Curl bíceps barra EZ',       musculo: 'Bíceps (cabeza larga)', series: 4, reps: '8',   tipo: 'peso',   gif: G.cb,   tip: 'Peso alto, RIR 1. Progresión semanal.', alternativas: [{ nombre: 'Curl con mancuernas', musculo: 'Bíceps' }] },
      { id: 'cm',   nombre: 'Curl martillo',              musculo: 'Bíceps (braquial)',     series: 3, reps: '10',  tipo: 'peso',   gif: G.cm,   tip: 'Braquial y braquiorradial. Agarre neutro.', alternativas: [{ nombre: 'Curl martillo en polea', musculo: 'Braquial' }] },
    ]
  },
  {
    id: 'miercoles', nombre: 'Miércoles', enfoque: 'Legs — Pierna Completa', color: '#f97316', bg: '#fff7ed', emoji: '🦵',
    cardio: 'Movilidad cadera y tobillo 10 min. Sin cardio: piernas requieren máxima recuperación.',
    ejercicios: [
      { id: 'sq',   nombre: 'Sentadilla con barra',       musculo: 'Cuádriceps, glúteos',   series: 5, reps: '6–8', tipo: 'peso',   gif: G.sq,   tip: 'Ejercicio rey. Progresión lineal obligatoria. Descanso 3-4 min.', alternativas: [{ nombre: 'Sentadilla goblet', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pr',   nombre: 'Prensa 45°',                 musculo: 'Cuádriceps, glúteos',   series: 4, reps: '10',  tipo: 'peso',   gif: G.pr,   tip: 'Accesorio de cuádriceps. Pies altos para glúteo.', alternativas: [{ nombre: 'Hack squat', musculo: 'Cuádriceps' }] },
      { id: 'pmr',  nombre: 'Peso muerto rumano',         musculo: 'Isquiotibiales, glúteos',series:4, reps: '8',   tipo: 'peso',   gif: G.pmr,  tip: 'Bisagra de cadera pesada. Barra roza las piernas.', alternativas: [{ nombre: 'RDL con mancuernas', musculo: 'Isquiotibiales' }] },
      { id: 'cf',   nombre: 'Curl femoral tumbado',       musculo: 'Isquiotibiales',        series: 3, reps: '12',  tipo: 'peso',   gif: G.cf,   tip: 'No levantes caderas. Aislamiento de isquios.', alternativas: [{ nombre: 'Curl femoral nórdico', musculo: 'Isquiotibiales' }] },
      { id: 'ec',   nombre: 'Extensión cuádriceps',       musculo: 'Cuádriceps (aislado)',  series: 3, reps: '15',  tipo: 'peso',   gif: G.ec,   tip: 'Finalizador. Control total.', alternativas: [{ nombre: 'Sentadilla con salto', musculo: 'Cuádriceps' }] },
      { id: 'gp',   nombre: 'Gemelos de pie',             musculo: 'Gemelos',               series: 5, reps: '12',  tipo: 'peso',   gif: G.gp,   tip: 'Máximo rango. Pausa 1 seg arriba y abajo.', alternativas: [{ nombre: 'Gemelos en prensa', musculo: 'Gemelos/Sóleo' }] },
    ]
  },
  {
    id: 'jueves', nombre: 'Jueves', enfoque: 'Push B — Hombros énfasis + 2ª pecho', color: '#8b5cf6', bg: '#f5f3ff', emoji: '🏔️',
    cardio: 'Movilidad de hombros 8 min obligatorio.',
    ejercicios: [
      { id: 'el',   nombre: 'Elevaciones laterales (pesadas)', musculo: 'Deltoides lateral', series: 5, reps: '10–12', tipo: 'peso', gif: G.el, tip: '2ª estimulación hombros. Peso alto para laterales. Deltoides lateral = anchura.', alternativas: [{ nombre: 'Elevaciones en polea', musculo: 'Deltoides lateral' }] },
      { id: 'pp',   nombre: 'Pájaros con mancuernas',     musculo: 'Deltoides posterior',   series: 4, reps: '15',  tipo: 'peso',   gif: G.pp,   tip: 'Deltoides posterior = salud del hombro. No lo saltes nunca.', alternativas: [{ nombre: 'Face pull cuerda', musculo: 'Deltoides posterior' }] },
      { id: 'pman', nombre: 'Press mancuernas banco',     musculo: 'Pecho (fibras medias)', series: 4, reps: '10',  tipo: 'peso',   gif: G.pman, tip: '2ª estimulación de pecho esta semana. Mayor RIR que el lunes.', alternativas: [{ nombre: 'Aperturas en polea', musculo: 'Pecho' }] },
      { id: 'ap',   nombre: 'Aperturas en polea',         musculo: 'Aislamiento de pecho',  series: 3, reps: '15',  tipo: 'peso',   gif: G.ap,   tip: 'Finalizador de pecho. Contrae al máximo en el centro.', alternativas: [{ nombre: 'Pec-deck', musculo: 'Pecho' }] },
      { id: 'fp',   nombre: 'Face pull en polea',         musculo: 'Rotadores, trapecio',   series: 3, reps: '20',  tipo: 'peso',   gif: G.fp,   tip: 'Salud del hombro. Polea a la altura de los ojos.', alternativas: [{ nombre: 'Rotaciones externas banda', musculo: 'Manguito rotador' }] },
    ]
  },
  {
    id: 'viernes', nombre: 'Viernes', enfoque: 'Pull B — 2ª Espalda + Bíceps + Core', color: '#6366f1', bg: '#eef2ff', emoji: '⚡',
    cardio: 'Caminata suave 15 min. Recuperación activa de cara al fin de semana.',
    ejercicios: [
      { id: 'rman', nombre: 'Remo mancuerna unilateral',  musculo: 'Espalda media',         series: 4, reps: '10',  tipo: 'peso',   gif: G.rman, tip: '2ª estimulación de espalda. Pausa en el top 1 seg.', alternativas: [{ nombre: 'Remo en máquina', musculo: 'Espalda media' }] },
      { id: 'je',   nombre: 'Jalón agarre estrecho',      musculo: 'Dorsal y bíceps',       series: 3, reps: '12',  tipo: 'peso',   gif: G.je,   tip: 'Agarre neutro o supino. Lleva codos a las caderas.', alternativas: [{ nombre: 'Dominadas agarre estrecho', musculo: 'Dorsal/Bíceps' }] },
      { id: 'entr', nombre: 'Encogimientos de trapecio',  musculo: 'Trapecio',              series: 3, reps: '15',  tipo: 'peso',   gif: G.entr, tip: 'Hombros a las orejas. Pausa 1 seg arriba.', alternativas: [{ nombre: 'Encogimientos con barra', musculo: 'Trapecio' }] },
      { id: 'cb',   nombre: 'Curl bíceps concentrado',    musculo: 'Bíceps (cabeza larga)', series: 3, reps: '12',  tipo: 'peso',   gif: G.cb,   tip: '2ª estimulación de bíceps. Mayor conexión muscular.', alternativas: [{ nombre: 'Curl predicador', musculo: 'Bíceps' }] },
      { id: 'pl',   nombre: 'Plancha isométrica',         musculo: 'Core completo',         series: 3, reps: '60',  tipo: 'tiempo', gif: G.pl,   tip: '60 seg. Core fuerte = más fuerza en sentadilla y banca.', alternativas: [{ nombre: 'Plancha lateral', musculo: 'Oblicuos' }] },
      { id: 'evp',  nombre: 'Elevación de piernas',       musculo: 'Abdomen inferior',      series: 3, reps: '15',  tipo: 'reps',   gif: G.evp,  tip: 'Sube lento. Abdomen contraído todo el recorrido.', alternativas: [{ nombre: 'Elevación de rodillas colgado', musculo: 'Abdomen inferior' }] },
    ]
  },
]

// ── GANAR FUERZA ─────────────────────────────────────────────────────────────

const FUERZA_PRINCIPIANTE = [
  {
    id: 'lunes', nombre: 'Lunes', enfoque: 'Sentadilla — Pierna + Técnica', color: '#ef4444', bg: '#fef2f2', emoji: '🏋️',
    cardio: 'Movilidad de cadera y tobillo – 10 min obligatorio antes de sentadilla.',
    ejercicios: [
      { id: 'sq',   nombre: 'Sentadilla con barra (técnica)', musculo: 'Cuádriceps, glúteos', series: 3, reps: '5', tipo: 'peso', gif: G.sq, tip: 'Aprender el patrón es la prioridad. Peso moderado. Descanso 3 min entre series.', alternativas: [{ nombre: 'Sentadilla goblet', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pr',   nombre: 'Prensa 45° (accesorio)',        musculo: 'Cuádriceps, glúteos', series: 3, reps: '8',  tipo: 'peso', gif: G.pr,  tip: 'Accesorio de pierna para reforzar el patrón de sentadilla.', alternativas: [{ nombre: 'Zancadas con mancuernas', musculo: 'Cuádriceps' }] },
      { id: 'pmr',  nombre: 'Peso muerto rumano mancuernas', musculo: 'Isquiotibiales, glúteos', series: 3, reps: '8', tipo: 'peso', gif: G.pmr, tip: 'Bisagra de cadera con mancuernas. Aprende el patrón antes del peso muerto convencional.', alternativas: [{ nombre: 'Good morning con banda', musculo: 'Isquiotibiales' }] },
      { id: 'cf',   nombre: 'Curl femoral tumbado',          musculo: 'Isquiotibiales',      series: 3, reps: '10', tipo: 'peso', gif: G.cf,  tip: 'Equilibra cuádriceps/isquios para prevenir lesiones.', alternativas: [{ nombre: 'Curl femoral con banda', musculo: 'Isquiotibiales' }] },
    ]
  },
  {
    id: 'miercoles', nombre: 'Miércoles', enfoque: 'Press Banca — Pecho + Tríceps', color: '#ef4444', bg: '#fef2f2', emoji: '💪',
    cardio: 'Activación de rotadores de hombro – 8 min.',
    ejercicios: [
      { id: 'pb',   nombre: 'Press banca plano (principal)', musculo: 'Pecho (fibras medias)', series: 3, reps: '5', tipo: 'peso', gif: G.pb, tip: 'Ejercicio del día. Aprender el arco técnico, leg drive y posición de escápulas. Descanso 3 min.', alternativas: [{ nombre: 'Press en máquina Smith', musculo: 'Pecho' }] },
      { id: 'pi',   nombre: 'Press inclinado mancuernas',   musculo: 'Pecho (parte superior)', series: 3, reps: '8', tipo: 'peso', gif: G.pi, tip: 'Banco 30°. Accesorio de pecho. Descanso 2 min.', alternativas: [{ nombre: 'Flexiones con pies elevados', musculo: 'Pecho superior' }] },
      { id: 'pf',   nombre: 'Press francés',                musculo: 'Tríceps (cabeza larga)', series: 3, reps: '8', tipo: 'peso', gif: G.pf, tip: 'Tríceps fuertes = más fuerza en banca. Barra EZ.', alternativas: [{ nombre: 'Extensión sobre cabeza mancuerna', musculo: 'Tríceps' }] },
      { id: 'et',   nombre: 'Extensión tríceps polea',      musculo: 'Tríceps (cabeza lateral)', series: 2, reps: '10', tipo: 'peso', gif: G.et, tip: 'Aislamiento de tríceps. Codos fijos.', alternativas: [{ nombre: 'Fondos en banco', musculo: 'Tríceps' }] },
    ]
  },
  {
    id: 'viernes', nombre: 'Viernes', enfoque: 'Peso Muerto — Espalda + Cadena Posterior', color: '#ef4444', bg: '#fef2f2', emoji: '🔙',
    cardio: 'Activación lumbar y movilidad de cadera – 10 min.',
    ejercicios: [
      { id: 'pmk',  nombre: 'Peso muerto convencional',     musculo: 'Cadena posterior',    series: 3, reps: '5',  tipo: 'peso', gif: G.pmk, tip: 'El ejercicio del día. Barra sobre mediopiés, espalda recta, empuja el suelo. Descanso 3-4 min.', alternativas: [{ nombre: 'Peso muerto sumo', musculo: 'Cadena posterior' }] },
      { id: 'rb',   nombre: 'Remo con barra',               musculo: 'Espesor de espalda',  series: 3, reps: '8',  tipo: 'peso', gif: G.rb,  tip: 'Espalda paralela al suelo. Accesorio de peso muerto.', alternativas: [{ nombre: 'Remo mancuerna unilateral', musculo: 'Espalda media' }] },
      { id: 'jp',   nombre: 'Jalón al pecho',               musculo: 'Dorsal ancho',         series: 3, reps: '8',  tipo: 'peso', gif: G.jp,  tip: 'Jalón para desarrollar el dorsal. Pecho erguido.', alternativas: [{ nombre: 'Dominadas asistidas', musculo: 'Dorsal' }] },
      { id: 'pl',   nombre: 'Plancha isométrica',           musculo: 'Core completo',        series: 3, reps: '30', tipo: 'tiempo', gif: G.pl, tip: 'Core fuerte = peso muerto más seguro y pesado.', alternativas: [{ nombre: 'Plancha sobre rodillas', musculo: 'Core' }] },
    ]
  },
]

const FUERZA_INTERMEDIO = [
  {
    id: 'lunes', nombre: 'Lunes', enfoque: 'Sentadilla — 5×5 + Accesorios', color: '#ef4444', bg: '#fef2f2', emoji: '🏋️',
    cardio: 'Movilidad cadera y tobillo 10 min. Nada más: recuperación es la prioridad.',
    ejercicios: [
      { id: 'sq',   nombre: 'Sentadilla con barra (principal)', musculo: 'Cuádriceps, glúteos', series: 5, reps: '5', tipo: 'peso', gif: G.sq, tip: 'Progresión lineal: añade 2.5kg respecto a la semana anterior. Descanso 3-4 min.', alternativas: [{ nombre: 'Sentadilla en Smith', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pr',   nombre: 'Prensa 45° (accesorio)',          musculo: 'Cuádriceps, glúteos', series: 4, reps: '8', tipo: 'peso', gif: G.pr, tip: 'Pies altos para más glúteo. Descanso 2-3 min.', alternativas: [{ nombre: 'Zancadas con barra', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pmr',  nombre: 'Peso muerto rumano',              musculo: 'Isquiotibiales, glúteos', series: 3, reps: '8', tipo: 'peso', gif: G.pmr, tip: 'Bisagra de cadera pesada. Barra roza las piernas.', alternativas: [{ nombre: 'RDL con mancuernas', musculo: 'Isquiotibiales' }] },
      { id: 'cf',   nombre: 'Curl femoral tumbado',            musculo: 'Isquiotibiales',      series: 3, reps: '10', tipo: 'peso', gif: G.cf, tip: 'Equilibra cuád/isquios. Previene lesiones en sentadilla.', alternativas: [{ nombre: 'Curl femoral nórdico', musculo: 'Isquiotibiales' }] },
      { id: 'gp',   nombre: 'Gemelos con carga',              musculo: 'Gemelos',              series: 3, reps: '12', tipo: 'peso', gif: G.gp, tip: 'Rango completo. Pausa 1 seg arriba.', alternativas: [{ nombre: 'Gemelos en prensa', musculo: 'Gemelos' }] },
    ]
  },
  {
    id: 'martes', nombre: 'Martes', enfoque: 'Press Banca — 5×5 + Accesorios', color: '#ef4444', bg: '#fef2f2', emoji: '💪',
    cardio: 'Activación de rotadores de hombro 8 min.',
    ejercicios: [
      { id: 'pb',   nombre: 'Press banca plano (principal)', musculo: 'Pecho (fibras medias)', series: 5, reps: '5', tipo: 'peso', gif: G.pb, tip: 'Ejercicio del día. Arco técnico, escápulas juntas y deprimidas, leg drive. Descanso 3-4 min.', alternativas: [{ nombre: 'Press en Smith', musculo: 'Pecho' }] },
      { id: 'pi',   nombre: 'Press inclinado barra',         musculo: 'Pecho (parte superior)', series: 4, reps: '6–8', tipo: 'peso', gif: G.pi, tip: 'Banco 30°. Desarrolla pectoral superior para mejorar la banca.', alternativas: [{ nombre: 'Press inclinado mancuernas', musculo: 'Pecho superior' }] },
      { id: 'fo',   nombre: 'Fondos con lastre',             musculo: 'Pecho inferior y tríceps', series: 3, reps: '6–8', tipo: 'peso_reps', gif: G.fo, tip: 'Excelente accesorio de banca. Inclínate para más pecho.', alternativas: [{ nombre: 'Fondos sin lastre', musculo: 'Pecho/Tríceps' }] },
      { id: 'pf',   nombre: 'Press francés',                 musculo: 'Tríceps (cabeza larga)', series: 3, reps: '8', tipo: 'peso', gif: G.pf, tip: 'Tríceps = 60% del bloqueo en banca. No skips.', alternativas: [{ nombre: 'Extensión sobre cabeza mancuerna', musculo: 'Tríceps' }] },
      { id: 'fp',   nombre: 'Face pull en polea',            musculo: 'Rotadores, trapecio',   series: 3, reps: '15', tipo: 'peso', gif: G.fp, tip: 'Salud del hombro. Siempre en días de press.', alternativas: [{ nombre: 'Rotaciones externas banda', musculo: 'Manguito rotador' }] },
    ]
  },
  {
    id: 'jueves', nombre: 'Jueves', enfoque: 'Peso Muerto — 4×3-5 + Espalda', color: '#ef4444', bg: '#fef2f2', emoji: '🔙',
    cardio: 'Activación lumbar y cadera 10 min.',
    ejercicios: [
      { id: 'pmk',  nombre: 'Peso muerto convencional (principal)', musculo: 'Cadena posterior', series: 4, reps: '3–5', tipo: 'peso', gif: G.pmk, tip: 'Ejercicio del día. Progresión lineal. Barra sobre mediopiés. Descanso 3-5 min.', alternativas: [{ nombre: 'Peso muerto sumo', musculo: 'Cadena posterior' }] },
      { id: 'rb',   nombre: 'Remo Pendlay',                        musculo: 'Espesor de espalda', series: 4, reps: '6', tipo: 'peso', gif: G.rb, tip: 'Remo desde el suelo. Explosivo. Excelente accesorio de peso muerto.', alternativas: [{ nombre: 'Remo con barra', musculo: 'Espalda media' }] },
      { id: 'jp',   nombre: 'Jalón al pecho pesado',               musculo: 'Dorsal ancho',       series: 3, reps: '6', tipo: 'peso', gif: G.jp, tip: 'Ancho de espalda. Peso alto, pocas reps.', alternativas: [{ nombre: 'Dominadas con lastre', musculo: 'Dorsal' }] },
      { id: 'pl',   nombre: 'Plancha avanzada',                    musculo: 'Core completo',      series: 3, reps: '60', tipo: 'tiempo', gif: G.pl, tip: 'Core fuerte = peso muerto más pesado y más seguro.', alternativas: [{ nombre: 'Plancha con extensión de brazo', musculo: 'Core' }] },
    ]
  },
  {
    id: 'viernes', nombre: 'Viernes', enfoque: 'Press Militar — 5×5 + Hombros + Core', color: '#8b5cf6', bg: '#f5f3ff', emoji: '🏔️',
    cardio: 'Movilidad de hombros 8 min.',
    ejercicios: [
      { id: 'pm',   nombre: 'Press militar barra de pie (principal)', musculo: 'Deltoides anterior', series: 5, reps: '5', tipo: 'peso', gif: G.pm, tip: 'De pie. Progresión lineal. Core tenso, no arquees la espalda. Descanso 3 min.', alternativas: [{ nombre: 'Press militar sentado mancuernas', musculo: 'Deltoides anterior' }] },
      { id: 'el',   nombre: 'Elevaciones laterales',                  musculo: 'Deltoides lateral',  series: 4, reps: '10–12', tipo: 'peso', gif: G.el, tip: 'Deltoides lateral para anchura. Más peso que en rutinas de hipertrofia.', alternativas: [{ nombre: 'Elevaciones en polea', musculo: 'Deltoides lateral' }] },
      { id: 'pp',   nombre: 'Face pull / Pájaros',                    musculo: 'Deltoides posterior', series: 4, reps: '15', tipo: 'peso', gif: G.pp, tip: 'Salud del hombro. Siempre en días de press militar.', alternativas: [{ nombre: 'Rotaciones externas banda', musculo: 'Manguito rotador' }] },
      { id: 'et',   nombre: 'Extensión tríceps polea',                musculo: 'Tríceps (cabeza lateral)', series: 3, reps: '10', tipo: 'peso', gif: G.et, tip: 'Tríceps fuertes = más fuerza en press militar.', alternativas: [{ nombre: 'Tríceps en polea con cuerda', musculo: 'Tríceps' }] },
      { id: 'crp',  nombre: 'Crunch en polea',                        musculo: 'Abdominales',         series: 3, reps: '15', tipo: 'peso', gif: G.crp, tip: 'Core resistente = mejora en todos los levantamientos.', alternativas: [{ nombre: 'Crunch en suelo', musculo: 'Abdominales' }] },
    ]
  },
]

const FUERZA_AVANZADO = [
  {
    id: 'lunes', nombre: 'Lunes', enfoque: 'Sentadilla Pesada + Accesorios pierna', color: '#ef4444', bg: '#fef2f2', emoji: '🏋️',
    cardio: 'Movilidad cadera y tobillo 10 min. Sin cardio.',
    ejercicios: [
      { id: 'sq',   nombre: 'Sentadilla con barra (heavy)', musculo: 'Cuádriceps, glúteos', series: 5, reps: '3–5', tipo: 'peso', gif: G.sq, tip: 'Sesión pesada. Progresión lineal o por bloques. Descanso 4-5 min.', alternativas: [{ nombre: 'Sentadilla frontal', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pr',   nombre: 'Prensa 45°',                   musculo: 'Cuádriceps, glúteos', series: 4, reps: '8',   tipo: 'peso', gif: G.pr, tip: 'Accesorio. Pies altos para glúteo.', alternativas: [{ nombre: 'Hack squat', musculo: 'Cuádriceps' }] },
      { id: 'pmr',  nombre: 'Peso muerto rumano',           musculo: 'Isquiotibiales, glúteos', series: 4, reps: '8', tipo: 'peso', gif: G.pmr, tip: 'Bisagra de cadera pesada. Complementa la sentadilla.', alternativas: [{ nombre: 'RDL con mancuernas', musculo: 'Isquiotibiales' }] },
      { id: 'cf',   nombre: 'Curl femoral',                 musculo: 'Isquiotibiales',      series: 3, reps: '10', tipo: 'peso', gif: G.cf, tip: 'Equilibra cuád/isquios para prevenir lesiones en sentadilla pesada.', alternativas: [{ nombre: 'Curl femoral nórdico', musculo: 'Isquiotibiales' }] },
      { id: 'gp',   nombre: 'Gemelos con máxima carga',    musculo: 'Gemelos',              series: 4, reps: '10', tipo: 'peso', gif: G.gp, tip: 'Máximo peso controlado. Pausa 1 seg arriba y abajo.', alternativas: [{ nombre: 'Gemelos en prensa', musculo: 'Gemelos/Sóleo' }] },
    ]
  },
  {
    id: 'martes', nombre: 'Martes', enfoque: 'Press Banca Pesado + Tríceps', color: '#ef4444', bg: '#fef2f2', emoji: '💪',
    cardio: 'Activación rotadores 8 min.',
    ejercicios: [
      { id: 'pb',   nombre: 'Press banca plano (heavy)',    musculo: 'Pecho (fibras medias)', series: 5, reps: '3–5', tipo: 'peso', gif: G.pb, tip: 'Sesión pesada. Arco técnico, leg drive, escápulas. Descanso 4-5 min.', alternativas: [{ nombre: 'Press en Smith', musculo: 'Pecho' }] },
      { id: 'pi',   nombre: 'Press inclinado barra',        musculo: 'Pecho (parte superior)', series: 4, reps: '6', tipo: 'peso', gif: G.pi, tip: 'Banco 30°. Accesorio principal de pecho superior.', alternativas: [{ nombre: 'Press inclinado mancuernas', musculo: 'Pecho superior' }] },
      { id: 'fo',   nombre: 'Fondos con lastre',            musculo: 'Pecho inferior y tríceps', series: 4, reps: '6–8', tipo: 'peso_reps', gif: G.fo, tip: 'Cinturón con lastre. El mejor accesorio de banca.', alternativas: [{ nombre: 'Fondos sin lastre', musculo: 'Pecho/Tríceps' }] },
      { id: 'pf',   nombre: 'Press francés',                musculo: 'Tríceps (cabeza larga)', series: 4, reps: '8', tipo: 'peso', gif: G.pf, tip: 'Tríceps = 60% del bloqueo en banca. Prioritario.', alternativas: [{ nombre: 'Extensión sobre cabeza mancuerna', musculo: 'Tríceps' }] },
      { id: 'et',   nombre: 'Extensión tríceps polea',      musculo: 'Tríceps (cabeza lateral)', series: 3, reps: '12', tipo: 'peso', gif: G.et, tip: 'Aislamiento de tríceps. Finalizador.', alternativas: [{ nombre: 'Tríceps en polea con cuerda', musculo: 'Tríceps' }] },
    ]
  },
  {
    id: 'miercoles', nombre: 'Miércoles', enfoque: 'Peso Muerto Pesado + Espalda', color: '#ef4444', bg: '#fef2f2', emoji: '🔙',
    cardio: 'Activación lumbar y cadera 10 min.',
    ejercicios: [
      { id: 'pmk',  nombre: 'Peso muerto convencional (heavy)', musculo: 'Cadena posterior', series: 4, reps: '2–4', tipo: 'peso', gif: G.pmk, tip: 'Sesión pesada. Progresión lineal o por bloques. Descanso 4-5 min.', alternativas: [{ nombre: 'Peso muerto sumo', musculo: 'Cadena posterior' }] },
      { id: 'rb',   nombre: 'Remo Pendlay',                    musculo: 'Espesor de espalda', series: 4, reps: '5', tipo: 'peso', gif: G.rb, tip: 'Remo desde el suelo. Explosivo. Máxima carga.', alternativas: [{ nombre: 'Remo con barra', musculo: 'Espalda media' }] },
      { id: 'jp',   nombre: 'Dominadas con lastre',            musculo: 'Dorsal ancho',       series: 4, reps: '5', tipo: 'peso_reps', gif: G.jp, tip: 'Cinturón con 10-20kg. Ancho de espalda.', alternativas: [{ nombre: 'Jalón al pecho pesado', musculo: 'Dorsal' }] },
      { id: 'rs',   nombre: 'Remo sentado polea',              musculo: 'Espalda media',      series: 3, reps: '10', tipo: 'peso', gif: G.rs, tip: 'Accesorio de espalda. No te balancees.', alternativas: [{ nombre: 'Remo máquina', musculo: 'Espalda media' }] },
      { id: 'pl',   nombre: 'Plancha avanzada',               musculo: 'Core completo',      series: 3, reps: '60', tipo: 'tiempo', gif: G.pl, tip: 'Core fuerte = peso muerto más pesado y seguro.', alternativas: [{ nombre: 'Ab wheel', musculo: 'Core' }] },
    ]
  },
  {
    id: 'jueves', nombre: 'Jueves', enfoque: 'Sentadilla Técnica + Pierna Accesoria', color: '#ef4444', bg: '#fef2f2', emoji: '🦵',
    cardio: 'Movilidad cadera 8 min.',
    ejercicios: [
      { id: 'sq',   nombre: 'Sentadilla técnica (65-75%)',    musculo: 'Cuádriceps, glúteos', series: 4, reps: '3', tipo: 'peso', gif: G.sq, tip: 'Sesión técnica al 65-75% del 1RM. Foco total en la forma: puntos de contacto, profundidad, trayectoria.', alternativas: [{ nombre: 'Sentadilla con pausa', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'ec',   nombre: 'Extensión cuádriceps',           musculo: 'Cuádriceps (aislado)', series: 4, reps: '12', tipo: 'peso', gif: G.ec, tip: 'Aislamiento. Trabaja el rango que la sentadilla no alcanza.', alternativas: [{ nombre: 'Sentadilla frontal', musculo: 'Cuádriceps' }] },
      { id: 'cf',   nombre: 'Curl femoral',                   musculo: 'Isquiotibiales',      series: 4, reps: '10', tipo: 'peso', gif: G.cf, tip: 'Segunda estimulación de isquios esta semana.', alternativas: [{ nombre: 'Curl nórdico', musculo: 'Isquiotibiales' }] },
      { id: 'cb',   nombre: 'Curl bíceps',                    musculo: 'Bíceps (cabeza larga)', series: 3, reps: '10', tipo: 'peso', gif: G.cb, tip: 'Bíceps fuertes = mejor agarre en peso muerto.', alternativas: [{ nombre: 'Curl con mancuernas', musculo: 'Bíceps' }] },
      { id: 'crp',  nombre: 'Crunch en polea',                musculo: 'Abdominales',         series: 3, reps: '15', tipo: 'peso', gif: G.crp, tip: 'Core fuerte = mayor estabilidad en todos los levantamientos.', alternativas: [{ nombre: 'Crunch en suelo', musculo: 'Abdominales' }] },
    ]
  },
  {
    id: 'viernes', nombre: 'Viernes', enfoque: 'Press Militar + Hombros + Banca Técnica', color: '#8b5cf6', bg: '#f5f3ff', emoji: '🏔️',
    cardio: 'Caminata suave 15 min. Recuperación activa para el fin de semana.',
    ejercicios: [
      { id: 'pm',   nombre: 'Press militar barra de pie (heavy)', musculo: 'Deltoides anterior', series: 5, reps: '3–5', tipo: 'peso', gif: G.pm, tip: 'Ejercicio del día. Progresión lineal. Descanso 3-4 min.', alternativas: [{ nombre: 'Press militar sentado', musculo: 'Deltoides anterior' }] },
      { id: 'pb',   nombre: 'Press banca técnica (65-75%)',       musculo: 'Pecho (fibras medias)', series: 3, reps: '3', tipo: 'peso', gif: G.pb, tip: 'Sesión técnica de banca. Practica el arco, la trayectoria y el toque.', alternativas: [{ nombre: 'Press en Smith con pausa', musculo: 'Pecho' }] },
      { id: 'el',   nombre: 'Elevaciones laterales',              musculo: 'Deltoides lateral',  series: 4, reps: '10', tipo: 'peso', gif: G.el, tip: 'Deltoides lateral = anchura. Progresión semanal.', alternativas: [{ nombre: 'Elevaciones en polea', musculo: 'Deltoides lateral' }] },
      { id: 'pp',   nombre: 'Face pull / Pájaros',                musculo: 'Deltoides posterior', series: 4, reps: '15', tipo: 'peso', gif: G.pp, tip: 'Salud del hombro. No skips nunca en fuerza.', alternativas: [{ nombre: 'Rotaciones externas banda', musculo: 'Manguito rotador' }] },
      { id: 'evp',  nombre: 'Elevación de piernas',               musculo: 'Abdomen inferior',   series: 3, reps: '15', tipo: 'reps', gif: G.evp, tip: 'Psoas fuerte = sentadilla y peso muerto más estables.', alternativas: [{ nombre: 'Elevación de rodillas colgado', musculo: 'Abdomen inferior' }] },
    ]
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Registro de plantillas: objetivo × nivel → días
// recomposicion usa las mismas que ganar (mismo split, distintas reps/tips via USER_MOD)
// ─────────────────────────────────────────────────────────────────────────────
const TEMPLATES = {
  perder_principiante:       PERDER_PRINCIPIANTE,
  perder_intermedio:         PERDER_INTERMEDIO,
  perder_avanzado:           PERDER_AVANZADO,
  ganar_principiante:        GANAR_PRINCIPIANTE,
  ganar_intermedio:          GANAR_INTERMEDIO,
  ganar_avanzado:            GANAR_AVANZADO,
  recomposicion_principiante:GANAR_PRINCIPIANTE,
  recomposicion_intermedio:  GANAR_INTERMEDIO,
  recomposicion_avanzado:    GANAR_AVANZADO,
  fuerza_principiante:       FUERZA_PRINCIPIANTE,
  fuerza_intermedio:         FUERZA_INTERMEDIO,
  fuerza_avanzado:           FUERZA_AVANZADO,
}

// Genera los días ajustados al ciclo actual y al perfil del usuario
export function getDiasCiclo(cicloId, objetivo = 'recomposicion', nivel = 'intermedio') {
  const mod = MOD[cicloId] || MOD.hiper
  const userMod = USER_MOD[objetivo]?.[nivel] || { seriesMod: 0, repsOverride: null, tipExtra: '' }
  const isDeload = cicloId === 'deload'
  const template = TEMPLATES[`${objetivo}_${nivel}`] || TEMPLATES['ganar_intermedio']
  const colorCiclo = CICLOS.find(c => c.id === cicloId)?.color

  return template.map(dia => ({
    ...dia,
    color: colorCiclo || dia.color,
    ejercicios: dia.ejercicios.map(ej => {
      const seriesMod = isDeload ? mod.seriesMod : mod.seriesMod + userMod.seriesMod
      const seriesAjustadas = Math.max(2, ej.series + seriesMod)
      let repsAjustadas
      if (isDeload) {
        repsAjustadas = ej.reps + ' (50% peso)'
      } else if (userMod.repsOverride && mod.repsMod === '' && objetivo !== 'fuerza') {
        repsAjustadas = userMod.repsOverride
      } else {
        repsAjustadas = mod.repsMod || ej.reps
      }
      const tipFinal = (!isDeload && userMod.tipExtra) ? `${ej.tip} · ${userMod.tipExtra}` : ej.tip
      return { ...ej, series: seriesAjustadas, reps: repsAjustadas, tip: tipFinal }
    })
  }))
}

export const PLATOS = {
  postEntreno: [
    { nombre: 'Pollo + arroz + brócoli', kcal: 580, p: 52, c: 60, g: 10, receta: '200g pechuga a la plancha, 80g arroz basmati, brócoli al vapor con AOVE' },
    { nombre: 'Salmón + boniato + ensalada', kcal: 560, p: 45, c: 50, g: 14, receta: '180g salmón al horno con limón, 200g boniato, lechuga y tomate' },
    { nombre: 'Ternera + pasta integral', kcal: 600, p: 50, c: 58, g: 12, receta: '180g ternera, 80g pasta integral, salsa de tomate natural' },
    { nombre: 'Claras + tortitas de avena', kcal: 420, p: 40, c: 48, g: 6, receta: '200g claras de huevo revueltas, 60g copos de avena, arándanos y miel' },
  ],
  comida: [
    { nombre: 'Merluza + quinoa + verduras', kcal: 520, p: 48, c: 50, g: 9, receta: '200g merluza al vapor, 70g quinoa, pimientos y cebolla salteados' },
    { nombre: 'Pechuga al horno + garbanzos', kcal: 540, p: 50, c: 45, g: 10, receta: '200g pechuga, 150g garbanzos, pimientos rojos asados' },
    { nombre: 'Atún + arroz + aguacate', kcal: 510, p: 46, c: 48, g: 13, receta: '2 latas atún al natural, 70g arroz, 1/2 aguacate, limón' },
    { nombre: 'Lentejas + pollo + espinacas', kcal: 530, p: 48, c: 52, g: 8, receta: '150g lentejas cocidas, 150g pechuga a tiras, espinacas salteadas' },
  ],
  merienda: [
    { nombre: 'Yogur griego + frutos rojos', kcal: 320, p: 22, c: 28, g: 12, receta: '200g yogur griego 0%, 80g arándanos, 15g nueces' },
    { nombre: 'Batido proteico + plátano', kcal: 340, p: 32, c: 38, g: 5, receta: '30g proteína de suero, 250ml leche semidesnatada, 1 plátano' },
    { nombre: 'Tostadas + huevo + aguacate', kcal: 360, p: 20, c: 32, g: 16, receta: '2 tostadas integrales, 2 huevos revueltos, 1/2 aguacate' },
    { nombre: 'Queso cottage + fruta + almendras', kcal: 300, p: 26, c: 22, g: 10, receta: '200g queso cottage, 1 manzana, 15g almendras' },
  ],
  cena: [
    { nombre: 'Tortilla + ensalada mixta', kcal: 380, p: 32, c: 10, g: 18, receta: '3 huevos, cebolla, pimiento, ensalada con AOVE' },
    { nombre: 'Salmón a la plancha + espárragos', kcal: 400, p: 40, c: 6, g: 16, receta: '180g salmón, espárragos a la plancha, limón' },
    { nombre: 'Pollo al horno + calabacín', kcal: 360, p: 42, c: 12, g: 10, receta: '200g pechuga con hierbas, calabacín y cebolla salteados' },
    { nombre: 'Merluza al vapor + brócoli + huevo', kcal: 340, p: 44, c: 8, g: 10, receta: '200g merluza, brócoli al vapor, 1 huevo cocido, AOVE' },
  ],
}

export const PLATOS_PREPARADOS = [
  { servicio: 'Mercadona', nombre: 'Pollo asado con verduras', kcal: 280, p: 32, c: 8, g: 12, precio: '~3.50€', nota: 'Bandeja lista para calentar. Alta proteína, bajo carbo.' },
  { servicio: 'Mercadona', nombre: 'Poke de salmón y arroz', kcal: 420, p: 28, c: 46, g: 12, precio: '~4.50€', nota: 'Rico en omega-3. Comer frío o templado.' },
  { servicio: 'Mercadona', nombre: 'Garbanzos a la jardinera', kcal: 300, p: 14, c: 38, g: 8, precio: '~1.80€', nota: 'Alta fibra, legumbre completa.' },
  { servicio: 'Mercadona', nombre: 'Merluza en salsa verde', kcal: 240, p: 26, c: 6, g: 10, precio: '~3.80€', nota: 'Bajo en calorías, alto en proteína de pescado.' },
  { servicio: 'Wetaca', nombre: 'Pollo con batata y brócoli', kcal: 490, p: 42, c: 44, g: 12, precio: '~6.90€', nota: 'Macro equilibrado. Ideal post-entreno.' },
  { servicio: 'Wetaca', nombre: 'Salmón con quinoa y espinacas', kcal: 520, p: 40, c: 38, g: 18, precio: '~7.50€', nota: 'Rico en omega-3 y hierro.' },
  { servicio: 'Wetaca', nombre: 'Ternera con arroz integral y judías', kcal: 560, p: 46, c: 50, g: 14, precio: '~7.20€', nota: 'Alta proteína animal. Para ciclos de volumen.' },
  { servicio: 'Knoweats', nombre: 'Pollo tikka masala + arroz', kcal: 510, p: 45, c: 48, g: 11, precio: '~7.80€', nota: '40g proteína. Para deportistas.' },
  { servicio: 'Casero/Batch', nombre: 'Meal prep: pollo + arroz × 5', kcal: 530, p: 50, c: 55, g: 10, precio: '~2.50€/ud', nota: 'Cocina 1kg pechuga + 500g arroz en 30 min para toda la semana.' },
  { servicio: 'Casero/Batch', nombre: 'Meal prep: atún + pasta × 4', kcal: 480, p: 44, c: 52, g: 8, precio: '~2.00€/ud', nota: '4 latas atún + 400g pasta integral.' },
]

export const MUSCULO_MAP = {
  'Pecho': ['pecho', 'chest'],
  'Espalda': ['espalda', 'dorsal', 'trapecio', 'back', 'lumbar', 'lats'],
  'Hombros': ['hombro', 'deltoides', 'shoulder'],
  'Bíceps': ['bíceps', 'biceps', 'braquial'],
  'Tríceps': ['tríceps', 'triceps'],
  'Pierna': ['cuádriceps', 'cuadriceps', 'isquio', 'gemelo', 'glúteo', 'gluteo', 'pierna', 'thigh', 'calf', 'leg', 'cadera'],
  'Abdominales': ['core', 'abdomen', 'abdominal', 'oblicuo', 'waist'],
  'Cardio': ['full body', 'cardio'],
}

export function matchMusculo(ejMusculo) {
  const m = (ejMusculo || '').toLowerCase()
  for (const [fitcronGrupo, keywords] of Object.entries(MUSCULO_MAP)) {
    if (keywords.some(k => m.includes(k))) return fitcronGrupo
  }
  return null
}

export const AVATARS = ['💪', '🏃', '🧘', '🏋️', '⚡', '🦁', '🔥', '🌟']
