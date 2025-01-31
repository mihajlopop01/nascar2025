<script>
	import '../styles/global.css';
	import { appState } from './js/state.svelte.js';

	let { children } = $props();
</script>

<svelte:head>
	<title>{appState.page}</title>
</svelte:head>
{@render children()}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: var(--main-background);
		overflow-x: hidden;
		height: 100vh;

		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: 'nav main';
	}
</style>
