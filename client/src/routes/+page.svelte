<script>
  import VideoPlayer from './components/VideoPlayer.svelte';
  import MetricView from './components/MetricView.svelte';
  import Playback from './components/Playback.svelte';

  let helloMessage = '';

  //Funkcije za testiranje konekcije na server
  async function testFetch() {
    try {
      const response = await fetch('http://localhost:3000/hello'); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      helloMessage = await response.text();
    } catch (error) {
      console.error('Error fetching hello message:', error);
    }
  }

  
  testFetch();

</script>

<div class="container">
  <div><h2>Project 2025</h2></div>
  <div>CORS sljaka: {helloMessage}</div>
  <VideoPlayer/>
 
  <!-- <MetricView /> -->
  
</div>

<style>
  .container {
      display: flex;
      flex-direction: column; 
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
  }
</style>
