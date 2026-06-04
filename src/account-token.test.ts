import { describe, expect, test } from 'bun:test'

import {
  extractAccountTokenFromCookieList,
  extractAccountTokenFromDocumentCookie,
  isLikelyJwtToken,
} from './account-token'

const jwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyM30.signature'

describe('account token extraction', () => {
  test('reads the normal j cookie value', () => {
    expect(
      extractAccountTokenFromDocumentCookie(`_ga=abc; j=${jwtToken}`),
    ).toBe(jwtToken)
  })

  test('reads the j token from a request cookie header', () => {
    const header = [
      '_cfuvid=cloudflare-session',
      '__stripe_mid=stripe-session',
      `j=${jwtToken}`,
      'cf_clearance=cloudflare-clearance',
    ].join('; ')

    expect(extractAccountTokenFromDocumentCookie(header)).toBe(jwtToken)
  })

  test('reads a JWT stored as the cookie name', () => {
    expect(
      extractAccountTokenFromCookieList([
        { name: '_ga', value: 'GA1.2.123' },
        { name: jwtToken, value: '' },
      ]),
    ).toBe(jwtToken)
  })

  test('reads nested userscript cookie API payloads', () => {
    expect(
      extractAccountTokenFromCookieList({
        response: {
          cookies: [{ name: 'j', value: jwtToken }],
        },
      }),
    ).toBe(jwtToken)
  })

  test('does not confuse analytics-style dotted values with JWTs', () => {
    expect(isLikelyJwtToken('GA1.2.123.456')).toBe(false)
    expect(
      extractAccountTokenFromCookieList([{ name: '_ga', value: 'GA1.2.123' }]),
    ).toBeNull()
  })
})
