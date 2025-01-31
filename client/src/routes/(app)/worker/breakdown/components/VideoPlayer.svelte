<script>
	import { onMount } from 'svelte';
	import Playback from './Playback.svelte';
	import MetricView from './Metrics.svelte';
	import Page from '../+page.svelte';

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
						videoElement.playbackRate = 1;
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
		canvas = document.querySelector('canvas');

		videoElement.onloadeddata = () => {
			canvas.width = videoElement.videoWidth;
			canvas.height = videoElement.videoHeight;
			ctx1 = canvas.getContext('2d');
			videoElement.requestVideoFrameCallback(updateCanvas);
		};
	});
</script>

<svelte:window on:keyup={handleKeyup} on:keydown={handleKeydown} />

<main>
	<div id="left">
		<div id="pitstop" class="card">
			<div id="pitstop-container">
				<div class="pitstop-card" id="car-info-card">
					<div class="pitstop-card-header">Car</div>
					<label>
						<span class="pitstop-number-big">42</span>
						<input type="file" accept="video/*" multiple onchange={handleFileUpload} />
					</label>
				</div>
				<div class="pitstop-card" id="stop-info-card">
					<div class="pitstop-card-header">Stop</div>
					<div id="stop-info-number">
						<span class="pitstop-number-mid">3</span>
					</div>
					<div id="stop-info-content">
						<span class="">Lap 12</span>
						<span class="">12.3s</span>
						<span class="">4 Tire</span>
					</div>
				</div>
			</div>

			<style>
				#pitstop-container {
					width: 100%;
					margin: 0;
					padding: 0;
					display: flex;
					flex-direction: row;
					gap: 15px;
				}
				.pitstop-card {
					transition: all 0.2s ease-in-out;
					position: relative;
					padding: 10px;
					background-color: var(--main-light);
					border-radius: 10px;
					cursor: pointer;
					&:hover {
						transition: all 0.2s ease-in-out;
						background-color: rgb(240, 240, 240);
						/* transform: scale(1.05); */
					}
				}
				#car-info-card {
					width: auto;
					box-sizing: border-box;

					transition: all 0.2s ease-in-out;

					&:hover {
						transition: all 0.2s ease-in-out;
					}

					> label {
						box-sizing: border-box;
						/* building-block-size: 100%; */
						width: 70px;
						cursor: pointer;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						margin-block: auto;
						text-align: center;
						> input[type='file'] {
							display: none;
						}
					}
				}
				.pitstop-card-header {
					top: 10px;
					left: 10px;
					position: absolute;
					height: auto;
					color: grey;
					line-height: 1;
				}
				#stop-info-card {
					box-sizing: border-box;
					height: 100%;
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					gap: 12px;

					> #stop-info-number {
						box-sizing: border-box;
						width: 70px;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						/* gap: 5px; */
						margin: 0;
						padding-inline: 10px;
						text-align: center;
					}
					> #stop-info-content {
						color: grey;
						font-size: 1.2rem;
						/* font-weight: 500; */
						width: 100%;
						/* height: 100%; */
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: left;
						gap: 3px;
					}
				}

				.pitstop-number-big {
					color: black;
					font-size: 2.5rem;
					font-weight: 500;
					/* height: 100%; */
				}
				.pitstop-number-mid {
					font-size: 2.5rem;
					font-weight: 500;
					color: grey;
				}
				.pitstop-label-small {
					font-size: 1.2rem;
					color: grey;
				}

				#pitstop-expansion {
					box-sizing: border-box;
					z-index: -1;
					position: absolute;
					right: 0;
					top: 0;
					width: 225px;
					height: 100%;
					opacity: 0;
					transition: all 0.3s ease;
					pointer-events: none;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					gap: 15px;
					padding: 15px;
					padding-left: 0;

					> #template-select-card,
					> #panel-select-card {
						box-sizing: border-box;
						height: 100%;
						width: 100%;
						padding: 10px;
					}
				}
				#pitstop:focus #pitstop-expansion {
					opacity: 1;
					pointer-events: auto;
					transition: all 0.3s ease;
				}
			</style>
		</div>

		<div id="work" class="card" style="height: 130px;">
			<button onclick={switchSide}>Switch side</button>
			<!-- <div id="work_info" style="visibility: hidden;">
				<div id="pitstop-timeline">
					<div class="pitstop-timeline-text">start</div>
					<div class="pitstop-timeline-moment">23:45</div>
					<div class="pitstop-timeline-moment">23:45</div>
					<div class="pitstop-timeline-moment">23:55</div>
					<div class="pitstop-timeline-text">goal</div>
				</div>
				<div id="work_timer">
					<span id="work_timer_text"><span>🟢</span>{timerDisplay}</span>
					<span>Petar Jovanovic</span>
				</div>
				<div id="work_buttons_cont">
					<button class="work_button">Help</button>
					<button class="work_button">Submit</button>
				</div>
			</div> -->
		</div>
		<!-- <div id="settings_container" class="card">
			<div class="template-select">
				<select id="stop-type" onchange={changeTemplate}>
					{#each templates as template}
						<option value={template} selected={template === selectedTemplate}>{template}</option>
					{/each}
				</select>
			</div>
		</div> -->
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
			<div class="panel-select">
				<select id="video-panel" onchange={changePanel}>
					{#each panelNames as panel}
						<option value={panel} selected={panel === selectedPanel}>{panel}</option>
					{/each}
				</select>
			</div>
		</div>

		<div id="video_controls" class="card">
			<Playback
				video={videoElement}
				bind:currentTime
				bind:paused
				{duration}
				{frameRate}
				on:keydown={(e) => e.preventDefault()}
			/>
		</div>
	</div>
</main>

<style>
	main {
		box-sizing: border-box;
		height: 100%;
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
		width: 100%;
		display: grid;
		gap: 15px;
	}
	#left {
		grid-area: right;
		grid-template-rows: auto auto 1fr;
	}
	#right {
		grid-area: left;
		grid-template-rows: 1fr auto;
	}

	.card {
		box-sizing: border-box;
		background-color: var(--main-dark);
		border-radius: 20px;
		padding: 15px;
		border: 1px solid rgb(214, 214, 214);
	}

	button {
		background-color: var(--button-color-dark);
		border: none;
		color: white;
		font-family: var(--main-font);
		padding: 5px;
		border-radius: 5px;
		width: 100%;

		cursor: pointer;
		transition: all 0.2s ease-in-out;
		&:hover {
			background-color: var(--main-color);
			color: var(--background-color);
			transition: all 0.2s ease-in-out;
		}
	}

	/* .left_part {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	} */

	#pitstop {
		display: flex;
		flex-direction: row;
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
		min-height: 500px;
		min-width: 500px;
		background-color: rgb(105, 105, 105);
		border: 1px solid rgb(80, 80, 80);

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
			z-index: 1;
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
		padding-block: 0;
		height: 40px;
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
		transition: all 0.2s ease-in-out;
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

	.panel-select {
		position: absolute;
		top: 0;
		right: 0;
		height: auto;
		width: 60px;
		z-index: 10;
		margin: 15px;
		> select {
			background-color: rgba(130, 130, 130, 0.5);
			width: 100%;
			height: auto;
			border: none;
			border-radius: 10px;
			padding-block: 7px;
			padding-inline: 10px;
			line-height: 1;
			font-size: 1.4rem;
			cursor: pointer;
			transition: all 0.2s ease-in-out;
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
