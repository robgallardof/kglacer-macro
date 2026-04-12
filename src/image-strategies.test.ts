import { describe, expect, test } from 'bun:test'

import { BotImage, ImageStrategy } from './image'

type Position = { x: number; y: number }

describe('Image strategies', () => {
  const width = 9
  const height = 7
  const total = width * height
  const pixels: number[][] = Array.from({ length: height }, () =>
    Array<number>(width).fill(1),
  )

  const runStrategy = (strategy: ImageStrategy) => {
    const context = {
      strategy,
      pixels: {
        pixels,
      },
    } as unknown as BotImage

    const iterator = (
      BotImage.prototype as unknown as {
        strategyPositionIterator: () => Generator<Position>
      }
    ).strategyPositionIterator.call(context)
    const positions: Position[] = []
    for (const point of iterator) positions.push(point)
    return positions
  }

  test.each(Object.values(ImageStrategy))(
    'covers every pixel exactly once for %s',
    (strategy) => {
      const positions = runStrategy(strategy)
      expect(positions.length).toBe(total)

      const unique = new Set(positions.map((point) => `${point.x},${point.y}`))
      expect(unique.size).toBe(total)

      for (let index = 0; index < positions.length; index++) {
        const point = positions[index]!
        expect(point.x).toBeGreaterThanOrEqual(0)
        expect(point.x).toBeLessThan(width)
        expect(point.y).toBeGreaterThanOrEqual(0)
        expect(point.y).toBeLessThan(height)
      }
    },
  )
})
