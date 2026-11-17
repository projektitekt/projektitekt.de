import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { chromium } from 'playwright';

const BASELINE_DIR = new URL('../tests/baseline/', import.meta.url).pathname;

const ROUTES = {
  index: '/',
  akademie: '/akademie',
  beratung: '/beratung',
  bingo: '/bingo',
  imprint: '/imprint',
  presse: '/presse',
  privacy: '/privacy',
  referenzen: '/referenzen',
  unternehmen: '/unternehmen',
  vita: '/vita',
  wiederaufbau: '/wiederaufbau',
  404: '/snapshot-unknown-page',
};

// Whitespace around these tags does not affect rendering, so each one gets its own line.
const BLOCK_TAGS =
  'article|aside|blockquote|body|dd|div|dl|dt|figcaption|figure|footer|form|h[1-6]|header|hr|li|main|nav|ol|p|section|table|tbody|td|tfoot|th|thead|tr|ul';

const USAGE = `Usage: node scripts/snapshot.mjs <capture|compare> <base-url> [name...]

capture  Store snapshots of the site at <base-url> in tests/baseline/.
compare  Diff the site at <base-url> against tests/baseline/.

Names select a subset of: ${Object.keys(ROUTES).join(', ')}
Requires Chromium: pnpm exec playwright install chromium`;

const { positionals } = parseArgs({ allowPositionals: true });
const [mode, baseUrl, ...names] = positionals;

if (!['capture', 'compare'].includes(mode) || !baseUrl) {
  console.error(USAGE);
  process.exit(2);
}

const unknownNames = names.filter((name) => !(name in ROUTES));
if (unknownNames.length > 0) {
  console.error(`Unknown names: ${unknownNames.join(', ')}\n\n${USAGE}`);
  process.exit(2);
}

const selectedNames = names.length > 0 ? names : Object.keys(ROUTES);
const outputDir =
  mode === 'capture' ? BASELINE_DIR : await mkdtemp(join(tmpdir(), 'snapshot-'));

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.addInitScript(seedRandom);

  for (const name of selectedNames) {
    const snapshot = await capturePage(page, new URL(ROUTES[name], baseUrl));
    await writeFile(join(outputDir, `${name}.html`), snapshot);
  }
} finally {
  await browser.close();
}

if (mode === 'compare') {
  let differs = false;
  for (const name of selectedNames) {
    const baseline = join(BASELINE_DIR, `${name}.html`);
    const current = join(outputDir, `${name}.html`);
    const { status } = spawnSync('git', ['diff', '--no-index', '--color=auto', baseline, current], {
      stdio: 'inherit',
    });
    differs ||= status !== 0;
  }
  await rm(outputDir, { recursive: true });
  console.log(differs ? 'Differences found.' : 'No differences.');
  process.exitCode = differs ? 1 : 0;
}

async function capturePage(page, url) {
  const response = await page.goto(url.href, { waitUntil: 'domcontentloaded' });
  await waitForStableDom(page);

  const finalUrl = new URL(page.url());
  const header = [
    `path: ${url.pathname}`,
    `status: ${response.status()}`,
    `final-path: ${finalUrl.pathname}`,
    `title: ${await page.title()}`,
  ];
  const body = formatHtml(await page.evaluate(normalizeBody));
  return `${header.join('\n')}\n\n${body}`;
}

async function waitForStableDom(page) {
  let previous;
  let stablePolls = 0;
  for (let attempt = 0; attempt < 40 && stablePolls < 3; attempt++) {
    await page.waitForTimeout(250);
    const current = await page.evaluate(() => document.body.innerHTML);
    stablePolls = current === previous ? stablePolls + 1 : 0;
    previous = current;
  }
  if (stablePolls < 3) {
    throw new Error(`DOM of ${page.url()} did not settle within 10 seconds`);
  }
}

// Runs in the browser before any page script, so shuffled content is reproducible.
function seedRandom() {
  let state = 42;
  Math.random = () => {
    state = (state * 1664525 + 1013904223) % 2 ** 32;
    return state / 2 ** 32;
  };
}

// Runs in the browser.
function normalizeBody() {
  const body = document.body.cloneNode(true);

  for (const element of body.querySelectorAll('script, .page-progress')) {
    element.remove();
  }

  const comments = document.createTreeWalker(body, NodeFilter.SHOW_COMMENT);
  const commentNodes = [];
  while (comments.nextNode()) commentNodes.push(comments.currentNode);
  for (const comment of commentNodes) comment.remove();

  // Inline SVG markup is generated from the files in `public/svg-jar/` and only adds noise.
  for (const svg of body.querySelectorAll('svg')) svg.replaceChildren();

  for (const element of [body, ...body.querySelectorAll('*')]) {
    if (/^ember\d+$/.test(element.id)) element.removeAttribute('id');

    const classes = [...element.classList]
      .filter((name) => !/^(ember-view|ember-application|svelte-[a-z0-9]+)$/.test(name))
      .map((name) => name.replace(/^_(.+)_[a-z0-9]{6}$/, '$1'));

    const attributes = [...element.attributes]
      .map(({ name, value }) => [name, name === 'class' ? classes.join(' ') : value])
      .filter(([name, value]) => !(['class', 'style'].includes(name) && value === ''))
      .sort(([a], [b]) => a.localeCompare(b));

    for (const { name } of [...element.attributes]) element.removeAttribute(name);
    for (const [name, value] of attributes) element.setAttribute(name, value);
  }

  // Ember renders empty placeholder `<div class="ember-view">` elements.
  for (const div of body.querySelectorAll('div')) {
    if (div.attributes.length === 0 && div.childNodes.length === 0) div.remove();
  }

  return body.outerHTML;
}

function formatHtml(html) {
  const openingBlockTag = new RegExp(`\\s*(<(?:${BLOCK_TAGS})\\b[^>]*>)\\s*`, 'g');
  const closingBlockTag = new RegExp(`\\s*(</(?:${BLOCK_TAGS})>)\\s*`, 'g');
  const lines = html
    .replace(/-[0-9a-f]{32}(\.\w+)/g, '$1')
    .replace(/\s+/g, ' ')
    .replace(openingBlockTag, '\n$1')
    .replace(closingBlockTag, '$1\n')
    .replace(/<br>\s*/g, '<br>\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  return `${lines.join('\n')}\n`;
}
