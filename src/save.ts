/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { WPlaceBot } from './bot'
import { LEGACY_STORAGE_KEYS, STORAGE_KEY } from './version'

function readStoredJSON() {
  const keys = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS]
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]!
    const json = localStorage.getItem(key)
    if (!json) continue
    return { json, key }
  }
  return undefined
}

export function loadSave() {
  const item = readStoredJSON()
  if (!item) return undefined

  let save: ReturnType<WPlaceBot['toJSON']> | undefined
  try {
    save = JSON.parse(item.json)
    if (typeof save !== 'object') throw new Error('NOT VALID SAVE')
    if (save.version === 1) {
      const _save = save as any
      save.images = _save.widget.images
      save.strategy = _save.widget.strategy
      delete _save.widget
    }
    if (item.key !== STORAGE_KEY) localStorage.setItem(STORAGE_KEY, item.json)
  } catch {
    localStorage.removeItem(item.key)
    save = undefined
  }
  return save
}

let saveTimeout: ReturnType<typeof setTimeout> | undefined
export function save(bot: WPlaceBot, immediate = false) {
  clearTimeout(saveTimeout)
  if (immediate) localStorage.setItem(STORAGE_KEY, JSON.stringify(bot))
  else
    saveTimeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bot))
    }, 600)
}
