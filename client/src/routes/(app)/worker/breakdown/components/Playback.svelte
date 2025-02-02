<script>
	import { onMount, untrack } from 'svelte';

	// let playbackSpeed = 1;
	let {
		video,
		currentTime = $bindable(),
		paused = $bindable(),
		duration,
		frameRate,
		isExtended = $bindable(),
		selectedPanel = $bindable(),
		speedVideo = $bindable()
	} = $props();

	let progressBar,
		progressBarTrack,
		progressBarWidth = $state(),
		callbackId;

	const panelNames = ['OH', 'E1', 'E2', 'E3'];

	$effect(() => {
		if (!video) return;
		video.playbackRate = speedVideo;
	});

	$effect(() => {
		if (paused) return;
		untrack(() => {
			currentTime -= 0.0000000001;
			// currentTime -= 0.004;
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
		if (!duration) return;
		const rect = progressBarTrack.getBoundingClientRect();
		const offsetX = e.clientX - rect.left;
		currentTime = (offsetX / rect.width) * duration;
		paused = true;
	};

	onMount(() => {
		// callbackId = video.requestVideoFrameCallback(gg);

		const videoLoadedHandler = () => {
			console.log('video loaded');
			video.playbackRate = speedVideo;
		};
		if (video) video.addEventListener('durationchange', videoLoadedHandler);

		return () => {
			video.cancelVideoFrameCallback(callbackId);
			video.removeEventListener('durationchange', videoLoadedHandler);
		};
	});
</script>

<div class="playback-container">
	<div id="upper">
		<div
			role
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
	</div>
	<div class="controls">
		<button
			onclick={() => {
				duration ? (paused = !paused) : {};
			}}
			aria-label={paused ? 'play' : 'pause'}
			tabindex="-1"
		>
			<img
				src={paused ? '/assets/play_button.png' : '/assets/pause_button.png'}
				alt={paused ? 'Play' : 'Pause'}
			/>
		</button>
		<div class="time-display">{currentTime.toFixed(2).padStart(5, '0')}</div>
		<button class="settings" onclick={() => (isExtended = !isExtended)}>
			<img src="/assets/ios-settings.png" alt="Settings" />
		</button>

		<!-- <div class="time-display" id="duration-time">
			{video && duration ? duration.toFixed(2).padStart(5, '0') : '00.00'}
		</div> -->
	</div>

	<!-- <div class="speed-control">
			<label for="speed">Speed:</label>
			<select id="speed" on:change={changeSpeed}>
				<option value="0.5">0.5x</option>
				<option value="1" selected>1x</option>
				<option value="1.5">1.5x</option>
				<option value="2">2x</option>
			</select>
		</div> -->
	<!-- <div class="panel-select">
		<select id="video-panel" onchange={() => {}}>
			{#each panelNames as panel}
				<option value={panel} selected={panel === selectedPanel}>{panel}</option>
			{/each}
		</select>
	</div> -->

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

		--primary-font-color: grey;
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
		/* height: 100%; */
		display: flex;
		flex-direction: column;
	}
	#progress-bar-wrapper {
		box-sizing: border-box;
		margin-block: auto;
		background-color: var(--progress-bar-track-color);
		border: var(--border-progress-bar);
		border-radius: 6px;
		position: relative;
		overflow: hidden;
		height: 12px;
		width: 100%;
		cursor: pointer;
	}
	#progress-bar2 {
		padding: 0;
		margin: 0;
		border-radius: inherit;
		height: 100%;
		width: 100%;
		position: absolute;
		left: -100%;
		background-color: var(--progress-bar-color);
		transition: transform 50ms linear;
	}

	.playback-container {
		/* height: 100%; */
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	button {
		height: 100%;
		background-color: transparent;
		border: none;
		font-family: var(--mono-font);
		display: flex;
		justify-content: center;
		align-items: center;

		cursor: pointer;
		transition: all 0.2s ease-in-out;
		&:hover {
			background-color: var(--main-color);
			color: var(--background-color);
			transition: all 0.2s ease-in-out;
		}
		&:focus {
			outline: none;
		}

		> img {
			height: 23px;
			filter: var(--playback-button-color);
		}
	}

	.time-display {
		color: var(--playback-control-color);
		line-height: 1;
		font-family: var(--mono-font);
		font-size: 1.6rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.panel-select {
		/* position: absolute; */
		top: 0;
		right: 0;
		height: auto;
		/* width: 60px; */
		/* z-index: 10; */
		/* margin: 15px; */
		> select {
			background-color: rgba(130, 130, 130, 0.5);
			/* width: 100%; */
			height: auto;
			border: none;
			border-radius: 20px;
			padding-block: 7px;
			padding-inline: 10px;
			line-height: 1;
			font-size: 1.2rem;
			cursor: pointer;
			/* transition: all 0.2s ease-in-out; */
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			&:hover {
				outline: none;
			}

			&:focus {
				outline: none;
			}

			> option {
				text-align: center;
			}
		}
	}

	.settings,
	button {
		width: 50px;
	}

	.settings {
		> img {
			margin-left: auto;
			height: 30px;
			filter: var(--playback-button-color);
		}
	}
</style>
