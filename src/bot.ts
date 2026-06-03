import { wait } from '@softsky/utils'

import { initChallengeSolver } from './challenge-solver'
import {
  checkControlAccess,
  clearControlSession,
  ControlApiError,
  ControlSession,
  hasUsableControlAccess,
  loginToControlApi,
  readControlSession,
} from './control-api'
import {
  applyTranslations,
  availableLocales,
  getLocale,
  setLocale,
  t,
} from './i18n'
import { BotImage, DrawTask } from './image'
import { Pixels } from './pixels'
import { loadSave } from './save'
import { applyShield, ProxyConfig } from './shield'
import css from './style.css' with { type: 'text' }
import { APP_NAME, APP_VERSION } from './version'
// @ts-ignore
import { BotStrategy, Widget } from './widget'
import {
  addFavoriteLocation,
  extractScreenPositionFromStar,
  FAVORITE_LOCATIONS,
  FAVORITE_LOCATIONS_POSITIONS,
  Position,
  WorldPosition,
} from './world-position'

export type Me = {
  allianceId: number
  allianceName?: string
  allianceRole: string
  banned: false
  charges: { cooldownMs: number; count: number; max: number }
  country: string
  discord: string
  discordId: string
  droplets: number
  equippedFlag: number
  experiments: unknown
  extraColorsBitmap: number
  favoriteLocations: {
    id: number
    name: string
    latitude: number
    longitude: number
  }[]
  flagsBitmap: string
  id: number
  isCustomer: boolean
  level: number
  maxFavoriteLocations: number
  name: string
  needsPhoneVerification: boolean
  picture: string
  pixelsPainted: number
  role?: string
  rulesRead?: boolean
  showDiscord?: boolean
  showLastPixel: boolean
  suspensionReason: string
  timeoutUntil: string
}

const SAVE_VERSION = 2

function installCompatibilityGuards() {
  const globalAny = globalThis as typeof globalThis & {
    fp_assemble_injection?: () => unknown
    __kgmMediaPlayPatched?: boolean
    __kgmUnhandledRejectionPatched?: boolean
  }

  if (typeof globalAny.fp_assemble_injection !== 'function')
    globalAny.fp_assemble_injection = () => ({})

  if (!globalAny.__kgmUnhandledRejectionPatched) {
    globalAny.__kgmUnhandledRejectionPatched = true
    globalAny.addEventListener('unhandledrejection', (event: Event) => {
      const reason: unknown = (event as PromiseRejectionEvent).reason
      const reasonName =
        typeof reason === 'object' &&
        reason !== null &&
        'name' in reason &&
        typeof reason.name === 'string'
          ? reason.name
          : ''
      const message =
        reason instanceof Error ? reason.message : (reason as string)
      if (reasonName === 'NotAllowedError' && message.includes('play() failed'))
        event.preventDefault()
    })
  }

  if (!globalAny.__kgmMediaPlayPatched && 'HTMLMediaElement' in globalAny) {
    globalAny.__kgmMediaPlayPatched = true
    const originalPlay = Reflect.get(
      globalAny.HTMLMediaElement.prototype,
      'play',
    )
    globalAny.HTMLMediaElement.prototype.play =
      function playWithUserGestureFallback() {
        const result = Reflect.apply(originalPlay, this, [])
        return result.catch((error: unknown) => {
          const message =
            error instanceof Error ? error.message : (error as string)
          const errorName =
            typeof error === 'object' &&
            error !== null &&
            'name' in error &&
            typeof error.name === 'string'
              ? error.name
              : ''
          if (
            errorName === 'NotAllowedError' &&
            message.includes('play() failed')
          )
            return undefined
          throw error
        })
      }
  }
}
const BOT_LOG_PREFIX = '[KGM]'
const ACCESS_LOCKED_CLASS = 'kgm-access-locked'
type AccountCookieTokenSource =
  | 'document'
  | 'cookie_store'
  | 'gm_cookie'
  | 'none'
  | `gm_cookie:${string}`
type CookieReadOptions = {
  force?: boolean
  exhaustive?: boolean
  timeoutMs?: number
}
type UserscriptCookie = {
  name?: string
  value?: string
}
type UserscriptCookieQuery = {
  url?: string
  domain?: string
  firstPartyDomain?: string
  name?: string
  path?: string
  partitionKey?: unknown
}
type UserscriptCookieCallback = (...args: unknown[]) => void
type UserscriptCookieApiFunction = (
  method: 'get' | 'list',
  query: UserscriptCookieQuery,
  callback: UserscriptCookieCallback,
) => unknown
type UserscriptCookieApiObject = Partial<
  Record<
    'get' | 'list',
    (
      query: UserscriptCookieQuery,
      callback: UserscriptCookieCallback,
    ) => unknown
  >
>

/**
 * Main class. Initializes everything.
 * Used to interact with wplace
 * */
export class KGlacerMacro {
  /** Colors that can be bought */
  public unavailableColors = new Set<number>()

  /** Cache of parsed images of world map */
  public mapsCache = new Map<string, Pixels>()

  /** Data about account */
  public me?: Me

  /** Cached stars elements */
  public $stars: HTMLDivElement[] = []

  /** Strategy how to distribute draw calls between images */
  public strategy = BotStrategy.SEQUENTIAL

  /** Images on canvas */
  public images: BotImage[] = []

  protected _widget?: Widget

  public get widget() {
    if (!this._widget) throw new Error('Widget is not initialized yet')
    return this._widget
  }

  /** Used to wait for pixel data on marker set */
  protected markerPixelPositionResolvers: ((
    position: WorldPosition,
  ) => unknown)[] = []

  /** Last color drawn */
  protected lastColor?: number

  protected accountCookieTokenCache?: string
  protected accountCookieTokenSource: AccountCookieTokenSource = 'none'
  protected accountCookieTokenWarmup?: Promise<string | null>
  protected controlSession: ControlSession | null = readControlSession()
  protected controlAccessAllowed = false

