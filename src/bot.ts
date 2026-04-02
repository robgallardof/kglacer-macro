import { wait } from '@softsky/utils';

import { BotImage, DrawTask } from './image';
import { Pixels } from './pixels';
import { loadSave } from './save';
// @ts-ignore
import css from './style.css' with { type: 'text' };
import { BotStrategy, Widget } from './widget';
import {
	addFavoriteLocation,
	extractScreenPositionFromStar,
	FAVORITE_LOCATIONS,
	FAVORITE_LOCATIONS_POSITIONS,
	Position,
	WorldPosition,
} from './world-position';

export type Me = {
	allianceId: number;
	allianceRole: string;
	banned: false;
	charges: { cooldownMs: number; count: number; max: number };
	country: string;
	discord: string;
	discordId: string;
	droplets: number;
	equippedFlag: number;
	experiments: unknown;
	extraColorsBitmap: number;
	favoriteLocations: {
		id: number;
		name: string;
		latitude: number;
		longitude: number;
	}[];
	flagsBitmap: string;
	id: number;
	isCustomer: boolean;
	level: number;
	maxFavoriteLocations: number;
	name: string;
	needsPhoneVerification: boolean;
	picture: string;
	pixelsPainted: number;
	showLastPixel: boolean;
	suspensionReason: string;
	timeoutUntil: string;
};

const SAVE_VERSION = 2;
const DRAW_STEP_WAIT_MS = 8;
const DRAW_FAIL_RETRY_LIMIT = 3;

/**
 * Main class. Initializes everything.
 * Used to interact with wplace
 * */
export class KglacerMacro {
	/** Colors that can be bought */
	public unavailableColors = new Set<number>();

	/** Cache of parsed images of world map */
	public mapsCache = new Map<string, Pixels>();

	/** Data about account */
	public me?: Me;

	/** Cached stars elements */
	public $stars: HTMLDivElement[] = [];

	/** Strategy how to distribute draw calls between images */
	public strategy = BotStrategy.SEQUENTIAL;

	/** Images on canvas */
	public images: BotImage[] = [];

	public widget = new Widget(this);

	/** Used to wait for pixel data on marker set */
	protected markerPixelPositionResolvers: ((position: WorldPosition) => unknown)[] = [];

	/** Last color drawn */
	protected lastColor?: number;
	protected imageUpdateFrame?: number;

	public constructor() {
		// NEEDS TO RUN FIRST TO MAKE SURE THE /me IS INTERCEPTED
		this.registerFetchInterceptor();
		void this.bootstrap();
	}

