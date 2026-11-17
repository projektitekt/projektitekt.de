const SIZE = 4;

const range = Array.from({ length: SIZE }, (_, index) => index);

/** Cell indices of every row, column and both diagonals of the board. */
const LINES = [
	...range.map((row) => range.map((column) => row * SIZE + column)),
	...range.map((column) => range.map((row) => row * SIZE + column)),
	range.map((index) => index * SIZE + index),
	range.map((index) => index * SIZE + SIZE - 1 - index)
];

/** Whether a row, column or diagonal of the row-major board is completely marked. */
export function hasBingo(marked: readonly boolean[]): boolean {
	return LINES.some((line) => line.every((index) => marked[index]));
}

/** Returns a Fisher-Yates shuffled copy of `items`. */
export function shuffle<T>(items: readonly T[]): T[] {
	const result = [...items];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}
