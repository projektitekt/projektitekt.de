import { error } from '@sveltejs/kit';
import { pages } from '#lib/content.js';
import type { EntryGenerator, PageLoad } from './$types';

const INDEX = '_index';

export const entries: EntryGenerator = () =>
	[...pages.keys()].filter((slug) => slug !== INDEX).map((slug) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const page = params.slug !== INDEX && pages.get(params.slug);
	if (!page) error(404);
	return page;
};