	private async bootstrap() {
		const save = await loadSave();

		if (save) {
			for (let index = 0; index < save.images.length; index++) {
				const image = save.images[index]!;
				addFavoriteLocation({
					x: image.position[0] - 1000,
					y: image.position[1] - 1000,
				});
				addFavoriteLocation({
					x: image.position[0] + 1000,
					y: image.position[1] + 1000,
				});
			}
			this.strategy = save.strategy;
		}

		const style = document.createElement('style');
		style.textContent = (css as string).replace('FAKE_FAVORITE_LOCATIONS', FAVORITE_LOCATIONS.length.toString());
		document.head.append(style);

		void this.widget.run('Initializing', async () => {
			await this.waitForElement('login', '.avatar.center-absolute.absolute');
			await this.waitForElement('pixel count', '.btn.btn-primary.btn-lg.relative.z-30 canvas');
			await this.waitForElement(
				'favorite stars',
				'.text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center'
			);

			const $canvasContainer = await this.waitForElement('canvas', '.maplibregl-canvas-container');

			new MutationObserver((mutations: MutationRecord[]) => {
				for (let index = 0; index < mutations.length; index++)
					if (mutations[index]!.removedNodes.length !== 0) {
						this.updateStars();
						break;
					}
				this.updateImages();
			}).observe($canvasContainer, {
				attributes: true,
				childList: true,
				subtree: true,
			});

			this.updateStars();

			await wait(500);
			await this.updateColors();

			if (save)
				for (let index = 0; index < save.images.length; index++) {
					const image = await BotImage.fromJSON(this, save.images[index]!);
					this.images.push(image);
					image.update();
				}

			await this.readMap();
			this.updateTasks();

			this.widget.setDisabled('draw', false);
			this.widget.setDisabled('add-image', false);
		});
	}
	/** Start drawing */
	public draw() {
		this.widget.setDisabled('draw', true);
		this.widget.status = '';
		const $canvas = document.querySelector<HTMLDivElement>('.maplibregl-canvas')!;
		const prevent = (event: MouseEvent | WheelEvent) => {
			if (!event.shiftKey) event.stopPropagation();
		};
		return this.widget.run(
			'Drawing',
			async () => {
				await this.widget.run('Initializing draw', () => Promise.all([this.updateColors(), this.readMap()]));
				this.updateTasks();
				this.widget.update();

				const canvas = document.querySelector<HTMLCanvasElement>('.maplibregl-canvas');
				if (!canvas) {
					this.widget.status = '❌ Canvas not found';
					return;
				}
				const firstTask = this.images.find((image) => image.tasks.length > 0)?.tasks[0];
				if (!firstTask) {
					this.widget.status = '✅ No pending pixels';
					return;
				}
				const firstDrawTask = firstTask;

				function waitForZoom(minPixelSize: number) {
					return new Promise<void>((resolve) => {
						function step() {
							if (firstDrawTask.position.pixelSize >= minPixelSize) {
								resolve();
								return;
							}
							canvas.dispatchEvent(
								new WheelEvent('wheel', {
									deltaY: -500,
									clientX: canvas.clientWidth / 2,
									clientY: canvas.clientHeight / 2,
									bubbles: true,
								})
							);
							requestAnimationFrame(step);
						}
						step();
					});
				}

				await waitForZoom(4);
				canvas.dispatchEvent(
					new MouseEvent('mousedown', {
						clientX: canvas.clientWidth / 2,
						clientY: canvas.clientHeight / 2,
						bubbles: true,
						buttons: 1,
					})
				);
				canvas.dispatchEvent(
					new MouseEvent('mouseup', {
						clientX: canvas.clientWidth / 2,
						clientY: canvas.clientHeight / 2,
						bubbles: true,
					})
				);
				await wait(5);

				// Stop mouse messing with drawing by capturing event
				globalThis.addEventListener('mousemove', prevent, true);
				$canvas.addEventListener('wheel', prevent, true);

				const res = await fetch('https://backend.wplace.live/me', {
					credentials: 'include',
				});
				const data = await res.json();

				let charges = Math.floor(data.charges.count);

				let n = 0;
				for (let index = 0; index < this.images.length; index++) n += this.images[index]!.tasks.length;
				switch (this.strategy) {
					case BotStrategy.ALL: {
						while (charges > 0) {
							let end = true;
							for (let imageIndex = 0; imageIndex < this.images.length; imageIndex++) {
								const image = this.images[imageIndex]!;
								const task = image.tasks[0];
								if (!task) continue;
								const drawn = await this.drawTask(task);
								if (!drawn) continue;
								image.tasks.shift();
								charges -= 1;
								await wait(DRAW_STEP_WAIT_MS);
								end = false;
							}
							if (end) break;
						}
						break;
					}
					case BotStrategy.PERCENTAGE: {
						for (let taskIndex = 0; taskIndex < n && charges > 0; taskIndex++) {
							let minPercent = 1;
							let minImage!: BotImage;
							for (let imageIndex = 0; imageIndex < this.images.length; imageIndex++) {
								const image = this.images[imageIndex]!;
								const percent =
									1 -
									image.tasks.length / (image.pixels.pixels.length * image.pixels.pixels[0]!.length);
								if (percent < minPercent) {
									minPercent = percent;
									minImage = image;
								}
							}
							const task = minImage.tasks[0];
							if (!task) continue;
							const drawn = await this.drawTask(task);
							if (!drawn) continue;
							minImage.tasks.shift();
							charges -= 1;
							await wait(DRAW_STEP_WAIT_MS);
						}
						break;
					}
					case BotStrategy.SEQUENTIAL: {
						for (let imageIndex = 0; imageIndex < this.images.length; imageIndex++) {
							const image = this.images[imageIndex]!;
							let failCount = 0;
							for (let task = image.tasks[0]; task && charges > 0; task = image.tasks[0]) {
								const drawn = await this.drawTask(task);
								if (!drawn) {
									failCount += 1;
									if (failCount >= DRAW_FAIL_RETRY_LIMIT) break;
									await wait(DRAW_STEP_WAIT_MS * 2);
									continue;
								}
								failCount = 0;
								image.tasks.shift();
								charges -= 1;
								await wait(DRAW_STEP_WAIT_MS);
							}
						}
					}
				}
				this.widget.update();
			},
			() => {
				globalThis.removeEventListener('mousemove', prevent, true);
				$canvas.removeEventListener('wheel', prevent, true);
				this.widget.setDisabled('draw', false);
			}
		);
	}

