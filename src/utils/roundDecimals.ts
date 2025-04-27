export default function roundDecimals(value: number, count: number): number {
	const mult = Math.pow(10, count);
	return Math.round(value * mult) / mult;
}