<script>
  import { onMount } from 'svelte';
	import MetricView from './MetricView.svelte';
	import Playback from './Playback.svelte';

  let video;
  let currentCellIndex = 0;
  let timeDisplay = '0:00.000';
  const frameDuration = 0.03;
  const cellNames = ['carStop', 'rsUp', 'rsDrop', 'lsUp', 'lsDrop', 'rfNutOffStart', 'rfClear', 'rfMount', 'rfNutOnFinish', 'lfNutOffStart', 'lfClear', 'lfMount', 'lfNutOnFinish', 'rrNutOffStart', 'rrClear', 'rrMount', 'rrNutOnFinish', 'lrNutOffStart', 'lrClear', 'lrMount', 'lrNutOnFinish', 'rsPeg', 'dropoff', 'lsPeg']; // Include all metrics

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      video.src = fileURL;
    }
  }

//funkcija za hendlovanje manipulacije frejmova i prečica
  function handleKeydown(event) {
       if (event.repeat) return;  
        switch (event.code) {
            case 'ArrowRight':
            case 'ArrowLeft':
                event.preventDefault();
                const direction = event.code === 'ArrowRight' ? 1 : -1;
                
                video.pause();
                video.currentTime = Math.max(0, Math.min(
                    video.currentTime + (frameDuration * direction),
                    video.duration
                ));
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
              if (currentCellIndex < cellNames.length) {
              const cell = document.querySelector(`td[name="${cellNames[currentCellIndex]}"]`);
              if (cell) {
              cell.textContent = timeDisplay;
              currentCellIndex++;
          }
        }
              break;
    }
  }

  // onMount(() => {
  //   video.addEventListener('timeupdate', () => {
  //   });
  // });
</script>

<svelte:window on:keydown={handleKeydown}/>
<div class="video-container">
  <input type="file" accept="video/*" on:change={handleFileUpload}>
  
  <video 
  bind:this={video}
  width="800"
  height="600"
  muted
>
  <track kind="captions" src="" label="English" />
</video>

<!-- Postavljamo event listener za timeUpdate event iz Playback komponente. Kada se desi timeUpdate event poziva se updateProgress() funkcija
 koja azurira timeDisplay varijablu -->
<Playback {video} on:timeUpdate={e => timeDisplay = e.detail}/> </div>


<style>
  .video-container {
    max-width: 840px;
    margin: 0 auto;
  }

  video {
    width: 100%;
    height: auto;
  }

</style>