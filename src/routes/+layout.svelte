<script lang="ts">
	import '@fontsource-variable/cabin/wght.css';
	import '@fontsource-variable/cabin/wght-italic.css';
	import '../app.css';
	import Footer from '#lib/Footer.svelte';
	import Header from '#lib/Header.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<Header />

{@render children()}

<Footer />
