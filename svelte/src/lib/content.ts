import showdown from 'showdown';
import * as v from 'valibot';
import { parse as parseYaml } from 'yaml';

export interface Page {
	title: string;
	html: string;
}

const FrontmatterSchema = v.object({ title: v.string() });

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

const converter = new showdown.Converter();

export function parsePage(path: string, source: string): Page {
	const match = FRONTMATTER.exec(source);
	if (!match) throw new Error(`${path}: missing frontmatter`);

	const result = v.safeParse(FrontmatterSchema, parseYaml(match[1]));
	if (!result.success) throw new Error(`${path}: ${v.summarize(result.issues)}`);

	const markdown = source.slice(match[0].length).trim();
	const html = converter
		.makeHtml(markdown)
		.replace(/<a href="http/g, '<a target="_blank" rel="noopener noreferrer" href="http');

	return { title: result.output.title, html };
}

const sources = import.meta.glob<string>('../../../content/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

/** Every `content/*.md` file, keyed by its file name without extension. */
export const pages: ReadonlyMap<string, Page> = new Map(
	Object.entries(sources).map(([path, source]) => [
		path.slice(path.lastIndexOf('/') + 1, -'.md'.length),
		parsePage(path, source)
	])
);
