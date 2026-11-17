<script lang="ts">
	import type { Page } from '#lib/content.js';

	let { title, html }: Page = $props();
</script>

<svelte:head>
	<title>Projektitekt · {title}</title>
</svelte:head>

<h1 class="title">{title}</h1>
<div class="content">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- Markdown from the repository's own content files -->
	{@html html}
</div>
