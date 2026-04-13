import { removeFromArray } from '@softsky/utils'

import { Base } from './base'
import { KGlacerMacro } from './bot'
import { COLORS_RGB, colorToCSS } from './colors'
// @ts-ignore
import { applyTranslations, t } from './i18n'
import html from './image.html' with { type: 'text' }
import { Pixels } from './pixels'
import { save } from './save'
import { SETTINGS_EXTENSION } from './version'
import { Position, WorldPosition } from './world-position'

export type DrawTask = {
  position: WorldPosition
  color: number
}

export type ImageColorSetting = {
  color: number
  disabled?: boolean
}

export enum ImageStrategy {
  RANDOM = 'RANDOM',
  HUMANIZED = 'HUMANIZED',
  HUMAN_SOFT_DITHER = 'HUMAN_SOFT_DITHER',
  HUMAN_PATCHY = 'HUMAN_PATCHY',
  HUMAN_SWEEP_ARCS = 'HUMAN_SWEEP_ARCS',
  HUMAN_MICRO_CORRECTIONS = 'HUMAN_MICRO_CORRECTIONS',
  HUMAN_JITTER_FILL = 'HUMAN_JITTER_FILL',
  HUMAN_CORNER_BIAS = 'HUMAN_CORNER_BIAS',
  HUMAN_LONG_STROKES = 'HUMAN_LONG_STROKES',
  HUMAN_TAP_CLUSTERS = 'HUMAN_TAP_CLUSTERS',
  HUMAN_MESSY_SPIRAL = 'HUMAN_MESSY_SPIRAL',
  HUMAN_DRUNK_WALK = 'HUMAN_DRUNK_WALK',
  HUMAN_NOISE_CLOUD = 'HUMAN_NOISE_CLOUD',
  HUMAN_PATCH_JUMP = 'HUMAN_PATCH_JUMP',
  HUMAN_HESITANT_LINES = 'HUMAN_HESITANT_LINES',
  HUMAN_OVERLAP_SWEEPS = 'HUMAN_OVERLAP_SWEEPS',
  HUMAN_WOBBLE_DRIFT = 'HUMAN_WOBBLE_DRIFT',
  HUMAN_GAP_RECOVERY = 'HUMAN_GAP_RECOVERY',
  HUMAN_STAIRCASE = 'HUMAN_STAIRCASE',
  HUMAN_EDGE_HUGGER = 'HUMAN_EDGE_HUGGER',
  HUMAN_BLOBS = 'HUMAN_BLOBS',
  HUMAN_BACKTRACK = 'HUMAN_BACKTRACK',
  HUMAN_SHAKY_DIAGONAL = 'HUMAN_SHAKY_DIAGONAL',
  HUMAN_LATE_FIXES = 'HUMAN_LATE_FIXES',
  ZIGZAG = 'ZIGZAG',
  BRUSH_STROKES = 'BRUSH_STROKES',
  DIAGONAL_BRUSH = 'DIAGONAL_BRUSH',
  DOWN = 'DOWN',
  UP = 'UP',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  SPIRAL_FROM_CENTER = 'SPIRAL_FROM_CENTER',
  SPIRAL_TO_CENTER = 'SPIRAL_TO_CENTER',
  SCRIBBLE = 'SCRIBBLE',
  CROSSHATCH = 'CROSSHATCH',
  WAVE_SWEEP = 'WAVE_SWEEP',
  SCATTERED_LINES = 'SCATTERED_LINES',
  CONTOUR_JITTER = 'CONTOUR_JITTER',
  SPIRAL_WOBBLE = 'SPIRAL_WOBBLE',
  CLUSTER_BURSTS = 'CLUSTER_BURSTS',
  ORBITAL = 'ORBITAL',
  FLOW_FIELD = 'FLOW_FIELD',
  EDGE_IN = 'EDGE_IN',
}

export class BotImage extends Base {
  public static async fromJSON(
    bot: KGlacerMacro,
    data: ReturnType<BotImage['toJSON']>,
  ) {
    return new BotImage(
      bot,
      WorldPosition.fromJSON(bot, data.position),
      await Pixels.fromJSON(bot, data.pixels),
      data.strategy,
      data.opacity,
      data.drawTransparentPixels,
      data.drawColorsInOrder,
      data.colors,
      data.lock,
    )
  }

  public readonly element = document.createElement('div')

  /** Pixels left to draw */
  public tasks: DrawTask[] = []

  /** Moving/resizing image */
  protected moveInfo?: {
    globalX?: number
    globalY?: number
    width?: number
    height?: number
    clientX: number
    clientY: number
  }

  protected readonly $brightness!: HTMLInputElement
  protected readonly $canvas!: HTMLCanvasElement
  protected readonly $colorsDialog!: HTMLDialogElement
  protected readonly $colorsDialogList!: HTMLDivElement
  protected readonly $colorSearch!: HTMLInputElement
  protected readonly $openColors!: HTMLButtonElement
  protected readonly $openEdit!: HTMLButtonElement
  protected readonly $openPreview!: HTMLButtonElement
  protected readonly $closeColors!: HTMLButtonElement
  protected readonly $closePreview!: HTMLButtonElement
  protected readonly $closeEdit!: HTMLButtonElement
  protected readonly $delete!: HTMLButtonElement
  protected readonly $dithering!: HTMLInputElement
  protected readonly $drawColorsInOrder!: HTMLInputElement
  protected readonly $drawTransparent!: HTMLInputElement
  protected readonly $export!: HTMLDivElement
  protected readonly $lock!: HTMLButtonElement
  protected readonly $opacity!: HTMLInputElement
  protected readonly $progressLine!: HTMLDivElement
  protected readonly $progressText!: HTMLSpanElement
  protected readonly $previewDialog!: HTMLDialogElement
  protected readonly $previewDialogList!: HTMLDivElement
  protected readonly $editDialog!: HTMLDialogElement
  protected readonly $resetSize!: HTMLButtonElement
  protected readonly $resetSizeSpan!: HTMLSpanElement
  protected readonly $settings!: HTMLDivElement
  protected readonly $strategy!: HTMLSelectElement
  protected readonly $topbar!: HTMLDivElement
  protected readonly $wrapper!: HTMLDivElement
  protected colorDialogDragState?: {
    pointerId: number
    offsetX: number
    offsetY: number
    moved: boolean
  }
  protected suppressNextColorDialogBackdropClick = false
  protected previewCacheSignature?: string
  protected readonly previewSequenceCache = new Map<string, Position[]>()
  protected readonly previewAnimations = new WeakMap<
    HTMLCanvasElement,
    number
  >()
  protected readonly previewAnimationHandles = new Set<number>()

