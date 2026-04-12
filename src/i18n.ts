const MESSAGES = {
  en: {
    widgetTitle: 'KG Lacer Macro',
    draw: 'Draw',
    addImage: 'Add image',
    strategy: 'Strategy',
    sequential: 'Sequential',
    all: 'All',
    percentage: 'Percentage',
    opacity: 'Opacity',
    brightness: 'Brightness',
    random: 'Random',
    humanized: 'Humanized',
    zigzag: 'Zigzag',
    brushStrokes: 'Brush strokes',
    diagonalBrush: 'Diagonal brush',
    down: 'Down',
    up: 'Up',
    left: 'Left',
    right: 'Right',
    spiralOut: 'Spiral out',
    spiralIn: 'Spiral in',
    resetSize: 'Reset size',
    eraseTransparent: 'Erase transparent pixels',
    drawColorsInOrder: 'Draw colors in order',
    keyboardShortcuts: 'Shortcuts',
    shortcutsHelp: 'Shift+B toggle · Shift+Enter draw · Shift+I add image',
  },
  es: {
    widgetTitle: 'KG Lacer Macro',
    draw: 'Dibujar',
    addImage: 'Agregar imagen',
    strategy: 'Estrategia',
    sequential: 'Secuencial',
    all: 'Todo',
    percentage: 'Porcentaje',
    opacity: 'Opacidad',
    brightness: 'Brillo',
    random: 'Aleatorio',
    humanized: 'Humanizado',
    zigzag: 'Zigzag',
    brushStrokes: 'Pinceladas',
    diagonalBrush: 'Pincel diagonal',
    down: 'Abajo',
    up: 'Arriba',
    left: 'Izquierda',
    right: 'Derecha',
    spiralOut: 'Espiral hacia fuera',
    spiralIn: 'Espiral hacia dentro',
    resetSize: 'Restablecer tamaño',
    eraseTransparent: 'Borrar píxeles transparentes',
    drawColorsInOrder: 'Dibujar colores en orden',
    keyboardShortcuts: 'Atajos',
    shortcutsHelp:
      'Shift+B mostrar/ocultar · Shift+Enter dibujar · Shift+I agregar imagen',
  },
} as const

type Locale = keyof typeof MESSAGES

function getLocale(): Locale {
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function t(key: keyof (typeof MESSAGES)['en']) {
  const locale = getLocale()
  return MESSAGES[locale][key]
}

export function applyTranslations(root: ParentNode) {
  for (const node of root.querySelectorAll<HTMLElement>('[data-i18n]')) {
    node.textContent = t(node.dataset.i18n as keyof (typeof MESSAGES)['en'])
  }
}
