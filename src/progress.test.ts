import { describe, expect, test } from 'bun:test'

import { BotImage } from './image'
import {
  computeImageProgress,
  estimatePaintTimeMs,
  formatPaintEta,
} from './progress'

const colorAmounts = new Map([
  [0, { amount: 100 }],
  [1, { amount: 10 }],
  [2, { amount: 20 }],
  [3, { amount: 30 }],
])

describe('image progress', () => {
  test('excludes transparency and disabled colors from totals', () => {
    const progress = computeImageProgress({
      colorAmounts,
      pendingByColor: new Map([
        [1, 4],
        [2, 5],
      ]),
      disabledColors: new Set([3]),
      drawTransparentPixels: false,
    })
    expect(progress).toMatchObject({
      total: 30,
      remaining: 9,
      matched: 21,
      percent: 70,
    })
    expect(progress.byColor.get(1)).toMatchObject({
      total: 10,
      matched: 6,
      percent: 60,
    })
    expect(progress.byColor.get(0)?.enabled).toBe(false)
    expect(progress.byColor.get(3)?.enabled).toBe(false)
  })

  test('includes transparent pixels when erasing is enabled', () => {
    const progress = computeImageProgress({
      colorAmounts: new Map([[0, { amount: 2 }]]),
      pendingByColor: new Map([[0, 1]]),
      disabledColors: new Set(),
      drawTransparentPixels: true,
    })
    expect(progress).toMatchObject({
      total: 2,
      remaining: 1,
      matched: 1,
      percent: 50,
    })
  })

  test('does not report unread or fully excluded images as complete', () => {
    expect(
      computeImageProgress({
        colorAmounts,
        disabledColors: new Set(),
        drawTransparentPixels: false,
      }),
    ).toMatchObject({ total: 60, remaining: 60, matched: 0, percent: 0 })
    expect(
      computeImageProgress({
        colorAmounts,
        disabledColors: new Set([1, 2, 3]),
        drawTransparentPixels: false,
      }),
    ).toMatchObject({ total: 0, remaining: 0, matched: 0, percent: 0 })
  })

  test('the image retains map progress while tasks are prepared and skips unavailable colors', () => {
    const image = {
      pixels: { colors: colorAmounts },
      colors: [
        { realColor: 1 },
        { realColor: 2 },
        { realColor: 3, disabled: true },
      ],
      skipUnavailableColors: true,
      drawTransparentPixels: false,
      bot: { unavailableColors: new Set([2]) },
      pendingByColor: new Map([[1, 4]]),
      tasks: [{ color: 1 }, { color: 1 }],
    }
    const read = () =>
      BotImage.prototype.getProgress.call(image as unknown as BotImage)
    expect(read()).toMatchObject({ total: 10, remaining: 4, matched: 6 })
    image.tasks.length = 0
    expect(read()).toMatchObject({ total: 10, remaining: 4, matched: 6 })
    image.pendingByColor.set(1, 0)
    expect(read()).toMatchObject({ total: 10, remaining: 0, matched: 10 })
  })
})

describe('paint ETA', () => {
  test('uses stored whole charges and the actual regeneration rate', () => {
    expect(estimatePaintTimeMs(10, { count: 4.9, cooldownMs: 5_000 })).toBe(
      30_000,
    )
    expect(estimatePaintTimeMs(10, { count: 4, cooldownMs: 30_000 })).toBe(
      180_000,
    )
    expect(estimatePaintTimeMs(2, { count: 4, cooldownMs: 5_000 })).toBe(0)
  })
  test('falls back safely when account data is absent or invalid', () => {
    expect(estimatePaintTimeMs(2)).toBe(60_000)
    expect(estimatePaintTimeMs(2, { count: NaN, cooldownMs: 0 })).toBe(60_000)
  })
  test('shows minutes and rounds nonzero waits up', () => {
    expect(formatPaintEta(0)).toBe('0m')
    expect(formatPaintEta(5_000)).toBe('1m')
    expect(formatPaintEta(65 * 60_000)).toBe('1h 5m')
  })
})
