import { expect, test } from '@playwright/test';

const PAGES = {
	'/': 'Projektitekt',
	'/beratung': 'Projektitekt · Operative Prozessberatung für Planungsbüros',
	'/akademie': 'Projektitekt · Fortbildungen für Planer am Bau',
	'/referenzen': 'Projektitekt · Referenzen',
	'/presse': 'Projektitekt · Neuigkeiten & Pressespiegel',
	'/vita': 'Projektitekt · Vita',
	'/wiederaufbau': 'Projektitekt · Wiederaufbau Städteregion Aachen & Nordeifel',
	'/imprint': 'Projektitekt · Impressum',
	'/privacy': 'Projektitekt · Datenschutzerklärung',
	'/pl-schulung': 'Projektitekt · Schulungen für Architekten & Ingenieure',
	'/bingo': 'Projektitekt · Bingo'
};

// Embedded YouTube videos and other external resources are not part of the site.
test.beforeEach(async ({ page, baseURL }) => {
	await page.route(
		(url) => url.origin !== baseURL,
		(route) => route.abort()
	);
});

for (const [path, title] of Object.entries(PAGES)) {
	test(`${path} has the title "${title}"`, async ({ page }) => {
		const response = await page.goto(path);

		expect(response?.status()).toBe(200);
		await expect(page).toHaveTitle(title);
	});
}

for (const path of Object.keys(PAGES)) {
	test(`${path} loads all images`, async ({ page }) => {
		await page.goto(path);

		for (const image of await page.locator('img').all()) {
			await expect(image).toHaveJSProperty('complete', true);
			expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
		}
	});
}

for (const path of Object.keys(PAGES).filter((path) => path !== '/bingo')) {
	test(`${path} loads no JavaScript`, async ({ page }) => {
		const scripts: string[] = [];
		page.on('request', (request) => {
			if (request.resourceType() === 'script') scripts.push(request.url());
		});

		await page.goto(path);

		expect(scripts).toEqual([]);
		await expect(page.locator('script')).toHaveCount(0);
	});
}

for (const path of Object.keys(PAGES)) {
	test(`${path} is styled without loading stylesheets`, async ({ page }) => {
		await page.route('**/*.css', (route) => route.abort());

		await page.goto(path);

		await expect(page.locator('header')).toHaveCSS('background-color', 'rgb(32, 56, 100)');
	});
}

test('/ renders its text in the self-hosted Carlito font', async ({ page }) => {
	await page.goto('/');

	const loadedFaces = await page.evaluate(async () => {
		await document.fonts.ready;
		return [...document.fonts]
			.filter((face) => face.family.replaceAll('"', '') === 'Carlito' && face.status === 'loaded')
			.map((face) => `${face.weight} ${face.style}`);
	});

	expect(new Set(loadedFaces)).toEqual(new Set(['400 normal', '700 normal']));
});

test('/unternehmen redirects to /beratung', async ({ page }) => {
	await page.goto('/unternehmen');

	await expect(page).toHaveURL('/beratung/');
	await expect(page).toHaveTitle(PAGES['/beratung']);
});

test('an unknown URL renders the 404 page', async ({ page }) => {
	const response = await page.goto('/does/not/exist');

	expect(response?.status()).toBe(404);
	await expect(page).toHaveTitle('Projektitekt · Seite nicht gefunden');
	await expect(page.getByRole('link', { name: 'Startseite' })).toBeVisible();
});

test('/bingo toggles fields and celebrates a bingo', async ({ page }) => {
	await page.goto('/bingo');

	const fields = page.getByRole('button');
	await expect(fields).toHaveCount(16);
	// The field texts stay hidden until the grid has hydrated and handles clicks.
	await expect(page.locator('.text.hidden')).toHaveCount(0);

	for (const index of [0, 5, 10]) {
		await fields.nth(index).click();
		await expect(fields.nth(index)).toHaveAttribute('aria-pressed', 'true');
	}
	await expect(page.locator('canvas')).toHaveCount(0);

	await fields.nth(15).click();
	await expect(page.locator('canvas')).toHaveCount(1);
});
