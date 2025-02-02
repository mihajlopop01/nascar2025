<script>
	import '../styles/global.css';
	import { appState } from './js/state.svelte.js';
	import { page } from '$app/state';

	let { children, data } = $props();
	console.log('message from laod funtion in layout.js', data);

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/sw.js')
			.then(() => console.log('Service Worker registered'))
			.catch((err) => console.error('Service Worker registration failed', err));
	}
</script>

<svelte:head>
	<title>{page.url.pathname == '/worker/breakdown' ? '' : ''}</title>
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