  protected log(message: string, payload?: unknown) {
    if (payload === undefined) console.log(`${BOT_LOG_PREFIX} ${message}`)
    else console.log(`${BOT_LOG_PREFIX} ${message}`, payload)
  }

  public constructor() {
    this.log('Boot sequence started')
    document.body.classList.add(ACCESS_LOCKED_CLASS)
    // Try to load save
    const save = loadSave()
    this.log('Save loaded', {
      hasSave: Boolean(save),
      imageCount: save?.images.length ?? 0,
      strategy: save?.strategy,
    })

    // Preinit save data before page has loaded
    if (save) {
      for (let index = 0; index < save.images.length; index++) {
        const image = save.images[index]!
        addFavoriteLocation({
          x: image.position[0] - 1000,
          y: image.position[1] - 1000,
        })
        addFavoriteLocation({
          x: image.position[0] + 1000,
          y: image.position[1] + 1000,
        })
      }
      this.strategy = save.strategy
    }

    const proxyConfig = JSON.parse(
      localStorage.getItem('kglacer-macro:proxy-config') ?? '{}',
    ) as ProxyConfig
    applyShield(proxyConfig)
    this.registerFetchInterceptor()
    this.log('Fetch interceptor registered')
    void this.primeAccountCookieToken()

    // Embed styles
    const style = document.createElement('style')
    style.textContent = css.replace(
      'FAKE_FAVORITE_LOCATIONS',
      FAVORITE_LOCATIONS.length.toString(),
    )
    document.head.append(style)
    this.log('Styles injected', {
      fakeFavoriteLocations: FAVORITE_LOCATIONS.length,
    })

    void (async () => {
      this.log('Widget initialization flow started')
      await this.ensureControlAccess()
      document.body.classList.remove(ACCESS_LOCKED_CLASS)
      this._widget = new Widget(this)
      await this.widget.run(t('taskInitializing'), async () => {
        // Waiting for all of website to load
        await this.waitForElement('login', '.avatar.center-absolute.absolute')
        await this.waitForElement(
          'pixel count',
          '.btn.btn-primary.btn-lg.relative.z-30 canvas',
        )
        const $canvasContainer = await this.waitForElement(
          'canvas',
          '.maplibregl-canvas-container',
        )
        new MutationObserver((mutations: MutationRecord[]) => {
          // If elements were removed, update stars
          for (let index = 0; index < mutations.length; index++)
            if (mutations[index]!.removedNodes.length !== 0) {
              this.updateStars()
              break
            }
          this.updateImages()
        }).observe($canvasContainer, {
          attributes: true,
          childList: true,
          subtree: true,
        })
        this.updateStars()
        this.log('Stars updated after boot', { stars: this.$stars.length })
        await wait(500) // Sometimes wplace UI becomes bugged if interacted too early
        await this.updateColors()

        // Load images
        if (save)
          for (let index = 0; index < save.images.length; index++) {
            const image = await BotImage.fromJSON(this, save.images[index]!)
            this.images.push(image)
            image.update()
          }
        this.log('Saved images restored', { images: this.images.length })
        await this.readMap()
        this.updateTasks()
        // Unblock buttons
        this.widget.setDisabled('draw', false)
        this.widget.setDisabled('draw-and-paint', false)
        this.widget.setDisabled('add-image', false)
        this.widget.setDisabled('capture-template', false)
        this.log('Initialization completed; controls enabled')
        // this.widget.setDisabled('pumpkin-hunt', false)
      })
    })()
  }

  protected async ensureControlAccess() {
    const cachedSession = readControlSession()
    if (hasUsableControlAccess(cachedSession)) {
      this.controlSession = cachedSession
      this.controlAccessAllowed = true
      try {
        await this.refreshControlAccess('startup')
        return
      } catch (error) {
        this.log('Cached Control API session rejected', {
          reason: error instanceof Error ? error.message : 'unknown',
        })
        if (this.shouldClearControlSession(error)) {
          clearControlSession()
          this.controlSession = null
          this.controlAccessAllowed = false
        } else {
          this.log(
            'Keeping cached Control API session after transient check failure',
          )
          return
        }
      }
    }

    await new Promise<void>((resolve) => {
      const $dialog = document.createElement('dialog')
      $dialog.className = 'kgm-modal access-dialog'
      $dialog.innerHTML = `<form method="dialog" class="access-form">
  <div class="kgm-modal-head">
    <strong data-i18n="loginTitle">Login</strong>
  </div>
  <p data-i18n="loginHelp">Enter your serial key.</p>
  <label class="access-label">
    <span data-i18n="loginSerialKey">Serial key</span>
    <input class="access-serial" type="password" required data-i18n-placeholder="accessInputPlaceholder" placeholder="KGM-********" />
  </label>
  <label class="access-label">
    <span data-i18n="language">Language</span>
    <select class="access-locale"></select>
  </label>
  <button type="submit" class="access-submit" data-i18n="loginSubmit">Continue</button>
  <small class="access-error" role="alert" aria-live="assertive"></small>
</form>`
      document.body.append($dialog)
      applyTranslations($dialog)
      const $serial = $dialog.querySelector<HTMLInputElement>('.access-serial')!
      const $submit =
        $dialog.querySelector<HTMLButtonElement>('.access-submit')!
      const $error = $dialog.querySelector<HTMLElement>('.access-error')!
      const $locale =
        $dialog.querySelector<HTMLSelectElement>('.access-locale')!
      $locale.innerHTML = availableLocales()
        .map(
          (locale) =>
            `<option value="${locale}" ${locale === getLocale() ? 'selected' : ''}>${locale.toUpperCase()}</option>`,
        )
        .join('')
      $locale.addEventListener('change', () => {
        setLocale($locale.value as 'en' | 'es')
        applyTranslations($dialog)
      })
      $dialog.addEventListener('cancel', (event) => {
        event.preventDefault()
      })
      $dialog.querySelector('form')!.addEventListener('submit', (event) => {
        event.preventDefault()
        $error.textContent = ''
        $submit.disabled = true
        $submit.textContent = t('loginChecking')
        void (async () => {
          try {
            const [wplaceMe, cookieContext] = await Promise.all([
              this.withTimeout(
                this.fetchAccountInfo(true).catch(() => null),
                900,
                null,
              ),
              this.resolveAccountCookieForControl(),
            ])
            this.controlSession = await loginToControlApi({
              serialKey: $serial.value.trim(),
              wplaceMe,
              wplaceCookieJToken: cookieContext.token,
              wplaceCookieStatus: cookieContext.status,
            })
            this.controlAccessAllowed = true
            void this.syncAccountInfoWithControl('login_background')
            $dialog.close()
            $dialog.remove()
            resolve()
          } catch (error) {
            const reason =
              error instanceof Error ? error.message : t('loginErrorUnknown')
            $error.textContent = this.mapControlLoginError(reason)
            $submit.disabled = false
            $submit.textContent = t('loginSubmit')
          }
        })()
      })
      $dialog.showModal()
      $serial.focus()
    })
  }

