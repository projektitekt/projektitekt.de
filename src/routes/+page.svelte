<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Projektitekt</title>
</svelte:head>

<h1 class="title">{data.title}</h1>

<div class="content home">
	<div>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- Markdown from the repository's own content files -->
		{@html data.html}

		<p>
			<a
				href="https://www.xing.com/profile/SylviaC_Schuster"
				target="_blank"
				rel="noopener noreferrer"
				class="social-media-button"
			>
				<img src="/xing.png" alt="XING" />
			</a>
			<a
				href="https://www.linkedin.com/in/sylvia-c-schuster/"
				target="_blank"
				rel="noopener noreferrer"
				class="social-media-button"
			>
				<img src="/linkedin.png" alt="LinkedIn" />
			</a>
			<a
				href="https://www.instagram.com/projektitekt.de/"
				target="_blank"
				rel="noopener noreferrer"
				class="social-media-button"
			>
				<img src="/instagram.png" alt="Instagram" />
			</a>
		</p>

		<p>
			<strong>Ich freue mich, Sie und Ihr Unternehmen kennenzulernen!</strong>
		</p>
	</div>

	<div class="photo-wrapper">
		<img src="/scs_sq.webp" class="photo" alt="Sylvia C. Schuster" />
	</div>
</div>

<style>
	.photo-wrapper {
		width: 200px;
		margin-left: 40px;
		margin-right: 10px;

		@media only screen and (max-width: 640px) {
			max-width: 100%;
		}
	}

	.photo-wrapper img {
		width: 200px;
		max-width: 200px;
		margin-bottom: 20px;
	}

	.photo {
		border-radius: 50%;
	}

	.social-media-button {
		text-decoration: none;
		margin-right: 4px;
	}

	.social-media-button > img {
		width: 32px;
	}
</style>
