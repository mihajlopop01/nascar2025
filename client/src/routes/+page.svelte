<script>
  import { onMount } from 'svelte';
  
// async function checkAuth() {
// try {
//   const response = await fetch('http://localhost:3000/api/user', {
//     credentials: 'include'
//   });
//   if (response.ok) {
//     return true;
//   }
// } catch (error) {
//   console.error('Auth check failed:', error);
// }
// return false;
// }
  
// onMount(async () => {
//      if (await checkAuth()) {
//       window.location.href = '/worker'; // Use navigate instead of goto
//      }
//  });

  function handleGoogleLogin() {
    window.location.href = 'http://localhost:3000/auth/google';
  }
</script>

<div class="login-container">
  <h1>Welcome to Asphalt Workbench</h1>
  <button onclick={handleGoogleLogin}>
    Login with Google
  </button>
</div>

<style>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  button {
    padding: 10px 20px;
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #357abd;
  }
</style>