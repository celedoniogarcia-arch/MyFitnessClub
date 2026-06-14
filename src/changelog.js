/**
 * Historial de novedades de TrainClub.
 * Cada versión describe qué cambió para mostrarlo en la guía de novedades.
 * Cuando se incrementa ONBOARDING_VERSION en Onboarding.jsx,
 * añadir aquí la entrada correspondiente.
 */

export const CHANGELOG = {
  1: {
    titulo: 'Bienvenido a TrainClub',
    subtitulo: 'Tu entrenador personal en el bolsillo',
    tipo: 'inicial', // no muestra "novedades", muestra el tutorial completo
    novedades: [],
  },
  2: {
    titulo: '¡TrainClub se actualiza!',
    subtitulo: 'Estas son las novedades de esta versión',
    tipo: 'update',
    novedades: [
      { icon: '⏱', texto: 'Temporizador de descanso entre series (1\', 1\'30, 2\' y 3\')' },
      { icon: '🎯', texto: 'Alternativas de ejercicio ahora muestran la zona muscular específica (pecho alto, deltoides posterior…)' },
      { icon: '📦', texto: 'GIFs de ejercicios alojados en nuestros servidores — sin dependencias externas' },
      { icon: '🗺️', texto: 'Guía interactiva de bienvenida para nuevos usuarios' },
    ],
  },
}