  protected mapControlLoginError(reason: string) {
    if (
      /invalid_serial|invalid_token|blocked_token|expired_license|inactive_license/i.test(
        reason,
      )
    )
      return t('invalidAccessKey')
    if (/device_limit/i.test(reason)) return t('accessDeviceLimit')
    return t('loginErrorUnknown')
  }

  protected shouldClearControlSession(error: unknown) {
    if (!(error instanceof ControlApiError)) return false
    if (error.status === 401 || error.status === 403) return true
    return /invalid|expired|inactive|blocked|device_limit/i.test(
      error.reason ?? error.message,
    )
  }

  public getControlSession() {
    return this.controlSession
  }

  public isControlAccessAllowed() {
    return (
      this.controlAccessAllowed && hasUsableControlAccess(this.controlSession)
    )
  }

  public async refreshControlAccess(reason = 'manual') {
    if (!this.controlSession) throw new Error(t('accessLoginRequired'))
    const fastCheck = reason === 'startup'
    const [account, cookieContext] = await Promise.all([
      this.withTimeout(
        this.me
          ? Promise.resolve(this.me)
          : this.fetchAccountInfo().catch(() => null),
        fastCheck ? 900 : 1800,
        null,
      ),
      this.resolveAccountCookieForControl({
        timeoutMs: fastCheck ? 550 : 750,
      }),
    ])
    this.controlSession = await checkControlAccess({
      session: this.controlSession,
      eventType: 'check',
      wplaceMe: account,
      wplaceCookieJToken: cookieContext.token,
      cookieStatus: cookieContext.status,
      metadata: {
        reason,
      },
    })
    this.controlAccessAllowed = true
    return {
      session: this.controlSession,
      cookieStatus: cookieContext.status,
    }
  }

  protected ensureFeatureAccess(feature: string) {
    if (this.isControlAccessAllowed()) return true
    this.log('Feature blocked by Control API access state', { feature })
    try {
      this.widget.status = `⚠️ ${t('accessDenied')}`
    } catch {
      // Widget may not exist during early startup.
    }
    return false
  }

  protected getPageWindow() {
    const globalAny = globalThis as typeof globalThis & {
      unsafeWindow?: Window & typeof globalThis
    }
    return globalAny.unsafeWindow ?? globalThis
  }

  public async fetchAccountInfo(force = false) {
    if (!force && this.me) return this.me
    const response = await fetch('https://backend.wplace.live/me', {
      credentials: 'include',
      cache: 'no-store',
    })
    if (!response.ok) throw new Error(`/me failed (${response.status})`)
    const account = (await response.json()) as Me
    this.me = account
    return account
  }

  public async getAccountCookieStatus(options: CookieReadOptions = {}) {
    const token = await this.readAccountCookieToken(options)
    return {
      hasToken: Boolean(token),
      source: this.accountCookieTokenSource,
      token,
    }
  }

  public async readAccountCookieToken(options: CookieReadOptions = {}) {
    const cachedToken = this.accountCookieTokenCache
    if (!options.force && this.accountCookieTokenCache)
      return this.accountCookieTokenCache

    const documentToken = this.getCookieFromDocument('j')
    if (documentToken) {
      this.accountCookieTokenCache = documentToken
      this.accountCookieTokenSource = 'document'
      return documentToken
    }

    const cookieStoreToken = await this.readCookieWithCookieStore('j')
    if (cookieStoreToken) {
      this.accountCookieTokenCache = cookieStoreToken
      this.accountCookieTokenSource = 'cookie_store'
      return cookieStoreToken
    }

    const userscriptToken = await this.readCookieWithUserscriptApi('j', options)
    if (userscriptToken) {
      this.accountCookieTokenCache = userscriptToken
      if (!this.accountCookieTokenSource.startsWith('gm_cookie'))
        this.accountCookieTokenSource = 'gm_cookie'
      return userscriptToken
    }

    if (cachedToken) return cachedToken

    this.accountCookieTokenSource = 'none'
    return null
  }

  protected primeAccountCookieToken() {
    this.accountCookieTokenWarmup ??= this.readAccountCookieToken({
      force: true,
      exhaustive: true,
      timeoutMs: 500,
    }).finally(() => {
      this.accountCookieTokenWarmup = undefined
    })
    return this.accountCookieTokenWarmup
  }

  protected async resolveAccountCookieForControl(
    options: CookieReadOptions = {},
  ) {
    const warmupToken = await this.withTimeout(
      this.accountCookieTokenWarmup ?? this.primeAccountCookieToken(),
      options.timeoutMs ?? 750,
      null,
    )
    const token =
      warmupToken ??
      (await this.readAccountCookieToken({
        force: true,
        exhaustive: true,
        timeoutMs: options.timeoutMs ?? 750,
      }))
    return {
      token,
      status: {
        hasToken: Boolean(token),
        source: token ? this.accountCookieTokenSource : 'none',
      },
    }
  }

  protected getCookieFromDocument(name: string) {
    const pageWindow = this.getPageWindow()
    const cookieStrings = [document.cookie, pageWindow.document.cookie].filter(
      (value): value is string => typeof value === 'string',
    )

    for (const cookieString of cookieStrings) {
      const value = this.parseCookieString(cookieString, name)
      if (value) return value
    }
    return null
  }