	/** Serialize bot */
	public toJSON() {
		return {
			version: SAVE_VERSION,
			images: this.images.map((x) => x.toJSON()),
			strategy: this.strategy,
		};
	}

	/** Read colors */
	public async updateColors() {
		await this.openColors();
		this.unavailableColors.clear();
		for (const $button of document.querySelectorAll<HTMLButtonElement>('button.btn.relative.w-full'))
			if ($button.children.length !== 0)
				this.unavailableColors.add(Math.abs(Number.parseInt($button.id.slice(6))));
		this.updateImageColors();
	}

	/** Move map */
	public moveMap(delta: Position) {
		const canvas = document.querySelector('.maplibregl-canvas')!;
		const startX = window.innerWidth / 2;
		const startY = window.innerHeight / 2;
		const endX = startX - delta.x;
		const endY = startY - delta.y;
		function fire(type: string, x: number, y: number) {
			canvas.dispatchEvent(
				new MouseEvent(type, {
					bubbles: true,
					cancelable: true,
					clientX: x,
					clientY: y,
					buttons: 1,
				})
			);
		}
		fire('mousedown', startX, startY);
		fire('mousemove', endX, endY);
		fire('mouseup', endX, endY);
	}

	/** Read and cache the map */
	public async readMap() {
		await this.loadCacheFromDB();

		const imagesToDownload = new Set<string>();
		for (const image of this.images) {
			const { tileX: tileXEnd, tileY: tileYEnd } = new WorldPosition(
				this,
				image.position.globalX + image.pixels.pixels[0]!.length,
				image.position.globalY + image.pixels.pixels.length
			);
			for (let tileX = image.position.tileX; tileX <= tileXEnd; tileX++)
				for (let tileY = image.position.tileY; tileY <= tileYEnd; tileY++)
					imagesToDownload.add(`${tileX}/${tileY}`);
		}

		let done = 0;

		return this.widget.run(`Reading map [0/${imagesToDownload.size}]`, async () => {
			await Promise.all(
				[...imagesToDownload].map(async (x) => {
					const url = `https://backend.wplace.live/files/s0/tiles/${x}.png`;
					const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
					const lastModified = response.headers.get('last-modified') || '';
					const cached = this.mapsCache.get(x);

					if (cached?.lastModified !== lastModified) {
						const newPixels = await Pixels.fromJSON(this, { url, exactColor: true }, { skipCache: true });
						const tileData = { pixels: newPixels.pixels, lastModified };
						this.mapsCache.set(x, tileData);
						await this.saveTileToDB(x, tileData);
					}

					this.widget.status = `⌛ Reading map [${++done}/${imagesToDownload.size}]`;
				})
			);
		});
	}

