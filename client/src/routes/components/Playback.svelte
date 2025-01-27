<script>
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	// export let video;
	const dispatch = createEventDispatcher(); //funkcija za trigerovanje custom eventa timeUpdate
	let playbackSpeed = 1;
	// let progress = $state(0.0);
	let timeDisplay = $state('00.000');
	let isPlaying = $state(false);
	let { video, currentTime = $bindable(), paused = $bindable() } = $props();

	$effect(() => {
		if (video) {
			if (video.paused) {
				isPlaying = false;
			} else {
				isPlaying = true;
			}
			// progress = (currentTime / video.duration) * 100;
			timeDisplay = formatTime(currentTime);
		}
	});

	function changeSpeed(event) {
		playbackSpeed = event.target.value;
		video.playbackRate = playbackSpeed;
	}

	function formatTime(time) {
		const totalSeconds = Math.floor(time);
		const milliseconds = Math.floor((time % 1) * 1000);
		return `${totalSeconds < 10 ? '0' : ''}${totalSeconds}.${milliseconds.toString().padStart(3, '0')}`;
	}

	// function seekProgressBar(event) {
	// 	const seekTime = (event.target.value / 100) * video.duration;
	// 	video.currentTime = seekTime;
	// }
</script>

<div class="playback-container">
	<div class="controls">
		<button onclick={() => (paused = !paused)} aria-label={paused ? 'play' : 'pause'}>
			{#if isPlaying}
				<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" fill="black">
					<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" fill="black">
					<path d="M3 22V2l18 10L3 22z" />
				</svg>
			{/if}
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
		<div class="time-display">{timeDisplay}</div>
	</div>
	<input
		type="range"
		min="0"
		max={video?.duration || 0}
		bind:value={currentTime}
		class="progress-bar"
		step="0.1"
		onclick={(e) => video.pause()}
		onkeydown={(e) => e.preventDefault()}
	/>
	<button aria-label="Settings"
		><svg
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
		</svg></button
	>
</div>

<style>
	.playback-container {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		/* padding: 5px; */
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	button {
		background-color: transparent;
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
		background-color: var(--main-background);
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
			background-color: rgb(188, 188, 188);
			border-radius: 50%;
			cursor: pointer;
			box-shadow: -1005px 0 0 1000px rgb(188, 188, 188);
		}
	}

	.speed-control {
		display: flex;
		align-items: center;
	}

	.time-display {
		line-height: 1;
		font-family: monospace;
		font-size: 1.5rem;
	}
</style>
