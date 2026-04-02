import { Me, KglacerMacro } from './bot';

export type Position = {
	x: number;
	y: number;
};

export const WORLD_TILE_SIZE = 1000;
export const WORLD_TILES = 2048;
export const WORLD_PIXEL_SIZE = WORLD_TILE_SIZE * WORLD_TILES;

// === Favoriote Locations ===
export const FAVORITE_LOCATIONS_POSITIONS: Position[] = [];
export const FAVORITE_LOCATIONS: Me['favoriteLocations'] = [];
let lastId = Date.now();
export function addFavoriteLocation(position: Position) {
	FAVORITE_LOCATIONS_POSITIONS.push(position);
	FAVORITE_LOCATIONS.push({
		id: lastId++,
		latitude:
			((2 * Math.atan(Math.exp(-((position.y / WORLD_PIXEL_SIZE) * (2 * Math.PI) - Math.PI))) - Math.PI / 2) *
				180) /
			Math.PI,
		longitude: (((position.x / WORLD_PIXEL_SIZE) * (2 * Math.PI) - Math.PI) * 180) / Math.PI,
		name: 'KGLACER_MACRO_FAVORITE',
	});
}

addFavoriteLocation({
	x: (WORLD_PIXEL_SIZE / 3) | 0,
	y: (WORLD_PIXEL_SIZE / 3) | 0,
});
addFavoriteLocation({
	x: ((WORLD_PIXEL_SIZE / 3) * 2) | 0,
	y: ((WORLD_PIXEL_SIZE / 3) * 2) | 0,
});

// function latLonToWplace(lat: number, lon: number) {
//   return {
//     x: (((lon * Math.PI) / 180 + Math.PI) / (2 * Math.PI)) * WORLD_PIXEL_SIZE,
//     y:
//       ((-Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2)) +
//         Math.PI) /
//         (2 * Math.PI)) *
//       WORLD_PIXEL_SIZE,
//   }
// }

export function extractScreenPositionFromStar($star: HTMLDivElement) {
	const [x, y] = $star.style.transform
		.slice(32, -31)
		.split(', ')
		.map((x) => Number.parseFloat(x)) as [number, number];
	return { x, y };
}

export class WorldPosition {
	public static fromJSON(bot: KglacerMacro, data: ReturnType<WorldPosition['toJSON']>) {
		return new WorldPosition(bot, ...data);
	}

	public static fromScreenPosition(bot: KglacerMacro, position: Position) {
		const { anchorScreenPosition, pixelSize, anchorWorldPosition } = bot.findAnchorsForScreen(position);
		return new WorldPosition(
			bot,
			(anchorWorldPosition.x + (position.x - anchorScreenPosition.x) / pixelSize) | 0,
			(anchorWorldPosition.y + (position.y - anchorScreenPosition.y) / pixelSize) | 0
		);
	}

	public globalX = 0;

	public globalY = 0;

	public get tileX(): number {
		return (this.globalX / WORLD_TILE_SIZE) | 0;
	}
	public set tileX(value: number) {
		this.globalX = value * WORLD_TILE_SIZE + this.x;
	}

	public get tileY(): number {
		return (this.globalY / WORLD_TILE_SIZE) | 0;
	}
	public set tileY(value: number) {
		this.globalY = value * WORLD_TILE_SIZE + this.y;
	}

	public get x(): number {
		return this.globalX % WORLD_TILE_SIZE;
	}
	public set x(value: number) {
		this.globalX = this.tileX * WORLD_TILE_SIZE + value;
	}

	public get y(): number {
		return this.globalY % WORLD_TILE_SIZE;
	}
	public set y(value: number) {
		this.globalY = this.tileY * WORLD_TILE_SIZE + value;
	}

	/** Anchor that is used to align screen position for this world positions */
	public anchor1Index!: number;

	/** Second anchor that is used to align screen position for this world positions */
	public anchor2Index!: number;

	/** Pixel size around with world position. Calculated on every read */
	public get pixelSize() {
		const screen1 = extractScreenPositionFromStar(this.bot.$stars[this.anchor1Index]!);
		const screen2 = extractScreenPositionFromStar(this.bot.$stars[this.anchor2Index]!);
		const world1 = FAVORITE_LOCATIONS_POSITIONS[this.anchor1Index]!;
		const world2 = FAVORITE_LOCATIONS_POSITIONS[this.anchor2Index]!;
		const deltaScreenX = screen2.x - screen1.x;
		const deltaScreenY = screen2.y - screen1.y;
		const deltaWorldX = world2.x - world1.x;
		const deltaWorldY = world2.y - world1.y;
		const sizeX = deltaWorldX === 0 ? 0 : deltaScreenX / deltaWorldX;
		const sizeY = deltaWorldY === 0 ? 0 : deltaScreenY / deltaWorldY;
		const pixelSize = Math.abs(sizeX) > 0 ? Math.abs(sizeX) : Math.abs(sizeY);
		return Number.isFinite(pixelSize) && pixelSize > 0 ? pixelSize : 1;
	}

	public constructor(
		protected bot: KglacerMacro,
		tileorGlobalX: number,
		tileorGlobalY: number,
		x?: number,
		y?: number
	) {
		if (x === undefined || y === undefined) {
			this.globalX = tileorGlobalX;
			this.globalY = tileorGlobalY;
		} else {
			this.globalX = tileorGlobalX * WORLD_TILE_SIZE + x;
			this.globalY = tileorGlobalY * WORLD_TILE_SIZE + y;
		}
		this.updateAnchor();
	}

	/** Find closest anchor point for best accuracy */
	public updateAnchor() {
		const ordered = FAVORITE_LOCATIONS_POSITIONS.map((position, index) => ({
			index,
			distance:
				(position.x - this.globalX) * (position.x - this.globalX) +
				(position.y - this.globalY) * (position.y - this.globalY),
		})).sort((a, b) => a.distance - b.distance);
		this.anchor1Index = ordered[0]?.index ?? 0;
		this.anchor2Index =
			ordered.find((candidate) => {
				const primary = FAVORITE_LOCATIONS_POSITIONS[this.anchor1Index]!;
				const other = FAVORITE_LOCATIONS_POSITIONS[candidate.index]!;
				return primary.x !== other.x && primary.y !== other.y;
			})?.index ??
			ordered[1]?.index ??
			this.anchor1Index;
	}

	/** Get screen position */
	public toScreenPosition(): Position {
		const worldPosition = FAVORITE_LOCATIONS_POSITIONS[this.anchor1Index]!;
		const screenPosition = extractScreenPositionFromStar(this.bot.$stars[this.anchor1Index]!);
		return {
			x: (this.globalX - worldPosition.x) * this.pixelSize + screenPosition.x,
			y: (this.globalY - worldPosition.y) * this.pixelSize + screenPosition.y,
		};
	}

	/** Get map color at this position */
	public getMapColor() {
		return this.bot.mapsCache.get(this.tileX + '/' + this.tileY)!.pixels[this.y]![this.x]!;
	}

	/** Scroll screen to this position */
	public scrollScreenTo() {
		const { x, y } = this.toScreenPosition();
		this.bot.moveMap({
			x: Math.round(x - window.innerWidth / 3),
			y: Math.round(y - window.innerHeight / 3),
		});
	}

	public clone() {
		return new WorldPosition(this.bot, this.tileX, this.tileY, this.x, this.y);
	}

	public toJSON() {
		return [this.globalX, this.globalY] as const;
	}
}
