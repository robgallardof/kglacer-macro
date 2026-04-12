import { describe, expect, test } from 'bun:test'

import { SHORTCUTS, matchesShortcut } from './shortcuts'

describe('matchesShortcut', () => {
  test('matches shift+b toggle shortcut', () => {
    const keyboardEvent = {
      key: 'B',
      shiftKey: true,
      ctrlKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.toggleWidget)).toBe(true)
  })

  test('fails when modifiers do not match', () => {
    const keyboardEvent = {
      key: 'Enter',
      shiftKey: false,
      ctrlKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.draw)).toBe(false)
  })

  test('matches shift+enter draw shortcut', () => {
    const keyboardEvent = {
      key: 'Enter',
      shiftKey: true,
      ctrlKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.draw)).toBe(true)
  })

  test('matches shift+m minimize shortcut', () => {
    const keyboardEvent = {
      key: 'M',
      shiftKey: true,
      ctrlKey: false,
      altKey: false,
    } as KeyboardEvent
    expect(matchesShortcut(keyboardEvent, SHORTCUTS.minimizeWidget)).toBe(true)
  })
})
