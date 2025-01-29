<script>
	import { onMount, onDestroy, untrack } from 'svelte';

	// let playbackSpeed = 1;
	let { video, currentTime = $bindable(), paused = $bindable(), duration, frameRate } = $props();

	let progressBar,
		progressBarTrack,
		progressBarWidth = $state(),
		callbackId;

	$effect(() => {
		if (paused) return;
		untrack(() => {
			currentTime -= 0.004;
		});
	});

	$effect(() => {
		currentTime;
		progressBarWidth;
		requestAnimationFrame(() => {
			progressBar.style.transform = `translateX(${(currentTime / duration) * progressBarWidth}px)`;
		});
	});

	const handleMouseMove = (e) => {
		const rect = progressBarTrack.getBoundingClientRect();
		const offsetX = e.clientX - rect.left;
		currentTime = (offsetX / rect.width) * duration;
		paused = true;
	};

	onMount(() => {
		// callbackId = video.requestVideoFrameCallback(gg);

		const videoLoadedHandler = () => {
			console.log('video loaded');
		};
		video.addEventListener('durationchange', videoLoadedHandler);

		return () => {
			video.cancelVideoFrameCallback(callbackId);
			video.removeEventListener('durationchange', videoLoadedHandler);
		};
	});
</script>

<div class="playback-container">
	<div class="controls">
		<button
			onclick={() => {
				duration ? (paused = !paused) : {};
			}}
			aria-label={paused ? 'play' : 'pause'}
		>
			<img
				height="30px"
				src={paused ? '/assets/play.png' : '/assets/pause.png'}
				alt={paused ? 'Play' : 'Pause'}
			/>
		</button>
		<!-- <div class="speed-control">
			<label for="speed">Speed:</label>
			<select id="speed" on:change={changeSpeed}>
				<option value="0.5">0.5x</option>
				<option value="1" selected>1x</option>
				<option value="1.5">1.5x</option>
				<option value="2">2x</option>
			</select>
		</div> -->
		<div class="time-display">{currentTime.toFixed(2).padStart(5, '0')}</div>
	</div>
	<!-- <input
		type="range"
		min="0"
		max={video?.duration || 0}
		bind:value={currentTime}
		class="progress-bar"
		step="0.1"
		onclick={(e) => video.pause()}
		onkeydown={(e) => e.preventDefault()}
	/> -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div id="upper">
		<div
			onmousedown={handleMouseMove}
			bind:this={progressBarTrack}
			id="progress-bar-wrapper"
			bind:clientWidth={null,
			() => {
				progressBarWidth = progressBarTrack.clientWidth;
			}}
		>
			<div bind:this={progressBar} id="progress-bar2"></div>
		</div>
		<!-- <div id="progress-bar-wrapper">
			<div bind:this={progressBar11} id="progress-bar2"></div>
		</div> -->
	</div>

	<div class="time-display">
		{video && duration ? duration.toFixed(2).padStart(5, '0') : '00.00'}
	</div>

	<!-- <button aria-label="settings">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="20px"
			viewBox="0 -960 960 960"
			width="20px"
			fill="black"
			class="nav-icon"
		>
			<path
				d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
			/>
		</svg>
	</button> -->
</div>

<style>
	:root {
		--primary-accent-color: var(--main-green);
		--secondary-accent-color: var(--light-green);

		--primary-font-color: black;
		--secondary-font-color: grey;

		--card-color: var(--main-light);
		--card-background-color: var(--main-dark);

		--time-field-color: var(--main-dark);
		--metric-list-border-color: var(--main-dark);

		--progress-bar-color: var(--main-green);
		--progress-bar-track-color: var(--main-background);
	}

	#upper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	#progress-bar-wrapper {
		padding: 0;
		margin-block: auto;
		background-color: var(--progress-bar-track-color);
		border-radius: 5px;
		position: relative;
		overflow: hidden;
		height: 10px;
		width: 100%;
		cursor: pointer;
	}
	#progress-bar2 {
		padding: 0;
		margin: 0;
		border-radius: 5px;
		height: 100%;
		width: 100%;
		position: absolute;
		left: -100%;
		background-color: var(--progress-bar-color);
		transition: transform 50ms linear;
	}

	.playback-container {
		height: 100%;
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	button {
		background-color: transparent;
		/* background-color: black; */
		border: none;
		color: white;
		font-family: var(--main-font);

		cursor: pointer;
		transition: all 0.2s ease-in-out;
		&:hover {
			background-color: var(--main-color);
			color: var(--background-color);
			transition: all 0.2s ease-in-out;
		}
	}

	.progress-bar {
		margin-inline: 0;
		margin-block: auto;
		padding: 0;
		appearance: none;
		-webkit-appearance: none;
		width: 100%;
		height: 10px;
		cursor: pointer;
		/* height: 10px; */
		background-color: var(--progress-bar-track-color);
		outline: none;
		overflow: hidden;
		border-radius: 10px;

		/* &::-webkit-slider-runnable-track {
			height: 20px;
			background: #ccc;
			border-radius: 10px;
			overflow: hidden;
		} */

		&::-webkit-slider-thumb {
			-webkit-appearance: none;
			appearance: none;
			width: 10px;
			height: 10px;
			background-color: var(--progress-bar-color);
			border-radius: 50%;
			cursor: pointer;
			box-shadow: -1005px 0 0 1000px var(--progress-bar-color);
		}
	}

	.speed-control {
		display: flex;
		align-items: center;
	}

	.time-display {
		color: var(--primary-font-color);
		line-height: 1;
		font-family: monospace;
		font-size: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
