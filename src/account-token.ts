export type AccountCookieCandidate = {
  name?: string
  value?: string
}

const JWT_SEGMENT_PATTERN = /^[A-Za-z0-9_-]+$/

export function isLikelyJwtToken(value: unknown) {
  if (typeof value !== 'string') return false
  const token = value.trim()
  if (!token.startsWith('eyJ')) return false

  const parts = token.split('.')
  if (
    parts.length !== 3 ||
    parts.some((part) => !part || !JWT_SEGMENT_PATTERN.test(part))
  )
    return false

  const header = decodeBase64Url(parts[0]!)
  return Boolean(
    header?.startsWith('{') &&
      (header.includes('"alg"') || /"typ"\s*:\s*"JWT"/i.test(header)),
  )
}

export function extractAccountTokenFromDocumentCookie(
  cookieString: string,
  preferredName = 'j',
) {
  return extractAccountTokenFromCookieList(
    parseDocumentCookieCandidates(cookieString),
    preferredName,
  )
}

export function extractAccountTokenFromCookieList(
  value: unknown,
  preferredName = 'j',
) {
  const cookies = normalizeAccountCookieList(value)

  for (const cookie of cookies) {
    if (cookie.name !== preferredName) continue
    const valueToken = normalizeToken(cookie.value)
    if (valueToken) return valueToken
  }

  for (const cookie of cookies) {
    const valueToken = normalizeJwtToken(cookie.value)
    if (valueToken) return valueToken
  }

  for (const cookie of cookies) {
    const nameToken = normalizeJwtToken(cookie.name)
    if (nameToken) return nameToken
  }

  return null
}

export function normalizeAccountCookieList(
  value: unknown,
): AccountCookieCandidate[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeAccountCookieList(item))
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
      return normalizeAccountCookieList(record.cookies)
    if (record.cookie) return normalizeAccountCookieList(record.cookie)
    if (record.result) return normalizeAccountCookieList(record.result)
    if (record.response) return normalizeAccountCookieList(record.response)
    if (record.name || record.value) return [record]
  }

  return []
}

function parseDocumentCookieCandidates(cookieString: string) {
  return cookieString
    .split(';')
    .map((part): AccountCookieCandidate | null => {
      const trimmed = part.trim()
      if (!trimmed) return null
      const separatorIndex = trimmed.indexOf('=')
      const rawName =
        separatorIndex === -1 ? trimmed : trimmed.slice(0, separatorIndex)
      const rawValue =
        separatorIndex === -1 ? '' : trimmed.slice(separatorIndex + 1)
      return {
        name: safeDecodeURIComponent(rawName),
        value: safeDecodeURIComponent(rawValue),
      }
    })
    .filter((cookie): cookie is AccountCookieCandidate => cookie !== null)
}

function normalizeToken(value: unknown) {
  if (typeof value !== 'string') return null
  const token = value.trim()
  return token ? token : null
}

function normalizeJwtToken(value: unknown) {
  const token = normalizeToken(value)
  return token && isLikelyJwtToken(token) ? token : null
}

function decodeBase64Url(value: string) {
  try {
    const normalized = value.replaceAll('-', '+').replaceAll('_', '/')
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      '=',
    )
    return atob(padded)
  } catch {
    return null
  }
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
