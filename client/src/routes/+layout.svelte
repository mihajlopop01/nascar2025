<script>
	import Nav from './components/nav.svelte';
	import Header from './components/header.svelte';
	import './dashboard/dashboard.css';

	let selectedNav = $state();
	let { children } = $props();
</script>

<svelte:head>
	<title>{selectedNav}</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if selectedNav != 'breakdown'}
	<Header {selectedNav} />
{/if}
<Nav bind:selectedNav />
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
		grid-template-columns: 250px 1fr;
		grid-template-rows: 8% 1fr;
		grid-template-areas:
			'nav header'
			'nav main';

		transition: all 0.3s;
	}
</style>
