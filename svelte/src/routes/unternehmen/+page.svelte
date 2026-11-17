<script lang="ts">
	import { resolve } from '$app/paths';

	const beratung = resolve('/[slug]', { slug: 'beratung' });
</script>

<svelte:head>
	<title>Projektitekt · Beratung</title>
	<meta http-equiv="refresh" content="0; url=/beratung/" />
	<link rel="canonical" href="https://projektitekt.de/beratung/" />
</svelte:head>

<h1 class="title">Beratung</h1>
<div class="content">
	<p>Diese Seite ist umgezogen. Weiter zur <a href={beratung}>Beratung</a>.</p>
</div>
