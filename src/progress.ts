export type PixelProgress = {
  total: number
  remaining: number
  matched: number
  percent: number
}

export type ColorProgress = PixelProgress & { enabled: boolean }

export type ImageProgress = PixelProgress & {
  byColor: Map<number, ColorProgress>
}

/** Only pixels selected for painting contribute to the overall progress. */
export function computeImageProgress(input: {
  colorAmounts: Iterable<[number, { amount: number }]>
  pendingByColor?: ReadonlyMap<number, number>
  disabledColors: ReadonlySet<number>
  drawTransparentPixels: boolean
}): ImageProgress {
  const byColor = new Map<number, ColorProgress>()
  let total = 0
  let remaining = 0
  for (const [color, stat] of input.colorAmounts) {
    const enabled =
      !input.disabledColors.has(color) &&
      (color !== 0 || input.drawTransparentPixels)
    const pending = input.pendingByColor
      ? (input.pendingByColor.get(color) ?? 0)
      : stat.amount
    const colorRemaining = Math.max(0, Math.min(stat.amount, pending))
    const matched = stat.amount - colorRemaining
    byColor.set(color, {
      enabled,
      total: stat.amount,
      remaining: colorRemaining,
      matched,
      percent: stat.amount > 0 ? Math.floor((matched / stat.amount) * 100) : 0,
    })
    if (enabled) {
      total += stat.amount
      remaining += colorRemaining
    }
  }
  const matched = total - remaining
  return {
    total,
    remaining,
    matched,
    percent: total > 0 ? Math.floor((matched / total) * 100) : 0,
    byColor,
  }
}

/** Waiting time after using the charges reported by the account API. */
export function estimatePaintTimeMs(
  remaining: number,
  charges?: { count: number; cooldownMs: number },
) {
  const count = Number.isFinite(charges?.count)
    ? Math.max(0, Math.floor(charges!.count))
    : 0
  const cooldownMs =
    Number.isFinite(charges?.cooldownMs) && charges!.cooldownMs > 0
      ? charges!.cooldownMs
      : 30_000
  return Math.max(0, remaining - count) * cooldownMs
}

export function formatPaintEta(ms: number) {
  const minutes = Math.ceil(ms / 60_000)
  const hours = Math.floor(minutes / 60)
  return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`
}
