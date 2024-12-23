<script>
  import VideoPlayer from './components/VideoPlayer.svelte';
  import MetricView from './components/MetricView.svelte';
  import Playback from './components/Playback.svelte';

</script>

<div class="container">
  <div><h2>Project 2025</h2></div>
  <VideoPlayer/>
  <MetricView />
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
