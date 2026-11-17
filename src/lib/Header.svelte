<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Logo from '#lib/Logo.svelte';
	import { isCurrentPage } from '#lib/navigation.js';

	const home = resolve('/');
	const links = [
		{ href: resolve('/[slug]', { slug: 'beratung' }), label: 'Beratung' },
		{ href: resolve('/[slug]', { slug: 'akademie' }), label: 'Akademie' },
		{ href: resolve('/[slug]', { slug: 'referenzen' }), label: 'Referenzen' },
		{ href: resolve('/presse'), label: 'News' }
	];
</script>

<header class="header">
	<div class="inner">
		<a href={home} class={['logo-link', { active: isCurrentPage(page.url.pathname, home) }]}>
			<Logo class="logo" />
		</a>

		<ul class="links">
			{#each links as { href, label } (href)}
				<li>
					<a {href} class={{ active: isCurrentPage(page.url.pathname, href) }}>{label}</a>
				</li>
			{/each}
		</ul>
	</div>
</header>
<div class="spacer"></div>

<style>
	.header {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 120px;
		background: var(--blue800);
		color: white;
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

		/* ensure that the header is above the Instagram icons... */
		z-index: 1;

		@media only screen and (max-width: 640px) {
			position: relative;
			height: auto;
		}
	}

	.spacer {
		margin-bottom: 120px;

		@media only screen and (max-width: 640px) {
			margin: 0;
		}
	}

	.inner {
		display: flex;
		align-items: baseline;
		width: 800px;
		margin: 30px;

		@media only screen and (max-width: 640px) {
			flex-direction: column;
		}
	}

	.logo-link {
		flex-shrink: 0;
		flex-grow: 1;

		:global(.logo) {
			width: 200px;
			height: auto;
		}

		:global(.logo path) {
			fill: white;
		}
	}

	.links {
		display: flex;
		list-style-type: none;
		padding: 0;
		margin: 0 0 0 20px;

		li {
			display: inline;
			margin-left: 18px;
			font-size: 20px;

			a {
				color: white;
				text-decoration: none;
				letter-spacing: 0.019em;

				&.active {
					font-weight: bold;
					letter-spacing: 0;
				}
			}

			&:first-child {
				margin-left: 0;
			}
		}

		@media only screen and (max-width: 640px) {
			margin: 20px 0 0;
		}

		@media only screen and (max-width: 450px) {
			flex-direction: column;

			li {
				margin-left: 0;
				margin-top: 10px;
			}

			&:first-child {
				margin-top: 0;
			}
		}
	}
</style>