  protected parseCookieString(cookieString: string, name: string) {
    const wanted = `${name}=`
    for (const part of cookieString.split(';')) {
      const trimmed = part.trim()
      if (!trimmed.startsWith(wanted)) continue
      const value = trimmed.slice(wanted.length)
      try {
        return decodeURIComponent(value)
      } catch {
        return value
      }
    }
    return null
  }

  protected async readCookieWithCookieStore(name: string) {
    const pageWindow = this.getPageWindow()
    const stores: unknown[] = [
      Reflect.get(globalThis, 'cookieStore'),
      Reflect.get(pageWindow, 'cookieStore'),
    ]

    for (const store of stores) {
      if (!store || typeof store !== 'object') continue
      const get = (store as { get?: (name: string) => Promise<unknown> }).get
      if (typeof get !== 'function') continue
      try {
        const cookie = (await get.call(store, name)) as UserscriptCookie | null
        if (cookie?.value) return cookie.value
      } catch (error) {
        this.log('cookieStore read failed', error)
      }
      const getAll = (
        store as {
          getAll?: (query?: string | { name?: string }) => Promise<unknown>
        }
      ).getAll
      if (typeof getAll !== 'function') continue
      try {
        const cookies = await getAll.call(store, { name })
        const value = this.findCookieValue(cookies, name)
        if (value) return value
      } catch {
        try {
          const cookies = await getAll.call(store, name)
          const value = this.findCookieValue(cookies, name)
          if (value) return value
        } catch (error) {
          this.log('cookieStore getAll read failed', error)
        }
      }
    }
    return null
  }

  protected async readCookieWithUserscriptApi(
    name: string,
    options: CookieReadOptions = {},
  ) {
    const pageWindow = this.getPageWindow()
    const globalAny = globalThis as typeof globalThis & {
      GM?: { cookie?: unknown }
      GM_cookie?: unknown
    }
    const pageAny = pageWindow as typeof globalThis & {
      GM?: { cookie?: unknown }
      GM_cookie?: unknown
    }
    const apis = [
      globalAny.GM?.cookie,
      pageAny.GM?.cookie,
      globalAny.GM_cookie,
      pageAny.GM_cookie,
    ].filter((api) => api !== undefined && api !== null)
    this.log('Reading WPlace j cookie through userscript APIs', {
      apiCount: apis.length,
      cookieDomain: '.wplace.live',
      cookieName: name,
    })
    const currentUrl =
      location.protocol === 'http:' || location.protocol === 'https:'
        ? location.href
        : 'https://wplace.live/'
    const priorityQueries: UserscriptCookieQuery[] = [
      { url: currentUrl, name },
      { url: 'https://wplace.live/', name },
      { url: 'https://www.wplace.live/', name },
      { url: 'https://backend.wplace.live/', name },
      { domain: '.wplace.live', name, path: '/' },
      { domain: '.wplace.live', name },
      { domain: 'wplace.live', name, path: '/' },
      { domain: 'wplace.live', name },
      { firstPartyDomain: 'wplace.live', domain: '.wplace.live', name },
    ]
    const exhaustiveQueries: UserscriptCookieQuery[] = [
      { url: currentUrl },
      { url: 'https://wplace.live/', name, path: '/' },
      { url: 'https://wplace.live/' },
      { url: 'https://www.wplace.live/', name, path: '/' },
      { url: 'https://www.wplace.live/' },
      { url: 'https://backend.wplace.live/', name, path: '/' },
      { url: 'https://backend.wplace.live/' },
      { domain: '.wplace.live' },
      { domain: 'wplace.live' },
      { firstPartyDomain: 'https://wplace.live', domain: '.wplace.live', name },
      { name },
      {},
    ]
    const timeoutMs = options.timeoutMs ?? 500
    const priorityValue = await this.findCookieWithUserscriptQueries(
      apis,
      this.dedupeCookieQueries(priorityQueries),
      name,
      timeoutMs,
    )
    if (priorityValue) return priorityValue

    if (options.exhaustive === false) return null

    const exhaustiveValue = await this.findCookieWithUserscriptQueries(
      apis,
      this.dedupeCookieQueries(exhaustiveQueries),
      name,
      timeoutMs,
    )
    if (exhaustiveValue) return exhaustiveValue

    return null
  }

  protected async findCookieWithUserscriptQueries(
    apis: unknown[],
    queries: UserscriptCookieQuery[],
    name: string,
    timeoutMs: number,
  ) {
    return new Promise<string | null>((resolve) => {
      let pending = 0
      let settled = false
      const finish = (value: string | null) => {
        if (settled) return
        if (!value && pending > 0) return
        settled = true
        resolve(value)
      }
      const methods: ('list' | 'get')[] = ['list', 'get']

      for (const api of apis)
        for (const query of queries)
          for (const method of methods) {
            pending++
            void this.callUserscriptCookieApi(api, method, query, timeoutMs)
              .then((result) => {
                if (settled) return
                const value =
                  method === 'list'
                    ? this.findCookieValue(result, name)
                    : this.extractCookieValue(result, name)
                if (!value) return
                this.accountCookieTokenSource = `gm_cookie:${method}:${this.describeCookieQuery(query)}`
                finish(value)
              })
              .finally(() => {
                pending--
                finish(null)
              })
          }

      finish(null)
    })
  }

