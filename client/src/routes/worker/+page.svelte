<script>
	import { onMount } from 'svelte';
	import VideoPlayer from '../components/VideoPlayer.svelte';

	let user = null;
	let loading = true;

	async function checkAuth() {
		try {
			const response = await fetch('http://localhost:3000/api/user', {
				credentials: 'include' // Omogucava da cookie bude poslat u requestu
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

<!-- <div class="worker-container">
      {#if loading}
        <p>Loading...</p>
      {:else if user}
        <h1>Welcome, {user.displayName}</h1>
        <button on:click={handleLogout}>Logout</button>
        <VideoPlayer/>
      {:else}
        <p>Please log in to access</p>
      {/if}
    </div>
    
    <style>
      .worker-container {
        padding: 20px;
      }
    </style>  -->

<div class="container">
	{#if loading}
		<p>Loading...</p>
	{:else if user}
		<aside class="sidebar">
			<h2>Asphalt Workbench</h2>
			<ul>
				<li><a href="/worker/breakdown">Breakdown</a></li>
				<li><a href="/worker/support">Support</a></li>
			</ul>
		</aside>
		<main class="content">
			<h1>Dashboard</h1>
			<p>Soon...</p>
			<button on:click={handleLogout}>Logout</button>
		</main>
	{:else}
		<p>Please log in to access</p>
	{/if}
</div>

<style>
	.container {
		display: flex;
	}
	.sidebar {
		width: 200px;
		background-color: #f4f4f4;
		padding: 20px;
	}
	.content {
		flex: 1;
		padding: 20px;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		margin: 10px 0;
	}
	a {
		text-decoration: none;
		color: #007bff;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
