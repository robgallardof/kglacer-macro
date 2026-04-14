import { promisifyEventSource, swap } from '@softsky/utils'

import { Base } from './base'
import { KGlacerMacro } from './bot'
import { KGlacerMacroError, NoImageError } from './errors'
import { applyTranslations, getLocale, setLocale, t } from './i18n'
import { BotImage } from './image'
import { Pixels } from './pixels'
import { save } from './save'
import { SHORTCUTS, isEditableTarget, matchesShortcut } from './shortcuts'
// @ts-ignore
import { SETTINGS_EXTENSION } from './version'
import html from './widget.html' with { type: 'text' }
import { WorldPosition, WORLD_TILE_SIZE } from './world-position'

const OVERLAY_VISIBILITY_STORAGE_KEY = 'kglacer-macro:overlay-hidden'
const LOGO_URL =
  'https://raw.githubusercontent.com/robgallardof/kglacer-macro/refs/heads/main/src/img/logo.svg'

export enum BotStrategy {
  ALL = 'ALL',
  PERCENTAGE = 'PERCENTAGE',
  SEQUENTIAL = 'SEQUENTIAL',
}

type UploadPreprocessSettings = {
  brightness: number
  contrast: number
  saturation: number
  dithering: boolean
}

/** Widget UI with buttons */
export class Widget extends Base {
  public readonly element = document.createElement('div')

  public get status(): string {
    return this.$status.innerHTML
  }

  public set status(value: string) {
    this.$status.innerHTML = value
  }

  public get open() {
    return this.element.classList.contains('wopen')
  }
  public set open(value) {
    if (value) this.element.classList.add('wopen')
    else this.element.classList.remove('wopen')
  }

  protected readonly $settings!: HTMLDivElement
  protected readonly $status!: HTMLDivElement
  protected readonly $shortcuts!: HTMLDetailsElement
  protected readonly $locale!: HTMLSelectElement
  protected readonly $topbar!: HTMLDivElement
  protected readonly $draw!: HTMLButtonElement
  protected readonly $addImage!: HTMLButtonElement
  protected readonly $captureTemplate!: HTMLButtonElement
  protected readonly $toggleOverlay!: HTMLButtonElement
  protected readonly $strategy!: HTMLInputElement
  protected readonly $progressLine!: HTMLDivElement
  protected readonly $progressText!: HTMLSpanElement
  protected readonly $images!: HTMLDivElement
  protected readonly $wopenButton!: HTMLButtonElement
  protected readonly $widgetLogo!: HTMLImageElement
  protected activeImageIndex = -1

  // protected readonly $pumpkinHunt!: HTMLButtonElement

  public constructor(protected bot: KGlacerMacro) {
    super()
    this.element.classList.add('wwidget')
    this.element.innerHTML = html as unknown as string
    applyTranslations(this.element)
    document.body.append(this.element)

    this.populateElementsWithSelector(this.element, {
      $wopenButton: '.wopen-button',
      $widgetLogo: '.widget-logo',
      $settings: '.wform',
      $status: '.wstatus',
      $shortcuts: '.shortcuts',
      $locale: '.locale',
      $topbar: '.wtopbar',
      $draw: '.draw',
      $addImage: '.add-image',
      $captureTemplate: '.capture-template',
      $toggleOverlay: '.toggle-overlay',
      $strategy: '.strategy',
      $progressLine: '.wprogress div',
      $progressText: '.wprogress span',
      $images: '.images',
      // $pumpkinHunt: '.pumpkin-hunt',
    })
    this.$widgetLogo.src = LOGO_URL

    // Button actions
    this.$wopenButton.addEventListener('click', () => (this.open = !this.open))
    this.$draw.addEventListener('click', () => this.bot.draw())
    // this.$pumpkinHunt.addEventListener('click', () => this.pumpkinHunt())
    this.$addImage.addEventListener('click', () => this.addImage())
    this.$captureTemplate.addEventListener('click', () => {
      void this.captureTemplate()
    })
    this.$toggleOverlay.addEventListener('click', () => {
      this.toggleOverlay()
    })
    this.$strategy.addEventListener('change', () => {
      this.bot.strategy = this.$strategy.value as BotStrategy
    })
    this.$locale.value = getLocale()
    this.$locale.addEventListener('change', () => {
      setLocale(this.$locale.value as 'en' | 'es')
      applyTranslations(this.element)
      for (let index = 0; index < this.bot.images.length; index++)
        this.bot.images[index]!.applyLocale()
      this.refreshOverlayToggleText()
    })
    this.registerEvent(document, 'keydown', this.handleKeyboard.bind(this), {
      passive: false,
    })

    this.update()
    this.syncOverlayVisibilityFromStorage()
    this.open = true
    console.log('[KGM][Widget] Widget mounted and opened')
  }

