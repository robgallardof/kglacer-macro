import { APP_VERSION, STORAGE_KEY } from './version'

export const CONTROL_API_BASE_URL = 'https://control-api-opal.vercel.app'
export const CONTROL_API_LOGIN_URL = `${CONTROL_API_BASE_URL}/api/script/login`
export const CONTROL_API_CHECK_URL = `${CONTROL_API_BASE_URL}/api/script/check`

const CONTROL_SESSION_STORAGE_KEY = 'kglacer-macro:control-session-v5'
const CONTROL_SETTINGS_STORAGE_KEY = 'kglacer-macro:control-settings-v5'
const LOCAL_DEVICE_ID_STORAGE_KEY = 'kglacer-macro:local-device-id'

export type ControlPixelSettings = {
  usePixelRange: boolean
  pixel: number
  pixelRange: {
    min: number
    max: number
  }
}

export type ControlSettings = {
  autoDraw: ControlPixelSettings
  farm: ControlPixelSettings
  imagesCollapsed: boolean
}

export type ControlSession = {
  accessToken: string
  expiresAt?: string | null
  user?: {
    id?: string
    username?: string
    email?: string | null
    role?: string
    isActive?: boolean
  }
  serial?: {
    valid?: boolean
    status?: string
    licenseId?: string
    ownerName?: string | null
    username?: string | null
    maxDevices?: number
    expiresAt?: string | null
    validatedAt?: string
  }
  access?: {
    allowed?: boolean
    mode?: string
    reason?: string
    message?: string | null
    userId?: string
    licenseId?: string
    ownerName?: string | null
    username?: string | null
    expiresAt?: string | null
    registeredDevices?: number
    maxDevices?: number
  }
  settings?: Partial<ControlSettings>
}

export type AccountCookieStatus = {
  hasToken: boolean
  source: string
}

export type ControlCheckEventType =
  | 'check'
  | 'heartbeat'
  | 'action'
  | 'painted'
  | 'denied'

export class ControlApiError extends Error {
  public constructor(
    message: string,
    public readonly reason?: string,
    public readonly status?: number,
  ) {
    super(message)
    this.name = 'ControlApiError'
  }
}

export function readControlSession(): ControlSession | null {
  const session =
    readJson<ControlSession | null>(
      sessionStorage,
      CONTROL_SESSION_STORAGE_KEY,
      null,
    ) ??
    readJson<ControlSession | null>(
      localStorage,
      CONTROL_SESSION_STORAGE_KEY,
      null,
    )
  if (!session?.accessToken) return null
  // Do not discard an already validated serial just because the client-side
  // session timestamp is old. The Control API remains the source of truth and
  // can renew or deny this signed license token on the next check.
  const serialized = JSON.stringify(session)
  sessionStorage.setItem(CONTROL_SESSION_STORAGE_KEY, serialized)
  localStorage.setItem(CONTROL_SESSION_STORAGE_KEY, serialized)
  return session
}

export function saveControlSession(session: ControlSession) {
  const serialized = JSON.stringify(session)
  sessionStorage.setItem(CONTROL_SESSION_STORAGE_KEY, serialized)
  localStorage.setItem(CONTROL_SESSION_STORAGE_KEY, serialized)
  if (session.settings) saveControlSettings(session.settings)
}

export function clearControlSession() {
  sessionStorage.removeItem(CONTROL_SESSION_STORAGE_KEY)
  localStorage.removeItem(CONTROL_SESSION_STORAGE_KEY)
}

export function readControlSettings(): Partial<ControlSettings> {
  return readJson<Partial<ControlSettings>>(
    localStorage,
    CONTROL_SETTINGS_STORAGE_KEY,
    {},
  )
}

export function saveControlSettings(settings: Partial<ControlSettings>) {
  const current = readControlSettings()
  localStorage.setItem(
    CONTROL_SETTINGS_STORAGE_KEY,
    JSON.stringify({ ...current, ...settings }),
  )
}

export function hasUsableControlAccess(session: ControlSession | null) {
  if (!session) return false
  if (session.user?.isActive === false) return false
  if (session.serial?.valid === false) return false
  if (session.access?.allowed === false) return false
  return Boolean(session.accessToken)
}

export async function loginToControlApi(input: {
  serialKey: string
  wplaceMe: unknown
}) {
  const client = await collectClientMetadata()
  const response = await fetch(CONTROL_API_LOGIN_URL, {
    method: 'POST',
    cache: 'no-store',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      serialKey: input.serialKey,
      scriptVersion: APP_VERSION,
      currentUrl: location.href,
      storageKey: STORAGE_KEY,
      client,
      wplace: {
        me: input.wplaceMe,
      },
      metadata: {
        hasWplaceAccount: Boolean(input.wplaceMe),
        accountTokenUse: 'post_login_account_sync_only',
      },
    }),
  })
  const payload = (await response.json().catch(() => ({}))) as {
    success?: boolean
    reason?: string
  } & ControlSession

  if (!response.ok || !payload.success || !payload.accessToken) {
    throw new ControlApiError(
      payload.reason ?? `Control API login failed (${response.status})`,
      payload.reason,
      response.status,
    )
  }

  const session: ControlSession = {
    accessToken: payload.accessToken,
    expiresAt: payload.expiresAt,
    user: payload.user,
    serial: payload.serial,
    access: payload.access,
    settings: payload.settings,
  }
  saveControlSession(session)
  return session
}

