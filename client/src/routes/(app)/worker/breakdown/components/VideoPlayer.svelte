<script>
	import { onMount } from 'svelte';

	import MetricView from './Metrics.svelte';
	import Page from '../+page.svelte';
	import PitstopCard from './PitstopCard.svelte';

	let pageElement;

	// video data
	let videoElement = $state(null);
	let currentTime = $state(0.0);
	let paused = $state(true);
	let duration = $state(null);
	const frameRate = 25;
	const frameDuration = 1 / frameRate;

	// metrics data
	let selectedMetric = $state('car_stop');
	let keyboardMetricAction = $state({});

	// work timer data
	let timerDisplay = $state('0:00');
	let stopwatchInterval;
	let elapsedTime = $state(0);

	// template data
	const templates = ['4 Tire', '2 RS', '2 LS', 'Fuel Only'];
	let selectedTemplate = $state('4 Tire');

	// panels data
	let videosForPanels = [];
	let selectedPanel = $state('OH');
	const panelNames = ['OH', 'E1', 'E2', 'E3'];
	let panels = {
		OH: null,
		E1: null,
		E2: null,
		E3: null
	};

	// video background
	let videoBackground;
	let canvas;
	let ctx1;
	let frameCounter = 0;

	//
	const updateCanvas = () => {
		if (frameCounter % 5 === 0) {
			ctx1.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
		}
		frameCounter++;
		videoElement.requestVideoFrameCallback(updateCanvas);
	};

	function handleFileUpload(event) {
		const files = Array.from(event.target.files);
		if (files.length > 4) {
			alert('You can only upload up to 4 videos.');
			return;
		}
		videosForPanels = files.map((file) => URL.createObjectURL(file));
		videoElement.src = videosForPanels[0];
		paused = true;
		selectedMetric = 'car_stop';

		startStopwatch();
	}

	function startStopwatch() {
		if (stopwatchInterval) clearInterval(stopwatchInterval);
		elapsedTime = 0;
		timerDisplay = '0:00';
		stopwatchInterval = setInterval(() => {
			elapsedTime++;
			const minutes = Math.floor(elapsedTime / 60);
			const seconds = elapsedTime % 60;
			timerDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
		}, 1000);
	}

	function playBackward() {
		currentTime = Math.max(currentTime - frameDuration * 2, 0);
	}
	let isPlayingBackward = null;
	let upDownKeyLimit = null;
	function handleKeydown(event) {
		// console.log(`Key pressed: ${event.code}`);
		event.preventDefault();
		event.stopPropagation();
		switch (event.code) {
			case 'ArrowRight':
				if (event.repeat) {
					if (paused) {
						videoElement.play();
					}
					return;
				}
				stepFrame(1);
				break;
			case 'ArrowLeft':
				if (event.repeat) {
					if (!isPlayingBackward) {
						isPlayingBackward = setInterval(playBackward, frameDuration * 2.5 * 1000);
					}
					return;
				}
				stepFrame(-1);
				break;
			case 'ArrowDown':
				if (event.shiftKey) {
					keyboardMetricAction = { key: 'next_tag' };
					paused = true;
					return;
				}
				if (event.repeat) {
					if (!upDownKeyLimit) {
						keyboardMetricAction = { key: 'next' };
						upDownKeyLimit = setTimeout(() => {
							upDownKeyLimit = null;
						}, 100);
					}
					paused = true;
					return;
				}
				keyboardMetricAction = { key: 'next' };
				paused = true;
				break;
			case 'ArrowUp':
				if (event.shiftKey) {
					keyboardMetricAction = { key: 'previous_tag' };
					paused = true;
					return;
				}
				if (event.repeat) {
					if (!upDownKeyLimit) {
						keyboardMetricAction = { key: 'previous' };
						upDownKeyLimit = setTimeout(() => {
							upDownKeyLimit = null;
						}, 100);
					}
					paused = true;
					return;
				}
				keyboardMetricAction = { key: 'previous' };
				paused = true;
				break;
			case 'Space':
				if (event.repeat) return;
				if (!duration) return;
				paused ? videoElement.play() : videoElement.pause();
				break;
			case 'KeyR':
			case 'F1':
				if (event.repeat) return;
				currentTime = 0;
				break;
			case 'F2':
				if (event.repeat) return;
				currentTime = Math.max(currentTime - 5, 0);
				break;
			case 'F3':
				if (event.repeat) return;
				currentTime = Math.max(currentTime - 2, 0);
				break;
			case 'F4':
				if (event.repeat) return;
				currentTime = Math.min(currentTime + 2, duration);
				break;
			case 'F5':
				if (event.repeat) return;
				currentTime = Math.min(currentTime + 5, duration);
				break;
			case 'Tab':
				if (event.repeat) return;
				if (event.shiftKey) {
					keyboardMetricAction = { key: 'previous' };
					break;
				}
				keyboardMetricAction = { key: 'next' };
				break;
			case 'Enter':
				if (event.repeat) return;
				keyboardMetricAction = { key: 'enter' };
				break;
			case 'Backspace':
			case 'Delete':
				if (event.repeat) return;
				keyboardMetricAction = { key: 'delete' };
				break;
			case 'KeyF':
				console.log('fullscreen');
				if (event.repeat) return;
				if (document.fullscreenElement) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					}
				} else {
					if (pageElement.requestFullscreen) {
						pageElement.requestFullscreen();
					} else if (pageElement.webkitRequestFullscreen) {
						pageElement.webkitRequestFullscreen();
					}
				}
				break;
			case 'KeyL':
				if (event.repeat) return;
				if (event.ctrlKey) {
					switchSide();
				}
				break;
		}
	}

	function handleKeyup(event) {
		if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
			if (isPlayingBackward) {
				clearInterval(isPlayingBackward);
				isPlayingBackward = null;
			}
			videoElement.pause();
		} else if (event.code === 'ArrowDown' || 'ArrowUp') {
			// keyboardMetricAction = { key: null };
		}
	}

	function stepFrame(direction) {
		currentTime += direction * frameDuration;
		videoElement.pause();
	}

	function changeTemplate(event) {
		selectedTemplate = event.target.value;
	}

	function changePanel(panel) {
		selectedPanel = panel;
		videoElement.src = videosForPanels[panelNames.indexOf(panel)];
	}

	let isLeftMetrics = false;
	function switchSide() {
		const main = document.querySelector('main');
		const left = document.querySelector('#left');
		const right = document.querySelector('#right');
		if (isLeftMetrics) {
			isLeftMetrics = false;
			main.style.gridTemplateColumns = '1fr 320px';
			left.style.gridArea = 'right';
			right.style.gridArea = 'left';
		} else {
			isLeftMetrics = true;
			main.style.gridTemplateColumns = '320px 1fr';
			left.style.gridArea = 'left';
			right.style.gridArea = 'right';
		}
	}

	onMount(() => {
		pageElement = document.documentElement;
		// canvas = document.querySelector('canvas');

		// videoElement.onloadeddata = () => {
		// 	canvas.width = videoElement.videoWidth;
		// 	canvas.height = videoElement.videoHeight;
		// 	ctx1 = canvas.getContext('2d');
		// 	videoElement.requestVideoFrameCallback(updateCanvas);
		// };
	});
