import { describe, expect, test } from 'bun:test'

import {
  extractScreenPositionFromStar,
  FAVORITE_LOCATIONS,
  resolveMapAnchors,
  WORLD_PIXEL_SIZE,
  WorldPosition,
} from './world-position'

import type { KGlacerMacro } from './bot'

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

describe('favorite marker matching', () => {
  const namedMarker = (name: string, transform: string) =>
    ({
      title: '',
      style: { transform },
      getAttribute: (attribute: string) =>
        attribute === 'aria-label' ? name : null,
    }) as unknown as HTMLDivElement

  test('uses known personal favorites when injected markers are absent, regardless of DOM order', () => {
    const first = namedMarker(
      'Location 1',
      'translate(-50%, -50%) translate(-25319px, -22154px)',
    )
    const second = namedMarker(
      'Location 2',
      'translate(-50%, -50%) translate(-12968px, 1372px)',
    )
    const unrelated = namedMarker('Team HQ', 'translate(1503px, -15px)')
    const favorites = [
      ...FAVORITE_LOCATIONS,
      { id: 1, name: 'Location 1', latitude: 60, longitude: -90 },
      { id: 2, name: 'Location 2', latitude: 0, longitude: 0 },
    ]
    const anchors = resolveMapAnchors([unrelated, second, first], favorites)
    expect(anchors.markers).toEqual([first, second])
    expect(anchors.positions[0]!.x).toBeCloseTo(WORLD_PIXEL_SIZE / 4)
    const bot = {
      $stars: anchors.markers,
      anchorWorldPositions: anchors.positions,
    } as KGlacerMacro
    const position = new WorldPosition(
      bot,
      anchors.positions[0]!.x,
      anchors.positions[0]!.y,
    )
    expect(position.toScreenPosition()).toEqual({ x: -25319, y: -22154 })
    expect(position.pixelSize).toBeGreaterThan(0)
  })

  test('retains support for injected favorites and their known coordinates', () => {
    const markers = [
      namedMarker('KGLACER_MACRO_FAVORITE', 'translate(0px,0px)'),
      namedMarker('KGLACER_MACRO_FAVORITE', 'translate(100px,100px)'),
    ]
    const anchors = resolveMapAnchors(markers, FAVORITE_LOCATIONS)
    expect(anchors.markers).toEqual(markers)
    expect(anchors.positions).toHaveLength(2)
  })

  test('rejects unrelated, ambiguous, and unpositioned markers', () => {
    const favorite = { id: 1, name: 'Location 1', latitude: 0, longitude: 0 }
    expect(
      resolveMapAnchors(
        [namedMarker('Other', 'translate(1px,2px)')],
        [favorite],
      ).markers,
    ).toEqual([])
    expect(
      resolveMapAnchors([namedMarker('Location 1', '')], [favorite]).markers,
    ).toEqual([])
    expect(
      resolveMapAnchors(
        [namedMarker('Location 1', 'translate(1px,2px)')],
        [favorite, { ...favorite, id: 2, longitude: 90 }],
      ).markers,
    ).toEqual([])
  })
})
