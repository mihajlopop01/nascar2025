<script>
	import { onMount } from 'svelte';
	import MetricView from './MetricView.svelte';
	import Playback from './Playback.svelte';
	import MetricView2 from '../worker/breakdown/components/Metrics.svelte';

	let page;

	let selectedMetric = $state('car_stop');
	let timestamp = $state(null);

	let selectedTemplate = $state('4 Tire');
	const templates = ['4 Tire', '2 RS', '2 LS', 'Fuel Only'];
	let video = $state(null);
	let currentCellIndex = $state(0);
	let currentTime = $state(0.0);
	let paused = $state(true);
	let duration = $state(null);

	let keyboardMetricAction = $state({});

	let timerDisplay = $state('0:00');
	let stopwatchInterval;
	let elapsedTime = $state(0);

	const frameRate = 25;
	const frameDuration = 1 / frameRate;
	const cellNames = [
		'carStop',
		'rsUp',
		'rsDrop',
		'lsUp',
		'lsDrop',
		'rfNutOffStart',
		'rfClear',
		'rfMount',
		'rfNutOnFinish',
		'lfNutOffStart',
		'lfClear',
		'lfMount',
		'lfNutOnFinish',
		'rrNutOffStart',
		'rrClear',
		'rrMount',
		'rrNutOnFinish',
		'lrNutOffStart',
		'lrClear',
		'lrMount',
		'lrNutOnFinish',
		'rsPeg',
		'dropoff',
		'lsPeg'
	];
	let videos = []; // Niz videa sa panela
	let currentPanel = $state('OH');
	let current_metric = $state(null);
	const panelNames = ['OH', 'E1', 'E2', 'E3'];
	let videoBackground;

	let canvas;
	let ctx1;
	let frameCounter = 0;
	let progressBar;
	const updateCanvas = () => {
		if (frameCounter % 5 === 0) {
			ctx1.drawImage(video, 0, 0, canvas.width, canvas.height);
			// let p = ctx.getImageData(0, 0, 100, 100).data;
			// background.style.backgroundColor = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
		}
		frameCounter++;
		video.requestVideoFrameCallback(updateCanvas);
		// progressBar.style.transform = `translateX(${frameCounter}px)`;
	};

	onMount(() => {
		page = document.documentElement;
		canvas = document.querySelector('canvas');

		video.onloadeddata = () => {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			ctx1 = canvas.getContext('2d');
			video.requestVideoFrameCallback(updateCanvas);
		};
	});

	function handleFileUpload(event) {
		currentTime = 0.0;

		const files = Array.from(event.target.files);
		if (files.length > 4) {
			alert('You can only upload up to 4 videos.');
			return;
		}
		videos = files.map((file) => URL.createObjectURL(file));
		video.src = videos[0];
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
		currentTime = Math.max(currentTime - frameDuration * 2.5, 0);
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
						video.playbackRate = 1;
						video.play();
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
				paused ? video.play() : video.pause();
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
					if (page.requestFullscreen) {
						page.requestFullscreen();
					} else if (page.webkitRequestFullscreen) {
						page.webkitRequestFullscreen();
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
			video.pause();
		} else if (event.code === 'ArrowDown' || 'ArrowUp') {
			// keyboardMetricAction = { key: null };
		}
	}

	function stepFrame(direction) {
		currentTime += direction * frameDuration;
		video.pause();
	}

	function changeTemplate(event) {
		selectedTemplate = event.target.value;
	}

	function changePanel(panel) {
		currentPanel = panel;
		video.src = videos[panelNames.indexOf(panel)];
		video.play();
	}
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
						<!-- <span class="pitstop-label-small">Prior 1</span> -->
						<input type="file" accept="video/*" multiple onchange={handleFileUpload} />
					</label>
				</div>
				<div class="pitstop-card" id="stop-info-card">
					<div class="pitstop-card-header">Stop</div>
					<div id="stop-info-number">
						<span class="pitstop-number-mid">3</span>
						<!-- <span class="pitstop-label-small">L: 12</span> -->
					</div>
					<div id="stop-info-content">
						<span class="">Lap 12</span>
						<span class="">12.3s</span>
						<span class="">4 Tire</span>
					</div>
				</div>
			</div>
			<div id="pitstop-expansion"></div>
			<style>
				#pitstop-container {
					margin: 0;
					padding: 0;
					width: 275px;
					height: 100px;
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
						/* background-color: white; */
						transform: scale(1.05);
					}
				}
				#car-info-card {
					/* height: 100%; */
					width: AuthenticatorAssertionResponse;
					box-sizing: border-box;

					transition: all 0.2s ease-in-out;

					&:hover {
						transition: all 0.2s ease-in-out;
						/* background-color: white; */
						transform: scale(1.05);
					}

					> label {
						box-sizing: border-box;
						building-block-size: 100%;
						width: 70px;
						cursor: pointer;
						height: 100%;
						/* padding-inline: 10px; */
						/* padding-block: 7px; */
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						/* gap: 5px; */
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
					width: 180px;
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
					color: var(--main-green);
					font-size: 2.2rem;
					font-weight: bold;
					/* height: 100%; */
				}
				.pitstop-number-mid {
					font-size: 2.2rem;
					font-weight: bold;
					color: grey;
				}
				.pitstop-label-small {
					font-size: 1.2rem;
					color: grey;
				}

				#pitstop-expansion {
				}
			</style>
		</div>

		<div id="work" class="card">
			<!-- <div class="left_part_header">
				<h3 class="left_part_title">Work Tracker</h3>
			</div> -->
			<div id="work_info" style="visibility: hidden;">
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
			</div>
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
				<MetricView2
					bind:selectedMetric
					bind:currentTime
					keyboard={keyboardMetricAction}
					{duration}
					template={selectedTemplate}
				/>

				<!-- prop snippet -->
				{#snippet failed(error, reset)}
					<p>{error.message}</p>
					<button onclick={reset}>Try again</button>
				{/snippet}
			</svelte:boundary>
		</div>
	</div>

	<div id="right">
		<div id="video_container" class="card">
			<video bind:this={video} bind:currentTime bind:paused bind:duration preload="metadata" muted>
				<!-- <source src="/video.mp4" type="video/mp4" /> -->
			</video>
			<canvas id="video_background"></canvas>
			<div class="panel-select">
				<select id="video-panel" onchange={changePanel}>
					{#each panelNames as panel}
						<option value={panel} selected={panel === currentPanel}>{panel}</option>
					{/each}
				</select>
			</div>
		</div>

		<div id="video_controls" class="card">
			<Playback {video} bind:currentTime bind:paused {duration} {frameRate} />
		</div>
	</div>
</main>

<style>
	main {
		padding: 7.5px;
		display: grid;
		grid-template-columns: 320px 1fr;
		/* gap: 5px; */
		background-color: var(--main-background);
		color: var(--main-color);
		font-family: var(--main-font);
	}

	#left,
	#right {
		height: calc(100vh - 15px);
		display: grid;
	}
	#left {
		grid-column: 1;
		grid-template-rows: auto auto auto 1fr;
	}
	#right {
		grid-column: 2;
		grid-template-rows: 1fr auto;
	}

	.card {
		background-color: var(--main-dark);
		/* box-shadow: var(--box-shadow); */
		border-radius: 20px;
		padding: 15px;
		margin: 7.5px;
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

	.left_part {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.left_part_header {
		height: 23px;
		line-height: 1;
		margin-bottom: 5px;
		margin-right: 10px;
		margin-bottom: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.left_part_title {
		font-size: 1.1rem;
		font-weight: 400;
		/* margin-top: 1px; */
		margin: 0;
		margin-top: -2px;
		margin-left: 2px;
		color: grey;
	}

	#database {
		> * {
			width: calc(100% - 20px);
		}
	}
	#pitstop {
		background-color: rgb(164, 164, 164);
		z-index: 10;
		width: 275px;
		position: relative;
		/* overflow: hidden; */
		transition: all 0.2s ease;

		&:hover {
			width: 500px;
			transition: all 0.2s ease;
			/* position: absolute; */
		}
	}

	#work {
		width: 275px;
	}

	#left_metrics {
		width: 285px;
		overflow-y: hidden;
		padding-right: 5px;
	}

	#work_buttons_cont {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	#stop_info {
		gap: 15px;
		padding: 0;
		margin: 0;
		width: 275px;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;

		> #stop_info_car {
		}
		> #stop_info_stop {
		}

		> .stop_info_text {
			cursor: pointer;
			/* display: flex;
			justify-content: flex-start; */
			margin: 0;
			padding: 0;
			height: 100%;

			> div,
			label {
				margin: 0;
				background-color: var(--main-background);
				width: 100%;
				height: 100%;
				border-radius: 10px;
				/* padding-block: 10px; */
				/* padding-inline: 15px; */
				line-height: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 5px;

				> .stop_info_text_label {
					font-size: 1.2rem;
					font-weight: 400;
				}
				> .stop_info_text_content {
					font-size: 2.4rem;
					font-weight: bold;
				}
			}
		}
	}

	#car-info-card {
	}
	#stop-info-card {
		> #stop-info-number {
		}
		> #stop_info_content {
		}
	}

	#stop_info_content {
		padding-block: 7px;
		/* padding-inline: 10px; */
		width: 90px;
		background-color: var(--main-background);
		/* border: 1px solid rgb(200, 200, 200); */
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;

		> .stop_info_text_content {
			padding-block: 2px;
			width: 100%;
			font-size: 1.4rem;
			/* border-bottom: 1px solid rgb(200, 200, 200); */
			&:last-child {
				border-bottom: none;
			}
			&:nth-child(5) {
				border-bottom: none;
			}
		}
	}

	#video_container {
		position: relative;
		padding: 0;
		overflow: hidden;
		min-height: 500px;
		min-width: 500px;

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
			background-color: rgb(76, 76, 76);
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

	/* Toni */
	.panel_selector {
		position: absolute;
		bottom: 5px;
		left: 0;
		width: 100%;
		z-index: 2;
		display: flex;
		justify-content: space-around;
	}

	.panel_selector button {
		flex: 1;
		margin: 2px 5px;
	}

	.file-upload-button {
		/* border: none;
		font-family: var(--main-font);
		padding: 10px;
		margin: 0;
		border-radius: 10px;
		text-align: center;
		
		transition: all 0.2s ease-in-out;
		display: inline-block; */
		cursor: pointer;

		&:hover {
			background-color: rgb(178, 178, 178);
			color: var(--background-color);
		}

		input[type='file'] {
			display: none;
		}
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
		bottom: 0px;
		right: 0px;
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

	#settings_container {
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
	}
</style>
