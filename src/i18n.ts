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
    humanSoftDither: 'Human soft dither',
    humanPatchy: 'Human patchy',
    humanSweepArcs: 'Human sweep arcs',
    humanMicroCorrections: 'Human micro corrections',
    humanJitterFill: 'Human jitter fill',
    humanCornerBias: 'Human corner bias',
    humanLongStrokes: 'Human long strokes',
    humanTapClusters: 'Human tap clusters',
    humanMessySpiral: 'Human messy spiral',
    humanDrunkWalk: 'Human drunk walk',
    humanNoiseCloud: 'Human noise cloud',
    humanPatchJump: 'Human patch jump',
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
      'Shift+B toggle widget · Shift+M hide/show panel · Shift+S show panel · Shift+H hide panel · Shift+V hide/show overlays · Shift+Enter draw · Shift+I add image · Shift+/ focus shortcuts · Shift+N next image · Shift+P previous image · Shift+O color panel (active image) · Shift+L lock/unlock active image',
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
    colorPanelHelp:
      'Turn colors on/off with a click. Drag blocks in the color strip to change drawing priority.',
    colorPanelOrderHint: 'Color #1 is painted first.',
    exportImage: 'Export image settings',
    lockImage: 'Lock/unlock image',
    deleteImage: 'Delete image',
    toggleOverlay: 'Hide/show overlays',
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
    humanSoftDither: 'Difuminado humano suave',
    humanPatchy: 'Parches humanos',
    humanSweepArcs: 'Barridos humanos en arco',
    humanMicroCorrections: 'Micro correcciones humanas',
    humanJitterFill: 'Relleno humano con jitter',
    humanCornerBias: 'Sesgo humano por esquina',
    humanLongStrokes: 'Trazos humanos largos',
    humanTapClusters: 'Toques humanos por grupos',
    humanMessySpiral: 'Espiral humana irregular',
    humanDrunkWalk: 'Caminata humana errática',
    humanNoiseCloud: 'Nube humana de ruido',
    humanPatchJump: 'Saltos humanos por parches',
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
      'Shift+B mostrar widget · Shift+M ocultar/mostrar panel · Shift+S mostrar panel · Shift+H ocultar panel · Shift+V ocultar/mostrar overlays · Shift+Enter dibujar · Shift+I agregar imagen · Shift+/ enfocar atajos · Shift+N siguiente imagen · Shift+P imagen anterior · Shift+O panel de colores (imagen activa) · Shift+L bloquear/desbloquear imagen activa',
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
    colorPanelHelp:
      'Activa o desactiva colores con un clic. Arrastra bloques en la barra de colores para cambiar la prioridad de pintado.',
    colorPanelOrderHint: 'El color #1 se pinta primero.',
    exportImage: 'Exportar configuración de imagen',
    lockImage: 'Bloquear/desbloquear imagen',
    deleteImage: 'Eliminar imagen',
    toggleOverlay: 'Ocultar/mostrar overlays',
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
  for (const node of root.querySelectorAll<HTMLElement>('[data-i18n-title]')) {
    node.setAttribute(
      'title',
      t(node.dataset.i18nTitle as keyof (typeof MESSAGES)['en']),
    )
  }
  for (const node of root.querySelectorAll<HTMLElement>(
    '[data-i18n-aria-label]',
  )) {
    node.setAttribute(
      'aria-label',
      t(node.dataset.i18nAriaLabel as keyof (typeof MESSAGES)['en']),
    )
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
