<script>  
    import { onMount } from 'svelte'; 
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
                window.location.href = '/'; // Redirect to login
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

<div class="support-container">
    {#if loading}
      <p>Loading...</p>
    {:else if user}
      <h1>Welcome, to support page {user.displayName}</h1>
      <button on:click={handleLogout}>Logout</button>
    {:else}
      <p>Please log in to access</p>
    {/if}
  </div>