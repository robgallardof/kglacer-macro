const LOCALE_STORAGE_KEY = 'kglacer-macro:locale'
const LEGACY_LOCALE_STORAGE_KEYS = ['kglacermacro:locale']

const MESSAGES = {
  en: {
    widgetTitle: 'KGlacerMacro',
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
    scribble: 'Scribble',
    crosshatch: 'Crosshatch',
    waveSweep: 'Wave sweep',
    scatteredLines: 'Scattered lines',
    contourJitter: 'Contour jitter',
    spiralWobble: 'Spiral wobble',
    clusterBursts: 'Cluster bursts',
    orbital: 'Orbital',
    flowField: 'Flow field',
    edgeIn: 'Edge in',
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
    shortcutsHelp:
      'Shift+B toggle widget · Shift+M hide/show panel · Shift+S show panel · Shift+H hide panel · Shift+Enter draw · Shift+I add image',
    language: 'Language',
    showShortcuts: 'Show shortcuts',
    minimize: 'Minimize panel',
    expandPanel: 'Expand panel',
    panelHidden: 'Panel hidden',
    restorePanel: 'Restore panel',
    reopenHelp: 'Use Shift+B or floating button to reopen',
    close: 'Close',
    overlayColors: 'Overlay colors',
    enabled: 'Enabled',
    disabled: 'Disabled',
    premium: 'Premium',
    buy: 'Buy',
    openColorPanel: 'Open color panel',
    searchColors: 'Search by hex, English or Spanish',
    colorPanelResults: 'Color panel results',
  },
  es: {
    widgetTitle: 'KGlacerMacro',
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
    scribble: 'Garabato',
    crosshatch: 'Tramado',
    waveSweep: 'Barrido ondulado',
    scatteredLines: 'Líneas dispersas',
    contourJitter: 'Contorno irregular',
    spiralWobble: 'Espiral oscilante',
    clusterBursts: 'Ráfagas por grupos',
    orbital: 'Orbital',
    flowField: 'Campo fluido',
    edgeIn: 'Borde hacia adentro',
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
      'Shift+B mostrar widget · Shift+M ocultar/mostrar panel · Shift+S mostrar panel · Shift+H ocultar panel · Shift+Enter dibujar · Shift+I agregar imagen',
    language: 'Idioma',
    showShortcuts: 'Ver atajos',
    minimize: 'Minimizar panel',
    expandPanel: 'Expandir panel',
    panelHidden: 'Panel oculto',
    restorePanel: 'Restaurar panel',
    reopenHelp: 'Usa Shift+B o el botón flotante para reabrir',
    close: 'Cerrar',
    overlayColors: 'Colores del overlay',
    enabled: 'Activo',
    disabled: 'Desactivado',
    premium: 'Premium',
    buy: 'Comprar',
    openColorPanel: 'Abrir panel de colores',
    searchColors: 'Buscar por hexa, inglés o español',
    colorPanelResults: 'Resultados del panel de color',
  },
} as const

type Locale = keyof typeof MESSAGES

function getNavigatorLocale(): Locale {
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function getLocale(): Locale {
  const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as
    | Locale
    | null
    | undefined
  if (savedLocale && savedLocale in MESSAGES) return savedLocale
  for (let index = 0; index < LEGACY_LOCALE_STORAGE_KEYS.length; index++) {
    const legacyLocale = localStorage.getItem(
      LEGACY_LOCALE_STORAGE_KEYS[index]!,
    ) as Locale | null
    if (!legacyLocale || !(legacyLocale in MESSAGES)) continue
    localStorage.setItem(LOCALE_STORAGE_KEY, legacyLocale)
    return legacyLocale
  }
  return getNavigatorLocale()
}

export function setLocale(locale: Locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
}

export function availableLocales() {
  return Object.keys(MESSAGES) as Locale[]
}

export function t(key: keyof (typeof MESSAGES)['en']) {
  const locale = getLocale()
  return MESSAGES[locale][key]
}

export function applyTranslations(root: ParentNode) {
  for (const node of root.querySelectorAll<HTMLElement>('[data-i18n]')) {
    node.textContent = t(node.dataset.i18n as keyof (typeof MESSAGES)['en'])
  }
  for (const node of root.querySelectorAll<HTMLElement>(
    '[data-i18n-placeholder]',
  )) {
    node.setAttribute(
      'placeholder',
      t(node.dataset.i18nPlaceholder as keyof (typeof MESSAGES)['en']),
    )
  }
}
