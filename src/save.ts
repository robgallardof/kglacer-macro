<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { WPlaceBot } from './bot'

export function loadSave() {
  const json = localStorage.getItem('wbot')!
  let save: ReturnType<WPlaceBot['toJSON']> | undefined
  try {
    save = JSON.parse(json)
    if (typeof save !== 'object') throw new Error('NOT VALID SAVE')
    if (save.version === 1) {
      const _save = save as any
      save.images = _save.widget.images
      save.strategy = _save.widget.strategy
      delete _save.widget
    }
  } catch {
    localStorage.removeItem('wbot')
    save = undefined
  }
  return save
}

let saveTimeout: ReturnType<typeof setTimeout> | undefined
export function save(bot: WPlaceBot, immediate = false) {
  clearTimeout(saveTimeout)
  if (immediate) localStorage.setItem('wbot', JSON.stringify(bot))
  else
    saveTimeout = setTimeout(() => {
      localStorage.setItem('wbot', JSON.stringify(bot))
    }, 1000)
=======
import type { KglacerMacro } from './bot';

const DB_NAME = 'kglacerMacroDB';
const STORE_NAME = 'botStore';

function openDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 1);
		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME);
			}
		};
		request.onsuccess = () => {
			resolve(request.result);
		};
		request.onerror = () => {
			reject(request.error);
		};
	});
}

export async function save(bot: KglacerMacro, immediate = false) {
	const db = await openDB();
	const tx = db.transaction(STORE_NAME, 'readwrite');
	const store = tx.objectStore(STORE_NAME);
	const data = JSON.stringify(bot);
	store.put(data, 'kglacer-macro');
	await tx.complete;
}

export async function loadSave() {
	const db = await openDB();
	return new Promise<ReturnType<KglacerMacro['toJSON']> | undefined>((resolve) => {
		const tx = db.transaction(STORE_NAME, 'readonly');
		const store = tx.objectStore(STORE_NAME);
		const request = store.get('kglacer-macro');
		request.onsuccess = () => {
			try {
				const save = JSON.parse(request.result);
				resolve(save);
			} catch {
				resolve(undefined);
			}
		};
		request.onerror = () => {
			resolve(undefined);
		};
	});
>>>>>>> d6e8f17a211b2cef7128ade79a63e7e33d3fc87b
}
