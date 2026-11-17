<script lang="ts">
	import ContentPage from '#lib/ContentPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ContentPage {...data} />
