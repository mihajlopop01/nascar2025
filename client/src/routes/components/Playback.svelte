<script>
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let video; 
  const dispatch = createEventDispatcher(); //funkcija za trigerovanje custom eventa timeUpdate
  let playbackSpeed = 1; 
  let progress = 0; 
  let timeDisplay = '0:00.000'; 

  function handlePlay() {
    video.play();
  }

  function handlePause() {
    video.pause();
  }

  function changeSpeed(event) {
    playbackSpeed = event.target.value;
    video.playbackRate = playbackSpeed; 
  }

  function updateProgress() {
    if (video.duration) {
      progress = (video.currentTime / video.duration) * 100; 
      timeDisplay = formatTimeWithMilliseconds(video.currentTime); 
      dispatch('timeUpdate', timeDisplay);
    }
  }

  function formatTimeWithMilliseconds(time) {
    const date = new Date(time * 1000);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;
  }
  //funkcija za pomeranje progress bar-a
  function seek(event) {
    const seekTime = (event.target.value / 100) * video.duration; 
    video.currentTime = seekTime; 
  }

  onMount(() => {
    if (video) {
      video.addEventListener('timeupdate', updateProgress);
    }
  });

  onDestroy(() => {
    if (video) {
      video.removeEventListener('timeupdate', updateProgress);
    }
  });
</script>
<h4>Playback</h4>
<div class="playback-container">

  <input type="range" min="0" max="100" value={progress} on:input={seek} class="progress-bar" />
  <div class="controls">
    <button on:click={handlePlay}>Play</button>
    <button on:click={handlePause}>Pause</button>
    <div class="speed-control">
      <label for="speed">Speed:</label>
      <select id="speed" on:change={changeSpeed}>
        <option value="0.5">0.5x</option>
        <option value="1" selected>1x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
    </div>
    <div class="time-display">{timeDisplay}</div>
  </div>
</div>

<style>
  .playback-container {
    display: flex;
    flex-direction: column; 
    gap: 1rem; 
    border: solid 1px;
    padding: 5px;
  }

  .controls {
    display: flex; 
    align-items: center; 
    gap: 1rem; 
  }

  .progress-bar {
    width: 100%; 
  }

  .speed-control {
    display: flex;
    align-items: center; 
  }

  .time-display {
    font-family: monospace; 
  }
</style>