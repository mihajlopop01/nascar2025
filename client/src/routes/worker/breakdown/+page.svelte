<script>
	import { onMount } from 'svelte';
	import VideoPlayer from '../../components/VideoPlayer.svelte';

	let user = null;
	let loading = true;

	async function checkAuth() {
		try {
			const response = await fetch('http://localhost:3000/api/user', {
				credentials: 'include'
			});
			if (response.ok) {
				const data = await response.json();
				user = data.user;
				console.log('User data retrieved:', user);
			} else {
				console.log('Authentication failed, redirecting to login');
				window.location.href = '/'; // Redirekcija na login
			}
		} catch (error) {
			console.error('Auth check failed:', error);
			window.location.href = '/';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		checkAuth();
	});

	function handleLogout() {
		window.location.href = 'http://localhost:3000/api/logout';
	}
</script>

<div class="worker-container">
	{#if loading}
		<p>Loading...</p>
	{:else if user}
		<!-- <h1>Welcome, {user.displayName}</h1>
		<button on:click={handleLogout}>Logout</button> -->
		<VideoPlayer />
	{:else}
		<p>Please log in to access</p>
	{/if}
</div>

<style>
</style>