  /** Add image handler */
  public addImage() {
    console.log('[KGM][Widget] Add image flow started')
    this.setDisabled('add-image', true)
    return this.run(
      t('taskAddingImage'),
      async () => {
        await this.bot.updateColors()
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = `image/*,.${SETTINGS_EXTENSION}`
        input.click()
        await promisifyEventSource(input, ['change'], ['cancel', 'error'])
        const file = input.files?.[0]
        if (!file) throw new NoImageError(this.bot)
        console.log('[KGM][Widget] File selected', {
          name: file.name,
          size: file.size,
          type: file.type,
        })
        let botImage
        let shouldOpenEditPanel = false
        if (file.name.endsWith(`.${SETTINGS_EXTENSION}`)) {
          botImage = await BotImage.fromJSON(
            this.bot,
            JSON.parse(await file.text()) as ReturnType<BotImage['toJSON']>,
          )
        } else {
          shouldOpenEditPanel = true
          const reader = new FileReader()
          reader.readAsDataURL(file)
          await promisifyEventSource(reader, ['load'], ['error'])
          const optimizedDataURL = await this.compressImageBeforeLoad(
            reader.result as string,
          )
          const preprocessedDataURL =
            await this.openImagePreprocessModal(optimizedDataURL)
          if (!preprocessedDataURL) throw new NoImageError(this.bot)
          const image = new Image()
          image.src = preprocessedDataURL
          await promisifyEventSource(image, ['load'], ['error'])
          botImage = new BotImage(
            this.bot,
            WorldPosition.fromScreenPosition(
              this.bot,
              this.defaultImageScreenPosition(),
            ),
            new Pixels(this.bot, image),
          )
        }
        this.bot.images.push(botImage)
        console.log('[KGM][Widget] Image instance added', {
          images: this.bot.images.length,
        })
        await this.bot.readMap()
        botImage.updateTasks()
        save(this.bot, true)
        this.bot.updateTasks()
        this.update()
        if (shouldOpenEditPanel) botImage.openEditPanel()
      },
      () => {
        this.setDisabled('add-image', false)
      },
    )
  }

  public captureTemplate() {
    this.setDisabled('capture-template', true)
    return this.run(
      t('taskCapturingMapImage'),
      async () => {
        const selection = await this.resolveCaptureBounds()
        const { minGlobalX, minGlobalY, maxGlobalX, maxGlobalY } = selection
        const captured = document.createElement('canvas')
        captured.width = Math.max(1, maxGlobalX - minGlobalX + 1)
        captured.height = Math.max(1, maxGlobalY - minGlobalY + 1)
        const context = captured.getContext('2d')
        if (!context) throw new Error('Capture context unavailable')
        context.imageSmoothingEnabled = false
        const tileXStart = Math.floor(minGlobalX / WORLD_TILE_SIZE)
        const tileYStart = Math.floor(minGlobalY / WORLD_TILE_SIZE)
        const tileXEnd = Math.floor(maxGlobalX / WORLD_TILE_SIZE)
        const tileYEnd = Math.floor(maxGlobalY / WORLD_TILE_SIZE)
        const totalTiles =
          (tileXEnd - tileXStart + 1) * (tileYEnd - tileYStart + 1)
        let done = 0

        for (let tileX = tileXStart; tileX <= tileXEnd; tileX++)
          for (let tileY = tileYStart; tileY <= tileYEnd; tileY++) {
            this.status = `⌛ ${t('taskReadingTiles')} [${++done}/${totalTiles}]`
            const tileImage = await this.loadTileImage(tileX, tileY)
            const tileOriginX = tileX * WORLD_TILE_SIZE
            const tileOriginY = tileY * WORLD_TILE_SIZE
            const startX = Math.max(minGlobalX, tileOriginX)
            const endX = Math.min(maxGlobalX, tileOriginX + WORLD_TILE_SIZE - 1)
            const startY = Math.max(minGlobalY, tileOriginY)
            const endY = Math.min(maxGlobalY, tileOriginY + WORLD_TILE_SIZE - 1)
            const sourceX = startX - tileOriginX
            const sourceY = startY - tileOriginY
            const drawWidth = endX - startX + 1
            const drawHeight = endY - startY + 1
            const targetX = startX - minGlobalX
            const targetY = startY - minGlobalY
            context.drawImage(
              tileImage,
              sourceX,
              sourceY,
              drawWidth,
              drawHeight,
              targetX,
              targetY,
              drawWidth,
              drawHeight,
            )
          }

        const timestamp = Date.now()
        await this.downloadCapture(captured, 'png', timestamp)
        await this.downloadCapture(captured, 'webp', timestamp)
      },
      () => {
        this.setDisabled('capture-template', false)
      },
    )
  }