  public constructor(
    protected bot: KGlacerMacro,
    /** Top-left corner of image */
    public position: WorldPosition,
    /** Parsed imageto draw */
    public pixels: Pixels,
    /** Order of pixels to draw */
    public strategy = ImageStrategy.SPIRAL_FROM_CENTER,
    /** Opacity of overlay */
    public opacity = 50,
    /** Should we erase pixels there transparency should be */
    public drawTransparentPixels = false,
    /** Should bot draw colors in order */
    public drawColorsInOrder = false,
    /** Colors settings */
    public colors: { realColor: number; disabled?: boolean }[] = [],
    /** Stop accidental image edit */
    public lock = false,
  ) {
    super()
    this.element.innerHTML = html as unknown as string
    this.element.classList.add('wimage')
    applyTranslations(this.element)
    document.body.append(this.element)

    this.populateElementsWithSelector(this.element, {
      $brightness: '.brightness',
      $colorsDialog: '.colors-dialog',
      $colorsDialogList: '.colors-dialog-list',
      $colorSearch: '.color-search',
      $openColors: '.open-colors',
      $openEdit: '.open-edit',
      $openPreview: '.open-preview',
      $closeColors: '.close-colors',
      $closeEdit: '.close-edit',
      $closePreview: '.close-preview',
      $delete: '.delete',
      $dithering: '.dithering',
      $drawColorsInOrder: '.draw-colors-in-order',
      $drawTransparent: '.draw-transparent',
      $export: '.export',
      $lock: '.lock',
      $opacity: '.opacity',
      $progressLine: '.wprogress div',
      $progressText: '.wprogress span',
      $previewDialog: '.preview-dialog',
      $previewDialogList: '.preview-dialog-list',
      $editDialog: '.image-edit-dialog',
      $resetSize: '.reset-size',
      $settings: '.wform',
      $strategy: '.strategy',
      $topbar: '.wtopbar',
      $wrapper: '.wrapper',
    })
    this.$resetSizeSpan =
      this.$resetSize.querySelector<HTMLSpanElement>('span')!
    this.$canvas = this.pixels.canvas
    this.$wrapper.prepend(this.pixels.canvas)
    document.body.append(
      this.$editDialog,
      this.$colorsDialog,
      this.$previewDialog,
    )

    // Strategy
    this.registerEvent(this.$strategy, 'change', () => {
      this.strategy = this.$strategy.value as ImageStrategy
      if (this.$previewDialog.open) this.renderStrategyPreviewSamples()
      save(this.bot)
    })

    // Opacity
    this.registerEvent(this.$opacity, 'input', () => {
      this.opacity = this.$opacity.valueAsNumber
      this.$opacity.style.setProperty('--val', this.opacity + '%')
      this.update()
      save(this.bot)
    })
    this.$opacity.style.setProperty('--val', this.opacity + '%')

    // Brightness
    let timeout: ReturnType<typeof setTimeout> | undefined

    this.registerEvent(this.$brightness, 'input', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.refreshImageAdjustments()
      }, 150)
    })

    this.registerEvent(this.$dithering, 'change', () => {
      this.pixels.dithering = this.$dithering.checked
      this.refreshImageAdjustments()
    })

    // Reset
    this.registerEvent(this.$resetSize, 'click', () => {
      this.pixels.width = this.pixels.image.naturalWidth
      this.pixels.update()
      this.updateColors()
      this.update()
      save(this.bot)
    })

    // drawTransparent
    this.registerEvent(this.$drawTransparent, 'click', () => {
      this.drawTransparentPixels = this.$drawTransparent.checked
      save(this.bot)
    })

    // drawColorsInOrder
    this.registerEvent(this.$drawColorsInOrder, 'click', () => {
      this.drawColorsInOrder = this.$drawColorsInOrder.checked
      save(this.bot)
    })

    // Lock
    this.registerEvent(this.$lock, 'click', () => {
      this.lock = !this.lock
      this.update()
      save(this.bot)
    })

    this.registerEvent(this.$delete, 'click', this.destroy.bind(this))
    this.registerEvent(this.$openColors, 'click', () => {
      this.openColorPanel()
    })
    this.registerEvent(this.$openEdit, 'click', () => {
      this.openEditPanel()
    })
    this.registerEvent(this.$openPreview, 'click', () => {
      this.openPreviewPanel()
    })
    this.registerEvent(this.$closeColors, 'click', () => {
      this.closeDialog(this.$colorsDialog)
    })
    this.registerEvent(this.$closePreview, 'click', () => {
      this.closeDialog(this.$previewDialog)
    })
    this.registerEvent(this.$closeEdit, 'click', () => {
      this.closeDialog(this.$editDialog)
    })
    this.registerEvent(
      this.$colorsDialog.querySelector('.colors-dialog-head')!,
      'pointerdown',
      this.startColorDialogDrag.bind(this),
    )
    this.registerEvent(
      document,
      'pointermove',
      this.moveColorDialog.bind(this),
      { passive: false },
    )
    this.registerEvent(
      document,
      'pointerup',
      this.stopColorDialogDrag.bind(this),
    )
    this.registerEvent(
      document,
      'pointercancel',
      this.stopColorDialogDrag.bind(this),
    )
    this.registerEvent(this.$colorsDialog, 'click', (event: MouseEvent) => {
      if (this.suppressNextColorDialogBackdropClick) {
        this.suppressNextColorDialogBackdropClick = false
        return
      }
      if (event.target === this.$colorsDialog)
        this.closeDialog(this.$colorsDialog)
    })
    this.registerEvent(this.$previewDialog, 'click', (event: MouseEvent) => {
      if (event.target === this.$previewDialog)
        this.closeDialog(this.$previewDialog)
    })
    this.registerEvent(this.$editDialog, 'click', (event: MouseEvent) => {
      if (event.target === this.$editDialog) this.closeDialog(this.$editDialog)
    })
    this.registerEvent(this.$colorSearch, 'input', () => {
      this.updateColors()
    })

    // Export
    this.registerEvent(this.$export, 'click', this.export.bind(this))

    // Move
    this.registerEvent(this.$topbar, 'mousedown', this.moveStart.bind(this))
    this.registerEvent(this.$canvas, 'mousedown', this.moveStart.bind(this))
    this.registerEvent(document, 'mouseup', this.moveStop.bind(this))
    this.registerEvent(document, 'mousemove', this.move.bind(this))

    // Resize
    for (const $resize of this.element.querySelectorAll<HTMLDivElement>(
      '.resize',
    ))
      this.registerEvent($resize, 'mousedown', this.resizeStart.bind(this))
    this.update()
    this.updateColors()
  }

  public toJSON() {
    return {
      pixels: this.pixels.toJSON(),
      position: this.position.toJSON(),
      strategy: this.strategy,
      opacity: this.opacity,
      drawTransparentPixels: this.drawTransparentPixels,
      drawColorsInOrder: this.drawColorsInOrder,
      colors: this.colors,
      lock: this.lock,
    }
  }

  protected refreshImageAdjustments() {
    this.pixels.brightness = this.$brightness.valueAsNumber
    this.pixels.update()
    this.updateColors()
    this.update()
    save(this.bot)
  }

  /** Calculates everything we need to do. Very expensive task! */
  public updateTasks() {
    this.tasks.length = 0
    const position = this.position.clone()
    const skipColors = new Set<number>()
    const colorsOrderMap = new Map<number, number>()
    for (let index = 0; index < this.colors.length; index++) {
      const drawColor = this.colors[index]!
      if (drawColor.disabled) skipColors.add(drawColor.realColor)
      colorsOrderMap.set(drawColor.realColor, index)
    }
    for (const { x, y } of this.strategyPositionIterator()) {
      const color = this.pixels.pixels[y]![x]!
      if (skipColors.has(color)) continue
      position.globalX = this.position.globalX + x
      position.globalY = this.position.globalY + y
      const mapColor = position.getMapColor()
      if (color !== mapColor && (this.drawTransparentPixels || color !== 0))
        this.tasks.push({
          position: position.clone(),
          color,
        })
    }
    if (this.drawColorsInOrder)
      this.tasks.sort(
        (a, b) =>
          (colorsOrderMap.get(a.color) ?? 0) -
          (colorsOrderMap.get(b.color) ?? 0),
      )
    this.update()
    this.bot.widget.update()
  }

  /** Update image (NOT PIXELS) */
  public update() {
    const { x, y } = this.position.toScreenPosition()
    const width = this.position.pixelSize * this.pixels.width
    const height = this.position.pixelSize * this.pixels.height
    this.element.style.transform = `translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0)`
    this.element.style.width = `${width}px`
    this.element.style.height = `${height}px`
    this.$canvas.style.opacity = `${this.opacity}%`
    this.element.classList.remove('hidden')

    this.$resetSizeSpan.textContent = this.pixels.width.toString()
    this.$brightness.valueAsNumber = this.pixels.brightness
    this.$dithering.checked = this.pixels.dithering
    this.$strategy.value = this.strategy
    this.$opacity.valueAsNumber = this.opacity
    this.$drawTransparent.checked = this.drawTransparentPixels
    this.$drawColorsInOrder.checked = this.drawColorsInOrder
    const maxTasks = this.pixels.pixels.length * this.pixels.pixels[0]!.length
    const doneTasks = Math.max(0, maxTasks - this.tasks.length)
    const percent = maxTasks > 0 ? ((doneTasks / maxTasks) * 100) | 0 : 0
    this.$progressText.textContent = `${doneTasks}/${maxTasks} ${percent}% ETA: ${(this.tasks.length / 120) | 0}h`
    this.$progressLine.style.transform = `scaleX(${percent / 100})`
    this.$canvas.classList[this.lock ? 'add' : 'remove']('no-pointer-events')
    for (const handle of this.element.querySelectorAll<HTMLElement>('.resize'))
      handle.classList[this.lock ? 'add' : 'remove']('no-pointer-events')
    this.$lock.classList[this.lock ? 'add' : 'remove']('locked')
  }

  public exportImage() {
    this.export()
  }

  /** Removes image. Don't forget to remove from array inside widget. */
  public destroy() {
    super.destroy()
    this.element.remove()
    this.$colorsDialog.remove()
    this.$editDialog.remove()
    this.$previewDialog.remove()
    removeFromArray(this.bot.images, this)
    this.bot.widget.update()
    save(this.bot)
  }

  public openColorPanel() {
    if (this.$colorsDialog.open) {
      this.$colorSearch.focus()
      return
    }
    this.$colorsDialog.style.position = 'fixed'
    this.$colorsDialog.style.left = ''
    this.$colorsDialog.style.top = ''
    this.$colorsDialog.style.margin = 'auto'
    this.$colorsDialog.showModal()
    this.$colorSearch.focus()
  }

  public openPreviewPanel() {
    if (this.$previewDialog.open) {
      this.renderStrategyPreviewSamples()
      return
    }
    this.$previewDialog.style.position = 'fixed'
    this.$previewDialog.style.left = ''
    this.$previewDialog.style.top = ''
    this.$previewDialog.style.margin = 'auto'
    this.$previewDialog.showModal()
    this.renderStrategyPreviewSamples()
  }

  public openEditPanel() {
    if (this.$editDialog.open) {
      this.$brightness.focus()
      return
    }
    this.$editDialog.style.position = 'fixed'
    this.$editDialog.style.left = ''
    this.$editDialog.style.top = ''
    this.$editDialog.style.margin = 'auto'
    this.$editDialog.showModal()
    this.$brightness.focus()
  }

  protected closeDialog(dialog: HTMLDialogElement) {
    if (!dialog.open) return
    if (dialog === this.$previewDialog) this.stopPreviewAnimations()
    if (typeof dialog.requestClose === 'function') dialog.requestClose()
    else dialog.close()
  }

  protected stopPreviewAnimations() {
    for (const handle of this.previewAnimationHandles)
      cancelAnimationFrame(handle)
    this.previewAnimationHandles.clear()
  }

  protected startColorDialogDrag(event: PointerEvent) {
    if (event.button !== 0) return
    const target = event.target as HTMLElement | null
    if (target?.closest('button,input,select,textarea,a,label')) return
    const bounds = this.$colorsDialog.getBoundingClientRect()
    this.colorDialogDragState = {
      pointerId: event.pointerId,
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
      moved: false,
    }
    event.preventDefault()
  }

  protected moveColorDialog(event: PointerEvent) {
    if (!this.colorDialogDragState) return
    if (event.pointerId !== this.colorDialogDragState.pointerId) return
    const dialogBounds = this.$colorsDialog.getBoundingClientRect()
    const maxLeft = Math.max(8, window.innerWidth - dialogBounds.width - 8)
    const maxTop = Math.max(8, window.innerHeight - dialogBounds.height - 8)
    const left = Math.min(
      maxLeft,
      Math.max(8, event.clientX - this.colorDialogDragState.offsetX),
    )
    const top = Math.min(
      maxTop,
      Math.max(8, event.clientY - this.colorDialogDragState.offsetY),
    )
    if (
      !this.colorDialogDragState.moved &&
      (Math.abs(event.movementX) > 0 || Math.abs(event.movementY) > 0)
    )
      this.colorDialogDragState.moved = true
    this.$colorsDialog.style.left = `${Math.round(left)}px`
    this.$colorsDialog.style.top = `${Math.round(top)}px`
    event.preventDefault()
  }

  protected stopColorDialogDrag(event: PointerEvent) {
    if (!this.colorDialogDragState) return
    if (event.pointerId !== this.colorDialogDragState.pointerId) return
    if (this.colorDialogDragState.moved)
      this.suppressNextColorDialogBackdropClick = true
    this.colorDialogDragState = undefined
  }

  protected renderStrategyPreviewSamples() {
    this.stopPreviewAnimations()
    this.invalidatePreviewCacheIfNeeded()
    const selected = this.$strategy.value as ImageStrategy
    this.$previewDialogList.innerHTML = ''
    const fragment = document.createDocumentFragment()
    const $card = document.createElement('article')
    $card.className = 'preview-card'
    const $title = document.createElement('strong')
    $title.textContent = this.getStrategyLabel(selected)
    const $canvas = document.createElement('canvas')
    $canvas.className = 'preview-canvas'
    $canvas.width = 156
    $canvas.height = 156
    this.paintStrategyPreview($canvas, selected)
    $card.append($title, $canvas)
    fragment.append($card)
    this.$previewDialogList.append(fragment)
  }

  protected invalidatePreviewCacheIfNeeded() {
    const signature = `${this.pixels.width}x${this.pixels.height}:${this.pixels.image.src.length}`
    if (this.previewCacheSignature === signature) return
    this.previewCacheSignature = signature
    this.previewSequenceCache.clear()
  }

  protected getStrategyLabel(strategy: ImageStrategy) {
    switch (strategy) {
      case ImageStrategy.RANDOM:
        return t('random')
      case ImageStrategy.HUMANIZED:
        return t('humanized')
      case ImageStrategy.HUMAN_SOFT_DITHER:
        return t('humanSoftDither')
      case ImageStrategy.HUMAN_PATCHY:
        return t('humanPatchy')
      case ImageStrategy.HUMAN_SWEEP_ARCS:
        return t('humanSweepArcs')
      case ImageStrategy.HUMAN_MICRO_CORRECTIONS:
        return t('humanMicroCorrections')
      case ImageStrategy.HUMAN_JITTER_FILL:
        return t('humanJitterFill')
      case ImageStrategy.HUMAN_CORNER_BIAS:
        return t('humanCornerBias')
      case ImageStrategy.HUMAN_LONG_STROKES:
        return t('humanLongStrokes')
      case ImageStrategy.HUMAN_TAP_CLUSTERS:
        return t('humanTapClusters')
      case ImageStrategy.HUMAN_MESSY_SPIRAL:
        return t('humanMessySpiral')
      case ImageStrategy.HUMAN_DRUNK_WALK:
        return t('humanDrunkWalk')
      case ImageStrategy.HUMAN_NOISE_CLOUD:
        return t('humanNoiseCloud')
      case ImageStrategy.HUMAN_PATCH_JUMP:
        return t('humanPatchJump')
      case ImageStrategy.HUMAN_HESITANT_LINES:
        return t('humanHesitantLines')
      case ImageStrategy.HUMAN_OVERLAP_SWEEPS:
        return t('humanOverlapSweeps')
      case ImageStrategy.HUMAN_WOBBLE_DRIFT:
        return t('humanWobbleDrift')
      case ImageStrategy.HUMAN_GAP_RECOVERY:
        return t('humanGapRecovery')
      case ImageStrategy.HUMAN_STAIRCASE:
        return t('humanStaircase')
      case ImageStrategy.HUMAN_EDGE_HUGGER:
        return t('humanEdgeHugger')
      case ImageStrategy.HUMAN_BLOBS:
        return t('humanBlobs')
      case ImageStrategy.HUMAN_BACKTRACK:
        return t('humanBacktrack')
      case ImageStrategy.HUMAN_SHAKY_DIAGONAL:
        return t('humanShakyDiagonal')
      case ImageStrategy.HUMAN_LATE_FIXES:
        return t('humanLateFixes')
      case ImageStrategy.ZIGZAG:
        return t('zigzag')
      case ImageStrategy.BRUSH_STROKES:
        return t('brushStrokes')
      case ImageStrategy.DIAGONAL_BRUSH:
        return t('diagonalBrush')
      case ImageStrategy.DOWN:
        return t('down')
      case ImageStrategy.UP:
        return t('up')
      case ImageStrategy.LEFT:
        return t('left')
      case ImageStrategy.RIGHT:
        return t('right')
      case ImageStrategy.SPIRAL_FROM_CENTER:
        return t('spiralOut')
      case ImageStrategy.SPIRAL_TO_CENTER:
        return t('spiralIn')
      case ImageStrategy.SCRIBBLE:
        return t('scribble')
      case ImageStrategy.CROSSHATCH:
        return t('crosshatch')
      case ImageStrategy.WAVE_SWEEP:
        return t('waveSweep')
      case ImageStrategy.SCATTERED_LINES:
        return t('scatteredLines')
      case ImageStrategy.CONTOUR_JITTER:
        return t('contourJitter')
      case ImageStrategy.SPIRAL_WOBBLE:
        return t('spiralWobble')
      case ImageStrategy.CLUSTER_BURSTS:
        return t('clusterBursts')
      case ImageStrategy.ORBITAL:
        return t('orbital')
      case ImageStrategy.FLOW_FIELD:
        return t('flowField')
      case ImageStrategy.EDGE_IN:
        return t('edgeIn')
      default:
        return strategy
    }
  }

  protected paintStrategyPreview(
    canvas: HTMLCanvasElement,
    strategy: ImageStrategy,
  ) {
    const context = canvas.getContext('2d')
    if (!context) return
    context.fillStyle = '#0f1526'
    context.fillRect(0, 0, canvas.width, canvas.height)
    const mask = this.getImagePreviewMask()
    const filtered = this.getCachedPreviewSequence(strategy, mask)
    const cell = Math.min(
      canvas.width / this.pixels.width,
      canvas.height / this.pixels.height,
    )
    const offsetX = (canvas.width - this.pixels.width * cell) / 2
    const offsetY = (canvas.height - this.pixels.height * cell) / 2
    const activeAnimation = this.previewAnimations.get(canvas)
    if (activeAnimation) {
      cancelAnimationFrame(activeAnimation)
      this.previewAnimationHandles.delete(activeAnimation)
    }
    const schedule = (callback: FrameRequestCallback) => {
      const handle = requestAnimationFrame((time) => {
        this.previewAnimationHandles.delete(handle)
        callback(time)
      })
      this.previewAnimationHandles.add(handle)
      return handle
    }
    const drawFrame = (progressCount: number) => {
      context.fillStyle = '#0f1526'
      context.fillRect(0, 0, canvas.width, canvas.height)
      for (
        let index = 0;
        index < Math.min(progressCount, filtered.length);
        index++
      ) {
        const pixel = filtered[index]!
        const colorIndex = this.pixels.pixels[pixel.y]?.[pixel.x] ?? 0
        if (!colorIndex) continue
        context.fillStyle = colorToCSS(colorIndex)
        context.fillRect(
          offsetX + pixel.x * cell,
          offsetY + pixel.y * cell,
          Math.max(1, cell),
          Math.max(1, cell),
        )
      }
    }
    const drawDuration = Math.min(3400, Math.max(900, filtered.length * 8))
    const holdDuration = 220
    const cycleDuration = drawDuration + holdDuration
    const animate = (start: number, now: number) => {
      if (!this.$previewDialog.open) return
      const elapsedInCycle = (now - start) % cycleDuration
      const ratio = Math.min(1, elapsedInCycle / drawDuration)
      const eased = ratio * ratio * (3 - 2 * ratio)
      drawFrame(Math.floor(filtered.length * eased))
      const animationId = schedule((time) => {
        animate(start, time)
      })
      this.previewAnimations.set(canvas, animationId)
    }
    const start = performance.now()
    animate(start, start)
  }

  protected getCachedPreviewSequence(
    strategy: ImageStrategy,
    mask: Position[],
  ) {
    const cacheKey = `${strategy}:${this.pixels.width}x${this.pixels.height}:${mask.length}`
    const cached = this.previewSequenceCache.get(cacheKey)
    if (cached) return cached
    const previousStrategy = this.strategy
    this.strategy = strategy
    const sequence = [...this.strategyPositionIterator()]
    this.strategy = previousStrategy
    const maskKeys = new Set(mask.map(({ x, y }) => `${x}:${y}`))
    const filtered = sequence.filter(({ x, y }) => maskKeys.has(`${x}:${y}`))
    this.previewSequenceCache.set(cacheKey, filtered)
    return filtered
  }

  protected getImagePreviewMask() {
    const width = this.pixels.width
    const height = this.pixels.height
    const mask: Position[] = []
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if ((this.pixels.pixels[y]?.[x] ?? 0) !== 0) mask.push({ x, y })
      }
    }
    return mask.length ? mask : this.fallbackPreviewMask()
  }

  protected fallbackPreviewMask() {
    const mask: Position[] = []
    const centerX = this.pixels.width / 2
    const centerY = this.pixels.height / 2
    const radius = Math.max(
      4,
      Math.min(this.pixels.width, this.pixels.height) / 2.5,
    )
    for (let y = 0; y < this.pixels.height; y++) {
      for (let x = 0; x < this.pixels.width; x++) {
        if ((x - centerX) ** 2 + (y - centerY) ** 2 <= radius ** 2)
          mask.push({ x, y })
      }
    }
    return mask
  }

  public applyLocale() {
    applyTranslations(this.element)
    this.updateColors()
    if (this.$previewDialog.open) this.renderStrategyPreviewSamples()
  }

  protected colorHex(realColor: number) {
    const rgb = COLORS_RGB[realColor] ?? '0,0,0'
    const [r = 0, g = 0, b = 0] = rgb
      .split(',')
      .map((value) => Number.parseInt(value, 10))
    return `#${[r, g, b]
      .map((value) => value.toString(16).padStart(2, '0'))
      .join('')}`
  }

  protected colorKeywords(realColor: number) {
    const rgb = COLORS_RGB[realColor] ?? '0,0,0'
    const [r = 0, g = 0, b = 0] = rgb
      .split(',')
      .map((value) => Number.parseInt(value, 10))
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    if (delta < 15) return ['gray', 'grey', 'gris', 'neutral', 'neutro']
    if (r > g + 30 && r > b + 30) return ['red', 'rojo']
    if (g > r + 30 && g > b + 30) return ['green', 'verde']
    if (b > r + 30 && b > g + 30) return ['blue', 'azul']
    if (r > 170 && g > 120 && b < 130) return ['orange', 'naranja']
    if (r > 170 && g > 110 && b > 140) return ['pink', 'rosa']
    if (r > 120 && g < 100 && b > 120) return ['purple', 'violet', 'morado']
    if (r > 130 && g > 130 && b < 90) return ['yellow', 'amarillo']
    return ['brown', 'cafe', 'marron']
  }

  /** Update colors array */
  public updateColors() {
    this.$colorsDialogList.innerHTML = ''
    const pixelsSum = this.pixels.pixels.length * this.pixels.pixels[0]!.length
    this.$colorsDialogList.setAttribute('aria-label', t('colorPanelResults'))
    const searchValue = this.$colorSearch.value.trim().toLowerCase()

    // If not the synced with colors then rebuild order
    if (
      this.colors.length !== this.pixels.colors.size ||
      this.colors.some((x) => !this.pixels.colors.has(x.realColor))
    ) {
      this.colors = this.pixels.colors
        .values()
        .toArray()
        .sort((a, b) => b.amount - a.amount)
        .map((color) => ({
          realColor: color.realColor,
          disabled: false,
        }))
      save(this.bot)
    }

    // Build colors UI
    for (let index = 0; index < this.colors.length; index++) {
      const drawColor = this.colors[index]!
      const color = this.pixels.colors.get(drawColor.realColor)!
      let draggingChip = false
      const isPremium = color.realColor !== color.color
      const width = (color.amount / pixelsSum) * 100
      const hex = this.colorHex(color.realColor)
      const keywords = this.colorKeywords(color.realColor)
      const toggleDisabled = () => {
        drawColor.disabled = drawColor.disabled ? undefined : true
        $chip.classList.toggle('disabled', Boolean(drawColor.disabled))
        const $state = $chip.querySelector<HTMLElement>('.state')
        if ($state)
          $state.textContent = drawColor.disabled ? t('disabled') : t('enabled')
        save(this.bot)
      }
      const $chip = document.createElement('button')
      $chip.className = `color-chip ${drawColor.disabled ? 'disabled' : ''}`
      $chip.draggable = true
      $chip.setAttribute(
        'aria-label',
        `${t('overlayColors')} #${index + 1}: ${hex.toUpperCase()}`,
      )
      $chip.innerHTML = `<span class="order-index">#${index + 1}</span>
<span class="drag" title="${t('up')} / ${t('down')}">⋮⋮</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${width.toFixed(1)}%</span>
  <span class="hex">${hex.toUpperCase()}</span>
  <span class="state">${drawColor.disabled ? t('disabled') : t('enabled')}</span>
</span>
<span class="premium ${isPremium ? 'on' : ''}">${isPremium ? t('premium') : ''}</span>`
      $chip
        .querySelector<HTMLElement>('.swatch')!
        .style.setProperty('--swatch-color', colorToCSS(color.realColor))
      $chip.addEventListener('click', () => {
        if (draggingChip) {
          draggingChip = false
          return
        }
        toggleDisabled()
      })
      $chip.addEventListener('dragstart', (event) => {
        draggingChip = true
        $chip.classList.add('dragging')
        event.dataTransfer?.setData('text/plain', String(index))
        event.dataTransfer!.effectAllowed = 'move'
      })
      $chip.addEventListener('dragend', () => {
        $chip.classList.remove('dragging')
      })
      $chip.addEventListener('dragover', (event) => {
        event.preventDefault()
        $chip.classList.add('drag-target')
      })
      $chip.addEventListener('dragleave', () => {
        $chip.classList.remove('drag-target')
      })
      $chip.addEventListener('drop', (event) => {
        event.preventDefault()
        $chip.classList.remove('drag-target')
        const source = Number.parseInt(
          event.dataTransfer?.getData('text/plain') ?? '-1',
          10,
        )
        if (source < 0 || source === index || source >= this.colors.length)
          return
        this.colors.splice(index, 0, ...this.colors.splice(source, 1))
        save(this.bot)
        this.updateColors()
      })
      if (isPremium) {
        const $buy = document.createElement('button')
        $buy.textContent = t('buy')
        $buy.className = 'buy-chip'
        $buy.addEventListener('click', (event) => {
          event.stopPropagation()
          document.getElementById('color-' + color.realColor)?.click()
        })
        $chip.append($buy)
      }
      const searchTokens = `${hex} ${keywords.join(' ')} ${color.realColor} ${COLORS_RGB[color.realColor]}`
      if (!searchValue || searchTokens.toLowerCase().includes(searchValue))
        this.$colorsDialogList.append($chip)
    }
  }

  /** Create iterator that generates positions based on strategy */
  protected *strategyPositionIterator(): Generator<Position> {
    const width = this.pixels.pixels[0]!.length
    const height = this.pixels.pixels.length
    switch (this.strategy) {
      case ImageStrategy.DOWN: {
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) yield { x, y }
        break
      }
      case ImageStrategy.UP: {
        for (let y = height - 1; y >= 0; y--)
          for (let x = 0; x < width; x++) yield { x, y }
        break
      }
      case ImageStrategy.LEFT: {
        for (let x = 0; x < width; x++)
          for (let y = 0; y < height; y++) yield { x, y }
        break
      }
      case ImageStrategy.RIGHT: {
        for (let x = width - 1; x >= 0; x--)
          for (let y = 0; y < height; y++) yield { x, y }
        break
      }
      case ImageStrategy.RANDOM: {
        const positions: Position[] = []
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) positions.push({ x, y })
        for (let index = positions.length - 1; index >= 0; index--) {
          const index_ = Math.floor(Math.random() * (index + 1))
          const temporary = positions[index]!
          positions[index] = positions[index_]!
          positions[index_] = temporary
        }
        yield* positions
        break
      }
      case ImageStrategy.ZIGZAG: {
        for (let y = 0; y < height; y++) {
          if (y % 2 === 0) for (let x = 0; x < width; x++) yield { x, y }
          else for (let x = width - 1; x >= 0; x--) yield { x, y }
        }
        break
      }
      case ImageStrategy.HUMANIZED: {
        const blockSize = Math.max(4, Math.floor(Math.min(width, height) / 10))
        const blocks: Position[] = []
        for (let y = 0; y < height; y += blockSize)
          for (let x = 0; x < width; x += blockSize) blocks.push({ x, y })
        for (let index = blocks.length - 1; index >= 0; index--) {
          const index_ = Math.floor(Math.random() * (index + 1))
          const temporary = blocks[index]!
          blocks[index] = blocks[index_]!
          blocks[index_] = temporary
        }
        for (let index = 0; index < blocks.length; index++) {
          const block = blocks[index]!
          const yEnd = Math.min(height, block.y + blockSize)
          const xEnd = Math.min(width, block.x + blockSize)
          for (let y = block.y; y < yEnd; y++) {
            const startFromLeft = Math.random() > 0.35
            if (startFromLeft)
              for (let x = block.x; x < xEnd; x++) yield { x, y }
            else for (let x = xEnd - 1; x >= block.x; x--) yield { x, y }
          }
        }
        break
      }
      case ImageStrategy.HUMAN_SOFT_DITHER: {
        const visited = new Set<string>()
        for (let y = 0; y < height; y++) {
          const jitter = Math.floor(Math.random() * 3) - 1
          const odd = (y + jitter) % 2 === 0
          if (odd)
            for (let x = 0; x < width; x += 2) {
              visited.add(`${x},${y}`)
              yield { x, y }
            }
          else
            for (let x = 1; x < width; x += 2) {
              visited.add(`${x},${y}`)
              yield { x, y }
            }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (visited.has(key)) continue
            yield { x, y }
          }
        break
      }
      case ImageStrategy.HUMAN_PATCHY: {
        const visited = new Set<string>()
        const total = width * height
        while (visited.size < total) {
          const cx = Math.floor(Math.random() * width)
          const cy = Math.floor(Math.random() * height)
          const radius = 1 + Math.floor(Math.random() * 5)
          for (let y = cy - radius; y <= cy + radius; y++)
            for (let x = cx - radius; x <= cx + radius; x++) {
              if (x < 0 || x >= width || y < 0 || y >= height) continue
              if (Math.hypot(x - cx, y - cy) > radius + Math.random() * 1.2)
                continue
              const key = `${x},${y}`
              if (visited.has(key)) continue
              visited.add(key)
              yield { x, y }
            }
        }
        break
      }
      case ImageStrategy.HUMAN_SWEEP_ARCS: {
        const visited = new Set<string>()
        const cx = (width - 1) / 2
        const cy = (height - 1) / 2
        const radiusLimit = Math.hypot(cx, cy)
        for (let pass = 0; pass < 4; pass++) {
          const start = Math.random() * Math.PI * 2
          for (let r = 0; r <= radiusLimit; r += 0.35) {
            const sweep = Math.PI / 2 + Math.random() * (Math.PI / 1.5)
            const steps = Math.max(10, Math.floor(r * 8))
            for (let step = 0; step < steps; step++) {
              const theta = start + (sweep * step) / steps + Math.sin(r) * 0.08
              const x = Math.round(cx + Math.cos(theta) * r)
              const y = Math.round(cy + Math.sin(theta) * r)
              if (x < 0 || x >= width || y < 0 || y >= height) continue
              const key = `${x},${y}`
              if (visited.has(key)) continue
              visited.add(key)
              yield { x, y }
            }
          }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (visited.has(key)) continue
            yield { x, y }
          }
        break
      }
      case ImageStrategy.HUMAN_MICRO_CORRECTIONS: {
        const visited = new Set<string>()
        for (let y = 0; y < height; y++) {
          const direction = y % 2 === 0 ? 1 : -1
          let x = direction > 0 ? 0 : width - 1
          for (let step = 0; step < width; step++) {
            const jitterX = x + (Math.random() > 0.82 ? direction : 0)
            const jitterY = y + (Math.random() > 0.9 ? 1 : 0)
            for (const point of [
              { x, y },
              { x: jitterX, y },
              { x, y: jitterY },
            ]) {
              if (
                point.x < 0 ||
                point.x >= width ||
                point.y < 0 ||
                point.y >= height
              )
                continue
              const key = `${point.x},${point.y}`
              if (visited.has(key)) continue
              visited.add(key)
              yield point
            }
            x += direction
          }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (visited.has(key)) continue
            yield { x, y }
          }
        break
      }
      case ImageStrategy.HUMAN_JITTER_FILL: {
        const points: Position[] = []
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) points.push({ x, y })
        points.sort((a, b) => {
          const ay = a.y + (Math.random() - 0.5) * 1.8
          const by = b.y + (Math.random() - 0.5) * 1.8
          if (ay !== by) return ay - by
          return (
            a.x + (Math.random() - 0.5) * 2 - (b.x + (Math.random() - 0.5) * 2)
          )
        })
        yield* points
        break
      }
      case ImageStrategy.HUMAN_CORNER_BIAS: {
        const corners: Position[] = [
          { x: 0, y: 0 },
          { x: width - 1, y: 0 },
          { x: 0, y: height - 1 },
          { x: width - 1, y: height - 1 },
        ]
        const corner = corners[Math.floor(Math.random() * corners.length)]!
        const points: { point: Position; score: number }[] = []
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const distance = Math.hypot(x - corner.x, y - corner.y)
            const score = distance + Math.random() * 3.5
            points.push({ point: { x, y }, score })
          }
        points.sort((a, b) => a.score - b.score)
        for (const item of points) yield item.point
        break
      }
      case ImageStrategy.HUMAN_LONG_STROKES: {
        const visited = new Set<string>()
        const total = width * height
        while (visited.size < total) {
          let x = Math.floor(Math.random() * width)
          let y = Math.floor(Math.random() * height)
          const angle = Math.random() * Math.PI * 2
          const dx = Math.sign(Math.cos(angle))
          const dy = Math.sign(Math.sin(angle))
          const length = 10 + Math.floor(Math.random() * 40)
          for (let step = 0; step < length; step++) {
            if (x < 0 || x >= width || y < 0 || y >= height) break
            const key = `${x},${y}`
            if (!visited.has(key)) {
              visited.add(key)
              yield { x, y }
            }
            if (Math.random() > 0.78) {
              x += dy
              y += dx
            } else {
              x += dx
              y += dy
            }
          }
        }
        break
      }
      case ImageStrategy.HUMAN_TAP_CLUSTERS: {
        const visited = new Set<string>()
        const total = width * height
        while (visited.size < total) {
          const cx = Math.floor(Math.random() * width)
          const cy = Math.floor(Math.random() * height)
          const taps = 3 + Math.floor(Math.random() * 10)
          for (let tap = 0; tap < taps; tap++) {
            const x = Math.round(cx + (Math.random() - 0.5) * 6)
            const y = Math.round(cy + (Math.random() - 0.5) * 6)
            if (x < 0 || x >= width || y < 0 || y >= height) continue
            const key = `${x},${y}`
            if (visited.has(key)) continue
            visited.add(key)
            yield { x, y }
          }
        }
        break
      }
      case ImageStrategy.HUMAN_MESSY_SPIRAL: {
        const visited = new Set<string>()
        const cx = (width - 1) / 2
        const cy = (height - 1) / 2
        const maxRadius = Math.hypot(cx, cy) + 2
        for (let step = 0; visited.size < width * height; step++) {
          const t = step / 3
          const radius = Math.min(maxRadius, t * 0.18)
          const theta = t * 0.29 + Math.sin(t * 0.13) * 0.8
          const x = Math.round(
            cx + Math.cos(theta) * radius + Math.sin(t) * 0.7,
          )
          const y = Math.round(
            cy + Math.sin(theta) * radius + Math.cos(t) * 0.7,
          )
          if (x < 0 || x >= width || y < 0 || y >= height) {
            if (step > width * height * 18) break
            continue
          }
          const key = `${x},${y}`
          if (visited.has(key)) {
            if (Math.random() > 0.9) continue
          } else {
            visited.add(key)
            yield { x, y }
          }
          if (step > width * height * 18) break
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (visited.has(key)) continue
            yield { x, y }
          }
        break
      }
      case ImageStrategy.HUMAN_DRUNK_WALK: {
        const visited = new Set<string>()
        let x = Math.floor(Math.random() * width)
        let y = Math.floor(Math.random() * height)
        const directions: Position[] = [
          { x: -1, y: 0 },
          { x: 1, y: 0 },
          { x: 0, y: -1 },
          { x: 0, y: 1 },
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: -1, y: 1 },
          { x: 1, y: 1 },
        ]
        while (visited.size < width * height) {
          const key = `${x},${y}`
          if (!visited.has(key)) {
            visited.add(key)
            yield { x, y }
          }
          const options: Position[] = []
          for (const direction of directions) {
            const nx = x + direction.x
            const ny = y + direction.y
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue
            options.push({ x: nx, y: ny })
          }
          if (!options.length) break
          const unvisited = options.filter((point) => {
            return !visited.has(`${point.x},${point.y}`)
          })
          if (unvisited.length && Math.random() > 0.2) {
            const next =
              unvisited[Math.floor(Math.random() * unvisited.length)]!
            x = next.x
            y = next.y
            continue
          }
          const next = options[Math.floor(Math.random() * options.length)]!
          x = next.x
          y = next.y
        }
        for (let yy = 0; yy < height; yy++)
          for (let xx = 0; xx < width; xx++) {
            const key = `${xx},${yy}`
            if (visited.has(key)) continue
            yield { x: xx, y: yy }
          }
        break
      }
      case ImageStrategy.HUMAN_NOISE_CLOUD: {
        const points: { point: Position; score: number }[] = []
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const wave =
              Math.sin((x + 1) * 0.93 + Math.random() * 0.8) +
              Math.cos((y + 1) * 1.17 + Math.random() * 0.8)
            const jitter = (Math.random() - 0.5) * 2.6
            const centerBias = Math.hypot(x - width / 2, y - height / 2) * 0.08
            points.push({
              point: { x, y },
              score: wave + jitter + centerBias,
            })
          }
        points.sort((a, b) => a.score - b.score)
        for (const item of points) yield item.point
        break
      }
      case ImageStrategy.HUMAN_PATCH_JUMP: {
        const emitted = new Set<string>()
        const centers: Position[] = []
        for (let index = 0; index < Math.max(6, (width * height) / 18); index++)
          centers.push({
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
          })
        while (emitted.size < width * height) {
          const center = centers[Math.floor(Math.random() * centers.length)]!
          const rx = 1 + Math.floor(Math.random() * 3)
          const ry = 1 + Math.floor(Math.random() * 3)
          for (let y = center.y - ry; y <= center.y + ry; y++)
            for (let x = center.x - rx; x <= center.x + rx; x++) {
              if (x < 0 || x >= width || y < 0 || y >= height) continue
              if (Math.random() > 0.86) continue
              const key = `${x},${y}`
              if (emitted.has(key)) continue
              emitted.add(key)
              yield { x, y }
            }
          if (Math.random() > 0.72 && centers.length < (width * height) / 2)
            centers.push({
              x: Math.floor(Math.random() * width),
              y: Math.floor(Math.random() * height),
            })
          if (emitted.size > width * height * 0.92) break
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (emitted.has(key)) continue
            yield { x, y }
          }
        break
      }
      case ImageStrategy.HUMAN_HESITANT_LINES: {
        const emitted = new Set<string>()
        for (let y = 0; y < height; y++) {
          const fromLeft = y % 2 === 0
          for (let step = 0; step < width; step++) {
            const x = fromLeft ? step : width - 1 - step
            const key = `${x},${y}`
            if (!emitted.has(key)) {
              emitted.add(key)
              yield { x, y }
            }
            if (Math.random() > 0.7) {
              const retryX = Math.max(
                0,
                Math.min(width - 1, x + (Math.random() > 0.5 ? 1 : -1)),
              )
              const retryY = Math.max(
                0,
                Math.min(height - 1, y + (Math.random() > 0.65 ? 1 : 0)),
              )
              const retryKey = `${retryX},${retryY}`
              if (!emitted.has(retryKey)) {
                emitted.add(retryKey)
                yield { x: retryX, y: retryY }
              }
            }
          }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (emitted.has(key)) continue
            yield { x, y }
          }
        break
      }
      case ImageStrategy.HUMAN_OVERLAP_SWEEPS: {
        const points: { point: Position; score: number }[] = []
        const sweepOffset = Math.random() * Math.PI * 2
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const wave = Math.sin((x + y) * 0.42 + sweepOffset) * 2.2
            const overlap = Math.cos((x - y) * 0.3 + sweepOffset) * 1.4
            points.push({
              point: { x, y },
              score: y + wave + overlap + (Math.random() - 0.5) * 3.4,
            })
          }
        points.sort((a, b) => a.score - b.score)
        for (const item of points) yield item.point
        break
      }
      case ImageStrategy.HUMAN_WOBBLE_DRIFT: {
        const points: { point: Position; score: number }[] = []
        const cx = width / 2
        const cy = height / 2
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const drift = Math.hypot(x - cx, y - cy) * 0.25
            const wobble =
              Math.sin((x + 1) * 0.9) * 1.8 +
              Math.cos((y + 1) * 1.1) * 1.8 +
              Math.sin((x + y) * 0.35) * 1.4
            points.push({
              point: { x, y },
              score: drift + wobble + (Math.random() - 0.5) * 2.8,
            })
          }
        points.sort((a, b) => a.score - b.score)
        for (const item of points) yield item.point
        break
      }
      case ImageStrategy.HUMAN_GAP_RECOVERY: {
        const emitted = new Set<string>()
        const skipped: Position[] = []
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            if (Math.random() > 0.87) {
              skipped.push({ x, y })
              continue
            }
            emitted.add(`${x},${y}`)
            yield { x, y }
          }
        skipped.sort(
          (a, b) =>
            Math.hypot(a.x - width / 2, a.y - height / 2) -
            Math.hypot(b.x - width / 2, b.y - height / 2),
        )
        for (const point of skipped) {
          const key = `${point.x},${point.y}`
          if (emitted.has(key)) continue
          emitted.add(key)
          yield point
        }
        break
      }
      case ImageStrategy.HUMAN_STAIRCASE: {
        const emitted = new Set<string>()
        const diagonals = width + height - 1
        for (let diagonal = 0; diagonal < diagonals; diagonal++) {
          const startY = Math.max(0, diagonal - width + 1)
          const endY = Math.min(height - 1, diagonal)
          for (let y = startY; y <= endY; y++) {
            const x = diagonal - y
            const steps: Position[] = [
              { x, y },
              { x: x + (Math.random() > 0.5 ? 1 : -1), y },
              { x, y: y + (Math.random() > 0.5 ? 1 : -1) },
            ]
            for (const point of steps) {
              if (
                point.x < 0 ||
                point.x >= width ||
                point.y < 0 ||
                point.y >= height
              )
                continue
              const key = `${point.x},${point.y}`
              if (emitted.has(key)) continue
              emitted.add(key)
              yield point
            }
          }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (emitted.has(key)) continue
            yield { x, y }
          }
        break
      }
      case ImageStrategy.HUMAN_EDGE_HUGGER: {
        const points: { point: Position; score: number }[] = []
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const edgeDistance = Math.min(x, y, width - 1 - x, height - 1 - y)
            points.push({
              point: { x, y },
              score: edgeDistance * 3.5 + (Math.random() - 0.5) * 5.5,
            })
          }
        points.sort((a, b) => a.score - b.score)
        for (const item of points) yield item.point
        break
      }
      case ImageStrategy.HUMAN_BLOBS: {
        const emitted = new Set<string>()
        const total = width * height
        while (emitted.size < total) {
          const cx = Math.floor(Math.random() * width)
          const cy = Math.floor(Math.random() * height)
          const radius = 1 + Math.floor(Math.random() * 4)
          for (let y = cy - radius; y <= cy + radius; y++)
            for (let x = cx - radius; x <= cx + radius; x++) {
              if (x < 0 || x >= width || y < 0 || y >= height) continue
              const angle = Math.atan2(y - cy, x - cx)
              const noisyRadius =
                radius + Math.sin(angle * 3 + Math.random()) * 0.8
              if (Math.hypot(x - cx, y - cy) > noisyRadius) continue
              const key = `${x},${y}`
              if (emitted.has(key)) continue
              emitted.add(key)
              yield { x, y }
            }
        }
        break
      }
      case ImageStrategy.HUMAN_BACKTRACK: {
        const emitted = new Set<string>()
        const points: Position[] = []
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) points.push({ x, y })
        points.sort(
          (a, b) =>
            a.y - b.y + (Math.random() - 0.5) * 2.2 + (a.x - b.x) * 0.04,
        )
        for (let index = 0; index < points.length; index++) {
          const point = points[index]!
          const key = `${point.x},${point.y}`
          if (emitted.has(key)) continue
          emitted.add(key)
          yield point
          if (index > 1 && Math.random() > 0.74) {
            const previous = points[index - 1]!
            const previousKey = `${previous.x},${previous.y}`
            if (!emitted.has(previousKey)) {
              emitted.add(previousKey)
              yield previous
            }
          }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (emitted.has(key)) continue
            yield { x, y }
          }
        break
      }
      case ImageStrategy.HUMAN_SHAKY_DIAGONAL: {
        const points: { point: Position; score: number }[] = []
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const diagonalBias = Math.abs(x - y) * 0.6
            const shake =
              Math.sin(x * 1.4 + y * 0.8) * 1.8 +
              Math.cos(y * 1.1 + x * 0.5) * 1.5
            points.push({
              point: { x, y },
              score: diagonalBias + shake + (Math.random() - 0.5) * 3.2,
            })
          }
        points.sort((a, b) => a.score - b.score)
        for (const item of points) yield item.point
        break
      }
      case ImageStrategy.HUMAN_LATE_FIXES: {
        const points: Position[] = []
        const lateFixes: Position[] = []
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            if (Math.random() > 0.9) lateFixes.push({ x, y })
            else points.push({ x, y })
          }
        points.sort(
          (a, b) =>
            a.y -
            b.y +
            (Math.random() - 0.5) * 1.5 +
            (Math.random() > 0.85 ? a.x - b.x : 0),
        )
        lateFixes.sort(
          (a, b) =>
            Math.hypot(b.x - width / 2, b.y - height / 2) -
            Math.hypot(a.x - width / 2, a.y - height / 2),
        )
        yield* points
        yield* lateFixes
        break
      }
      case ImageStrategy.DIAGONAL_BRUSH: {
        for (let diagonal = 0; diagonal < width + height - 1; diagonal++) {
          const reverse = diagonal % 2 === 0
          const points: Position[] = []
          const startY = Math.max(0, diagonal - width + 1)
          const endY = Math.min(height - 1, diagonal)
          for (let y = startY; y <= endY; y++) {
            const x = diagonal - y
            if (x >= 0 && x < width) points.push({ x, y })
          }
          if (Math.random() > 0.55) points.reverse()
          if (reverse)
            for (let index = points.length - 1; index >= 0; index--)
              yield points[index]!
          else yield* points
        }
        break
      }
      case ImageStrategy.BRUSH_STROKES: {
        const visited = Array.from({ length: height }, () =>
          Array<boolean>(width).fill(false),
        )
        const directions: Position[] = [
          { x: 1, y: 0 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: -1 },
          { x: 1, y: 1 },
          { x: 1, y: -1 },
          { x: -1, y: 1 },
          { x: -1, y: -1 },
        ]
        const inBounds = (x: number, y: number) =>
          x >= 0 && x < width && y >= 0 && y < height
        let painted = 0
        const total = width * height

        for (
          let attempts = 0;
          attempts < total * 6 && painted < total;
          attempts++
        ) {
          let x = Math.floor(Math.random() * width)
          let y = Math.floor(Math.random() * height)
          let direction =
            directions[Math.floor(Math.random() * directions.length)]!
          const strokeLength = 3 + Math.floor(Math.random() * 16)
          for (let step = 0; step < strokeLength; step++) {
            if (!inBounds(x, y)) break
            if (!visited[y]![x]!) {
              visited[y]![x] = true
              painted++
              yield { x, y }
            }
            if (Math.random() > 0.72)
              direction =
                directions[Math.floor(Math.random() * directions.length)]!
            x += direction.x
            y += direction.y
          }
        }

        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) if (!visited[y]![x]!) yield { x, y }
        break
      }

      case ImageStrategy.SPIRAL_FROM_CENTER:
      case ImageStrategy.SPIRAL_TO_CENTER: {
        const visited = new Set<string>()
        const total = width * height
        let x = Math.floor(width / 2)
        let y = Math.floor(height / 2)
        const directories = [
          [1, 0],
          [0, 1],
          [-1, 0],
          [0, -1],
        ]
        let directionIndex = 0
        let steps = 1
        const inBounds = (x: number, y: number) =>
          x >= 0 && x < width && y >= 0 && y < height
        const emit = function* () {
          let count = 0
          while (count < total) {
            for (let twice = 0; twice < 2; twice++) {
              for (let index = 0; index < steps; index++) {
                if (inBounds(x, y)) {
                  const key = `${x},${y}`
                  if (!visited.has(key)) {
                    visited.add(key)
                    yield { x, y }
                    count++
                    if (count >= total) return
                  }
                }
                x += directories[directionIndex]![0]!
                y += directories[directionIndex]![1]!
              }
              directionIndex = (directionIndex + 1) % 4
            }
            steps++
          }
        }

        if (this.strategy === ImageStrategy.SPIRAL_FROM_CENTER) yield* emit()
        else {
          const collected = [...emit()]
          for (let index = collected.length - 1; index >= 0; index--)
            yield collected[index]!
        }
        break
      }
      case ImageStrategy.SCRIBBLE: {
        const visited = new Set<string>()
        const total = width * height
        let x = Math.floor(width / 2)
        let y = Math.floor(height / 2)
        for (
          let attempts = 0;
          visited.size < total && attempts < total * 24;
          attempts++
        ) {
          const key = `${x},${y}`
          if (!visited.has(key)) {
            visited.add(key)
            yield { x, y }
          }
          x += Math.floor(Math.random() * 3) - 1
          y += Math.floor(Math.random() * 3) - 1
          if (x < 0 || x >= width || y < 0 || y >= height) {
            x = Math.floor(Math.random() * width)
            y = Math.floor(Math.random() * height)
          }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (visited.has(key)) continue
            visited.add(key)
            yield { x, y }
          }
        break
      }
      case ImageStrategy.CROSSHATCH: {
        const diagonals: Position[] = []
        for (let sum = 0; sum < width + height - 1; sum++)
          for (
            let y = Math.max(0, sum - width + 1);
            y <= Math.min(height - 1, sum);
            y++
          ) {
            const x = sum - y
            diagonals.push({ x, y })
          }
        const anti: Position[] = []
        for (let diff = -height + 1; diff < width; diff++)
          for (let y = 0; y < height; y++) {
            const x = y + diff
            if (x >= 0 && x < width) anti.push({ x, y })
          }
        const seen = new Set<string>()
        for (const point of [...diagonals, ...anti]) {
          const key = `${point.x},${point.y}`
          if (seen.has(key)) continue
          seen.add(key)
          yield point
        }
        break
      }
      case ImageStrategy.WAVE_SWEEP: {
        const emitted = new Set<string>()
        for (let x = 0; x < width; x++) {
          const wave = Math.sin((x / Math.max(1, width - 1)) * Math.PI * 4)
          const center = ((wave + 1) * 0.5 * (height - 1)) | 0
          for (let delta = 0; delta < height; delta++) {
            const y1 = center + delta
            const y2 = center - delta
            for (const y of [y1, y2]) {
              if (y < 0 || y >= height) continue
              const key = `${x},${y}`
              if (emitted.has(key)) continue
              emitted.add(key)
              yield { x, y }
            }
          }
        }
        break
      }
      case ImageStrategy.SCATTERED_LINES: {
        const visited = new Set<string>()
        const total = width * height
        for (
          let attempts = 0;
          visited.size < total && attempts < total * 14;
          attempts++
        ) {
          let x = Math.floor(Math.random() * width)
          let y = Math.floor(Math.random() * height)
          const angle = Math.random() * Math.PI * 2
          const dx = Math.round(Math.cos(angle))
          const dy = Math.round(Math.sin(angle))
          const length = 6 + Math.floor(Math.random() * 28)
          for (let step = 0; step < length; step++) {
            if (x < 0 || x >= width || y < 0 || y >= height) break
            const key = `${x},${y}`
            if (!visited.has(key)) {
              visited.add(key)
              yield { x, y }
            }
            x += dx
            y += dy
          }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (visited.has(key)) continue
            visited.add(key)
            yield { x, y }
          }
        break
      }
      case ImageStrategy.CONTOUR_JITTER: {
        const seen = new Set<string>()
        for (
          let layer = 0;
          layer < Math.ceil(Math.min(width, height) / 2);
          layer++
        ) {
          const points: Position[] = []
          const left = layer
          const top = layer
          const right = width - layer - 1
          const bottom = height - layer - 1
          for (let x = left; x <= right; x++) points.push({ x, y: top })
          for (let y = top + 1; y <= bottom; y++) points.push({ x: right, y })
          for (let x = right - 1; x >= left; x--) points.push({ x, y: bottom })
          for (let y = bottom - 1; y > top; y--) points.push({ x: left, y })
          for (let i = points.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = points[i]!
            points[i] = points[j]!
            points[j] = temp
          }
          for (const point of points) {
            const key = `${point.x},${point.y}`
            if (seen.has(key)) continue
            seen.add(key)
            yield point
          }
        }
        break
      }
      case ImageStrategy.SPIRAL_WOBBLE: {
        const visited = new Set<string>()
        const cx = width / 2
        const cy = height / 2
        const maxRadius = Math.hypot(cx, cy)
        for (
          let t = 0;
          visited.size < width * height && t < width * height * 9;
          t++
        ) {
          const radius = (t / (width * height * 9)) * maxRadius
          const theta = t * 0.31 + Math.sin(t * 0.07) * 0.7
          const x = Math.round(cx + Math.cos(theta) * radius)
          const y = Math.round(cy + Math.sin(theta) * radius)
          if (x < 0 || x >= width || y < 0 || y >= height) continue
          const key = `${x},${y}`
          if (visited.has(key)) continue
          visited.add(key)
          yield { x, y }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (visited.has(key)) continue
            yield { x, y }
          }
        break
      }
      case ImageStrategy.CLUSTER_BURSTS: {
        const visited = new Set<string>()
        const total = width * height
        for (
          let attempts = 0;
          visited.size < total && attempts < total * 12;
          attempts++
        ) {
          const cx = Math.floor(Math.random() * width)
          const cy = Math.floor(Math.random() * height)
          const radius = 2 + Math.floor(Math.random() * 10)
          for (let y = cy - radius; y <= cy + radius; y++)
            for (let x = cx - radius; x <= cx + radius; x++) {
              if (x < 0 || x >= width || y < 0 || y >= height) continue
              if (Math.hypot(x - cx, y - cy) > radius) continue
              const key = `${x},${y}`
              if (visited.has(key)) continue
              visited.add(key)
              yield { x, y }
            }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (visited.has(key)) continue
            visited.add(key)
            yield { x, y }
          }
        break
      }
      case ImageStrategy.ORBITAL: {
        const visited = new Set<string>()
        const cx = (width - 1) / 2
        const cy = (height - 1) / 2
        const maxR = Math.ceil(Math.max(cx, cy))
        for (let r = 0; r <= maxR; r++) {
          const turns = Math.max(
            16,
            Math.ceil(2 * Math.PI * Math.max(1, r) * 2),
          )
          for (let step = 0; step < turns; step++) {
            const theta = (step / turns) * Math.PI * 2 + (r % 2 ? 0.3 : -0.3)
            const x = Math.round(cx + Math.cos(theta) * r)
            const y = Math.round(cy + Math.sin(theta) * r)
            if (x < 0 || x >= width || y < 0 || y >= height) continue
            const key = `${x},${y}`
            if (visited.has(key)) continue
            visited.add(key)
            yield { x, y }
          }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (visited.has(key)) continue
            yield { x, y }
          }
        break
      }
      case ImageStrategy.FLOW_FIELD: {
        const visited = new Set<string>()
        const total = width * height
        for (
          let attempts = 0;
          visited.size < total && attempts < total * 18;
          attempts++
        ) {
          let x = Math.floor(Math.random() * width)
          let y = Math.floor(Math.random() * height)
          for (let step = 0; step < 120; step++) {
            if (x < 0 || x >= width || y < 0 || y >= height) break
            const key = `${x},${y}`
            if (!visited.has(key)) {
              visited.add(key)
              yield { x, y }
            }
            const angle =
              Math.sin(x * 0.09) * 1.8 +
              Math.cos(y * 0.08) * 1.6 +
              Math.sin((x + y) * 0.05)
            x += Math.round(Math.cos(angle))
            y += Math.round(Math.sin(angle))
          }
        }
        for (let y = 0; y < height; y++)
          for (let x = 0; x < width; x++) {
            const key = `${x},${y}`
            if (visited.has(key)) continue
            visited.add(key)
            yield { x, y }
          }
        break
      }
      case ImageStrategy.EDGE_IN: {
        const seen = new Set<string>()
        const maxLayer = Math.ceil(Math.min(width, height) / 2)
        for (let layer = 0; layer < maxLayer; layer++) {
          const left = layer
          const right = width - 1 - layer
          const top = layer
          const bottom = height - 1 - layer
          for (let x = left; x <= right; x++) {
            for (const y of [top, bottom]) {
              const key = `${x},${y}`
              if (seen.has(key)) continue
              seen.add(key)
              yield { x, y }
            }
          }
          for (let y = top + 1; y <= bottom - 1; y++) {
            for (const x of [left, right]) {
              const key = `${x},${y}`
              if (seen.has(key)) continue
              seen.add(key)
              yield { x, y }
            }
          }
        }
        break
      }
    }
  }

  protected moveStart(event: MouseEvent) {
    if (event.button !== 0) return
    event.preventDefault()
    event.stopPropagation()
    if (!this.lock)
      this.moveInfo = {
        globalX: this.position.globalX,
        globalY: this.position.globalY,
        clientX: event.clientX,
        clientY: event.clientY,
      }
  }

  protected moveStop() {
    if (this.moveInfo) {
      this.moveInfo = undefined
      this.position.updateAnchor()
      this.pixels.update()
      this.updateColors()
      save(this.bot)
    }
  }

  /** Resize/move image */
  protected move(event: MouseEvent) {
    if (!this.moveInfo) return
    const deltaX = Math.round(
      (event.clientX - this.moveInfo.clientX) / this.position.pixelSize,
    )
    const deltaY = Math.round(
      (event.clientY - this.moveInfo.clientY) / this.position.pixelSize,
    )
    if (this.moveInfo.globalX !== undefined) {
      this.position.globalX = deltaX + this.moveInfo.globalX
      if (this.moveInfo.width !== undefined)
        this.pixels.width = Math.max(1, this.moveInfo.width - deltaX)
    } else if (this.moveInfo.width !== undefined)
      this.pixels.width = Math.max(1, deltaX + this.moveInfo.width)
    if (this.moveInfo.globalY !== undefined) {
      this.position.globalY = deltaY + this.moveInfo.globalY
      if (this.moveInfo.height !== undefined)
        this.pixels.height = Math.max(1, this.moveInfo.height - deltaY)
    } else if (this.moveInfo.height !== undefined)
      this.pixels.height = Math.max(1, deltaY + this.moveInfo.height)
    this.update()
    save(this.bot)
  }

  /** Resize start */
  protected resizeStart(event: MouseEvent) {
    if (this.lock || event.button !== 0) return
    event.preventDefault()
    event.stopPropagation()
    this.moveInfo = {
      clientX: event.clientX,
      clientY: event.clientY,
    }
    const $resize = event.target! as HTMLDivElement
    if ($resize.classList.contains('n')) {
      this.moveInfo.height = this.pixels.height
      this.moveInfo.globalY = this.position.globalY
    }
    if ($resize.classList.contains('e')) this.moveInfo.width = this.pixels.width
    if ($resize.classList.contains('s'))
      this.moveInfo.height = this.pixels.height
    if ($resize.classList.contains('w')) {
      this.moveInfo.width = this.pixels.width
      this.moveInfo.globalX = this.position.globalX
    }
  }

  /** export image */
  protected export() {
    const a = document.createElement('a')
    document.body.append(a)
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(this.toJSON())], { type: 'application/json' }),
    )
    a.download = `${this.pixels.width}x${this.pixels.height}.${SETTINGS_EXTENSION}`
    a.click()
    URL.revokeObjectURL(a.href)
    a.href = this.pixels.canvas.toDataURL('image/webp', 1)
    a.download = `${this.pixels.width}x${this.pixels.height}.webp`
    a.click()
    URL.revokeObjectURL(a.href)
    a.remove()
  }
}
