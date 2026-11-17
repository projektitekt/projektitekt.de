<script lang="ts">
	import { page } from '$app/state';
	import NotFound from '#lib/NotFound.svelte';
</script>

{#if page.status === 404}
	<NotFound />
{:else}
	<h1>Ein Fehler ist aufgetreten</h1>
{/if}
