<script>
	import { onMount } from 'svelte';
	import VideoPlayer from './components/VideoPlayer.svelte';
	import { appState } from '../../../js/state.svelte.js';

	let user = null;
	let loading = true;

	// async function checkAuth() {
	// 	try {
	// 		const response = await fetch('http://localhost:3000/api/user', {
	// 			//'https://auth-nascar.garaza.tech/api/user', {
	// 			credentials: 'include'
	// 		});
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			user = data.user;
	// 			console.log('User data retrieved:', user);
	// 		} else {
	// 			console.log('Authentication failed, redirecting to login');
	// 			window.location.href = '/login';
	// 		}
	// 	} catch (error) {
	// 		console.error('Auth check failed:', error);
	// 		window.location.href = '/login';
	// 	} finally {
	// 		loading = false;
	// 	}
	// }

	// function handleLogout() {
	// 	window.location.href = 'http://localhost:3000/api/logout';
	// }

	onMount(() => {
		appState.page = 'breakdown';
		// checkAuth();
	});
</script>

<!-- <div class="worker-container">
	{#if loading}{:else if user}
		<VideoPlayer />
	{/if}
	
</div> -->
<VideoPlayer />

<style>
</style>