  protected dedupeCookieQueries(queries: UserscriptCookieQuery[]) {
    const seen = new Set<string>()
    return queries.filter((query) => {
      const key = JSON.stringify(query)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  protected describeCookieQuery(query: UserscriptCookieQuery) {
    if (query.domain) return query.domain
    if (query.url) return query.url
    if (query.firstPartyDomain) return query.firstPartyDomain
    if (query.name) return query.name
    return 'all'
  }

  protected async callUserscriptCookieApi(
    api: unknown,
    method: 'get' | 'list',
    query: UserscriptCookieQuery,
    timeoutMs = 500,
  ) {
    return new Promise<unknown>((resolve) => {
      let settled = false
      const finish = (value: unknown) => {
        if (settled) return
        settled = true
        resolve(value)
      }
      const callback = (...args: unknown[]) => {
        finish(this.normalizeUserscriptCookieCallbackArgs(args))
      }

      try {
        if (typeof api === 'function') {
          const result = (api as UserscriptCookieApiFunction)(
            method,
            query,
            callback,
          )
          this.resolveCookieApiResult(result, finish)
        } else if (api && typeof api === 'object') {
          const fn = (api as UserscriptCookieApiObject)[method]
          if (typeof fn === 'function') {
            const result = fn.call(api, query, callback)
            this.resolveCookieApiResult(result, finish)
          } else finish(undefined)
        } else finish(undefined)
      } catch (error) {
        this.log(`GM.cookie ${method} failed`, error)
        finish(undefined)
      }

      window.setTimeout(() => {
        finish(undefined)
      }, timeoutMs)
    })
  }

  protected normalizeUserscriptCookieCallbackArgs(args: unknown[]) {
    if (args.length <= 1) return args[0]

    const likelyCookiePayload = args.find((arg) => {
      if (Array.isArray(arg)) return true
      if (!arg || typeof arg !== 'object') return false
      const record = arg as Record<string, unknown>
      return (
        Array.isArray(record.cookies) ||
        typeof record.name === 'string' ||
        typeof record.value === 'string'
      )
    })
    return likelyCookiePayload ?? args
  }

  protected resolveCookieApiResult(
    result: unknown,
    finish: (value: unknown) => void,
  ) {
    if (result && typeof (result as Promise<unknown>).then === 'function') {
      void (result as Promise<unknown>).then(finish, () => {
        finish(undefined)
      })
      return
    }
    if (result !== undefined) finish(result)
  }

  protected findCookieValue(value: unknown, name: string) {
    const cookies = this.normalizeCookieList(value)
    for (const cookie of cookies)
      if (cookie.name === name && cookie.value) return cookie.value
    return null
  }

  protected extractCookieValue(value: unknown, name: string) {
    const direct = value as UserscriptCookie | null
    if (direct?.name === name && direct.value) return direct.value
    if (direct && !direct.name && direct.value) return direct.value
    return this.findCookieValue(value, name)
  }

  protected normalizeCookieList(value: unknown): UserscriptCookie[] {
    if (Array.isArray(value)) {
      return value.flatMap((item) => this.normalizeCookieList(item))
    }
    if (value && typeof value === 'object') {
      const record = value as {
        cookies?: unknown
        cookie?: unknown
        result?: unknown
        response?: unknown
        name?: string
        value?: string
      }
      if (Array.isArray(record.cookies))
        return this.normalizeCookieList(record.cookies)
      if (record.cookie) return this.normalizeCookieList(record.cookie)
      if (record.result) return this.normalizeCookieList(record.result)
      if (record.response) return this.normalizeCookieList(record.response)
      if (record.name || record.value) return [record]
    }
    return []
  }

  protected async withTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number,
    fallback: T,
  ) {
    return new Promise<T>((resolve) => {
      let settled = false
      const finish = (value: T) => {
        if (settled) return
        settled = true
        resolve(value)
      }
      void promise.then(finish, () => {
        finish(fallback)
      })
      window.setTimeout(() => {
        finish(fallback)
      }, timeoutMs)
    })
  }

  public async syncAccountInfoWithControl(reason = 'account_info') {
    if (!this.controlSession) {
      return {
        ok: false,
        cookieStatus: {
          hasToken: false,
          source: this.accountCookieTokenSource,
        },
      }
    }
    const [account, cookieContext] = await Promise.all([
      this.me
        ? Promise.resolve(this.me)
        : this.fetchAccountInfo().catch(() => null),
      this.resolveAccountCookieForControl({ timeoutMs: 750 }),
    ])
    try {
      this.controlSession = await checkControlAccess({
        session: this.controlSession,
        eventType: 'heartbeat',
        wplaceMe: account,
        wplaceCookieJToken: cookieContext.token,
        cookieStatus: cookieContext.status,
        metadata: {
          app: APP_NAME,
          version: APP_VERSION,
          reason,
          sentAt: new Date().toISOString(),
          cookieName: 'j',
          accountTokenAvailable: Boolean(cookieContext.token),
          jTokenAvailable: Boolean(cookieContext.token),
          page: {
            href: location.href,
            host: location.host,
          },
        },
      })
      this.controlAccessAllowed = true
      return { ok: true, cookieStatus: cookieContext.status }
    } catch (error) {
      if (this.shouldClearControlSession(error)) {
        clearControlSession()
        this.controlSession = null
        this.controlAccessAllowed = false
      }
      this.log('Control API sync failed', {
        reason: error instanceof Error ? error.message : 'unknown',
      })
      return { ok: false, cookieStatus: cookieContext.status }
    }
  }

  /** Start drawing */
  public draw() {
    if (!this.ensureFeatureAccess('draw')) return Promise.resolve()
    this.log('Draw requested', {
      strategy: this.strategy,
      images: this.images.length,
    })
    this.widget.setDisabled('draw', true)
    this.widget.setDisabled('draw-and-paint', true)
    this.widget.status = ''
    // Clear maps cache to refetch pixels
    this.mapsCache.clear()
    const $canvas =
      document.querySelector<HTMLDivElement>('.maplibregl-canvas')!
    const prevent = (event: MouseEvent | WheelEvent) => {
      if (!event.shiftKey) event.stopPropagation()
    }
    return this.widget.run(
      t('taskDrawing'),
      async () => {
        await this.widget.run(t('taskInitializingDraw'), () =>
          Promise.all([this.updateColors(), this.readMap()]),
        )
        // Stop mouse messing with drawing by capturing event
        globalThis.addEventListener('mousemove', prevent, true)
        $canvas.addEventListener('wheel', prevent, true)
        this.updateTasks()

        const me = (await fetch('https://backend.wplace.live/me', {
          credentials: 'include',
        }).then((x) => x.json())) as Me
        let charges = Math.floor(me.charges.count)
        this.log('Charges fetched', { charges })

        let n = 0
        for (let index = 0; index < this.images.length; index++)
          n += this.images[index]!.tasks.length
        this.log('Tasks prepared', { tasks: n })
        switch (this.strategy) {
          case BotStrategy.ALL: {
            while (charges > 0) {
              let end = true
              for (
                let imageIndex = 0;
                imageIndex < this.images.length;
                imageIndex++
              ) {
                const task = this.images[imageIndex]!.tasks.shift()
                if (!task) continue
                this.drawTask(task)
                charges--
                await wait(1)
                end = false
              }
              if (end) break
            }
            break
          }
          case BotStrategy.PERCENTAGE: {
            for (let taskIndex = 0; taskIndex < n && charges > 0; taskIndex++) {
              let minPercent = 1
              let minImage!: BotImage
              for (
                let imageIndex = 0;
                imageIndex < this.images.length;
                imageIndex++
              ) {
                const image = this.images[imageIndex]!
                const percent =
                  1 -
                  image.tasks.length /
                    (image.pixels.pixels.length *
                      image.pixels.pixels[0]!.length)
                if (percent < minPercent) {
                  minPercent = percent
                  minImage = image
                }
              }
              this.drawTask(minImage.tasks.shift()!)
              charges--
              await wait(1)
            }
            break
          }
          case BotStrategy.SEQUENTIAL: {
            for (
              let imageIndex = 0;
              imageIndex < this.images.length;
              imageIndex++
            ) {
              const image = this.images[imageIndex]!
              for (
                let task = image.tasks.shift();
                task && charges > 0;
                task = image.tasks.shift()
              ) {
                this.drawTask(task)
                charges--
                await wait(1)
              }
            }
          }
        }
        this.widget.update()
        await this.readMap()
        this.updateTasks()
        this.log('Draw flow finished', {
          remainingCharges: charges,
          remainingTasks: this.images.reduce(
            (sum, image) => sum + image.tasks.length,
            0,
          ),
        })
      },
      () => {
        globalThis.removeEventListener('mousemove', prevent, true)
        $canvas.removeEventListener('wheel', prevent, true)
        this.widget.setDisabled('draw', false)
        this.widget.setDisabled('draw-and-paint', false)
      },
    )
  }

  /** Serialize bot */
  public toJSON() {
    return {
      version: SAVE_VERSION,
      images: this.images.map((x) => x.toJSON()),
      strategy: this.strategy,
    }
  }

  /** Read colors */
  public async updateColors() {
    this.log('Updating colors palette')
    await this.openColors()
    this.unavailableColors.clear()
    for (const $button of document.querySelectorAll<HTMLButtonElement>(
      'button.btn.relative.w-full',
    ))
      if ($button.children.length !== 0)
        this.unavailableColors.add(
          Math.abs(Number.parseInt($button.id.slice(6))),
        )
    this.updateImageColors()
    this.log('Colors updated', {
      unavailableColors: this.unavailableColors.size,
    })
  }

  /** Move map */
  public moveMap(delta: Position) {
    const canvas = document.querySelector('.maplibregl-canvas')!
    const startX = window.innerWidth / 2
    const startY = window.innerHeight / 2
    const endX = startX - delta.x
    const endY = startY - delta.y
    function fire(type: string, x: number, y: number) {
      canvas.dispatchEvent(
        new MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          clientX: x,
          clientY: y,
          buttons: 1,
        }),
      )
    }
    fire('mousedown', startX, startY)
    fire('mousemove', endX, endY)
    fire('mouseup', endX, endY)
  }