</script>

<svelte:window on:keyup={handleKeyup} on:keydown={handleKeydown} />

<main>
	<div id="left">
		<div id="header" class="card">
			<div id="header-buttons">
				<button class="settings-button" id="finished-button">
					<img src="/assets/check.png" alt="Switch side" />
				</button>
				<button class="settings-button">
					<img src="/assets/question_mark.png" alt="Switch side" />
				</button>
				<!-- <button class="settings-button" onclick={switchSide}>
					<img src="/assets/ios-settings.png" alt="Switch side" />
				</button> -->
			</div>
		</div>
		<div class="card">
			<PitstopCard
				{videoElement}
				bind:currentTime
				bind:paused
				bind:selectedPanel
				bind:selectedTemplate
				{duration}
				{frameRate}
				{handleFileUpload}
			/>
		</div>

		<div id="left_metrics" class="left_part card">
			<svelte:boundary onerror={(error) => console.error(error)}>
				<MetricView
					bind:selectedMetric
					bind:currentTime
					keyboard={keyboardMetricAction}
					{duration}
					template={selectedTemplate}
				/>

				{#snippet failed(error, reset)}
					<p>{error.message}</p>
					<button onclick={reset}>Try again</button>
				{/snippet}
			</svelte:boundary>
		</div>
	</div>

	<div id="right">
		<div id="video_container" class="card">
			<video
				bind:this={videoElement}
				bind:currentTime
				bind:paused
				bind:duration
				preload="metadata"
				muted
			>
			</video>
			<canvas id="video_background"></canvas>
		</div>
	</div>
</main>

<style>
	main {
		box-sizing: border-box;
		height: 100%;
		min-height: 480px;
		width: 100%;
		padding: 15px;
		display: grid;
		grid-template-columns: 1fr 320px;
		/* grid-template-rows: 1fr; */
		grid-template-areas: 'left right';
		gap: 15px;
		background-color: var(--main-background);
		color: var(--main-color);
		font-family: var(--main-font);
	}

	#left,
	#right {
		box-sizing: border-box;
		height: calc(100vh - 30px);
		min-height: 450px;
		width: 100%;
		display: grid;
		gap: 15px;
	}
	#left {
		width: 320px;
		max-width: 320px;
		grid-area: right;
		grid-template-rows: auto auto 1fr;
	}
	#right {
		grid-area: left;
		/* grid-template-rows: 1fr auto; */
	}

	.card {
		box-sizing: border-box;
		background-color: var(--main-dark);

		border-radius: var(--border-radius1);
		padding: var(--card-padding);
		border: var(--border-card);

		/* background-color: rgb(198, 198, 198);
		border: 1px solid rgb(192, 192, 192); */
	}

	button {
		background-color: var(--button-color-dark);
		border: none;
		color: white;
		font-family: var(--main-font);

		cursor: pointer;
		/* transition: all 0.2s ease-in-out; */
		&:hover {
			background-color: var(--main-light);
			color: var(--background-color);
			/* transition: all 0.2s ease-in-out; */
		}
	}

	.settings-button {
		box-sizing: border-box;
		line-height: 1;
		height: 45px;
		width: 45px;
		margin: 0;
		padding: 0;
		background-color: var(--main-background);
		border-radius: 50%;
		border: var(--border1);

		display: flex;
		justify-content: center;
		align-items: center;
		> img {
			filter: invert(0.5);
			height: 30px;
		}

		&#finished-button {
			> img {
				height: 40px;
			}
		}
	}

	#header {
		padding: 7.5px;
		height: 60px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	#header-buttons {
		display: flex;
		gap: 5px;
	}

	/* #work {
	} */

	#left_metrics {
		width: 100%;
		overflow-y: hidden;
		padding-right: 5px;
	}

	#work_buttons_cont {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	#video_container {
		box-sizing: border-box;
		position: relative;
		padding: 0;
		overflow: hidden;
		height: 100%;
		min-width: 500px;
		background-color: var(--video-background);
		border: var(--border-card);

		> #video_background {
			width: 100%;
			height: 100%;
			overflow: hidden;
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-size: cover;
			background-position: center;
			filter: blur(50px);
			transform: scale(3);
			/* z-index: 1; */
		}

		> video {
			height: 100%;
			width: 100%;
			object-fit: contain;
			position: absolute;
			z-index: 2;
		}
		&:hover .panel-select {
			> select {
				background-color: var(--main-dark);
			}
		}
	}

	#video_controls {
		/* padding-block: 0; */
		/* height: 120px; */
	}

	#work_info {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		gap: 10px;
	}
	#work_timer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#work_timer_text {
		font-size: 2rem;
		padding: 0;
		margin: 0;

		> span {
			font-size: 1.5rem;
		}
	}

	#work_buttons_cont {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 5px;
	}

	.template-select {
		padding: 0;
		display: flex;
		align-items: center;
		font-size: 1.4rem;
		width: 100%;
	}

	.template-select select {
		height: 40px;
		width: 100%;
		padding: 5px;
		background-color: var(--main-dark);
		border: none;
		color: var(--main-text);
		font-family: var(--main-font);
		font-size: 1.4rem;
		border-radius: 20px;
		cursor: pointer;
		/* transition: all 0.2s ease-in-out; */
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		text-align-last: center;

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

	/* #settings_container {
		width: 305px;
		padding: 0;
		background-color: transparent;
		gap: 15px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		> * {
			margin: auto;
		}
	} */
</style>
