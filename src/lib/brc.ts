// Black Rock City map geometry. The Man sits at (200, 200); 12:00 points up.
// Radii match the design: Esplanade, A–F every 15, then G–L every 7.5.
export const CENTER = 200;
export const STREETS = 'ABCDEFGHIJKL';
export const ESPLANADE = 70;
export const OUTER = 205;

export const streetRadius = (street: string) => {
	const i = STREETS.indexOf(street);
	return i < 6 ? ESPLANADE + 15 * (i + 1) : 160 + 7.5 * (i - 5);
};

export const polar = (hours: number, r: number) => {
	const a = (hours * 30 * Math.PI) / 180;
	return { x: +(CENTER + r * Math.sin(a)).toFixed(1), y: +(CENTER - r * Math.cos(a)).toFixed(1) };
};

// "4:15" → 4.25
export const clockHours = (time: string) => {
	const [h, m] = time.split(':').map(Number);
	return (h % 12) + m / 60;
};

export const address = (time: string, street: string) => polar(clockHours(time), streetRadius(street));

// Oldest year first: rust, amber, teal, repeating. A year with no address yet is muted.
const ACCENTS = ['#d2561e', '#e8892b', '#4e9c96'];
export const accentFor = (index: number, hasAddress: boolean) => (hasAddress ? ACCENTS[index % ACCENTS.length] : '#8f7d66');

interface Year {
	year: number;
	address_time?: string | null;
	address_street?: string | null;
}

// Adds map position, label, and accent color to each year (sorted oldest first).
export const placeYears = <T extends Year>(years: T[]) =>
	[...years]
		.sort((a, b) => a.year - b.year)
		.map((y, i) => {
			const placed = !!(y.address_time && y.address_street);
			return {
				...y,
				placed,
				accent: accentFor(i, placed),
				addr: placed ? `${y.address_time} & ${y.address_street}` : '? & ?',
				mapLabel: placed ? `'${String(y.year).slice(2)} · ${y.address_time}&${y.address_street}` : 'Where next?',
				pos: placed ? address(y.address_time!, y.address_street!) : null,
			};
		});
