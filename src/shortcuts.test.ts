import { describe, expect, test } from 'bun:test'

import { SHORTCUTS, matchesShortcut } from './shortcuts'

describe('matchesShortcut', () => {
  test('matches shift+b toggle shortcut', () => {
    const keyboardEvent = {
      key: 'B',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.toggleWidget)).toBe(true)
  })

  test('fails when modifiers do not match', () => {
    const keyboardEvent = {
      key: 'Enter',
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.draw)).toBe(false)
  })

  test('matches shift+enter draw shortcut', () => {
    const keyboardEvent = {
      key: 'Enter',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.draw)).toBe(true)
  })

  test('matches shift+m minimize shortcut', () => {
    const keyboardEvent = {
      key: 'M',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.minimizeWidget)).toBe(true)
  })

  test('matches shift+/ show shortcuts shortcut', () => {
    const keyboardEvent = {
      key: '/',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.showShortcuts)).toBe(true)
  })

  test('matches shift+? show shortcuts on mac layout', () => {
    const keyboardEvent = {
      key: '?',
      code: 'Slash',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.showShortcuts)).toBe(true)
  })

  test('matches shift+n next image shortcut', () => {
    const keyboardEvent = {
      key: 'N',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.focusNextImage)).toBe(true)
  })

  test('matches shift+o open color panel shortcut', () => {
    const keyboardEvent = {
      key: 'O',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.openColorPanel)).toBe(true)
  })

  test('matches shift+l toggle lock shortcut', () => {
    const keyboardEvent = {
      key: 'L',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.toggleImageLock)).toBe(true)
  })

  test('matches shift+v toggle overlay shortcut', () => {
    const keyboardEvent = {
      key: 'V',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.toggleOverlay)).toBe(true)
  })

  test('matches shift+r click paint when ready shortcut', () => {
    const keyboardEvent = {
      key: 'R',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.clickPaintWhenReady)).toBe(
      true,
    )
  })

  test('matches shift+f start auto farm shortcut', () => {
    const keyboardEvent = {
      key: 'F',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.startAutoFarm)).toBe(true)
  })

  test('matches shift+g stop auto farm shortcut', () => {
    const keyboardEvent = {
      key: 'G',
      shiftKey: true,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.stopAutoFarm)).toBe(true)
  })
})
