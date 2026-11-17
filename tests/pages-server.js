// Serves a static build the way GitHub Pages does: directories without a trailing slash
// redirect with 301, directories serve their `index.html`, and missing paths get `404.html`
// with status 404.

import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';

/** @type {Record<string, string>} */
const CONTENT_TYPES = {
	'.css': 'text/css',
	'.html': 'text/html; charset=utf-8',
	'.ico': 'image/x-icon',
	'.jpg': 'image/jpeg',
	'.js': 'text/javascript',
	'.pdf': 'application/pdf',
	'.png': 'image/png',
	'.svg': 'image/svg+xml'
};

const [root, port] = process.argv.slice(2);

createServer(async (request, response) => {
	const { pathname } = new URL(request.url ?? '/', 'http://localhost');
	let path = join(root, decodeURIComponent(pathname));

	const stats = await stat(path).catch(() => undefined);
	if (stats?.isDirectory()) {
		if (!pathname.endsWith('/')) {
			response.writeHead(301, { location: `${pathname}/` }).end();
			return;
		}
		path = join(path, 'index.html');
	}

	const body = await readFile(path).catch(() => undefined);
	if (body === undefined) {
		const notFound = await readFile(join(root, '404.html'));
		response.writeHead(404, { 'content-type': contentType('404.html') }).end(notFound);
		return;
	}

	response.writeHead(200, { 'content-type': contentType(path) }).end(body);
}).listen(Number(port));

/** @param {string} path */
function contentType(path) {
	return CONTENT_TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream';
}
