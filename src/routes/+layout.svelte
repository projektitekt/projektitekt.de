<script lang="ts">
	import '@fontsource/carlito/400.css';
	import '@fontsource/carlito/400-italic.css';
	import '@fontsource/carlito/700.css';
	import '@fontsource/carlito/700-italic.css';
	import '../app.css';
	import Footer from '#lib/Footer.svelte';
	import Header from '#lib/Header.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<Header />

{@render children()}

<Footer />