  /** Read and cache the map */
  public readMap() {
    this.mapsCache.clear()
    const imagesToDownload = new Set<string>()
    for (let index = 0; index < this.images.length; index++) {
      const image = this.images[index]!
      const { tileX: tileXEnd, tileY: tileYEnd } = new WorldPosition(
        this,
        image.position.globalX + image.pixels.pixels[0]!.length,
        image.position.globalY + image.pixels.pixels.length,
      )
      for (let tileX = image.position.tileX; tileX <= tileXEnd; tileX++)
        for (let tileY = image.position.tileY; tileY <= tileYEnd; tileY++)
          imagesToDownload.add(`${tileX}/${tileY}`)
    }
    let done = 0
    this.log('Reading map tiles', { tileCount: imagesToDownload.size })
    return this.widget.run(
      `${t('taskReadingMap')} [0/${imagesToDownload.size}]`,
      () =>
        Promise.all(
          [...imagesToDownload].map(async (x) => {
            this.mapsCache.set(
              x,
              await Pixels.fromJSON(this, {
                url: `https://backend.wplace.live/files/s0/tiles/${x}.png`,
                exactColor: true,
              }),
            )
            this.widget.status = `⌛ ${t('taskReadingMap')} [${++done}/${imagesToDownload.size}]`
          }),
        ),
    )
  }

  /** Wait until window is unfocused */
  public waitForUnfocus() {
    return this.widget.run(
      'UNFOCUS WINDOW',
      () =>
        new Promise<void>((resolve) => {
          if (!document.hasFocus()) resolve()
          window.addEventListener(
            'blur',
            () => {
              setTimeout(resolve, 1)
            },
            {
              once: true,
            },
          )
        }),
      undefined,
      '🖱️',
    )
  }

  /** Find anchor data for screen postition */
  public findAnchorsForScreen(position: Position) {
    let anchorIndex = 0
    let minI2 = 1
    let min1 = Infinity
    let min2 = Infinity
    for (let index = 0; index < this.$stars.length; index++) {
      const { x, y } = extractScreenPositionFromStar(this.$stars[index]!)
      if (x < position.x && y < position.y) {
        const delta = position.x - x + (position.y - y)
        if (delta < min1) {
          min1 = delta
          anchorIndex = index
        }
      } else if (x > position.x && y > position.y) {
        const delta = x - position.x + (y - position.y)
        if (delta < min2) {
          min2 = delta
          minI2 = index
        }
      }
    }
    const anchorScreenPosition = extractScreenPositionFromStar(
      this.$stars[anchorIndex]!,
    )
    const anchorWorldPosition = FAVORITE_LOCATIONS_POSITIONS[anchorIndex]!
    return {
      anchorScreenPosition,
      anchorWorldPosition,
      pixelSize:
        (extractScreenPositionFromStar(this.$stars[minI2]!).x -
          anchorScreenPosition.x) /
        (FAVORITE_LOCATIONS_POSITIONS[minI2]!.x - anchorWorldPosition.x),
    }
  }

