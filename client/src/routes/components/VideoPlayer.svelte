<script>
	import { onMount } from 'svelte';
	import MetricView from './MetricView.svelte';
	import Playback from './Playback.svelte';

	let selectedTemplate = $state('4 Tire'); // Default template

	const templates = ['4 Tire', '2 RS', '2 LS', 'Fuel Only'];

	let video = $state(null);
	let currentCellIndex = $state(0);
	let timeDisplay = '0:00.000';
	let timerDisplay = $state('0:00');

	let stopwatchInterval;
	let elapsedTime = $state(0);

	const frameDuration = 0.03;
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
	const panelNames = ['OH', 'E1', 'E2', 'E3'];

	function handleFileUpload(event) {
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
				break;

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
					console.log(
						`Enter pressed. Current cell index: ${currentCellIndex}, Time display: ${timeDisplay}`
					);
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

	function changeTemplate(event) {
		selectedTemplate = event.target.value;
	}

	function switchPanel(panel) {
		currentPanel = panel;
		video.src = videos[panelNames.indexOf(panel)];
		video.play(); //Ako zelimo da odmah krene video
	}

	// Pera
	let metrics = $state([
		{
			tag: 'Entry',
			metrics: {
				'Car Stop': '01.11',
				'RS Up': '02.22',
				'RS Drop': '03.33',
				'LS Up': '04.44',
				'LS Drop': '05.55',
				'Car Goes': '06.66'
			}
		},
		{
			tag: 'RF',
			metrics: {
				'Nut Off Start': 12.33,
				Clear: null,
				Mount: null,
				'Not On Finish': null
			}
		},
		{
			tag: 'LF',
			metrics: {
				'Nut Off Start': null,
				Clear: null,
				Mount: null,
				'Not On Finish': null
			}
		},
		{
			tag: 'RR',
			metrics: {
				'Nut Off Start': null,
				Clear: null,
				Mount: null,
				'Not On Finish': null
			}
		},
		{
			tag: 'LR',
			metrics: {
				'Nut Off Start': null,
				Clear: null,
				Mount: null,
				'Not On Finish': null
			}
		},
		{
			tag: 'General',
			metrics: {
				'Car Entry': null,
				'RS Peg': null,
				Dropoff: null,
				'LS Peg': null
			}
		},
		{
			tag: 'Fuel',
			metrics: {
				'Can1 In': null,
				'Can1 Out': null,
				'Can2 In': null,
				'Can2 Out': null,
				'Fuel Added': null,
				'Can1 Valid': null
			}
		},
		{
			tag: 'Other',
			metrics: {
				Category: null
			}
		},
		{
			tag: 'RF',
			metrics: {
				'Nut On Finish': null,
				Pull: null,
				'Nut On Start': null
			}
		},
		{
			tag: 'LF',
			metrics: {
				'Nut On Finish': null,
				Pull: null,
				'Nut On Start': null
			}
		},
		{
			tag: 'RR',
			metrics: {
				'Nut On Finish': null,
				Pull: null,
				'Nut On Start': null
			}
		},
		{
			tag: 'LR',
			metrics: {
				'Nut On Finish': null,
				Pull: null,
				'Nut On Start': null
			}
		},
		{
			tag: 'Wrench',
			metrics: {
				'RS Set': null,
				'RS Complete': null,
				'LS Set': null,
				'LS Complete': null
			}
		},
		{
			tag: 'Position',
			metrics: {
				'Sign X': null,
				'Car X': null,
				'LF Y': null,
				'LR Y': null
			}
		},
		{
			tag: 'Exit',
			metrics: {
				'Car Exit': null
			}
		}
	]);
	let current_metric = $state(null);

	function update_metric(index, metricKey, value) {
		metrics[index].metrics[metricKey] = value;
	}
	function jump_to_metric_time(time) {
		alert('Jump to ' + time);
	}
	function open_pitstops() {
		alert('Open Pitstops');
	}
	function stop_settings() {
		alert('Pit Stop');
	}
	function work_settings() {
		alert('Work Tracker');
	}
	function metrics_settings() {
		alert('Metrics');
	}

	function submit_work() {
		alert('Submit Work');
	}
	function help_work() {
		alert('Help Work');
	}
	function open_video_settings() {
		alert('Open Video Settings');
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
	<div id="left" class="dash-section">
		<div id="left_controls" class="left_part card">
			<!-- <button class="controls_button" onclick={open_pitstops}>Pit Stop Database</button> -->
			<input type="file" accept="video/*" multiple onchange={handleFileUpload} />
		</div>
		<div id="left_pitstop" class="left_part card">
			<div class="left_part_header">
				<h3 class="left_part_title">Pit Stop</h3>
			</div>
			<div id="stop_info">
				<div id="stop_info_header">
					<div class="stop_info_text">
						<span class="stop_info_text_label">Car:</span>
						<span class="stop_info_text_content">42</span>
					</div>
					<div class="stop_info_text">
						<span class="stop_info_text_label">Prior:</span>
						<span class="stop_info_text_content">[1.1]</span>
					</div>
					<div class="stop_info_text">
						<span class="stop_info_text_label">Stop:</span>
						<span class="stop_info_text_content">3.</span>
					</div>
				</div>
				<div id="stop_info_content">
					<span class="stop_info_text_label">Lap</span>
					<span class="stop_info_text_label">Dur</span>
					<span class="stop_info_text_title">Type</span>
					<span class="stop_info_text_content">12</span>
					<span class="stop_info_text_content">12.33</span>
					<span class="stop_info_text_content">4W</span>
				</div>
			</div>
		</div>
		<div id="left_work_info" class="left_part card">
			<div class="left_part_header">
				<h3 class="left_part_title">Work Tracker</h3>
			</div>
			<div id="work_info">
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
					<button class="work_button" onclick={help_work}>Help</button>
					<button class="work_button" onclick={submit_work}>Submit</button>
				</div>
			</div>
		</div>
		<div id="left_metrics" class="left_part card">
			<div class="left_part_header">
				<h3 class="left_part_title">Metrics</h3>
				<label for="stop-type">Type:</label>
				<select id="stop-type" onchange={changeTemplate}>
					{#each templates as template}
						<option value={template} selected={template === selectedTemplate}>{template}</option>
					{/each}
				</select>
			</div>
			<div id="metrics_cont_outer">
				<div id="metrics_cont">
					<!-- ovo ne radi ali radim UI, odkomentarisi ono dole -->
					{#each metrics as { tag, metrics: metricObj }, index}
						<div class="tag-container">
							<div class="tag-title">{tag}</div>
							<div class="group_metrics_container">
								{#each Object.entries(metricObj) as [metricKey, metricValue]}
									<div class="metric_row">
										<span>{metricKey}:</span>
										{#if metricValue !== null}
											<span class="value value-done">{metricValue}</span>
										{:else}
											<span class="value value-empty">00.00</span>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/each}

					<!-- Ovo radi ali je ugaseno da bih radio UI na ovom iznad -->
					<!-- <MetricView {currentCellIndex} {selectedTemplate} /> -->
				</div>
			</div>
		</div>
	</div>

	<div id="right" class="dash-section">
		<div id="video_part" class="right_part card">
			<div id="video_container">
				<video bind:this={video} muted width="100%">
					<track kind="captions" src="" label="English" />
				</video>
			</div>
			<div class="panel_selector">
				{#each panelNames as panel}
					<button class:selected={currentPanel === panel} onclick={() => switchPanel(panel)}>
						{panel}
					</button>
				{/each}
			</div>
		</div>
		<div id="video_controls" class="right_part card">
			<Playback {video} on:timeUpdate={(e) => (timeDisplay = e.detail)} />
		</div>
	</div>
</main>

<style>
	main {
		padding: 5px;
		display: grid;
		grid-template-columns: 350px 1fr;
		/* gap: 5px; */
		background-color: var(--main-background);
		color: var(--main-color);
		font-family: var(--main-font);
		font-weight: 500;
	}

	.dash-section {
		background-color: transparent;
		color: var(--main-color);
		border-radius: 20px;
	}
	#left {
		grid-column: 1;
		display: grid;
		grid-template-rows: auto auto auto 1fr;
		gap: 20px;
		height: calc(100vh - 10px);
	}
	#right {
		grid-column: 2;
		display: grid;
		grid-template-rows: 1fr 100px;
		> :first-child {
			margin-bottom: 0 !important;
		}
	}
	h3 {
		font-size: 1rem;
		font-weight: 500;
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

	.card {
		background-color: var(--main-dark);
		box-shadow: var(--box-shadow);
		border-radius: 20px;
		padding: 15px;
		margin: 10px;
	}

	.left_part {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.left_part_header {
		line-height: 1;
		margin-bottom: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.left_part_title {
		margin: 0;
		color: var(--font-color-mid);
	}

	#left_controls {
		margin-bottom: 0px;
	}
	#left_pitstop {
		margin-bottom: 0;
		margin-top: 0;
	}

	#left_work_info {
		margin-top: 0;
		margin-bottom: 0;
	}

	#left_metrics {
		margin-top: 0;
		overflow-y: hidden;
		padding-right: 5px;
	}

	#metrics_cont_outer {
		overflow-y: scroll;
		margin: 0;
	}

	#metrics_cont {
		/* overflow-y: scroll; */
		overflow: visible;
		/* height: 100%; */
		gap: 15px;
		border-radius: 10px;
		margin-right: 5px;
		> * {
			/* margin-right: 10px; */
			margin-bottom: 15px;
		}
		> :last-child {
			margin-bottom: 0;
		}
	}

	#work_buttons_cont {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	#stop_info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	#stop_info_header {
		gap: 10px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	#stop_info_content {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}

	.tag-container {
		border-radius: 10px;
		padding: 15px;
		padding-inline: 20px;
		background-color: var(--main-background);
	}

	.tag-title {
		font-weight: 600;
		margin-bottom: 3px;
		font-size: 1.2rem;
	}

	.group_metrics_container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		> .metric_row:last-child {
			border-bottom: none;
			padding-bottom: 3px;
		}
		> .metric_row:first-child {
			border-top: none;
			/* padding-top: 0; */
		}
		& :hover {
			> * {
				color: green;
				transition: all 0.2s ease-in-out;
			}
			.value {
				color: green;
				background-color: rgb(199, 233, 199);
			}
			.value-empty {
				color: rgb(159, 210, 159);
			}
		}
	}
	.metric_row {
		font-family: var(--main-font);
		font-weight: 400;
		font-size: 1.1rem;
		margin: 0;
		padding-block: 7px;
		background-color: transparent;
		border-bottom: #e0e0e0 1px solid;
		grid-column: span 2;
		display: grid;
		grid-template-columns: 1fr auto;

		cursor: pointer;

		> * {
			color: black;
			margin: 0;
			padding: 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		/* > :nth-child(2) {
			padding-right: 20px;
		} */

		& .value {
			font-family: 'Roboto Mono', monospace;
			font-size: 1.2rem;
			/* line-height: 0; */
			justify-content: flex-end;

			background-color: var(--main-dark);
			border-radius: 5px;
			padding-block: 2px;
			padding-inline: 5px;

			transition: all 0.2s ease-in-out;
		}
		& .value-empty {
			color: #c2c2c2;
		}
		& .value-done {
			color: black;
		}
	}
	/* .group_metrics_container .metric_row:last-child {
		border-bottom: none;
		padding-bottom: 0;
	} */

	#video_part {
		position: relative;
		z-index: 1;
	}

	#video_container {
		width: 100%;
		/* height: 100%; */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#video_controls {
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

	::-webkit-scrollbar {
		width: 5px;
		border-radius: 5px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 5px;
	}

	::-webkit-scrollbar-thumb {
		background: #cccccc;
		border-radius: 5px;
		transition: all 0.2s ease-in-out;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #898989;
		transition: all 0.2s ease-in-out;
		cursor: pointer;
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
</style>
