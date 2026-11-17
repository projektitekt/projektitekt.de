<script lang="ts">
	import ContentPage from '#lib/ContentPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ContentPage {...data} class="presse" />

<style>
	:global(.presse ul > li) {
		margin-bottom: 20px;
	}

	:global(.presse ul > li strong) {
		font-size: 110%;
	}
</style>
