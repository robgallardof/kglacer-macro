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
}