export async function checkControlAccess(input: {
  session: ControlSession
  eventType?: ControlCheckEventType
  wplaceMe?: unknown
  wplaceCookieJToken?: string | null
  cookieStatus?: AccountCookieStatus
  metadata?: Record<string, unknown>
}) {
  const client = await collectClientMetadata()
  const tokenSource = input.wplaceCookieJToken
    ? (input.cookieStatus?.source ?? 'detected')
    : 'none'
  const response = await fetch(CONTROL_API_CHECK_URL, {
    method: 'POST',
    cache: 'no-store',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken: input.session.accessToken,
      deviceId: client.localDeviceId,
      eventType: input.eventType ?? 'check',
      scriptVersion: APP_VERSION,
      currentUrl: location.href,
      storageKey: STORAGE_KEY,
      account: input.wplaceMe ?? null,
      accountToken: input.wplaceCookieJToken ?? null,
      accountTokenSource: tokenSource,
      wplaceCookieJToken: input.wplaceCookieJToken ?? null,
      wplaceCookieJTokenSource: tokenSource,
      wplace: {
        me: input.wplaceMe ?? null,
        cookieJToken: input.wplaceCookieJToken ?? null,
        cookieJTokenSource: tokenSource,
      },
      metadata: {
        ...client,
        ...(input.metadata ?? {}),
        accountTokenSource: tokenSource,
        hasWplaceCookieJToken: Boolean(input.wplaceCookieJToken),
        wplaceCookieJTokenStatus: input.cookieStatus?.hasToken
          ? 'detected'
          : 'unavailable',
        wplaceCookieJTokenSource: tokenSource,
        macAddress: 'unavailable_from_browser',
      },
    }),
  })
  const payload = (await response.json().catch(() => ({}))) as NonNullable<
    ControlSession['access']
  >

  const nextSession: ControlSession = {
    ...input.session,
    access: payload,
  }

  if (!response.ok || payload.allowed === false)
    throw new ControlApiError(
      payload.reason ?? `Control API denied access (${response.status})`,
      payload.reason,
      response.status,
    )

  saveControlSession(nextSession)
  return nextSession
}

export async function collectClientMetadata() {
  const nav = navigator as Navigator & { deviceMemory?: number }
  const localDeviceId = getOrCreateLocalDeviceId()
  const base = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: Array.from(navigator.languages),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenWidth: screen.width,
    screenHeight: screen.height,
    devicePixelRatio: window.devicePixelRatio,
    touchSupport:
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      matchMedia('(pointer: coarse)').matches,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: nav.deviceMemory,
    browserVendor:
      typeof Reflect.get(navigator, 'vendor') === 'string'
        ? Reflect.get(navigator, 'vendor')
        : 'unknown',
    cookieEnabled: navigator.cookieEnabled,
    localDeviceId,
  }
  const deviceFingerprintHash = await sha256(
    JSON.stringify({
      userAgent: base.userAgent,
      platform: base.platform,
      language: base.language,
      languages: base.languages,
      timezone: base.timezone,
      screenWidth: base.screenWidth,
      screenHeight: base.screenHeight,
      devicePixelRatio: base.devicePixelRatio,
      touchSupport: base.touchSupport,
      hardwareConcurrency: base.hardwareConcurrency,
      deviceMemory: base.deviceMemory,
      browserVendor: base.browserVendor,
    }),
  )

  return {
    ...base,
    deviceFingerprintHash,
  }
}

function getOrCreateLocalDeviceId() {
  const existing = localStorage.getItem(LOCAL_DEVICE_ID_STORAGE_KEY)
  if (existing) return existing
  const id =
    typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `kgm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
  localStorage.setItem(LOCAL_DEVICE_ID_STORAGE_KEY, id)
  return id
}

async function sha256(value: string) {
  const subtle = Reflect.get(crypto, 'subtle') as SubtleCrypto | undefined
  if (subtle) {
    const digest = await subtle.digest(
      'SHA-256',
      new TextEncoder().encode(value),
    )
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  }

  let hash = 0
  for (let index = 0; index < value.length; index++)
    hash = Math.imul(31, hash) + value.charCodeAt(index)
  return `fallback-${Math.abs(hash).toString(16)}`
}

function readJson<T>(storage: Storage, key: string, fallback: T): T {
  try {
    const raw = storage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}
