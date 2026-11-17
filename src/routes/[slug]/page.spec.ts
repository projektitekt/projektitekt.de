import { describe, expect, it } from 'vitest';
import { isHttpError } from '@sveltejs/kit';
import { pages } from '#lib/content.js';
import { entries, load } from './+page.js';

type LoadEvent = Parameters<typeof load>[0];

function loadSlug(slug: string) {
	return load({ params: { slug } } as LoadEvent);
}

describe('[slug] route', () => {
	it('prerenders every content file except the index page', async () => {
		const slugs = (await entries()).map(({ slug }) => slug);
		expect(slugs).toEqual([...pages.keys()].filter((slug) => slug !== '_index'));
	});

	it('loads the page for a slug', () => {
		expect(loadSlug('imprint')).toEqual(pages.get('imprint'));
	});

	it.each(['_index', 'missing'])('responds with 404 for %s', (slug) => {
		expect.assertions(1);
		try {
			loadSlug(slug);
		} catch (error) {
			expect(isHttpError(error, 404)).toBe(true);
		}
	});
});
