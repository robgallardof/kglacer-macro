import { describe, expect, test } from 'bun:test'

import { extractScreenPositionFromStar } from './world-position'

const marker = (transform: string) =>
  ({ style: { transform } }) as HTMLDivElement

describe('map anchor position', () => {
  test('reads the exact transforms in the supplied Wplace HTML', () => {
    expect(
      extractScreenPositionFromStar(
        marker(
          'translate(-50%, -50%) translate(114600px, -115069px) rotateX(0deg) rotateZ(0deg)',
        ),
      ),
    ).toEqual({ x: 114600, y: -115069 })
    expect(
      extractScreenPositionFromStar(
        marker(
          'translate(-50%, -50%) translate(460318px, 230649px) rotateX(0deg) rotateZ(0deg)',
        ),
      ),
    ).toEqual({ x: 460318, y: 230649 })
  })
  test('reads MapLibre button translation without relying on fixed offsets', () => {
    expect(
      extractScreenPositionFromStar(
        marker('translate(-50%, -50%) translate(123.5px, -42.25px)'),
      ),
    ).toEqual({ x: 123.5, y: -42.25 })
    expect(
      extractScreenPositionFromStar(
        marker('translate3d(123.5px,-42.25px,0px) translate(0px,0px)'),
      ),
    ).toEqual({ x: 123.5, y: -42.25 })
  })
  test('reports missing or unpositioned anchors clearly', () => {
    expect(() =>
      extractScreenPositionFromStar(undefined as unknown as HTMLDivElement),
    ).toThrow('Map anchor unavailable')
    expect(() => extractScreenPositionFromStar(marker(''))).toThrow(
      'Map anchor unavailable',
    )
  })
})
