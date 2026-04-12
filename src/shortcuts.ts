export type Shortcut = {
  key: string
  shift?: boolean
  ctrl?: boolean
  alt?: boolean
}

export const SHORTCUTS = {
  toggleWidget: { key: 'b', shift: true } satisfies Shortcut,
  minimizeWidget: { key: 'm', shift: true } satisfies Shortcut,
  showWidgetPanel: { key: 's', shift: true } satisfies Shortcut,
  hideWidgetPanel: { key: 'h', shift: true } satisfies Shortcut,
  draw: { key: 'enter', shift: true } satisfies Shortcut,
  addImage: { key: 'i', shift: true } satisfies Shortcut,
}

export function matchesShortcut(event: KeyboardEvent, shortcut: Shortcut) {
  return (
    event.key.toLowerCase() === shortcut.key &&
    event.shiftKey === Boolean(shortcut.shift) &&
    event.ctrlKey === Boolean(shortcut.ctrl) &&
    event.altKey === Boolean(shortcut.alt)
  )
}

export function isEditableTarget(target: EventTarget | null) {
  if (typeof HTMLElement === 'undefined') return false
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName.toLowerCase()
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    target.isContentEditable ||
    target.closest('[contenteditable="true"]') !== null
  )
}
