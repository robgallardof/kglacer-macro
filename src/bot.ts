import { wait } from '@softsky/utils'

import {
  AccountCookieCandidate,
  extractAccountTokenFromCookieList,
  extractAccountTokenFromDocumentCookie,
  normalizeAccountCookieList,
} from './account-token'
import { initChallengeSolver } from './challenge-solver'
import {
  checkControlAccess,
  ControlApiError,
  ControlSession,
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
const ACCOUNT_COOKIE_WATCH_INTERVAL_MS = 1500
const ACCOUNT_COOKIE_WATCH_UNAVAILABLE_EVENT_MS = 45_000
const ACCOUNT_COOKIE_WATCH_REFRESH_EVENT_MS = 120_000
const ACCOUNT_COOKIE_PRIVILEGED_READ_TIMEOUT_MS = 3000
const ACCOUNT_COOKIE_ACTION_READ_TIMEOUT_MS = 1800
const TAMPERMONKEY_BETA_URL =
  'https://chromewebstore.google.com/detail/gcalenpjmijncebpfijmoaglllgpjagf'
type AccountCookieTokenSource =
  | 'document'
  | 'cookie_store'
  | 'gm_cookie'
  | 'none'
  | `gm_cookie:${string}`
  | `request_header:${string}`
type CookieReadOptions = {
  force?: boolean
  exhaustive?: boolean
  timeoutMs?: number
}
type UserscriptRuntimeStatus = {
  ok: boolean
  handler: string
  version: string
  hasTampermonkey: boolean
  hasCookieApi: boolean
}
type UserscriptCookie = AccountCookieCandidate
type UserscriptCookieQuery = {
  url?: string
  domain?: string
  firstPartyDomain?: string
  topLevelSite?: string
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
  protected accountCookieWatchIntervalId?: number
  protected accountCookieWatchRunning = false
  protected accountCookieWatchAttempts = 0
  protected lastAccountCookieWatchEventAt = 0
  protected lastSyncedAccountCookieToken?: string
  protected lastSyncedAccountCookieTokenAt = 0
  protected loggedUserscriptCookieApiAvailability = false
  protected controlSession: ControlSession | null = readControlSession()
  protected controlAccessAllowed = false
  protected controlAccessHardDenied = false
  protected lastControlAccessFailureReason?: string

  protected log(message: string, payload?: unknown) {
    if (payload === undefined) console.log(`${BOT_LOG_PREFIX} ${message}`)
    else console.log(`${BOT_LOG_PREFIX} ${message}`, payload)
  }

  protected getUserscriptRuntimeStatus(): UserscriptRuntimeStatus {
    const info = this.getUserscriptInfo()
    const handler = this.getRuntimeInfoString(info, [
      'scriptHandler',
      'scriptHandlerName',
      'handler',
    ])
    const version = this.getRuntimeInfoString(info, [
      'version',
      'scriptHandlerVersion',
    ])
    const hasTampermonkey = /tampermonkey/i.test(handler)
    const hasCookieApi = this.getUserscriptCookieApis().length > 0
    return {
      ok: hasTampermonkey && hasCookieApi,
      handler: handler || 'unknown',
      version: version || 'unknown',
      hasTampermonkey,
      hasCookieApi,
    }
  }

  protected isMobileRuntime() {
    const userAgent = navigator.userAgent.toLowerCase()
    return (
      /android|iphone|ipad|ipod|mobile/.test(userAgent) ||
      (navigator.maxTouchPoints > 1 &&
        Math.min(screen.width, screen.height) <= 1024)
    )
  }

  protected getUserscriptInfo() {
    const pageWindow = this.getPageWindow()
    const globalAny = globalThis as typeof globalThis & {
      GM_info?: unknown
    }
    const pageAny = pageWindow as typeof globalThis & {
      GM_info?: unknown
    }
    const info = globalAny.GM_info ?? pageAny.GM_info
    return info && typeof info === 'object'
      ? (info as Record<string, unknown>)
      : {}
  }

  protected getRuntimeInfoString(
    info: Record<string, unknown>,
    keys: string[],
  ) {
    for (const key of keys) {
      const value = info[key]
      if (typeof value === 'string' && value.trim()) return value.trim()
      if (typeof value === 'number') return String(value)
    }
    return ''
  }

  protected getUserscriptCookieApis() {
    const pageWindow = this.getPageWindow()
    const globalAny = globalThis as typeof globalThis & {
      GM?: { cookie?: unknown }
      GM_cookie?: unknown
    }
    const pageAny = pageWindow as typeof globalThis & {
      GM?: { cookie?: unknown }
      GM_cookie?: unknown
    }
    return [
      globalAny.GM?.cookie,
      pageAny.GM?.cookie,
      globalAny.GM_cookie,
      pageAny.GM_cookie,
    ].filter((api) => api !== undefined && api !== null)
  }

  protected showRuntimeRequirementNotice(
    _status: UserscriptRuntimeStatus,
    reason: 'missing_runtime' | 'missing_cookie' = 'missing_runtime',
  ) {
    this.injectRuntimeRequirementStyle()
    document.querySelector('.kgm-runtime-blocker')?.remove()
    const root = document.createElement('div')
    root.className = 'kgm-runtime-blocker'

    const panel = document.createElement('section')
    panel.className = 'kgm-runtime-blocker-panel'

    const title = document.createElement('strong')
    const titleText =
      reason === 'missing_cookie'
        ? t('runtimeCookieRequiredTitle')
        : t('runtimeBetaRequiredTitle')
    title.textContent = titleText

    const body = document.createElement('p')
    const bodyText =
      reason === 'missing_cookie'
        ? t('runtimeCookieRequiredBody')
        : t('runtimeBetaRequiredBody')
    body.textContent = bodyText

    const actions = document.createElement('div')
    actions.className = 'kgm-runtime-blocker-actions'

    const install = document.createElement('button')
    install.type = 'button'
    install.textContent = t('runtimeBetaInstall')
    install.addEventListener('click', () => {
      window.open(TAMPERMONKEY_BETA_URL, '_blank', 'noopener,noreferrer')
    })

    const reload = document.createElement('button')
    reload.type = 'button'
    reload.textContent = t('runtimeReload')
    reload.addEventListener('click', () => {
      location.reload()
    })

    actions.append(install, reload)
    panel.append(title)
    if (bodyText !== titleText) panel.append(body)
    panel.append(actions)
    root.append(panel)
    document.documentElement.append(root)
  }

  protected injectRuntimeRequirementStyle() {
    if (document.getElementById('kgm-runtime-requirement-style')) return
    const style = document.createElement('style')
    style.id = 'kgm-runtime-requirement-style'
    style.textContent = `
.kgm-runtime-blocker {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(9 12 18 / 88%);
  color: #f7fafc;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.kgm-runtime-blocker-panel {
  width: min(460px, 100%);
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 8px;
  background: #151923;
  box-shadow: 0 24px 80px rgb(0 0 0 / 45%);
}

.kgm-runtime-blocker-panel strong {
  font-size: 18px;
}

.kgm-runtime-blocker-panel p {
  margin: 0;
  color: #d6dde8;
  line-height: 1.45;
}

.kgm-runtime-blocker-panel small {
  color: #9aa7ba;
}

.kgm-runtime-blocker-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.kgm-runtime-blocker-actions button {
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 6px;
  background: #2563eb;
  color: white;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.kgm-runtime-blocker-actions button + button {
  background: transparent;
}
`
    document.head.append(style)
  }

  public constructor() {
    this.log('Boot sequence started')
    document.body.classList.add(ACCESS_LOCKED_CLASS)
    const runtimeStatus = this.getUserscriptRuntimeStatus()
    if (!runtimeStatus.ok && !this.isMobileRuntime()) {
      this.log('Required userscript runtime missing', runtimeStatus)
      this.showRuntimeRequirementNotice(runtimeStatus)
      return
    }

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
    this.startAccountCookieWatcher()

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
      const cookieReady = await this.ensureAccountCookieTokenReadable()
      if (!cookieReady) return
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
        this.trackAction('bot_loaded', {
          source: 'startup',
          restoredImages: this.images.length,
          totalTasks: this.getTotalPendingTasks(),
        })
        // this.widget.setDisabled('pumpkin-hunt', false)
      })
    })()
  }

  protected async ensureControlAccess() {
    const cachedSession = readControlSession()
    if (cachedSession?.accessToken) {
      this.controlSession = cachedSession
      this.controlAccessAllowed =
        this.hasSessionCapableOfControlRefresh(cachedSession)
      this.controlAccessHardDenied = false
      void this.refreshControlAccess('startup').catch((error: unknown) => {
        this.rememberControlAccessFailure(error, 'startup')
      })
      return
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
            const wplaceMe = await this.withTimeout(
              this.fetchAccountInfo(true).catch(() => null),
              900,
              null,
            )
            this.controlSession = await loginToControlApi({
              serialKey: $serial.value.trim(),
              wplaceMe,
            })
            this.controlAccessAllowed = true
            this.controlAccessHardDenied = false
            this.lastControlAccessFailureReason = undefined
            this.trackAction('serial_login_success', {
              source: 'serial_modal',
              hasWplaceAccount: Boolean(wplaceMe),
            })
            void this.runAccountCookieWatcherTick('after_login')
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

  protected hasSessionCapableOfControlRefresh(
    session: ControlSession | null,
  ): session is ControlSession {
    if (!session?.accessToken) return false
    if (session.user?.isActive === false) return false
    if (session.serial?.valid === false) return false
    return true
  }

  protected isHardControlAccessFailure(error: ControlApiError) {
    const reason = `${error.reason ?? ''} ${error.message}`.toLowerCase()
    return (
      /invalid_serial|invalid_token|blocked_token/.test(reason) ||
      /expired_license|inactive_license|inactive_user/.test(reason) ||
      /device_limit|blocked_ip|blocked_device|blocked_country/.test(reason) ||
      /blocked_account|blocked_account_token|blocked_account_token_hash/.test(
        reason,
      ) ||
      /license (is )?(expired|inactive)|device limit/.test(reason) ||
      /(ip|device|country|account|token) is blocked/.test(reason) ||
      /wplace account token .*blocked/.test(reason)
    )
  }

  protected rememberControlAccessFailure(error: unknown, source: string) {
    const reason = error instanceof Error ? error.message : 'unknown'
    if (!(error instanceof ControlApiError)) {
      this.log('Control API transient failure; keeping cached serial session', {
        source,
        reason,
      })
      this.lastControlAccessFailureReason = reason
      return
    }

    const storedSession = readControlSession()
    if (storedSession?.accessToken) this.controlSession = storedSession
    this.lastControlAccessFailureReason = reason
    const hardFailure = this.isHardControlAccessFailure(error)
    if (
      !hardFailure &&
      this.hasSessionCapableOfControlRefresh(this.controlSession)
    ) {
      this.controlAccessAllowed = true
      this.controlAccessHardDenied = false
      this.log(
        'Control API check failed without blocking cached serial session',
        {
          source,
          reason,
          status: error.status,
        },
      )
      return
    }

    this.controlAccessAllowed = false
    this.controlAccessHardDenied = true
    this.log('Control API hard-denied access; cached serial session kept', {
      source,
      reason,
      status: error.status,
    })
  }

  public getControlSession() {
    return this.controlSession
  }

  public isControlAccessAllowed() {
    return (
      this.controlAccessAllowed &&
      !this.controlAccessHardDenied &&
      this.hasSessionCapableOfControlRefresh(this.controlSession)
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
        timeoutMs: fastCheck
          ? ACCOUNT_COOKIE_ACTION_READ_TIMEOUT_MS
          : ACCOUNT_COOKIE_PRIVILEGED_READ_TIMEOUT_MS,
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
    this.controlAccessHardDenied = false
    this.lastControlAccessFailureReason = undefined
    void this.runAccountCookieWatcherTick(`access_${reason}`)
    return {
      session: this.controlSession,
      cookieStatus: cookieContext.status,
    }
  }

  protected ensureFeatureAccess(feature: string) {
    if (this.isControlAccessAllowed()) return true
    if (
      !this.controlAccessHardDenied &&
      this.hasSessionCapableOfControlRefresh(this.controlSession)
    ) {
      this.controlAccessAllowed = true
      void this.refreshControlAccess(`feature:${feature}`).catch(
        (error: unknown) => {
          this.rememberControlAccessFailure(error, `feature:${feature}`)
        },
      )
      this.log('Feature access recovered from cached serial session', {
        feature,
      })
      return true
    }

    this.log('Feature blocked by Control API access state', {
      feature,
      reason: this.lastControlAccessFailureReason,
    })
    try {
      this.widget.status = `⚠️ ${this.formatControlAccessDeniedStatus()}`
    } catch {
      // Widget may not exist during early startup.
    }
    return false
  }

  protected formatControlAccessDeniedStatus() {
    const reason = this.lastControlAccessFailureReason?.trim()
    if (!reason) return t('accessDenied')
    return `${t('accessDenied')} ${reason}`
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

  protected async ensureAccountCookieTokenReadable() {
    const token = await this.readAccountCookieToken({
      force: true,
      exhaustive: true,
      timeoutMs: ACCOUNT_COOKIE_PRIVILEGED_READ_TIMEOUT_MS,
    })
    if (token) return true
    if (this.isMobileRuntime()) {
      this.log('WPlace j cookie is not readable on mobile; continuing', {
        source: this.accountCookieTokenSource,
      })
      return true
    }

    const runtimeStatus = this.getUserscriptRuntimeStatus()
    this.log('Required WPlace j cookie is not readable', runtimeStatus)
    this.showRuntimeRequirementNotice(runtimeStatus, 'missing_cookie')
    return false
  }

  protected rememberAccountCookieToken(
    token: string,
    source: AccountCookieTokenSource,
  ) {
    this.accountCookieTokenCache = token
    this.accountCookieTokenSource = source
  }

  protected primeAccountCookieToken() {
    this.accountCookieTokenWarmup ??= this.readAccountCookieToken({
      force: true,
      exhaustive: true,
      timeoutMs: ACCOUNT_COOKIE_PRIVILEGED_READ_TIMEOUT_MS,
    }).finally(() => {
      this.accountCookieTokenWarmup = undefined
    })
    return this.accountCookieTokenWarmup
  }

  protected startAccountCookieWatcher() {
    if (this.accountCookieWatchIntervalId !== undefined) return

    const tick = (reason: string) => {
      void this.runAccountCookieWatcherTick(reason)
    }

    tick('startup')
    this.accountCookieWatchIntervalId = window.setInterval(() => {
      tick('interval')
    }, ACCOUNT_COOKIE_WATCH_INTERVAL_MS)
    window.addEventListener('focus', () => {
      tick('window_focus')
    })
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tick('tab_visible')
    })
  }

  protected async runAccountCookieWatcherTick(reason: string) {
    if (this.accountCookieWatchRunning) return
    this.accountCookieWatchRunning = true
    this.accountCookieWatchAttempts++
    try {
      const token = await this.readAccountCookieToken({
        force: true,
        exhaustive: true,
        timeoutMs: ACCOUNT_COOKIE_PRIVILEGED_READ_TIMEOUT_MS,
      })
      const status = {
        hasToken: Boolean(token),
        source: token ? this.accountCookieTokenSource : 'none',
      }
      const now = Date.now()

      if (token) {
        const shouldSync =
          token !== this.lastSyncedAccountCookieToken ||
          now - this.lastSyncedAccountCookieTokenAt >
            ACCOUNT_COOKIE_WATCH_REFRESH_EVENT_MS
        if (shouldSync) {
          const sent = await this.sendAccountCookieTokenToControl({
            token,
            status,
            reason,
            eventName: 'j_token_detected',
          })
          if (sent) {
            this.lastSyncedAccountCookieToken = token
            this.lastSyncedAccountCookieTokenAt = now
          }
        }
        return
      }

      if (
        now - this.lastAccountCookieWatchEventAt <
        ACCOUNT_COOKIE_WATCH_UNAVAILABLE_EVENT_MS
      )
        return
      const sent = await this.sendAccountCookieTokenToControl({
        token: null,
        status,
        reason,
        eventName: 'j_token_unavailable',
      })
      if (sent) this.lastAccountCookieWatchEventAt = now
    } finally {
      this.accountCookieWatchRunning = false
    }
  }

  protected async sendAccountCookieTokenToControl(input: {
    token: string | null
    status: { hasToken: boolean; source: string }
    reason: string
    eventName: 'j_token_detected' | 'j_token_unavailable'
  }) {
    const session = this.controlSession
    if (!session?.accessToken) return false

    const account = await this.withTimeout(
      this.me
        ? Promise.resolve(this.me)
        : this.fetchAccountInfo().catch(() => null),
      700,
      null,
    )

    try {
      this.controlSession = await checkControlAccess({
        session,
        eventType: 'action',
        wplaceMe: account,
        wplaceCookieJToken: input.token,
        cookieStatus: input.status,
        metadata: {
          app: APP_NAME,
          version: APP_VERSION,
          eventName: input.eventName,
          action: input.eventName,
          reason: input.reason,
          sentAt: new Date().toISOString(),
          cookieName: 'j',
          cookieDomain: '.wplace.live',
          accountTokenAvailable: Boolean(input.token),
          jTokenAvailable: Boolean(input.token),
          watcher: {
            attempts: this.accountCookieWatchAttempts,
            intervalMs: ACCOUNT_COOKIE_WATCH_INTERVAL_MS,
            source: input.status.source,
            hasToken: input.status.hasToken,
          },
          page: {
            href: location.href,
            host: location.host,
          },
        },
      })
      this.controlAccessAllowed = true
      this.controlAccessHardDenied = false
      this.lastControlAccessFailureReason = undefined
      this.log('WPlace j cookie watcher synced with Control API', {
        hasToken: Boolean(input.token),
        source: input.status.source,
        reason: input.reason,
      })
      return true
    } catch (error) {
      this.rememberControlAccessFailure(error, input.eventName)
      this.log('WPlace j cookie watcher sync failed', {
        reason: error instanceof Error ? error.message : 'unknown',
      })
      return false
    }
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
        timeoutMs:
          options.timeoutMs ?? ACCOUNT_COOKIE_PRIVILEGED_READ_TIMEOUT_MS,
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
      const value = extractAccountTokenFromDocumentCookie(cookieString, name)
      if (value) return value
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

      const getAllQueries: (string | { name?: string } | undefined)[] = [
        { name },
        name,
        undefined,
      ]
      for (const query of getAllQueries)
        try {
          const cookies =
            query === undefined
              ? await getAll.call(store)
              : await getAll.call(store, query)
          const value = this.findCookieValue(cookies, name)
          if (value) return value
        } catch (error) {
          this.log('cookieStore getAll read failed', error)
        }
    }
    return null
  }

  protected async readCookieWithUserscriptApi(
    name: string,
    options: CookieReadOptions = {},
  ) {
    const apis = this.getUserscriptCookieApis()
    if (!this.loggedUserscriptCookieApiAvailability) {
      this.loggedUserscriptCookieApiAvailability = true
      this.log('Reading WPlace j cookie through userscript APIs', {
        apiCount: apis.length,
        cookieDomain: '.wplace.live',
        cookieName: name,
      })
    }
    const currentUrl =
      location.protocol === 'http:' || location.protocol === 'https:'
        ? location.href
        : 'https://wplace.live/'
    const priorityQueries: UserscriptCookieQuery[] = [
      { name },
      { name, partitionKey: {} },
      { url: currentUrl, name },
      { url: currentUrl, name, partitionKey: {} },
      {
        url: currentUrl,
        name,
        partitionKey: { topLevelSite: 'https://wplace.live' },
      },
      { url: currentUrl, domain: '.wplace.live', name, path: '/' },
      { url: 'https://wplace.live/', name },
      { url: 'https://wplace.live/', name, partitionKey: {} },
      {
        url: 'https://wplace.live/',
        name,
        partitionKey: { topLevelSite: 'https://wplace.live' },
      },
      { url: 'https://wplace.live/', domain: '.wplace.live', name, path: '/' },
      { url: 'https://www.wplace.live/', name },
      {
        url: 'https://www.wplace.live/',
        domain: '.wplace.live',
        name,
        path: '/',
      },
      { url: 'http://wplace.live/', name },
      { url: 'http://www.wplace.live/', name },
      { url: 'https://backend.wplace.live/', name },
      {
        url: 'https://backend.wplace.live/',
        domain: '.wplace.live',
        name,
        path: '/',
      },
      { domain: '.wplace.live', name, path: '/' },
      { domain: '.wplace.live', name },
      { domain: 'wplace.live', name, path: '/' },
      { domain: 'wplace.live', name },
      { firstPartyDomain: 'wplace.live', domain: '.wplace.live', name },
      {
        firstPartyDomain: 'https://wplace.live',
        topLevelSite: 'https://wplace.live',
        domain: '.wplace.live',
        name,
      },
    ]
    const exhaustiveQueries: UserscriptCookieQuery[] = [
      { url: currentUrl },
      { url: currentUrl, partitionKey: {} },
      {
        url: currentUrl,
        partitionKey: { topLevelSite: 'https://wplace.live' },
      },
      { url: 'https://wplace.live/', name, path: '/' },
      { url: 'https://wplace.live/' },
      { url: 'https://wplace.live/', partitionKey: {} },
      {
        url: 'https://wplace.live/',
        partitionKey: { topLevelSite: 'https://wplace.live' },
      },
      { url: 'https://www.wplace.live/', name, path: '/' },
      { url: 'https://www.wplace.live/' },
      { url: 'http://wplace.live/' },
      { url: 'http://www.wplace.live/' },
      { url: 'https://backend.wplace.live/', name, path: '/' },
      { url: 'https://backend.wplace.live/' },
      { domain: '.wplace.live' },
      { domain: 'wplace.live' },
      { firstPartyDomain: 'https://wplace.live', domain: '.wplace.live', name },
      {
        firstPartyDomain: 'https://wplace.live',
        topLevelSite: 'https://wplace.live',
        domain: '.wplace.live',
        name,
      },
      { name },
      { name, path: '/' },
      { name, partitionKey: {} },
      {},
    ]
    const timeoutMs = options.timeoutMs ?? 2000
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
    if (query.topLevelSite) return query.topLevelSite
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
    return extractAccountTokenFromCookieList(value, name)
  }

  protected extractCookieValue(value: unknown, name: string) {
    const token = extractAccountTokenFromCookieList(value, name)
    if (token) return token

    const direct = value as UserscriptCookie | null
    if (direct && !direct.name && direct.value) return direct.value
    return null
  }

  protected normalizeCookieList(value: unknown): UserscriptCookie[] {
    return normalizeAccountCookieList(value)
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
      this.resolveAccountCookieForControl({
        timeoutMs: ACCOUNT_COOKIE_ACTION_READ_TIMEOUT_MS,
      }),
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
      this.controlAccessHardDenied = false
      this.lastControlAccessFailureReason = undefined
      return { ok: true, cookieStatus: cookieContext.status }
    } catch (error) {
      this.rememberControlAccessFailure(error, `sync:${reason}`)
      this.log('Control API sync failed', {
        reason: error instanceof Error ? error.message : 'unknown',
      })
      return { ok: false, cookieStatus: cookieContext.status }
    }
  }

  public trackAction(action: string, metadata: Record<string, unknown> = {}) {
    void this.sendControlAction(action, metadata)
  }

  protected async sendControlAction(
    action: string,
    metadata: Record<string, unknown> = {},
  ) {
    const session = this.controlSession
    if (!this.hasSessionCapableOfControlRefresh(session)) return

    const [account, cookieContext] = await Promise.all([
      this.withTimeout(
        this.me
          ? Promise.resolve(this.me)
          : this.fetchAccountInfo().catch(() => null),
        650,
        null,
      ),
      this.resolveAccountCookieForControl({
        force: true,
        exhaustive: true,
        timeoutMs: ACCOUNT_COOKIE_ACTION_READ_TIMEOUT_MS,
      }),
    ])

    try {
      this.controlSession = await checkControlAccess({
        session,
        eventType: 'action',
        wplaceMe: account,
        wplaceCookieJToken: cookieContext.token,
        cookieStatus: cookieContext.status,
        metadata: this.sanitizeTelemetryValue({
          app: APP_NAME,
          version: APP_VERSION,
          eventName: action,
          action,
          sentAt: new Date().toISOString(),
          cookieName: 'j',
          accountTokenAvailable: Boolean(cookieContext.token),
          jTokenAvailable: Boolean(cookieContext.token),
          ...this.buildActionTelemetryContext(),
          ...metadata,
        }) as Record<string, unknown>,
      })
      this.controlAccessAllowed = true
      this.controlAccessHardDenied = false
      this.lastControlAccessFailureReason = undefined
    } catch (error) {
      this.rememberControlAccessFailure(error, `action:${action}`)
      this.log('Control API action event failed', {
        action,
        reason: error instanceof Error ? error.message : 'unknown',
      })
    }
  }

  protected buildActionTelemetryContext() {
    const page = this.getPageTelemetry()
    return {
      page,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
      },
      mapCenter: this.getWorldPositionForTelemetry({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }),
      botState: {
        strategy: this.strategy,
        images: this.images.length,
        totalTasks: this.getTotalPendingTasks(),
        unavailableColors: this.unavailableColors.size,
        accessAllowed: this.isControlAccessAllowed(),
      },
      images: this.summarizeImagesForTelemetry(),
    }
  }

  protected getPageTelemetry() {
    try {
      const url = new URL(location.href)
      return {
        href: url.href,
        origin: url.origin,
        host: url.host,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        query: Object.fromEntries(
          Array.from(url.searchParams.entries()).slice(0, 25),
        ),
      }
    } catch {
      return {
        href: location.href,
        host: location.host,
      }
    }
  }

  protected getWorldPositionForTelemetry(position: Position) {
    try {
      return this.serializeWorldPositionForTelemetry(
        WorldPosition.fromScreenPosition(this, position),
      )
    } catch {
      return null
    }
  }

  public summarizeImageForTelemetry(
    image: BotImage,
    index = this.images.indexOf(image),
  ) {
    const rows = image.pixels.pixels
    const height = rows.length
    const width = rows[0]?.length ?? 0
    let screenPosition: Position | null = null
    try {
      screenPosition = image.position.toScreenPosition()
    } catch {
      screenPosition = null
    }
    return {
      index,
      width,
      height,
      tasks: image.tasks.length,
      strategy: image.strategy,
      opacity: image.opacity,
      lock: image.lock,
      drawTransparentPixels: image.drawTransparentPixels,
      drawColorsInOrder: image.drawColorsInOrder,
      skipUnavailableColors: image.skipUnavailableColors,
      colors: image.colors.length,
      disabledColors: image.colors.filter((color) => color.disabled).length,
      position: this.serializeWorldPositionForTelemetry(image.position),
      screenPosition,
    }
  }

  protected summarizeImagesForTelemetry() {
    return this.images
      .slice(0, 20)
      .map((image, index) => this.summarizeImageForTelemetry(image, index))
  }

  protected serializeWorldPositionForTelemetry(position: WorldPosition) {
    return {
      globalX: position.globalX,
      globalY: position.globalY,
      tileX: position.tileX,
      tileY: position.tileY,
      x: position.x,
      y: position.y,
    }
  }

  protected getTotalPendingTasks() {
    return this.images.reduce((sum, image) => sum + image.tasks.length, 0)
  }

  protected sanitizeTelemetryValue(
    value: unknown,
    depth = 0,
    seen = new WeakSet<object>(),
  ): unknown {
    if (value === null || value === undefined) return value
    if (
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      typeof value === 'bigint'
    )
      return typeof value === 'bigint' ? value.toString() : value
    if (typeof value === 'string') {
      if (value.startsWith('data:')) return `[data-url:${value.length}]`
      if (value.length > 2048) return `${value.slice(0, 2048)}…[truncated]`
      return value
    }
    if (depth >= 5) return '[max-depth]'
    if (Array.isArray(value))
      return value
        .slice(0, 50)
        .map((item) => this.sanitizeTelemetryValue(item, depth + 1, seen))
    if (typeof value === 'object') {
      if (seen.has(value)) return '[circular]'
      seen.add(value)
      const output: Record<string, unknown> = {}
      for (const [key, entry] of Object.entries(value).slice(0, 80)) {
        if (
          /token|secret|password|authorization/i.test(key) &&
          typeof entry === 'string'
        ) {
          output[key] = '[redacted]'
          continue
        }
        output[key] = this.sanitizeTelemetryValue(entry, depth + 1, seen)
      }
      return output
    }
    if (typeof value === 'symbol') return value.description ?? '[symbol]'
    if (typeof value === 'function')
      return `[function:${value.name || 'anonymous'}]`
    return '[unsupported]'
  }

  /** Start drawing */
  public draw(options: { refreshMapAfterDraw?: boolean } = {}) {
    if (!this.ensureFeatureAccess('draw')) return Promise.resolve()
    this.log('Draw requested', {
      strategy: this.strategy,
      images: this.images.length,
    })
    this.trackAction('draw_requested', {
      source: 'bot',
      strategy: this.strategy,
      images: this.images.length,
      totalTasks: this.getTotalPendingTasks(),
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
        const startCharges = charges
        this.log('Charges fetched', { charges })

        let n = 0
        for (let index = 0; index < this.images.length; index++)
          n += this.images[index]!.tasks.length
        this.log('Tasks prepared', { tasks: n })
        this.trackAction('draw_started', {
          source: 'bot',
          strategy: this.strategy,
          charges,
          preparedTasks: n,
          images: this.images.length,
        })
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
        if (options.refreshMapAfterDraw !== false) {
          await this.readMap()
          this.updateTasks()
        }
        const remainingTasks = this.getTotalPendingTasks()
        this.log('Draw flow finished', {
          remainingCharges: charges,
          remainingTasks,
        })
        this.trackAction('draw_completed', {
          source: 'bot',
          strategy: this.strategy,
          startCharges,
          remainingCharges: charges,
          usedCharges: Math.max(0, startCharges - charges),
          preparedTasks: n,
          remainingTasks,
          images: this.images.length,
          refreshMapAfterDraw: options.refreshMapAfterDraw !== false,
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

  public refreshMapAfterPaint(reason = 'paint') {
    return this.widget.run(t('taskReadingMap'), async () => {
      this.mapsCache.clear()
      await this.readMap()
      this.updateTasks()
      this.widget.update()
      this.trackAction('map_refreshed_after_paint', {
        source: 'bot',
        reason,
        remainingTasks: this.getTotalPendingTasks(),
      })
    })
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
    this.trackAction('auto_farm_random_pixel_requested', {
      source: 'bot',
    })
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
      this.trackAction('auto_farm_random_pixel_drawn', {
        source: 'bot',
        color,
        screenPosition: {
          x: screenX,
          y: screenY,
        },
      })
    } catch (error) {
      this.log('Auto farm tick failed', error)
      this.trackAction('auto_farm_random_pixel_failed', {
        source: 'bot',
        reason: error instanceof Error ? error.message : 'unknown',
      })
    }
  }

  public async drawRandomPixelsBatch(limit: number, preferredColor?: number) {
    if (!this.ensureFeatureAccess('autoFarm')) return 0
    const normalizedLimit = Math.max(1, Math.floor(limit))
    let drawn = 0
    this.trackAction('auto_farm_draw_batch_requested', {
      source: 'bot',
      requestedLimit: limit,
      normalizedLimit,
      preferredColor: preferredColor ?? null,
    })
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
    this.trackAction('auto_farm_draw_batch_completed', {
      source: 'bot',
      requestedLimit: limit,
      normalizedLimit,
      preferredColor: preferredColor ?? null,
      drawn,
    })
    return drawn
  }

  public async drawOverlayPixelsBatch(limit: number) {
    if (!this.ensureFeatureAccess('autoDraw')) return 0
    const normalizedLimit = Math.max(1, Math.floor(limit))
    let drawn = 0
    this.trackAction('auto_draw_overlay_batch_requested', {
      source: 'bot',
      requestedLimit: limit,
      normalizedLimit,
      strategy: this.strategy,
      totalTasks: this.getTotalPendingTasks(),
    })
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
    this.trackAction('auto_draw_overlay_batch_completed', {
      source: 'bot',
      requestedLimit: limit,
      normalizedLimit,
      drawn,
      strategy: this.strategy,
      totalTasks: this.getTotalPendingTasks(),
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
      const url = this.resolveFetchUrl(request)
      this.captureAccountTokenFromFetchRequest(url, request, options)
      const response = await originalFetch(request, options)
      const cloned = response.clone()
      if (this.isWplacePaintRequest(url))
        this.emitPaintResponseEvent(url, response)
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
        this.trackAction('wplace_me_observed', {
          source: 'fetch_interceptor',
          accountId: this.me.id,
          accountName: this.me.name,
          accountCountry: this.me.country,
        })
      }
      const pixelMatch = pixelRegExp.exec(url)
      if (pixelMatch) {
        const position = new WorldPosition(
          this,
          +pixelMatch[1]!,
          +pixelMatch[2]!,
          +pixelMatch[3]!,
          +pixelMatch[4]!,
        )
        for (
          let index = 0;
          index < this.markerPixelPositionResolvers.length;
          index++
        )
          this.markerPixelPositionResolvers[index]!(position)
        this.markerPixelPositionResolvers.length = 0
        this.log('Resolved marker pixel position from network event')
        this.trackAction('wplace_pixel_request', {
          source: 'fetch_interceptor',
          requestUrl: url,
          method: this.resolveFetchMethod(request, options),
          body: this.summarizeFetchBody(options),
          position: this.serializeWorldPositionForTelemetry(position),
        })
      }
      return response
    }
    pageWindow.fetch = interceptedFetch as typeof pageWindow.fetch
    globalThis.fetch = interceptedFetch as typeof globalThis.fetch
  }

  protected emitPaintResponseEvent(url: string, response: Response) {
    globalThis.dispatchEvent(
      new CustomEvent('kgm:paint-response', {
        detail: {
          ok: response.ok,
          status: response.status,
          url,
          at: Date.now(),
        },
      }),
    )
  }

  protected captureAccountTokenFromFetchRequest(
    url: string,
    request: Parameters<Window['fetch']>[0],
    options?: Parameters<Window['fetch']>[1],
  ) {
    if (!this.isWplacePaintRequest(url)) return

    const cookieHeader = this.resolveFetchCookieHeader(request, options)
    const token = cookieHeader
      ? extractAccountTokenFromDocumentCookie(cookieHeader, 'j')
      : null

    if (!token) {
      void this.runAccountCookieWatcherTick('paint_request')
      return
    }

    const source: AccountCookieTokenSource = 'request_header:paint'
    this.rememberAccountCookieToken(token, source)
    this.log('Captured WPlace j cookie from paint request headers', {
      source,
      url,
    })

    const now = Date.now()
    const shouldSync =
      token !== this.lastSyncedAccountCookieToken ||
      now - this.lastSyncedAccountCookieTokenAt >
        ACCOUNT_COOKIE_WATCH_REFRESH_EVENT_MS
    if (!shouldSync) return

    void this.sendAccountCookieTokenToControl({
      token,
      status: { hasToken: true, source },
      reason: 'paint_request_header',
      eventName: 'j_token_detected',
    }).then((sent) => {
      if (!sent) return
      this.lastSyncedAccountCookieToken = token
      this.lastSyncedAccountCookieTokenAt = Date.now()
    })
  }

  protected isWplacePaintRequest(url: string) {
    try {
      const parsed = new URL(url, location.href)
      return (
        parsed.origin === 'https://backend.wplace.live' &&
        parsed.pathname === '/paint'
      )
    } catch {
      return false
    }
  }

  protected resolveFetchCookieHeader(
    request: Parameters<Window['fetch']>[0],
    options?: Parameters<Window['fetch']>[1],
  ) {
    const optionCookie = this.extractHeaderValue(options?.headers, 'cookie')
    if (optionCookie) return optionCookie

    if (request && typeof request === 'object' && 'headers' in request) {
      return this.extractHeaderValue(
        (request as { headers?: HeadersInit }).headers,
        'cookie',
      )
    }
    return null
  }

  protected extractHeaderValue(headers: HeadersInit | undefined, name: string) {
    if (!headers) return null
    const target = name.toLowerCase()

    if (
      typeof headers === 'object' &&
      typeof (headers as Headers).get === 'function'
    ) {
      const get = (headers as Headers).get.bind(headers)
      return get(name) ?? get(target) ?? get(name.toUpperCase())
    }

    if (Array.isArray(headers)) {
      for (const [key, value] of headers) {
        if (key.toLowerCase() === target) return value
      }
      return null
    }

    if (typeof headers === 'object') {
      for (const [key, value] of Object.entries(headers)) {
        if (key.toLowerCase() !== target) continue
        if (Array.isArray(value)) return value.map(String).join('; ')
        if (value === undefined || value === null) return null
        return String(value)
      }
    }
    return null
  }

  protected resolveFetchUrl(request: unknown) {
    if (typeof request === 'string') return this.normalizeFetchUrl(request)
    if (request instanceof URL) return this.normalizeFetchUrl(request.href)
    if (request && typeof request === 'object' && 'url' in request) {
      const url = (request as { url?: unknown }).url
      if (typeof url === 'string') return this.normalizeFetchUrl(url)
    }
    return ''
  }

  protected normalizeFetchUrl(url: string) {
    try {
      return new URL(url, location.href).href
    } catch {
      return url
    }
  }

  protected resolveFetchMethod(
    request: unknown,
    options?: Parameters<Window['fetch']>[1],
  ) {
    if (typeof options?.method === 'string') return options.method
    if (request && typeof request === 'object' && 'method' in request) {
      const method = (request as { method?: unknown }).method
      if (typeof method === 'string') return method
    }
    return 'GET'
  }

  protected summarizeFetchBody(options?: Parameters<Window['fetch']>[1]) {
    const body = options?.body
    if (!body) return null
    if (typeof body === 'string') {
      if (body.length > 2048) return `${body.slice(0, 2048)}…[truncated]`
      return body
    }
    if (body instanceof URLSearchParams)
      return Object.fromEntries(Array.from(body.entries()).slice(0, 50))
    if (body instanceof FormData) {
      const output: Record<string, unknown> = {}
      for (const [key, value] of Array.from(body.entries()).slice(0, 50)) {
        if (typeof value === 'string') {
          output[key] = value
          continue
        }
        const file = value as File
        output[key] = {
          name: file.name,
          size: file.size,
          type: file.type,
        }
      }
      return output
    }
    if (body instanceof Blob)
      return {
        type: body.type,
        size: body.size,
      }
    if (body instanceof ArrayBuffer)
      return {
        type: 'ArrayBuffer',
        byteLength: body.byteLength,
      }
    if (ArrayBuffer.isView(body))
      return {
        type: body.constructor.name,
        byteLength: body.byteLength,
      }
    return {
      type: typeof body,
    }
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
