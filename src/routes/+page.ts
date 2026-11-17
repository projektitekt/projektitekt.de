import { error } from '@sveltejs/kit';
import { pages } from '#lib/content.js';
import type { PageLoad } from './$types';

export const load: PageLoad = () =>
	pages.get('_index') ?? error(500, 'content/_index.md is missing');