  protected async downloadCapture(
    canvas: HTMLCanvasElement,
    format: 'png' | 'webp',
    timestamp: number,
  ) {
    const mimeType = format === 'webp' ? 'image/webp' : 'image/png'
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => {
        if (!result) {
          reject(
            new Error(`Failed to create ${format.toUpperCase()} capture file`),
          )
          return
        }
        resolve(result)
      }, mimeType)
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `wplace-capture-${timestamp}.${format}`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  protected async loadTileImage(tileX: number, tileY: number) {
    let lastError: unknown
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(
          `https://backend.wplace.live/files/s0/tiles/${tileX}/${tileY}.png`,
          {
            cache: 'no-store',
            credentials: 'include',
          },
        )
        if (!response.ok)
          throw new Error(`Tile fetch failed (${tileX}/${tileY})`)
        const blob = await response.blob()
        const image = new Image()
        const url = URL.createObjectURL(blob)
        image.src = url
        await promisifyEventSource(image, ['load'], ['error'])
        URL.revokeObjectURL(url)
        return image
      } catch (error) {
        lastError = error
        if (attempt < 3)
          await new Promise((resolve) => setTimeout(resolve, attempt * 200))
      }
    }
    throw lastError instanceof Error
      ? lastError
      : new Error(`Tile fetch failed (${tileX}/${tileY})`)
  }

  protected async resolveCaptureBounds() {
    const preferManual = confirm(
      'Capture mode:\nOK = manual coordinates (tile/pixel)\nCancel = select area on map',
    )
    if (!preferManual) return this.selectCaptureBounds()
    return this.selectCaptureBoundsFromCoordinates()
  }

  protected selectCaptureBoundsFromCoordinates() {
    const first = prompt(
      'Top-left corner (tileX,tileY,pixelX,pixelY). Example: 120,340,1,1',
    )
    if (!first) throw new Error('Capture cancelled')
    const second = prompt(
      'Bottom-right corner (tileX,tileY,pixelX,pixelY). Example: 121,341,1000,1000',
    )
    if (!second) throw new Error('Capture cancelled')
    const topLeft = this.parseTilePixelCoordinate(first)
    const bottomRight = this.parseTilePixelCoordinate(second)
    if (
      bottomRight.tileX < topLeft.tileX ||
      bottomRight.tileY < topLeft.tileY ||
      (bottomRight.tileX === topLeft.tileX &&
        bottomRight.tileY === topLeft.tileY &&
        (bottomRight.pixelX < topLeft.pixelX ||
          bottomRight.pixelY < topLeft.pixelY))
    )
      throw new Error('Invalid coordinate order (top-left -> bottom-right)')
    const startGlobalX = topLeft.tileX * WORLD_TILE_SIZE + topLeft.pixelX
    const startGlobalY = topLeft.tileY * WORLD_TILE_SIZE + topLeft.pixelY
    const endGlobalX = bottomRight.tileX * WORLD_TILE_SIZE + bottomRight.pixelX
    const endGlobalY = bottomRight.tileY * WORLD_TILE_SIZE + bottomRight.pixelY
    return Promise.resolve({
      minGlobalX: startGlobalX,
      minGlobalY: startGlobalY,
      maxGlobalX: endGlobalX,
      maxGlobalY: endGlobalY,
    })
  }

  protected parseTilePixelCoordinate(value: string) {
    const [tileXRaw, tileYRaw, pixelXRaw, pixelYRaw] = value
      .split(',')
      .map((part) => Number.parseInt(part.trim(), 10))
    if (
      [tileXRaw, tileYRaw, pixelXRaw, pixelYRaw].some(
        (part) => !Number.isFinite(part),
      )
    )
      throw new Error('Invalid coordinate format')
    const pixelX = Math.max(0, Math.min(999, pixelXRaw! - 1))
    const pixelY = Math.max(0, Math.min(999, pixelYRaw! - 1))
    return {
      tileX: tileXRaw!,
      tileY: tileYRaw!,
      pixelX,
      pixelY,
    }
  }

  protected selectCaptureBounds() {
    return new Promise<{
      minGlobalX: number
      minGlobalY: number
      maxGlobalX: number
      maxGlobalY: number
    }>((resolve, reject) => {
      const overlay = document.createElement('div')
      overlay.className = 'kgm-capture-overlay'
      overlay.innerHTML = `<div class="kgm-capture-hint">${t('captureHintSelectArea')}: A → B</div><div class="kgm-capture-box"></div>`
      const box = overlay.querySelector<HTMLDivElement>('.kgm-capture-box')!
      document.body.append(overlay)
      let pointA: { x: number; y: number } | undefined
      let pointAGlobal: { x: number; y: number } | undefined
      const cleanup = () => {
        window.removeEventListener('keydown', onKeyDown, true)
        overlay.removeEventListener('pointermove', onPointerMove)
        overlay.removeEventListener('pointerdown', onPointerDown)
        overlay.remove()
      }
      const getScreenBounds = (pointB: { x: number; y: number }) => {
        const left = Math.min(pointA!.x, pointB.x)
        const top = Math.min(pointA!.y, pointB.y)
        const width = Math.abs(pointA!.x - pointB.x) + 1
        const height = Math.abs(pointA!.y - pointB.y) + 1
        return { left, top, width, height }
      }
      const drawBox = (pointB: { x: number; y: number }) => {
        const { left, top, width, height } = getScreenBounds(pointB)
        box.style.left = `${left}px`
        box.style.top = `${top}px`
        box.style.width = `${width}px`
        box.style.height = `${height}px`
      }
      const onPointerMove = (event: PointerEvent) => {
        if (!pointA) return
        drawBox({ x: event.clientX, y: event.clientY })
      }
      const onPointerDown = (event: PointerEvent) => {
        event.preventDefault()
        if (!pointA) {
          pointA = { x: event.clientX, y: event.clientY }
          const first = WorldPosition.fromScreenPosition(this.bot, pointA)
          pointAGlobal = { x: first.globalX, y: first.globalY }
          drawBox(pointA)
          return
        }
        const pointB = { x: event.clientX, y: event.clientY }
        const second = WorldPosition.fromScreenPosition(this.bot, pointB)
        cleanup()
        if (!pointAGlobal) {
          reject(new Error('Capture anchor point unavailable'))
          return
        }
        const minGlobalX = Math.min(pointAGlobal.x, second.globalX)
        const minGlobalY = Math.min(pointAGlobal.y, second.globalY)
        const maxGlobalX = Math.max(pointAGlobal.x, second.globalX)
        const maxGlobalY = Math.max(pointAGlobal.y, second.globalY)
        if (maxGlobalX - minGlobalX < 1 || maxGlobalY - minGlobalY < 1) {
          reject(new Error('Capture area too small'))
          return
        }
        resolve({
          minGlobalX,
          minGlobalY,
          maxGlobalX,
          maxGlobalY,
        })
      }
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') return
        cleanup()
        reject(new Error('Capture cancelled'))
      }
      window.addEventListener('keydown', onKeyDown, true)
      overlay.addEventListener('pointermove', onPointerMove)
      overlay.addEventListener('pointerdown', onPointerDown)
    })
  }

  protected defaultImageScreenPosition() {
    const widgetWidth = Math.round(this.element.getBoundingClientRect().width)
    return {
      x: Math.max(256, widgetWidth),
      y: 32,
    }
  }

  protected async compressImageBeforeLoad(dataUrl: string) {
    const image = new Image()
    image.src = dataUrl
    await promisifyEventSource(image, ['load'], ['error'])
    const shouldCompress =
      image.naturalWidth * image.naturalHeight > 3_000_000 ||
      dataUrl.length > 3_000_000
    if (!shouldCompress) return dataUrl
    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const context = canvas.getContext('2d')
    if (!context) return dataUrl
    context.drawImage(image, 0, 0)
    return canvas.toDataURL('image/png')
  }

  protected async openImagePreprocessModal(sourceDataURL: string) {
    const sourceImage = new Image()
    sourceImage.src = sourceDataURL
    await promisifyEventSource(sourceImage, ['load'], ['error'])

    const dialog = document.createElement('dialog')
    dialog.className = 'kgm-modal upload-edit-dialog'
    dialog.innerHTML = `
      <div class="kgm-modal-head">
        <strong data-i18n="uploadEditTitle"></strong>
      </div>
      <p class="upload-edit-help" data-i18n="uploadEditHelp"></p>
      <div class="upload-edit-preview-wrap">
        <canvas class="upload-edit-preview" width="640" height="640"></canvas>
      </div>
      <div class="upload-edit-controls">
        <label>
          <span data-i18n="brightness"></span>:&nbsp;
          <input class="upload-edit-brightness" type="range" min="-100" max="100" step="1" value="0"/>
        </label>
        <label>
          <span data-i18n="contrast"></span>:&nbsp;
          <input class="upload-edit-contrast" type="range" min="50" max="200" step="1" value="100"/>
        </label>
        <label>
          <span data-i18n="saturation"></span>:&nbsp;
          <input class="upload-edit-saturation" type="range" min="0" max="200" step="1" value="100"/>
        </label>
        <label>
          <input class="upload-edit-dithering" type="checkbox" />&nbsp;<span data-i18n="dithering"></span>
        </label>
      </div>
      <div class="upload-edit-actions">
        <button type="button" class="upload-edit-cancel" data-i18n="cancel"></button>
        <button type="button" class="upload-edit-apply" data-i18n="apply"></button>
      </div>
    `
    applyTranslations(dialog)
    document.body.append(dialog)
    const previewCanvas = dialog.querySelector<HTMLCanvasElement>(
      '.upload-edit-preview',
    )!
    const $brightness = dialog.querySelector<HTMLInputElement>(
      '.upload-edit-brightness',
    )!
    const $contrast = dialog.querySelector<HTMLInputElement>(
      '.upload-edit-contrast',
    )!
    const $saturation = dialog.querySelector<HTMLInputElement>(
      '.upload-edit-saturation',
    )!
    const $dithering = dialog.querySelector<HTMLInputElement>(
      '.upload-edit-dithering',
    )!
    const $cancel = dialog.querySelector<HTMLButtonElement>(
      '.upload-edit-cancel',
    )!
    const $apply =
      dialog.querySelector<HTMLButtonElement>('.upload-edit-apply')!
    const settings: UploadPreprocessSettings = {
      brightness: 0,
      contrast: 100,
      saturation: 100,
      dithering: false,
    }

    let renderQueued = false
    const renderPreview = () => {
      renderQueued = false
      this.renderProcessedImageToCanvas(sourceImage, previewCanvas, settings)
    }
    const queueRender = () => {
      if (renderQueued) return
      renderQueued = true
      requestAnimationFrame(renderPreview)
    }
    const syncSettingsFromInputs = () => {
      settings.brightness = $brightness.valueAsNumber
      settings.contrast = $contrast.valueAsNumber
      settings.saturation = $saturation.valueAsNumber
      settings.dithering = $dithering.checked
      queueRender()
    }

    const resolveResult = (value: string | null) => {
      if (dialog.open) dialog.close()
      dialog.remove()
      return value
    }

    return await new Promise<string | null>((resolve) => {
      const onCancel = () => {
        resolve(resolveResult(null))
      }
      const onApply = () => {
        const processed = document.createElement('canvas')
        processed.width = sourceImage.naturalWidth
        processed.height = sourceImage.naturalHeight
        this.renderProcessedImageToCanvas(sourceImage, processed, settings)
        resolve(resolveResult(processed.toDataURL('image/png')))
      }

      dialog.addEventListener('cancel', (event) => {
        event.preventDefault()
        onCancel()
      })
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) onCancel()
      })
      $cancel.addEventListener('click', onCancel)
      $apply.addEventListener('click', onApply)
      $brightness.addEventListener('input', syncSettingsFromInputs)
      $contrast.addEventListener('input', syncSettingsFromInputs)
      $saturation.addEventListener('input', syncSettingsFromInputs)
      $dithering.addEventListener('change', syncSettingsFromInputs)
      queueRender()
      dialog.showModal()
    })
  }

  protected renderProcessedImageToCanvas(
    sourceImage: HTMLImageElement,
    targetCanvas: HTMLCanvasElement,
    settings: UploadPreprocessSettings,
  ) {
    const context = targetCanvas.getContext('2d')
    if (!context) return
    const targetScale = Math.min(
      targetCanvas.width / sourceImage.naturalWidth,
      targetCanvas.height / sourceImage.naturalHeight,
      1,
    )
    const drawWidth = Math.max(1, (sourceImage.naturalWidth * targetScale) | 0)
    const drawHeight = Math.max(
      1,
      (sourceImage.naturalHeight * targetScale) | 0,
    )
    const drawX = ((targetCanvas.width - drawWidth) / 2) | 0
    const drawY = ((targetCanvas.height - drawHeight) / 2) | 0

    context.save()
    context.clearRect(0, 0, targetCanvas.width, targetCanvas.height)
    context.filter = `brightness(${100 + settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%)`
    context.imageSmoothingEnabled = false
    context.imageSmoothingQuality = 'low'
    context.drawImage(sourceImage, drawX, drawY, drawWidth, drawHeight)
    context.restore()
    if (!settings.dithering) return
    this.applyPreviewDithering(context, drawX, drawY, drawWidth, drawHeight)
  }

  protected applyPreviewDithering(
    context: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    width: number,
    height: number,
  ) {
    const ditherMatrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ]
    const imageData = context.getImageData(startX, startY, width, height)
    const data = imageData.data
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4
        const offset = ditherMatrix[y % 4]![x % 4]! - 8
        data[idx] = this.clampColorByte(data[idx]! + offset)
        data[idx + 1] = this.clampColorByte(data[idx + 1]! + offset)
        data[idx + 2] = this.clampColorByte(data[idx + 2]! + offset)
      }
    }
    context.putImageData(imageData, startX, startY)
  }

  protected clampColorByte(value: number) {
    return Math.max(0, Math.min(255, value | 0))
  }

  /** Update widget position and contents */
  public update() {
    this.$strategy.value = this.bot.strategy
    // Progress
    let maxTasks = 0
    let totalTasks = 0
    for (let index = 0; index < this.bot.images.length; index++) {
      const image = this.bot.images[index]!
      maxTasks += image.pixels.pixels.length * image.pixels.pixels[0]!.length
      totalTasks += image.tasks.length
    }
    const doneTasks = Math.max(0, maxTasks - totalTasks)
    const percent = maxTasks > 0 ? ((doneTasks / maxTasks) * 100) | 0 : 0
    this.$progressText.textContent = `${doneTasks}/${maxTasks} ${percent}% ETA: ${(totalTasks / 120) | 0}h`
    this.$progressLine.style.transform = `scaleX(${percent / 100})`

    // Images
    this.$images.innerHTML = ''
    const fragment = document.createDocumentFragment()
    for (let index = 0; index < this.bot.images.length; index++) {
      const image = this.bot.images[index]!
      const $image = document.createElement('div')
      fragment.append($image)
      $image.className = 'image'
      $image.innerHTML = `<button class="preview" title="View preview">
  <img src="${image.pixels.image.src}" alt="Image preview">
</button>
  <div class="image-controls">
    <button class="colors" title="Show colors"><i class="fa-solid fa-palette" aria-hidden="true"></i></button>
    <button class="preview-strategy" title="Preview strategy"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i></button>
    <button class="download" title="Download settings"><i class="fa-solid fa-download" aria-hidden="true"></i></button>
    <button class="delete" title="Delete image"><i class="fa-solid fa-trash" aria-hidden="true"></i></button>
    <button class="up" title="Move up" ${index === 0 ? 'disabled' : ''}><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
    <button class="down" title="Move down" ${index === this.bot.images.length - 1 ? 'disabled' : ''}><i class="fa-solid fa-arrow-down" aria-hidden="true"></i></button>
  </div>`
      $image
        .querySelector<HTMLButtonElement>('.preview')!
        .addEventListener('click', () => {
          this.activeImageIndex = index
          image.openPreviewPanel()
        })
      $image
        .querySelector<HTMLButtonElement>('.colors')!
        .addEventListener('click', () => {
          this.activeImageIndex = index
          image.openColorPanel()
        })
      $image
        .querySelector<HTMLButtonElement>('.preview-strategy')!
        .addEventListener('click', () => {
          this.activeImageIndex = index
          image.openPreviewPanel()
        })
      $image
        .querySelector<HTMLButtonElement>('.download')!
        .addEventListener('click', () => {
          image.exportImage()
        })
      $image
        .querySelector<HTMLButtonElement>('.delete')!
        .addEventListener('click', () => {
          image.destroy()
        })
      $image
        .querySelector<HTMLButtonElement>('.up')!
        .addEventListener('click', () => {
          swap(this.bot.images, index, index - 1)
          this.update()
          save(this.bot)
        })
      $image
        .querySelector<HTMLButtonElement>('.down')!
        .addEventListener('click', () => {
          swap(this.bot.images, index, index + 1)
          this.update()
          save(this.bot)
        })
    }
    this.$images.append(fragment)
  }

  protected syncOverlayVisibilityFromStorage() {
    const hidden =
      localStorage.getItem(OVERLAY_VISIBILITY_STORAGE_KEY) === 'true'
    document.body.classList.toggle('overlay-hidden', hidden)
    this.refreshOverlayToggleText()
  }

  protected toggleOverlay(force?: boolean) {
    const next = force ?? !document.body.classList.contains('overlay-hidden')
    document.body.classList.toggle('overlay-hidden', next)
    localStorage.setItem(OVERLAY_VISIBILITY_STORAGE_KEY, String(next))
    this.refreshOverlayToggleText()
  }

  protected refreshOverlayToggleText() {
    this.$toggleOverlay.textContent = document.body.classList.contains(
      'overlay-hidden',
    )
      ? `${t('toggleOverlay')} (${t('disabled')})`
      : `${t('toggleOverlay')} (${t('enabled')})`
  }

  /** Disable/enable element by class name */
  public setDisabled(name: string, disabled: boolean) {
    this.element.querySelector<HTMLButtonElement>('.' + name)!.disabled =
      disabled
  }

  /** Show status of running task */
  public async run<T>(
    status: string,
    run: () => Promise<T>,
    fin?: () => unknown,
    prefix = '...',
  ): Promise<T> {
    console.log('[KGM][Widget] Task started', { status })
    const originalStatus = this.status
    this.status = `${prefix} ${status}`
    try {
      const result = await run()
      this.status = originalStatus
      console.log('[KGM][Widget] Task completed', { status })
      return result
    } catch (error) {
      if (!(error instanceof KGlacerMacroError)) {
        console.error(error)
        this.status = `${t('taskErrorPrefix')}: ${status}`
      }
      console.error('[KGM][Widget] Task failed', { status, error })
      throw error
    } finally {
      await fin?.()
    }
  }

  protected handleKeyboard(event: KeyboardEvent) {
    if (isEditableTarget(event.target)) return
    if (matchesShortcut(event, SHORTCUTS.toggleWidget)) {
      event.preventDefault()
      this.open = !this.open
      return
    }
    if (matchesShortcut(event, SHORTCUTS.showShortcuts)) {
      event.preventDefault()
      this.open = true
      this.$shortcuts.open = true
      this.$shortcuts.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      this.$shortcuts.classList.remove('shortcut-pulse')
      requestAnimationFrame(() => {
        this.$shortcuts.classList.add('shortcut-pulse')
      })
      return
    }
    if (matchesShortcut(event, SHORTCUTS.toggleOverlay)) {
      event.preventDefault()
      this.toggleOverlay()
      return
    }
    if (matchesShortcut(event, SHORTCUTS.focusNextImage)) {
      event.preventDefault()
      this.focusImageByStep(1)
      return
    }
    if (matchesShortcut(event, SHORTCUTS.focusPreviousImage)) {
      event.preventDefault()
      this.focusImageByStep(-1)
      return
    }
    if (matchesShortcut(event, SHORTCUTS.openColorPanel)) {
      event.preventDefault()
      this.openColorPanelForActiveImage()
      return
    }
    if (matchesShortcut(event, SHORTCUTS.toggleImageLock)) {
      event.preventDefault()
      this.toggleLockForActiveImage()
      return
    }
    if (matchesShortcut(event, SHORTCUTS.clickPaintWhenReady)) {
      event.preventDefault()
      void this.drawAndClickPaintWhenReady()
      return
    }
    if (
      matchesShortcut(event, SHORTCUTS.addImage) &&
      !this.$addImage.disabled
    ) {
      event.preventDefault()
      void this.addImage()
      return
    }
    if (matchesShortcut(event, SHORTCUTS.draw) && !this.$draw.disabled) {
      event.preventDefault()
      void this.bot.draw()
    }
  }

  protected focusImageByStep(step: 1 | -1) {
    if (!this.bot.images.length) return
    if (
      this.activeImageIndex < 0 ||
      this.activeImageIndex >= this.bot.images.length
    )
      this.activeImageIndex = step > 0 ? 0 : this.bot.images.length - 1
    else
      this.activeImageIndex =
        (this.activeImageIndex + step + this.bot.images.length) %
        this.bot.images.length
    this.bot.images[this.activeImageIndex]!.position.scrollScreenTo()
  }

  protected getActiveImage() {
    if (!this.bot.images.length) return
    if (
      this.activeImageIndex < 0 ||
      this.activeImageIndex >= this.bot.images.length
    )
      this.activeImageIndex = 0
    return this.bot.images[this.activeImageIndex]
  }

  protected openColorPanelForActiveImage() {
    const image = this.getActiveImage()
    if (!image) return
    image.openColorPanel()
  }

  protected toggleLockForActiveImage() {
    const image = this.getActiveImage()
    if (!image) return
    image.lock = !image.lock
    image.update()
    save(this.bot)
  }

  protected async waitAndClickPaintButton() {
    await this.run(t('taskWaitingPaintButton'), async () => {
      for (;;) {
        const button = this.findNativePaintButton()
        if (button && !button.disabled && button.ariaDisabled !== 'true') {
          button.click()
          return
        }
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    })
  }

  protected async drawAndClickPaintWhenReady() {
    if (!this.$draw.disabled) await this.bot.draw()
    await this.waitAndClickPaintButton()
  }

  protected findNativePaintButton() {
    const selectors = [
      'button.btn.btn-primary.btn-lg.relative.z-30',
      'button.btn.btn-primary.btn-lg.sm\\:btn-xl.relative.z-30',
    ]
    const buttons = selectors.flatMap((selector) =>
      Array.from(document.querySelectorAll<HTMLButtonElement>(selector)),
    )
    return buttons.find((button) =>
      /pintar|paint/i.test(button.textContent ?? ''),
    )
  }

  // protected async pumpkinHunt() {
  //   this.$pumpkinHunt.disabled = false
  //   const PUMPKIN_PATTERN =
  //     '8,8,8,8,8,8,8,1,8,8,8,1,8,8,8,1,8,8,8,8,8,8_8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8_8,1,1,1,1,8,8,8,8,8,8,8,8,8,8,8,8,8,1,1,1,1_8,8,1,1,1,1,1,1,8,8,8,8,8,8,8,1,1,1,1,1,1,8_8,8,1,1,1,5,5,1,1,8,8,8,8,8,1,1,5,5,1,1,1,8_8,8,1,1,1,5,5,1,1,1,8,8,8,1,1,1,5,5,1,1,1,8_8,8,8,1,1,1,1,1,1,8,8,1,8,8,1,1,1,1,1,1,8,8_8,8,8,8,1,1,1,1,8,8,1,1,1,8,8,1,1,1,1,8,8,8_8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8_8,8,8,8,1,8,8,8,8,8,8,1,8,8,8,8,8,8,1,8,8,8_8,8,8,1,1,1,8,8,8,8,1,1,1,8,8,8,8,1,1,1,8,8_8,8,1,1,8,1,1,8,8,1,1,8,1,1,8,8,1,1,8,1,1,8_1,8,8,8,8,8,1,1,1,1,8,8,8,1,1,1,1,8,8,8,8,8_1,1,1,8,8,8,8,1,1,8,8,8,8,8,1,1,8,8,8,8,1,1_1,12,12,1,1,8,8,8,8,8,8,1,8,8,8,8,8,8,1,1,19,18_1,12,12,13,13,1,1,1,1,1,1,19,1,1,1,1,1,1,18,18,18,18_12,13,13,13,13,13,13,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18_13,13,13,13,13,13,13,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18_18,18,19,19,13,13,13,13,13,13,13,13,19,19,19,19,18,18,18,18,18,18_18,18,19,19,13,13,13,13,13,13,13,13,19,19,19,19,18,18,18,18,18,18_18,18,19,19,19,19,19,19,19,19,19,19,13,13,13,13,18,18,18,18,18,18_18,18,18,19,19,19,19,19,19,19,19,19,13,13,13,13,18,18,18,18,18,18_18,18,18,18,19,19,19,19,19,19,13,13,13,13,12,12,12,18,18,18,18,18_18,18,18,18,18,18,18,18,18,18,12,12,12,12,12,12,12,18,18,18,18,18_18,18,18,18,18,18,18,18,18,18,12,12,12,12,12,12,12,18,18,18,18,18_1,18,18,18,18,18,18,18,18,18,12,12,12,12,12,12,12,12,12,12,18,18_1,18,18,18,18,18,18,18,18,18,18,12,12,12,12,12,12,12,12,12,18,18_1,18,18,18,18,18,18,18,18,18,18,18,12,12,12,12,12,12,12,12,18,18'
  //       .split('_')
  //       .map((x) => x.split(',').map((x) => +x))
  //   const firstColor = PUMPKIN_PATTERN[0]![0]!
  //   try {
  //     main: while (true) {
  //       const claimed = new Set(
  //         (
  //           await retry(
  //             () =>
  //               fetch(
  //                 'https://backend.wplace.live/event/hallowen/pumpkins/claimed',
  //                 {
  //                   credentials: 'include',
  //                 },
  //               ).then((x) => x.json()) as Promise<{ claimed: number[] }>,
  //             10,
  //             10_000,
  //           )
  //         ).claimed,
  //       )
  //       const pumpkinsFound = Object.entries(
  //         (await retry(
  //           () =>
  //             fetch('https://wplace.samuelscheit.com/tiles/pumpkin.json').then(
  //               (x) => x.json(),
  //             ),
  //           10,
  //           10_000,
  //         )) as Record<
  //           string,
  //           {
  //             foundAt: string
  //             lat: number
  //             lng: number
  //             offsetX: number
  //             offsetY: number
  //             tileX: number
  //             tileY: number
  //           }
  //         >,
  //       )

  //       for (const [index, pumpkin] of pumpkinsFound) {
  //         if (claimed.size === 100) {
  //           this.$pumpkinHunt.textContent = `Pumpkin Hunt Finished!`
  //           break main
  //         }
  //         this.$pumpkinHunt.textContent = `⌛ Pumpkin Hunt [${claimed.size}/100]`
  //         if (
  //           claimed.has(+index) ||
  //           Date.now() - new Date(pumpkin.foundAt).getTime() > 3_600_000
  //         )
  //           continue

  //         const { pixels } = await retry(
  //           () =>
  //             Pixels.fromJSON(this.bot, {
  //               url: `https://backend.wplace.live/files/s0/tiles/${pumpkin.tileX}/${pumpkin.tileY}.png`,
  //               exactColor: true,
  //             }),
  //           10,
  //           10_000,
  //         )
  //         for (let x = 0; x < 1000; x++) {
  //           nextPixel: for (let y = 0; y < 1000; y++) {
  //             if (pixels[y]![x] !== firstColor) continue
  //             for (let offsetY = 0; offsetY < PUMPKIN_PATTERN.length; offsetY++)
  //               for (
  //                 let offsetX = 0;
  //                 offsetX < PUMPKIN_PATTERN[offsetY]!.length;
  //                 offsetX++
  //               )
  //                 if (
  //                   pixels[y + offsetY]![x + offsetX]! !==
  //                   PUMPKIN_PATTERN[offsetY]![offsetX]!
  //                 )
  //                   continue nextPixel

  //             // Pattern found, check if it's real and click it
  //             const info = await retry(
  //               () =>
  //                 fetch(
  //                   `https://backend.wplace.live/s0/pixel/${pumpkin.tileX}/${pumpkin.tileY}?x=${x + 10}&y=${y + 10}`,
  //                 ).then((x) => x.json()) as Promise<{
  //                   paintedBy: { event?: boolean; eventClaimNumber?: number }
  //                 }>,
  //               3,
  //               10_000,
  //             )
  //             if (!info.paintedBy.event) continue
  //             await retry(
  //               async () => {
  //                 const response = await fetch(
  //                   `https://backend.wplace.live/s0/event/pixel/claim`,
  //                   {
  //                     credentials: 'include',
  //                     body: JSON.stringify({
  //                       event: 'halloween',
  //                       tx: pumpkin.tileX,
  //                       ty: pumpkin.tileY,
  //                       px: x + 10,
  //                       py: y + 10,
  //                     }),
  //                     method: 'POST',
  //                   },
  //                 )
  //                 if (!response.ok) throw new Error('CAN NOT CLAIM')
  //               },
  //               3,
  //               10_000,
  //             )
  //             claimed.add(+index)
  //           }
  //         }
  //         await wait(5000)
  //       }
  //       this.$pumpkinHunt.textContent = `⌛ Pumpkin Hunt (wait 10 min)`
  //       await wait(10 * 1000 * 60)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     this.$pumpkinHunt.disabled = false
  //     this.$pumpkinHunt.textContent = `❌ Pumpkin Hunt!`
  //   }
  // }
}
