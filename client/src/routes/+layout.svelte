<script>
	import { appState } from './js/state.svelte.js';
	import Nav from './components/nav.svelte';
	import Header from './components/header.svelte';
	import { link } from 'svelte-spa-router';

	let { children } = $props();
</script>

<!-- svelte-ignore component_name_lowercase -->
<svelte:head>
	<title>{appState.page}</title>
	<link rel="stylesheet" href="/styles/global.css" />
</svelte:head>

<Nav />
<div>
	{@render children()}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: var(--main-background);
		overflow-x: hidden;
		height: 100%;

		display: grid;
		grid-template-columns: auto 1fr;
		/* grid-template-rows: 8% 1fr; */
		grid-template-areas: 'nav main';

		transition: all 0.3s;
	}
</style>
