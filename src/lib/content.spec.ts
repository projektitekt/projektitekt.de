import { describe, expect, it } from 'vitest';
import { parsePage } from './content.js';

describe('parsePage()', () => {
	it('reads the title and renders the Markdown body', () => {
		const page = parsePage('content/vita.md', '---\ntitle: Vita\n---\n\n**Hallo**\n');
		expect(page).toEqual({ title: 'Vita', html: '<p><strong>Hallo</strong></p>' });
	});

	it('passes raw HTML through', () => {
		const html = '<p align="center"><img src="/contents/a.png" style="width: 50%;"></p>';
		const page = parsePage('content/a.md', `---\ntitle: A\n---\n${html}\n`);
		expect(page.html).toBe(html);
	});

	it('opens external links in a new tab', () => {
		const page = parsePage(
			'content/a.md',
			'---\ntitle: A\n---\n[extern](https://example.com) und [intern](/imprint)\n'
		);
		expect(page.html).toBe(
			'<p><a target="_blank" rel="noopener noreferrer" href="https://example.com">extern</a> und <a href="/imprint">intern</a></p>'
		);
	});

	it('rejects a missing title with the file name', () => {
		expect(() => parsePage('content/broken.md', '---\nfoo: bar\n---\nText\n')).toThrow(
			/content\/broken\.md.*title/
		);
	});

	it('rejects a file without frontmatter with the file name', () => {
		expect(() => parsePage('content/broken.md', 'Text\n')).toThrow(/content\/broken\.md/);
	});
});
