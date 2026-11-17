import { describe, expect, it } from 'vitest';
import { hasBingo, shuffle } from './bingo.js';

function board(...marked: number[]): boolean[] {
	return Array.from({ length: 16 }, (_, index) => marked.includes(index));
}

describe('hasBingo()', () => {
	it.each([
		['first row', [0, 1, 2, 3]],
		['last row', [12, 13, 14, 15]],
		['first column', [0, 4, 8, 12]],
		['last column', [3, 7, 11, 15]],
		['main diagonal', [0, 5, 10, 15]],
		['anti-diagonal', [3, 6, 9, 12]]
	])('detects a complete %s', (_, marked) => {
		expect(hasBingo(board(...marked))).toBe(true);
	});

	it.each([
		['an empty board', []],
		['three in a row', [0, 1, 2]],
		['a row wrapping into the next one', [2, 3, 4, 5]],
		['four corners', [0, 3, 12, 15]]
	])('does not detect a win on %s', (_, marked) => {
		expect(hasBingo(board(...marked))).toBe(false);
	});
});

describe('shuffle()', () => {
	it('returns a permutation without changing the input', () => {
		const items = [0, 1, 2, 3, 4, 5, 6, 7];
		const shuffled = shuffle(items);

		expect(items).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
		expect([...shuffled].sort((a, b) => a - b)).toEqual(items);
	});
});
