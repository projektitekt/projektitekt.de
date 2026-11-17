# projektitekt.de

The website of [Projektitekt](https://projektitekt.de), built with [SvelteKit](https://svelte.dev/docs/kit) as a fully prerendered static site and deployed to GitHub Pages.

## Editing content

Every page except the bingo game is a Markdown file in `content/`. The file name becomes the URL, so `content/vita.md` is published at `/vita/`, and a new file becomes a new page. `content/_index.md` is the home page.

Each file starts with a frontmatter block that sets the page title:

```markdown
---
title: Vita
---

The page content in Markdown. Raw HTML is allowed.
```

Images, PDFs and other files go into `static/contents/` and are linked as `/contents/<file>`. Everything else in `static/` is also published unchanged.

Links to other pages are checked during the build, so a link to a page or file that does not exist fails the deployment.

## Development

[pnpm](https://pnpm.io/) installs the required Node.js version automatically.

```sh
pnpm install
pnpm dev
```

| Command                       | Purpose                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| `pnpm build`                  | Build the static site into `build/`                            |
| `pnpm preview`                | Serve the build locally                                        |
| `pnpm lint`                   | Check formatting with Prettier and run ESLint                  |
| `pnpm format`                 | Format all files with Prettier                                 |
| `pnpm check`                  | Type-check with `svelte-check`                                 |
| `pnpm test`                   | Run the unit tests with Vitest                                 |
| `pnpm test:smoke`             | Run the Playwright smoke tests against `build/`                |
| `pnpm snapshot compare <url>` | Compare a running site with the snapshots in `tests/baseline/` |

The smoke tests and the snapshot script need Chromium, which `pnpm exec playwright install chromium` downloads once.

## Deployment

Every push to `master` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.
