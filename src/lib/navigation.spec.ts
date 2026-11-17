import { describe, expect, it } from 'vitest';
import { isCurrentPage } from './navigation.js';

describe('isCurrentPage()', () => {
	it.each([
		['/beratung/', '/beratung'],
		['/beratung/', '/beratung/'],
		['/', '/']
	])('matches %s for a link to %s', (pathname, href) => {
		expect(isCurrentPage(pathname, href)).toBe(true);
	});

	it.each([
		['/imprint/', '/'],
		['/', '/beratung'],
		['/beratung/', '/beratung-alt'],
		['/404.html', '/']
	])('does not match %s for a link to %s', (pathname, href) => {
		expect(isCurrentPage(pathname, href)).toBe(false);
	});
});
