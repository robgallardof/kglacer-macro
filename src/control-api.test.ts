import { beforeEach, describe, expect, test } from 'bun:test'

import {
  checkControlAccess,
  clearControlSession,
  ControlSession,
  readControlSession,
  saveControlSession,
} from './control-api'

class MemoryStorage implements Storage {
  protected data = new Map<string, string>()

  public get length() {
    return this.data.size
  }

  public clear() {
    this.data.clear()
  }

  public getItem(key: string) {
    return this.data.get(key) ?? null
  }

  public key(index: number) {
    return Array.from(this.data.keys())[index] ?? null
  }

  public removeItem(key: string) {
    this.data.delete(key)
  }

  public setItem(key: string, value: string) {
    this.data.set(key, value)
  }
}

const validSession: ControlSession = {
  accessToken: 'serial-session-token',
  user: {
    id: 'user-1',
    isActive: true,
  },
  serial: {
    valid: true,
    licenseId: 'license-1',
  },
  access: {
    allowed: true,
    reason: 'ok',
  },
}

function defineGlobal(name: string, value: unknown) {
  Object.defineProperty(globalThis, name, {
    configurable: true,
    value,
  })
}

describe('control api session cache', () => {
  beforeEach(() => {
    defineGlobal('localStorage', new MemoryStorage())
    defineGlobal('sessionStorage', new MemoryStorage())
    defineGlobal('navigator', {
      userAgent: 'bun-test',
      platform: 'test',
      language: 'es',
      languages: ['es'],
      hardwareConcurrency: 8,
      maxTouchPoints: 0,
      vendor: 'test',
      cookieEnabled: true,
    })
    defineGlobal('screen', {
      width: 1280,
      height: 720,
    })
    defineGlobal('window', {
      devicePixelRatio: 1,
    })
    defineGlobal('location', {
      href: 'https://wplace.live/',
      host: 'wplace.live',
    })
    defineGlobal('matchMedia', () => ({ matches: false }))
    clearControlSession()
  })

  test('does not poison a valid serial session when a check is denied', async () => {
    saveControlSession(validSession)
    defineGlobal('fetch', (() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            allowed: false,
            reason: 'missing_token',
            message: 'WPlace account token is unavailable',
          }),
          {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      )) as unknown as typeof fetch)

    let caughtError: unknown
    try {
      await checkControlAccess({
        session: validSession,
        eventType: 'check',
        wplaceCookieJToken: null,
      })
    } catch (error) {
      caughtError = error
    }

    expect(caughtError).toBeInstanceOf(Error)
    expect((caughtError as Error).message).toContain('missing_token')
    expect(readControlSession()?.access?.allowed).toBe(true)
  })

  test('saves a refreshed access payload only after an allowed check', async () => {
    saveControlSession(validSession)
    defineGlobal('fetch', (() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            allowed: true,
            reason: 'ok',
            mode: 'licensed',
            registeredDevices: 1,
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      )) as unknown as typeof fetch)

    await checkControlAccess({
      session: validSession,
      eventType: 'check',
      wplaceCookieJToken: null,
    })

    expect(readControlSession()?.access?.mode).toBe('licensed')
  })
})