	async initDB() {
		return new Promise<IDBDatabase>((resolve, reject) => {
			const request = indexedDB.open('mapsDB', 1);
			request.onupgradeneeded = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains('tiles')) {
					db.createObjectStore('tiles');
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

	async setTile(db: IDBDatabase, key: string, value: any) {
		return new Promise<void>((resolve, reject) => {
			const tx = db.transaction('tiles', 'readwrite');
			const store = tx.objectStore('tiles');
			const req = store.put(value, key);
			req.onsuccess = () => {
				resolve();
			};
			req.onerror = () => {
				reject(req.error);
			};
		});
	}

	async getTile(db: IDBDatabase, key: string) {
		return new Promise<any>((resolve, reject) => {
			const tx = db.transaction('tiles', 'readonly');
			const store = tx.objectStore('tiles');
			const req = store.get(key);
			req.onsuccess = () => {
				resolve(req.result);
			};
			req.onerror = () => {
				reject(req.error);
			};
		});
	}

	async loadCacheFromDB() {
		const db = await this.initDB();
		this.mapsCache = new Map();
		const keys = await new Promise<string[]>((resolve, reject) => {
			const tx = db.transaction('tiles', 'readonly');
			const store = tx.objectStore('tiles');
			const req = store.getAllKeys();
			req.onsuccess = () => {
				resolve(req.result as string[]);
			};
			req.onerror = () => {
				reject(req.error);
			};
		});

		for (const key of keys) {
			const tile = await this.getTile(db, key);
			this.mapsCache.set(key, tile);
		}
	}

	async saveTileToDB(key: string, value: any) {
		const db = await this.initDB();
		await this.setTile(db, key, value);
	}

	/** Wait until window is unfocused */
	public waitForUnfocus() {
		return this.widget.run(
			'UNFOCUS WINDOW',
			() =>
				new Promise<void>((resolve) => {
					if (!document.hasFocus()) resolve();
					window.addEventListener(
						'blur',
						() => {
							setTimeout(resolve, 1);
						},
						{
							once: true,
						}
					);
				}),
			undefined,
			'🖱️'
		);
	}

	/** Find anchor data for screen postition */
	public findAnchorsForScreen(position: Position) {
		const anchors = this.$stars.map(($star, index) => ({
			index,
			screen: extractScreenPositionFromStar($star),
			world: FAVORITE_LOCATIONS_POSITIONS[index]!,
		}));
		const byDistance = [...anchors].sort((a, b) => {
			const adx = a.screen.x - position.x;
			const ady = a.screen.y - position.y;
			const bdx = b.screen.x - position.x;
			const bdy = b.screen.y - position.y;
			return adx * adx + ady * ady - (bdx * bdx + bdy * bdy);
		});
		const primary = byDistance[0]!;
		const secondary =
			byDistance.find(
				(candidate) => candidate.world.x !== primary.world.x && candidate.world.y !== primary.world.y
			) ??
			byDistance[1] ??
			primary;
		const deltaScreenX = secondary.screen.x - primary.screen.x;
		const deltaScreenY = secondary.screen.y - primary.screen.y;
		const deltaWorldX = secondary.world.x - primary.world.x;
		const deltaWorldY = secondary.world.y - primary.world.y;
		const sizeX = deltaWorldX === 0 ? 0 : deltaScreenX / deltaWorldX;
		const sizeY = deltaWorldY === 0 ? 0 : deltaScreenY / deltaWorldY;
		const pixelSize = Math.abs(sizeX) > 0 ? Math.abs(sizeX) : Math.abs(sizeY);
		return {
			anchorScreenPosition: primary.screen,
			anchorWorldPosition: primary.world,
			pixelSize: Number.isFinite(pixelSize) && pixelSize > 0 ? pixelSize : 1,
		};
	}

	/** Opens colors and makes them visible for selection */
	protected async openColors() {
		this.lastColor = undefined;
		// Click close marker
		document.querySelector<HTMLButtonElement>('.flex.gap-2.px-3 > .btn-circle')?.click();
		await wait(1);
		// Click "Paint"
		document.querySelector<HTMLButtonElement>('.btn.btn-primary.btn-lg.relative.z-30')?.click();
		await wait(1);
		// Click Unfold colors if folded
		const unfoldColors = document.querySelector<HTMLButtonElement>('button.bottom-0');
		if (
			unfoldColors?.innerHTML ===
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-5"><path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"></path></svg><!---->'
		) {
			unfoldColors.click();
			await wait(1);
		}
	}

	/** Draw one task */
	protected async drawTask(task: DrawTask): Promise<boolean> {
		const colorButton = document.getElementById('color-' + task.color) as HTMLButtonElement | null;
		if (!colorButton) return false;
		if (this.lastColor !== task.color) {
			colorButton.click();
			this.lastColor = task.color;
		}
		const halfPixel = task.position.pixelSize / 2;
		const position = task.position.toScreenPosition();
		if (!Number.isFinite(position.x) || !Number.isFinite(position.y)) return false;
		document.documentElement.dispatchEvent(
			new MouseEvent('mousemove', {
				bubbles: true,
				clientX: position.x + halfPixel,
				clientY: position.y + halfPixel,
				shiftKey: true,
			})
		);
		document.documentElement.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: ' ',
				code: 'Space',
				keyCode: 32,
				which: 32,
				bubbles: true,
				cancelable: true,
			})
		);
		await wait(1);
		document.documentElement.dispatchEvent(
			new KeyboardEvent('keyup', {
				key: ' ',
				code: 'Space',
				keyCode: 32,
				which: 32,
				bubbles: true,
				cancelable: true,
			})
		);
		return true;
	}

