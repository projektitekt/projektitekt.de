<script lang="ts">
	import BingoGrid from '#lib/BingoGrid.svelte';
</script>

<svelte:head>
	<title>Projektitekt · Bingo</title>
</svelte:head>

<h1 class="title">
	Home Office Bingo
	<small class="subtitle">für Video-Konferenzen</small>
</h1>

<div class="content">
	<BingoGrid />
</div>

<style>
	.subtitle {
		display: block;
		margin-top: 8px;
		font-size: 16px;
		font-weight: normal;
	}

	.content {
		@media only screen and (max-width: 640px) {
			max-width: unset;
			width: 100%;
		}
	}
</style>
