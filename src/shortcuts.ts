export type Shortcut = {
  key: string
  shift?: boolean
  ctrl?: boolean
  meta?: boolean
  alt?: boolean
}

export const SHORTCUTS = {
  toggleWidget: { key: 'b', shift: true } satisfies Shortcut,
  minimizeWidget: { key: 'm', shift: true } satisfies Shortcut,
  showWidgetPanel: { key: 's', shift: true } satisfies Shortcut,
  hideWidgetPanel: { key: 'h', shift: true } satisfies Shortcut,
  toggleOverlay: { key: 'v', shift: true } satisfies Shortcut,
  draw: { key: 'enter', shift: true } satisfies Shortcut,
  addImage: { key: 'i', shift: true } satisfies Shortcut,
  showShortcuts: { key: '/', shift: true } satisfies Shortcut,
  focusNextImage: { key: 'n', shift: true } satisfies Shortcut,
  focusPreviousImage: { key: 'p', shift: true } satisfies Shortcut,
  openColorPanel: { key: 'o', shift: true } satisfies Shortcut,
  toggleImageLock: { key: 'l', shift: true } satisfies Shortcut,
  clickPaintWhenReady: { key: 'r', shift: true } satisfies Shortcut,
  startAutoFarm: { key: 'f', shift: true } satisfies Shortcut,
  stopAutoFarm: { key: 'g', shift: true } satisfies Shortcut,
  openColorConverterTool: { key: '1', shift: true } satisfies Shortcut,
  openSamuelArchiveTool: { key: '2', shift: true } satisfies Shortcut,
  openEralyonArchiveTool: { key: '3', shift: true } satisfies Shortcut,
  openReceiveSmssTool: { key: '4', shift: true } satisfies Shortcut,
  openEsimplusTool: { key: '5', shift: true } satisfies Shortcut,
  openReceiveSmsFreeTool: { key: '6', shift: true } satisfies Shortcut,
  openQuackrTool: { key: '7', shift: true } satisfies Shortcut,
  openTextverifiedTool: { key: '8', shift: true } satisfies Shortcut,
}

export function matchesShortcut(event: KeyboardEvent, shortcut: Shortcut) {
  const shortcutKey = shortcut.key.toLowerCase()
  const eventKey = event.key.toLowerCase()
  const eventCode = ((event as { code?: string }).code ?? '').toLowerCase()
  const slashShortcutPressed =
    shortcutKey === '/' &&
    (eventKey === '/' || eventKey === '?' || eventCode === 'slash')
  const shiftedNumberShortcutPressed =
    shortcut.shift === true &&
    /^\d$/.test(shortcutKey) &&
    (eventCode === `digit${shortcutKey}` ||
      eventCode === `numpad${shortcutKey}`)
  const keyMatches =
    slashShortcutPressed ||
    shiftedNumberShortcutPressed ||
    eventKey === shortcutKey
  const ctrlMatches =
    shortcut.ctrl === true ? event.ctrlKey || event.metaKey : !event.ctrlKey
  const metaMatches =
    shortcut.ctrl === true
      ? true
      : shortcut.meta === true
        ? event.metaKey
        : !event.metaKey
  return (
    keyMatches &&
    event.shiftKey === Boolean(shortcut.shift) &&
    ctrlMatches &&
    metaMatches &&
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