	/** Start listening to fetch requests */
	protected registerFetchInterceptor() {
		const originalFetch = globalThis.fetch;
		const pixelRegExp = /https:\/\/backend.wplace.live\/s\d+\/pixel\/(-?\d+)\/(-?\d+)\?x=(-?\d+)&y=(-?\d+)/;
		// @ts-ignore
		globalThis.fetch = async (request, options) => {
			const response = await originalFetch(request, options);
			const cloned = response.clone();
			let url = '';
			if (typeof request == 'string') url = request;
			else if (request instanceof Request) url = request.url;
			else if (request instanceof URL) url = request.href;
			if (response.url === 'https://backend.wplace.live/me') {
				this.me = (await cloned.json()) as Me;
				this.me.favoriteLocations.unshift(...FAVORITE_LOCATIONS);
				this.me.maxFavoriteLocations = Infinity;
				response.json = () => Promise.resolve(this.me);
			}
			const pixelMatch = pixelRegExp.exec(url);
			if (pixelMatch) {
				for (let index = 0; index < this.markerPixelPositionResolvers.length; index++)
					this.markerPixelPositionResolvers[index]!(
						new WorldPosition(this, +pixelMatch[1]!, +pixelMatch[2]!, +pixelMatch[3]!, +pixelMatch[4]!)
					);
				this.markerPixelPositionResolvers.length = 0;
			}
			return response;
		};
	}

	/** Closes all popups */
	public async closeAll() {
		for (const button of document.querySelectorAll('button')) {
			if (
				button.innerHTML === '✕' ||
				button.innerHTML ===
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" class="size-4"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg><!---->`
			) {
				button.click();
				await wait(1);
			}
		}
	}

	/** Wait for element to show up in document */
	protected waitForElement<T extends Element>(name: string, selector: string): Promise<T> {
		return this.widget.run(`Waiting for ${name}`, () => {
			return new Promise<T>((resolve) => {
				// If element already exists, resolve immediately
				const existing = document.querySelector<T>(selector);
				if (existing) {
					resolve(existing);
					return;
				}
				// Watch for new elements
				const observer = new MutationObserver(() => {
					const element = document.querySelector<T>(selector);
					if (element) {
						observer.disconnect();
						resolve(element);
					}
				});
				observer.observe(document.documentElement, {
					childList: true,
					subtree: true,
				});
			});
		});
	}

	/** Simply update $stars property */
	protected updateStars() {
		this.$stars = [
			...document.querySelectorAll<HTMLDivElement>(
				'.text-yellow-400.cursor-pointer.z-10.maplibregl-marker.maplibregl-marker-anchor-center'
			),
		].slice(0, FAVORITE_LOCATIONS.length);
	}

	/** Update images position and contents */
	protected updateImages() {
		if (this.imageUpdateFrame) return;
		this.imageUpdateFrame = requestAnimationFrame(() => {
			this.imageUpdateFrame = undefined;
			for (let index = 0; index < this.images.length; index++) this.images[index]!.update();
		});
	}

	/** Update tasks of all images */
	protected updateTasks() {
		for (let index = 0; index < this.images.length; index++) this.images[index]!.updateTasks();
	}

	/** Update colors of all images */
	protected updateImageColors() {
		for (let index = 0; index < this.images.length; index++) this.images[index]!.updateColors();
	}
}

// @ts-ignore
globalThis.kglacerMacro = new KglacerMacro();
// @ts-ignore
globalThis.wbot = globalThis.kglacerMacro;