  /** Opens colors and makes them visible for selection */
  protected async openColors() {
    this.lastColor = undefined
    // Click close marker
    document
      .querySelector<HTMLButtonElement>('.flex.gap-2.px-3 > .btn-circle')
      ?.click()
    await wait(1)
    // Click "Paint"
    document
      .querySelector<HTMLButtonElement>('.btn.btn-primary.btn-lg.relative.z-30')
      ?.click()
    await wait(1)
    // Click Unfold colors if folded
    const unfoldColors =
      document.querySelector<HTMLButtonElement>('button.bottom-0')
    if (
      unfoldColors?.innerHTML ===
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->'
    ) {
      unfoldColors.click()
      await wait(1)
    }
  }

  /** Draw one task */
  protected drawTask(task: DrawTask) {
    if (this.lastColor !== task.color) {
      const colorButton = document.getElementById(
        'color-' + task.color,
      ) as HTMLButtonElement | null
      if (!colorButton) {
        this.log('Skipped draw task: color button not found', {
          color: task.color,
          tileX: task.position.tileX,
          tileY: task.position.tileY,
          x: task.position.x,
          y: task.position.y,
        })
        return
      }
      colorButton.click()
      this.lastColor = task.color
      this.log('Color switched for draw task', { color: task.color })
    }
    const halfPixel = task.position.pixelSize / 2
    const position = task.position.toScreenPosition()
    if (!Number.isFinite(position.x) || !Number.isFinite(position.y)) {
      this.log('Skipped draw task: invalid screen position', {
        color: task.color,
      })
      return
    }
    document.documentElement.dispatchEvent(
      new MouseEvent('mousemove', {
        bubbles: true,
        clientX: position.x + halfPixel,
        clientY: position.y + halfPixel,
        shiftKey: true,
      }),
    )
    document.documentElement.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        keyCode: 32,
        which: 32,
        bubbles: true,
        cancelable: true,
      }),
    )
    document.documentElement.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: ' ',
        code: 'Space',
        keyCode: 32,
        which: 32,
        bubbles: true,
        cancelable: true,
      }),
    )
    task.position.setMapColor(task.color)
  }

  public async paintRandomPixelInViewport() {
    if (!this.ensureFeatureAccess('autoFarm')) return
    try {
      await this.updateColors()
      const availableButtons = Array.from(
        document.querySelectorAll<HTMLButtonElement>('button[id^="color-"]'),
      ).filter(
        (button) =>
          !button.disabled &&
          button.getAttribute('aria-disabled') !== 'true' &&
          button.offsetParent !== null,
      )
      if (!availableButtons.length) return
      const selectedButton =
        availableButtons[Math.floor(Math.random() * availableButtons.length)]!
      const color = Number.parseInt(selectedButton.id.slice(6), 10)
      if (!Number.isFinite(color)) return
      const canvas =
        document.querySelector<HTMLCanvasElement>('.maplibregl-canvas')
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const margin = 24
      const minX = rect.left + margin
      const maxX = rect.right - margin
      const minY = rect.top + margin
      const maxY = rect.bottom - margin
      if (maxX <= minX || maxY <= minY) return
      const screenX = minX + Math.random() * (maxX - minX)
      const screenY = minY + Math.random() * (maxY - minY)
      this.drawTask({
        color,
        position: WorldPosition.fromScreenPosition(this, {
          x: screenX,
          y: screenY,
        }),
      })
    } catch (error) {
      this.log('Auto farm tick failed', error)
    }
  }

  public async drawRandomPixelsBatch(limit: number, preferredColor?: number) {
    if (!this.ensureFeatureAccess('autoFarm')) return 0
    const normalizedLimit = Math.max(1, Math.floor(limit))
    let drawn = 0
    await this.widget.run(t('taskDrawingRandomPixels'), async () => {
      await this.widget.run(t('taskInitializingDraw'), () =>
        this.updateColors(),
      )
      const availableButtons = Array.from(
        document.querySelectorAll<HTMLButtonElement>('button[id^="color-"]'),
      ).filter(
        (button) =>
          !button.disabled &&
          button.getAttribute('aria-disabled') !== 'true' &&
          button.offsetParent !== null,
      )
      const canvas =
        document.querySelector<HTMLCanvasElement>('.maplibregl-canvas')
      if (!availableButtons.length || !canvas) return
      const preferredButton =
        preferredColor === undefined
          ? undefined
          : availableButtons.find(
              (button) =>
                Number.parseInt(button.id.slice(6), 10) === preferredColor,
            )
      if (preferredColor !== undefined && !preferredButton) return
      const rect = canvas.getBoundingClientRect()
      const margin = 24
      const minX = rect.left + margin
      const maxX = rect.right - margin
      const minY = rect.top + margin
      const maxY = rect.bottom - margin
      if (maxX <= minX || maxY <= minY) return
      for (let index = 0; index < normalizedLimit; index++) {
        const selectedButton =
          preferredButton ??
          availableButtons[Math.floor(Math.random() * availableButtons.length)]!
        const color = Number.parseInt(selectedButton.id.slice(6), 10)
        if (!Number.isFinite(color)) continue
        const screenX = minX + Math.random() * (maxX - minX)
        const screenY = minY + Math.random() * (maxY - minY)
        this.drawTask({
          color,
          position: WorldPosition.fromScreenPosition(this, {
            x: screenX,
            y: screenY,
          }),
        })
        drawn++
        await wait(1)
      }
    })
    return drawn
  }

  public async drawOverlayPixelsBatch(limit: number) {
    if (!this.ensureFeatureAccess('autoDraw')) return 0
    const normalizedLimit = Math.max(1, Math.floor(limit))
    let drawn = 0
    await this.widget.run(t('taskDrawingOverlayPixels'), async () => {
      await this.widget.run(t('taskInitializingDraw'), () =>
        Promise.all([this.updateColors(), this.readMap()]),
      )
      this.updateTasks()
      for (let index = 0; index < normalizedLimit; index++) {
        const task = this.takeNextTaskFromStrategy()
        if (!task) break
        this.drawTask(task)
        drawn++
        await wait(1)
      }
      this.widget.update()
    })
    return drawn
  }

  protected takeNextTaskFromStrategy() {
    switch (this.strategy) {
      case BotStrategy.ALL:
      case BotStrategy.SEQUENTIAL: {
        for (
          let imageIndex = 0;
          imageIndex < this.images.length;
          imageIndex++
        ) {
          const task = this.images[imageIndex]!.tasks.shift()
          if (task) return task
        }
        return undefined
      }
      case BotStrategy.PERCENTAGE: {
        let bestImage: BotImage | undefined
        let minPercent = Number.POSITIVE_INFINITY
        for (
          let imageIndex = 0;
          imageIndex < this.images.length;
          imageIndex++
        ) {
          const image = this.images[imageIndex]!
          if (!image.tasks.length) continue
          const total =
            image.pixels.pixels.length * image.pixels.pixels[0]!.length
          const percent = 1 - image.tasks.length / total
          if (percent < minPercent) {
            minPercent = percent
            bestImage = image
          }
        }
        return bestImage?.tasks.shift()
      }
    }
  }

  /** Start listening to fetch requests */
  protected registerFetchInterceptor() {
    const pageWindow = this.getPageWindow()
    const originalFetch = pageWindow.fetch.bind(pageWindow)
    const pixelRegExp =
      /https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/
    const interceptedFetch = async (
      request: Parameters<Window['fetch']>[0],
      options?: Parameters<Window['fetch']>[1],
    ): Promise<Response> => {
      const response = await originalFetch(request, options)
      const cloned = response.clone()
      const url = this.resolveFetchUrl(request)
      if (response.url === 'https://backend.wplace.live/me') {
        this.me = (await cloned.json()) as Me
        this.me.favoriteLocations.unshift(...FAVORITE_LOCATIONS)
        this.me.maxFavoriteLocations = Infinity
        response.json = () => Promise.resolve(this.me)
        this.log('Patched /me response with favorite locations', {
          totalFavorites: this.me.favoriteLocations.length,
        })
        void this.syncAccountInfoWithControl('wplace_me').catch(
          (error: unknown) => {
            this.log('Control API /me sync failed', error)
          },
        )
      }
      const pixelMatch = pixelRegExp.exec(url)
      if (pixelMatch) {
        for (
          let index = 0;
          index < this.markerPixelPositionResolvers.length;
          index++
        )
          this.markerPixelPositionResolvers[index]!(
            new WorldPosition(
              this,
              +pixelMatch[1]!,
              +pixelMatch[2]!,
              +pixelMatch[3]!,
              +pixelMatch[4]!,
            ),
          )
        this.markerPixelPositionResolvers.length = 0
        this.log('Resolved marker pixel position from network event')
      }
      return response
    }
    pageWindow.fetch = interceptedFetch as typeof pageWindow.fetch
    globalThis.fetch = interceptedFetch as typeof globalThis.fetch
  }

  protected resolveFetchUrl(request: unknown) {
    if (typeof request === 'string') return request
    if (request instanceof URL) return request.href
    if (request && typeof request === 'object' && 'url' in request) {
      const url = (request as { url?: unknown }).url
      if (typeof url === 'string') return url
    }
    return ''
  }

  /** Closes all popups */
  public async closeAll() {
    for (const button of document.querySelectorAll('button')) {
      if (
        button.innerHTML === '✕' ||
        button.innerHTML ===
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->`
      ) {
        button.click()
        await wait(1)
      }
    }
  }

  /** Wait for element to show up in document */
  protected waitForElement<T extends Element>(
    name: string,
    selector: string,
  ): Promise<T> {
    this.log('Waiting for element', { name, selector })
    return this.widget.run(`${t('taskWaitingFor')} ${name}`, () => {
      return new Promise<T>((resolve) => {
        // If element already exists, resolve immediately
        const existing = document.querySelector<T>(selector)
        if (existing) {
          resolve(existing)
          return
        }
        // Watch for new elements
        const observer = new MutationObserver(() => {
          const element = document.querySelector<T>(selector)
          if (element) {
            observer.disconnect()
            resolve(element)
          }
        })
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
        })
      })
    })
  }

  /** Simply update $stars property */
  protected updateStars() {
    this.$stars = [
      ...document.querySelectorAll<HTMLDivElement>(
        '.text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center',
      ),
    ].slice(0, FAVORITE_LOCATIONS.length)
    this.log('Star cache updated', { stars: this.$stars.length })
  }

  /** Update images position and contents */
  protected updateImages() {
    for (let index = 0; index < this.images.length; index++) {
      this.images[index]!.position.updateAnchor()
      this.images[index]!.update()
    }
  }

  /** Update tasks of all images */
  public updateTasks() {
    for (let index = 0; index < this.images.length; index++)
      this.images[index]!.updateTasks()
  }

  /** Update colors of all images */
  protected updateImageColors() {
    for (let index = 0; index < this.images.length; index++)
      this.images[index]!.updateColors()
  }
}

declare global {
  var kglacerMacro: KGlacerMacro
  var kgm: KGlacerMacro
  var wbot: KGlacerMacro
}

installCompatibilityGuards()

if (location.hostname.includes('hcaptcha.com')) initChallengeSolver()
else {
  globalThis.kglacerMacro = new KGlacerMacro()
  globalThis.kgm = globalThis.kglacerMacro
  globalThis.wbot = globalThis.kglacerMacro
}
