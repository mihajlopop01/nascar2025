<script>
	import { onMount } from 'svelte';
	import MetricView from './MetricView.svelte';
	import Playback from './Playback.svelte';
	import MetricView2 from '../worker/breakdown/components/Metrics.svelte';

	let selectedMetric = $state('Car Stop');
	let timestamp = $state(null);

	let selectedTemplate = $state('4 Tire');
	const templates = ['4 Tire', '2 RS', '2 LS', 'Fuel Only'];
	let video = $state(null);
	let currentCellIndex = $state(0);
	let currentTime = $state(0.0);
	let paused = $state(true);
	let duration = $state(0);

	let keyboardMetricAction = $state(null);

	let timerDisplay = $state('0:00');
	let stopwatchInterval;
	let elapsedTime = $state(0);

	let frameRate = 23.98;
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

	function handleFileUpload(event) {
		currentTime = 0.0;

		const files = Array.from(event.target.files);
		if (files.length > 4) {
			alert('You can only upload up to 4 videos.');
			return;
		}
		videos = files.map((file) => URL.createObjectURL(file));
		video.src = videos[0];

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
	var isPlayingBackward;

	function handleKeydown(event) {
		event.preventDefault();
		event.stopPropagation();
		switch (event.code) {
			case 'ArrowRight':
				stepFrame(1);
				break;
			case 'ArrowLeft':
				stepFrame(-1);
				break;
			case 'ArrowDown':
				if (event.repeat) return;
				video.play();
				break;
			case 'ArrowUp':
				if (event.repeat) return;
				isPlayingBackward = setInterval(playBackward, frameDuration * 2.5 * 1000);
				break;
			case 'Space':
				if (event.repeat) return;
				paused ? video.play() : video.pause();
				break;
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
				if (event.shiftKey) {
					keyboardMetricAction = 'previous';
				}
				if (event.repeat) return;
				keyboardMetricAction = 'next';
				break;
			case 'Enter':
				if (event.repeat) return;
				keyboardMetricAction = 'enter';
				break;
		}
	}

	function handleKeyup(event) {
		if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
			event.preventDefault();
			event.stopPropagation();
			if (isPlayingBackward) {
				clearInterval(isPlayingBackward);
			}
			video.pause();
		}
	}

	function stepFrame(direction) {
		currentTime += direction * frameDuration;
		video.pause();
	}

	function changeTemplate(event) {
		selectedTemplate = event.target.value;
	}

	function switchPanel(panel) {
		currentPanel = panel;
		video.src = videos[panelNames.indexOf(panel)];
		video.play();
	}
</script>

<svelte:window on:keyup={handleKeyup} on:keydown={handleKeydown} />

<main>
	<div id="left">
		<div id="database" class="card">
			<!-- <button class="controls_button" onclick={open_pitstops}>Pit Stop Database</button> -->
			<label class="file-upload-button">
				Upload Videos
				<input type="file" accept="video/*" multiple onchange={handleFileUpload} />
			</label>
		</div>

		<div id="pitstop" class="card">
			<div class="left_part_header">
				<h3 class="left_part_title">Pit Stop</h3>
			</div>
			<div id="stop_info">
				<div id="stop_info_header">
					<div class="stop_info_text">
						<span class="stop_info_text_content">42</span>
						<span class="stop_info_text_label">Car</span>
					</div>
					<div class="stop_info_text">
						<span class="stop_info_text_content">3</span>
						<span class="stop_info_text_label">Stop</span>
					</div>
				</div>
				<div id="stop_info_content">
					<span class="stop_info_text_content">Lap</span>
					<span class="stop_info_text_content">12</span>
					<span class="stop_info_text_content">Dur</span>
					<span class="stop_info_text_content">12.3s</span>
					<span class="stop_info_text_content">Type</span>
					<span class="stop_info_text_content">4W</span>
				</div>
			</div>
		</div>

		<div id="work" class="card">
			<div class="left_part_header">
				<h3 class="left_part_title">Work Tracker</h3>
			</div>
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

		<div id="left_metrics" class="left_part card">
			<div class="left_part_header">
				<h3 class="left_part_title">Metrics</h3>

				<div class="template-select">
					<select id="stop-type" onchange={changeTemplate}>
						{#each templates as template}
							<option value={template} selected={template === selectedTemplate}>{template}</option>
						{/each}
					</select>
				</div>
			</div>

			<svelte:boundary onerror={(error) => console.error(error)}>
				<MetricView2 {selectedMetric} {currentTime} />

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
			<video bind:this={video} bind:currentTime bind:paused bind:duration muted track></video>
		</div>
		<div id="video_controls" class="card">
			<Playback {video} bind:currentTime bind:paused />
		</div>
	</div>
</main>

<style>
	main {
		padding: 7.5px;
		display: grid;
		grid-template-columns: 350px 1fr;
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
	}
	#pitstop {
	}

	#work {
	}

	#left_metrics {
		overflow-y: hidden;
		padding-right: 5px;
	}

	#work_buttons_cont {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	#stop_info {
		display: grid;
		grid-template-columns: 2fr 1fr;
	}

	#stop_info_header {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;

		> .stop_info_text {
			line-height: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			> .stop_info_text_label {
				font-size: 1.2rem;
				font-weight: 500;
			}
			> .stop_info_text_content {
				font-size: 2rem;
				font-weight: bold;
			}
		}
	}
	#stop_info_content {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;

		> .stop_info_text_content {
			font-size: 1.2rem;
		}
	}

	#video_container {
		justify-content: center;
		align-items: center;
		height: auto;
		width: auto;
		> video {
			border-radius: 10px;
			height: 100%;
			width: 100%;
			object-fit: contain;
		}
	}

	#video_controls {
		/* height: 100%; */
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
		background-color: rgb(208, 208, 208);
		border: none;
		color: grey;
		font-family: var(--main-font);
		padding: 10px;
		margin: 0;
		border-radius: 10px;
		text-align: center;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		display: inline-block;

		&:hover {
			background-color: rgb(178, 178, 178);
			color: var(--background-color);
		}

		input[type='file'] {
			display: none;
		}
	}

	.template-select select {
		background-color: var(--main-background);
		background-color: rgb(208, 208, 208);
		/* background-color: var(--main-dark); */
		/* border: 2px solid rgb(211, 211, 211); */
		border: none;
		color: rgb(104, 104, 104);
		color: grey;
		font-family: var(--main-font);
		font-size: 1.1rem;
		/* width: 105px; */
		padding-block: 2px;
		padding-inline: 3px;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		/* -webkit-appearance: none;
		-moz-appearance: none;
		appearance: none; */
		/* text-align-last: center; */

		&:hover {
			/* background-color: rgb(182, 182, 182); */
			/* color: black; */
		}

		&:focus {
			outline: none;
		}

		> option {
			text-align: center;
		}
	}
</style>
