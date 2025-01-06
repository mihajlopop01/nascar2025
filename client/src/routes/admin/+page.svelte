<script>
    import { onMount } from 'svelte';
  
    let user = null;
    let loading = true;
    let isAuthorized = false; // Track if the user is authorized

    async function checkAuth() {
        try {
            const response = await fetch('http://localhost:3000/api/user', {
                credentials: 'include' // Ensure cookies are sent with the request
            });
            if (response.ok) {
                const data = await response.json();
                user = data.user; // Set user data if authenticated
                console.log('User data retrieved:', user); // Log user data for debugging

                // Check if the user has the correct role
                if (user.role === 'ADMIN') {
                    isAuthorized = true; // Set authorized to true if the user is an admin
                } else {
                    console.log('Access denied, redirecting to login'); // Log if access is denied
                    window.location.href = '/'; // Redirect to login if not an admin
                }
            } else {
                console.log('Authentication failed, redirecting to login'); // Log if authentication fails
                window.location.href = '/'; // Redirect to login if not authenticated
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            window.location.href = '/'; // Redirect to login on error
        } finally {
            loading = false; // Set loading to false after the check
        }
    }
      
    onMount(() => {
        checkAuth(); // Check if the user is authenticated when the component mounts
    });

    function handleLogout() {
        window.location.href = 'http://localhost:3000/api/logout';
    }
</script>

{#if loading}
    <p>Loading...</p>
{:else if isAuthorized}
    <h1>Welcome to Admin Dashboard</h1>
    <button on:click={handleLogout}>Logout</button>
    <!-- Admin dashboard content goes here -->
{:else}
    <p>Please log in to access this page.</p>
{/if}