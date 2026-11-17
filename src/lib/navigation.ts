/** Whether a link to `href` points to the page at `pathname`, ignoring a trailing slash. */
export function isCurrentPage(pathname: string, href: string): boolean {
	return withoutTrailingSlash(pathname) === withoutTrailingSlash(href);
}

function withoutTrailingSlash(path: string): string {
	return path.replace(/\/$/, '');
}
