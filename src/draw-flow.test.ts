import { describe, expect, test } from 'bun:test'

import { computePendingPixels } from './image'

describe('draw flow pending pixels', () => {
  test('does not repaint pixels already matching map color', () => {
    const pending = computePendingPixels({
      pixels: [
        [1, 2],
        [3, 4],
      ],
      drawTransparentPixels: false,
      disabledColors: new Set<number>(),
      iterate: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      readMapColor: (x, y) =>
        [
          [1, 8],
          [3, 9],
        ][y]![x]!,
    })

    expect(pending).toEqual([
      { x: 1, y: 0, color: 2 },
      { x: 1, y: 1, color: 4 },
    ])
  })

  test('skips disabled colors and transparent when transparent draw is off', () => {
    const pending = computePendingPixels({
      pixels: [[0, 5, 6]],
      drawTransparentPixels: false,
      disabledColors: new Set<number>([6]),
      iterate: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      readMapColor: () => 9,
    })

    expect(pending).toEqual([{ x: 1, y: 0, color: 5 }])
  })
})
