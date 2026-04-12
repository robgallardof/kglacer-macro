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
  protected readonly $colors!: HTMLDivElement
  protected readonly $colorsDialog!: HTMLDialogElement
  protected readonly $colorsDialogList!: HTMLDivElement
  protected readonly $colorSearch!: HTMLInputElement
  protected readonly $openColors!: HTMLButtonElement
  protected readonly $closeColors!: HTMLButtonElement
  protected readonly $delete!: HTMLButtonElement
  protected readonly $drawColorsInOrder!: HTMLInputElement
  protected readonly $drawTransparent!: HTMLInputElement
  protected readonly $export!: HTMLDivElement
  protected readonly $lock!: HTMLButtonElement
  protected readonly $opacity!: HTMLInputElement
  protected readonly $progressLine!: HTMLDivElement
  protected readonly $progressText!: HTMLSpanElement
  protected readonly $resetSize!: HTMLButtonElement
  protected readonly $resetSizeSpan!: HTMLSpanElement
  protected readonly $settings!: HTMLDivElement
  protected readonly $strategy!: HTMLSelectElement
  protected readonly $topbar!: HTMLDivElement
  protected readonly $wrapper!: HTMLDivElement

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
      $colors: '.colors',
      $colorsDialog: '.colors-dialog',
      $colorsDialogList: '.colors-dialog-list',
      $colorSearch: '.color-search',
      $openColors: '.open-colors',
      $closeColors: '.close-colors',
      $delete: '.delete',
      $drawColorsInOrder: '.draw-colors-in-order',
      $drawTransparent: '.draw-transparent',
      $export: '.export',
      $lock: '.lock',
      $opacity: '.opacity',
      $progressLine: '.wprogress div',
      $progressText: '.wprogress span',
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

    // Strategy
    this.registerEvent(this.$strategy, 'change', () => {
      this.strategy = this.$strategy.value as ImageStrategy
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

    this.registerEvent(this.$brightness, 'change', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.pixels.brightness = this.$brightness.valueAsNumber
        this.pixels.update()
        this.updateColors()
        this.update()
        save(this.bot)
      }, 1000)
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
    this.registerEvent(this.$closeColors, 'click', () => {
      this.$colorsDialog.close()
    })
    this.registerEvent(this.$colorsDialog, 'click', (event: MouseEvent) => {
      if (event.target === this.$colorsDialog) this.$colorsDialog.close()
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
    const width = Math.round(this.position.pixelSize * this.pixels.width)
    const height = Math.round(this.position.pixelSize * this.pixels.height)
    this.element.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`
    this.element.style.width = `${width}px`
    this.element.style.height = `${height}px`
    this.$canvas.style.opacity = `${this.opacity}%`
    this.element.classList.remove('hidden')

    this.$resetSizeSpan.textContent = this.pixels.width.toString()
    this.$brightness.valueAsNumber = this.pixels.brightness
    this.$strategy.value = this.strategy
    this.$opacity.valueAsNumber = this.opacity
    this.$drawTransparent.checked = this.drawTransparentPixels
    this.$drawColorsInOrder.checked = this.drawColorsInOrder
    const maxTasks = this.pixels.pixels.length * this.pixels.pixels[0]!.length
    const doneTasks = maxTasks - this.tasks.length
    const percent = ((doneTasks / maxTasks) * 100) | 0
    this.$progressText.textContent = `${doneTasks}/${maxTasks} ${percent}% ETA: ${(this.tasks.length / 120) | 0}h`
    this.$progressLine.style.transform = `scaleX(${percent}%)`
    this.$wrapper.classList[this.lock ? 'add' : 'remove']('no-pointer-events')
    this.$lock.classList[this.lock ? 'add' : 'remove']('locked')
  }

  /** Removes image. Don't forget to remove from array inside widget. */
  public destroy() {
    super.destroy()
    this.element.remove()
    removeFromArray(this.bot.images, this)
    this.bot.widget.update()
    save(this.bot)
  }

  public openColorPanel() {
    if (this.$colorsDialog.open) {
      this.$colorSearch.focus()
      return
    }
    const width = 560
    const maxWidth = Math.min(width, window.innerWidth - 16)
    const estimatedHeight = Math.min(680, window.innerHeight - 16)
    const left = Math.max(8, (window.innerWidth - maxWidth) / 2)
    const top = Math.max(8, (window.innerHeight - estimatedHeight) / 2)
    this.$colorsDialog.style.margin = '0'
    this.$colorsDialog.style.position = 'fixed'
    this.$colorsDialog.style.left = `${Math.round(left)}px`
    this.$colorsDialog.style.top = `${Math.round(top)}px`
    this.$colorsDialog.show()
  }

  public applyLocale() {
    applyTranslations(this.element)
    this.updateColors()
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
    this.$colors.innerHTML = ''
    this.$colorsDialogList.innerHTML = ''
    const pixelsSum = this.pixels.pixels.length * this.pixels.pixels[0]!.length
    const itemWidth = 100 / this.pixels.colors.size
    const $track = document.createElement('div')
    $track.className = 'colors-track'
    $track.setAttribute('aria-label', t('overlayColors'))
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
    let nextXPosition = 0
    for (let index = 0; index < this.colors.length; index++) {
      const drawColor = this.colors[index]!
      const color = this.pixels.colors.get(drawColor.realColor)!
      let dragging = false
      const isPremium = color.realColor !== color.color
      const width = (color.amount / pixelsSum) * 100
      const hex = this.colorHex(color.realColor)
      const keywords = this.colorKeywords(color.realColor)
      const toggleDisabled = () => {
        if (dragging) return
        drawColor.disabled = drawColor.disabled ? undefined : true
        $button.classList.toggle('color-disabled')
        $chip.classList.toggle('disabled', Boolean(drawColor.disabled))
        const $state = $chip.querySelector<HTMLElement>('.state')
        if ($state)
          $state.textContent = drawColor.disabled ? t('disabled') : t('enabled')
        save(this.bot)
      }
      const $button = document.createElement('button')
      $button.setAttribute(
        'aria-label',
        `${t('overlayColors')} #${index + 1}: ${hex.toUpperCase()}`,
      )
      $button.title = `${width.toFixed(1)}%`
      $button.innerHTML = `<span class="order-index">#${index + 1}</span>`
      if (drawColor.disabled) $button.classList.add('color-disabled')
      if (!isPremium) $button.style.background = colorToCSS(color.realColor)
      else {
        $button.classList.add('substitution')
        $button.style.setProperty('--wreal-color', colorToCSS(color.realColor))
        $button.style.setProperty(
          '--wsubstitution-color',
          colorToCSS(color.color),
        )
        const $button1 = document.createElement('button')
        const $button2 = document.createElement('button')
        $button1.textContent = t('buy')
        $button2.textContent = '✓'
        $button1.classList.add('buy')
        $button2.classList.add('disable')
        $button1.addEventListener('click', () => {
          document.getElementById('color-' + color.realColor)?.click()
        })
        $button2.addEventListener('click', toggleDisabled)
        $button.append($button1)
        $button.append($button2)
      }
      $button.style.left = nextXPosition + '%'
      $button.style.width = width + '%'
      nextXPosition += width
      $button.style.setProperty('--wleft', itemWidth * index + '%')
      $button.style.setProperty('--wwidth', itemWidth + '%')
      $track.append($button)

      const $chip = document.createElement('button')
      $chip.className = `color-chip ${drawColor.disabled ? 'disabled' : ''}`
      $chip.innerHTML = `<span class="order-index">#${index + 1}</span>
<span class="swatch"></span>
<span class="meta">
  <span class="coverage">${width.toFixed(1)}% · ${hex.toUpperCase()}</span>
  <span class="state">${drawColor.disabled ? t('disabled') : t('enabled')}</span>
</span>
<span class="premium ${isPremium ? 'on' : ''}">${isPremium ? t('premium') : ''}</span>`
      $chip
        .querySelector<HTMLElement>('.swatch')!
        .style.setProperty('--swatch-color', colorToCSS(color.realColor))
      $chip.addEventListener('click', () => {
        toggleDisabled()
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

      // Drag functionality
      const startDrag = (startEvent: MouseEvent) => {
        let newIndex = index
        const buttonWidth = $button.getBoundingClientRect().width
        const mouseMoveHandler = (event: MouseEvent) => {
          newIndex = Math.min(
            this.colors.length - 1,
            Math.max(
              0,
              Math.round(
                index + (event.clientX - startEvent.clientX) / buttonWidth,
              ),
            ),
          )
          if (newIndex !== index) dragging = true
          let childIndex = 0
          for (const $child of $track.children as Iterable<HTMLElement>) {
            if ($child === $button) continue
            if (childIndex === newIndex) childIndex++
            $child.style.setProperty('--wleft', itemWidth * childIndex + '%')
            childIndex++
          }
          $button.style.setProperty('--wleft', itemWidth * newIndex + '%')
        }
        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener(
          'mouseup',
          () => {
            document.removeEventListener('mousemove', mouseMoveHandler)
            if (newIndex !== index)
              this.colors.splice(newIndex, 0, ...this.colors.splice(index, 1))
            save(this.bot)
            $button.removeEventListener('mousedown', startDrag)
            setTimeout(() => {
              this.updateColors()
            }, 200)
          },
          {
            once: true,
          },
        )
      }
      $button.addEventListener('mousedown', startDrag)
      if (!isPremium) $button.addEventListener('click', toggleDisabled)
    }
    this.$colors.append($track)
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
