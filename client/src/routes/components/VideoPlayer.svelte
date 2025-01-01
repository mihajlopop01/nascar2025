<script>
  import { onMount } from 'svelte';
  import MetricView from './MetricView.svelte';
  import Playback from './Playback.svelte';

  let video; 
  let currentCellIndex = 0;
  let timeDisplay = '0:00.000';
  const frameDuration = 0.03; 
  const cellNames = ['carStop', 'rsUp', 'rsDrop', 'lsUp', 'lsDrop', 'rfNutOffStart', 'rfClear', 'rfMount', 'rfNutOnFinish', 'lfNutOffStart', 'lfClear', 'lfMount', 'lfNutOnFinish', 'rrNutOffStart', 'rrClear', 'rrMount', 'rrNutOnFinish', 'lrNutOffStart', 'lrClear', 'lrMount', 'lrNutOnFinish', 'rsPeg', 'dropoff', 'lsPeg'];
  let videos = []; // Niz videa sa panela
  let currentPanel = 'OH'; 
  const panelNames = ['OH', 'E1', 'E2', 'E3'];

  function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    if (files.length > 4) {
      alert('You can only upload up to 4 videos.');
      return;
    }
    videos = files.map(file => URL.createObjectURL(file)); 
    video.src = videos[0]; // Prvi video kao defaultni
  }

  function handleKeydown(event) {
    if (event.repeat) return;  
    switch (event.code) {
      case 'ArrowRight':
        event.preventDefault();
        stepFrame(1); 
        break;
      case 'ArrowLeft':
        event.preventDefault();
        stepFrame(-1); 
        break;
        case 'Space':
                event.preventDefault();
                video.paused ? video.play() : video.pause();
                break;

            case 'F4':
              event.preventDefault();
              video.currentTime = Math.min(video.currentTime + 2, video.duration);
              break;

            case 'F5':
              event.preventDefault();
              video.currentTime = Math.min(video.currentTime + 5, video.duration);
              break

            case 'F3':
              event.preventDefault();
              video.currentTime = Math.max(video.currentTime - 2, 0);
              break;

            case 'F2':
              event.preventDefault();
              video.currentTime = Math.max(video.currentTime - 5, 0);
              break;
            case 'F1':
              event.preventDefault();
              video.currentTime = 0;
              break; 

            case 'Enter':
              event.preventDefault();
              const cellName = cellNames[currentCellIndex];
              if (currentCellIndex >= 0 && currentCellIndex < cellNames.length) {
                console.log(`Enter pressed. Current cell index: ${currentCellIndex}, Time display: ${timeDisplay}`);
                //Inicijalizujemo custom evente updateTimeDisplay koji ce komponenta MetricView da osluskuje
                const event = new CustomEvent('updateTimeDisplay', {
                  detail: { timeDisplay }
                });
                dispatchEvent(event); 
              }
              break;
    }
  }
//Funkcija za navigaciju frejmova
  function stepFrame(direction) {
    video.currentTime += direction * frameDuration;
    video.pause();
  }

  function switchPanel(panel) {
    currentPanel = panel; 
    video.src = videos[panelNames.indexOf(panel)]; 
    video.play(); //Ako zelimo da odmah krene video
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="panel-selector">
  {#each panelNames as panel}
    <button 
      class:selected={currentPanel === panel} 
      onclick={() => switchPanel(panel)}
    >
      {panel}
    </button>
  {/each}
</div>
<div class="video-container">
  <input type="file" accept="video/*" multiple onchange={handleFileUpload} />
  
  <video 
    bind:this={video}
    muted
  >
    <track kind="captions" src="" label="English" />
  </video>

  <Playback {video} on:timeUpdate={e => timeDisplay = e.detail}/> 
  <MetricView {currentCellIndex} />
</div>


<style>
  .video-container {
    max-width: 100%; 
    margin: 0 auto;
  }

  .panel-selector {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .panel-selector button {
    padding: 0.5rem 1rem;
  }

  .panel-selector button.selected {
    background-color: rgb(0, 238, 255); 
  }

  video {
    width: 100%; 
    height: auto;
  }
</style>
