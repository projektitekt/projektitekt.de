import { error } from '@sveltejs/kit';
import { pages } from '#lib/content.js';
import type { PageLoad } from './$types';

export const load: PageLoad = () =>
	pages.get('presse') ?? error(500, 'content/presse.md is missing');
