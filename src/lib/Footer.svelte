<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Logo from '#lib/Logo.svelte';
	import { isCurrentPage } from '#lib/navigation.js';

	const year = new Date().getFullYear();
	const imprint = resolve('/[slug]', { slug: 'imprint' });
	const privacy = resolve('/[slug]', { slug: 'privacy' });
</script>

<footer class="footer">
	<div class="top">
		<div class="name-box">
			<Logo class="logo" />

			<div class="name">Sylvia C. Schuster</div>
			<div class="title">M.A. Architektin</div>
		</div>

		<div class="box address-box">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100"
				height="100"
				viewBox="0 0 100 100"
				fill="currentColor"
				class="box-logo"
				><path
					d="M50 44.118c-7.377 0-13.279-5.883-13.279-13.236 0-7.353 5.902-13.235 13.279-13.235s13.279 5.882 13.279 13.235S57.377 44.118 50 44.118zM50 0C39.82 0 30.23 5 24.476 13.53c-5.754 8.382-6.935 19.117-3.246 28.676l14.016 30.882 12.098 25.294C47.787 99.412 48.82 100 50 100c1.18 0 2.213-.588 2.656-1.618l12.098-25.294L78.77 42.206c3.689-9.559 2.509-20.294-3.246-28.677C69.77 5 60.18 0 50 0z"
				/></svg
			>
			<div class="box-text">
				Turpinstr. 19<br />
				52066 Aachen
			</div>
		</div>

		<div class="box mail-box">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100"
				height="100"
				viewBox="0 0 100 100"
				fill="currentColor"
				class="box-logo"
				><path
					d="M0 15.152v69.696h100V15.152zm51.75 43.436c-1 .995-2.5.995-3.5 0l-37-35.969h77.625zm-19.875-8.961L7.5 74.02V25.855zm3.625 3.485l9.375 9.085c1.5 1.37 3.375 2.116 5.25 2.116s3.75-.747 5.25-2.116l9.375-9.085L89 77.38H11.125zm32.625-3.485L92.5 25.979v47.917z"
				/></svg
			>
			<div class="box-text">
				Schreiben Sie uns!<br />
				<a href="mailto:mail@projektitekt.de">mail@projektitekt.de</a>
			</div>
		</div>

		<div class="box">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100"
				height="100"
				viewBox="0 0 100 100"
				fill="currentColor"
				class="box-logo"
				><path
					d="M39.036 26.487c1-1 1.624-2.373 1.624-3.873 0-1.499-.624-2.873-1.624-3.873L21.794 1.624c-1-1-2.373-1.624-3.748-1.624-1.374 0-2.873.625-3.873 1.624l-1.874 1.874 24.863 24.864zM64.15 70.592c-.5.5-1.25.75-1.875.75s-1.374-.25-1.874-.75l-30.985-30.86c-.5-.5-.75-1.25-.75-1.875 0-.624.25-1.374.75-1.874l3.873-3.748L8.426 7.372l-4.123 4.123c-2.5 2.374-3.999 5.497-4.123 8.87-.375 5.623 1 10.995 2.873 16.243 2 4.623 4.623 8.995 7.497 13.119 10.245 15.367 23.114 28.736 38.107 39.356 2.498 1.874 5.122 3.498 7.871 4.998 6.247 3.123 12.869 5.372 19.99 5.872 4.748.375 9.496-1.5 12.744-4.998l3.374-3.373-24.738-24.864zM98.383 78.213L81.141 60.971a5.48 5.48 0 00-3.873-1.624c-1.5 0-2.873.625-3.873 1.624l-1.874 1.999 24.863 24.864 1.874-1.875c1-1 1.624-2.374 1.624-3.873s-.5-2.874-1.499-3.873z"
				/></svg
			>
			<div class="box-text">
				+49 (2402) 90 55 161<br />
				+49 (151) 651 52 999
			</div>
		</div>
	</div>

	<div class="bottom">
		<div class="bottom-content">
			<div class="copyright">&copy; Projektitekt 2019–{year}</div>

			<ul class="links">
				<li>
					<a href={imprint} class={{ active: isCurrentPage(page.url.pathname, imprint) }}>
						Impressum
					</a>
				</li>
				<li>
					<a href={privacy} class={{ active: isCurrentPage(page.url.pathname, privacy) }}>
						Datenschutz
					</a>
				</li>
			</ul>
		</div>
	</div>
</footer>

<style>
	.footer {
		width: 100%;
		background: var(--blue800);
		color: white;
		font-size: 14px;

		a {
			color: white;
			text-decoration: none;
		}
	}

	.top,
	.bottom-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.top {
		display: grid;
		grid-template-columns: 22% 22% 28% 28%;
		justify-items: end;
		align-items: end;
		padding: 24px 30px;
	}

	.name-box {
		justify-self: start;

		:global(.logo) {
			width: 160px;
			height: auto;
			margin-bottom: 20px;
		}

		:global(.logo path) {
			fill: white;
		}
	}

	.name {
		margin-bottom: 5px;
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 0.05em;
		white-space: nowrap;
	}

	.title {
		font-size: 12px;
	}

	.box {
		display: flex;
	}

	.box-logo {
		flex-shrink: 0;
		width: 30px;
		height: auto;
		margin-right: 15px;
	}

	.box-text {
		line-height: 21px;
	}

	.bottom {
		border-top: solid 1px white;
	}

	.bottom-content {
		display: flex;
		justify-content: space-between;
		padding: 16px 30px;
	}

	.links {
		list-style-type: none;
		margin: 0;
		padding: 0;

		li {
			display: inline;

			&:not(:last-child)::after {
				content: '·';
				margin-left: 6px;
				margin-right: 3px;
			}
		}
	}

	@media only screen and (max-width: 800px) {
		.top {
			grid-template-columns: 33.3% 33.3% 33.4%;
			justify-content: space-between;
		}

		.name-box {
			grid-column-start: 1;
			grid-column-end: 4;
			margin-bottom: 20px;
		}

		.address-box {
			justify-self: start;
		}

		.mail-box {
			justify-self: center;
		}
	}

	@media only screen and (max-width: 640px) {
		.top {
			display: block;
			justify-content: space-between;
		}

		.address-box {
			margin-bottom: 10px;
		}

		.mail-box {
			margin-bottom: 10px;
		}
	}
</style>
