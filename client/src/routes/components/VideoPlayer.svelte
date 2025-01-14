<script>
	import { onMount } from 'svelte';
	import MetricView from './MetricView.svelte';
	import Playback from './Playback.svelte';

	let video = $state(null);
	let currentCellIndex = 0;
	let timeDisplay = '0:00.000';
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
	let currentPanel = 'OH';
	const panelNames = ['OH', 'E1', 'E2', 'E3'];

	function handleFileUpload(event) {
		const files = Array.from(event.target.files);
		if (files.length > 4) {
			alert('You can only upload up to 4 videos.');
			return;
		}
		videos = files.map((file) => URL.createObjectURL(file));
		video.src = videos[0];
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

	function switchPanel(panel) {
		currentPanel = panel;
		video.src = videos[panelNames.indexOf(panel)];
		video.play(); //Ako zelimo da odmah krene video
	}

	// Pera
	let metrics = $state([
		{
			tag: 'General',
			metrics: {
				'Car Stop': null,
				'RS Up': null,
				'RS Drop': null,
				'LS Up': null,
				'LS Drop': null,
				'Car Goes': null
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
			tag: 'Pegs',
			metrics: {
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
				Other: null,
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

<!-- <div class="panel-selector">
	{#each panelNames as panel}
		<button class:selected={currentPanel === panel} onclick={() => switchPanel(panel)}>
			{panel}
		</button>
	{/each}
</div> -->
<div class="video-container">
	<!-- <input type="file" accept="video/*" multiple onchange={handleFileUpload} /> -->

	<!-- <video bind:this={video} muted>
		<track kind="captions" src="" label="English" />
	</video> -->

	<!-- <Playback {video} on:timeUpdate={(e) => (timeDisplay = e.detail)} /> -->
	<!-- <MetricView {currentCellIndex} /> -->
</div>

<!-- Pera -->
<div>
	<div id="body">
		<div id="left" class="section">
			<div id="left_controls" class="left_part">
				<button class="controls_button" onclick={open_pitstops}>Pit Stop Database</button>
				<input type="file" accept="video/*" multiple onchange={handleFileUpload} />
			</div>
			<div id="left_pitstop" class="left_part">
				<div class="left_part_header">
					<h3 class="left_part_title">Pit Stop</h3>
					<button id="button_edit_stop" class="left_part_header_button" onclick={stop_settings}
						>?</button
					>
				</div>
				<div id="stop_info">
					<div class="stop_info_text">
						<span class="stop_info_text_label">Car:</span>
						<span class="stop_info_text_content">42</span>
					</div>
					<div class="stop_info_text">
						<span class="stop_info_text_label">Stop:</span>
						<span class="stop_info_text_content">3</span>
					</div>
					<div class="stop_info_text">
						<span class="stop_info_text_label">Lap:</span>
						<span class="stop_info_text_content">12</span>
					</div>
					<div class="stop_info_text">
						<span class="stop_info_text_label">Time:</span>
						<span class="stop_info_text_content">23:45</span>
					</div>
					<div class="stop_info_text">
						<span class="stop_info_text_label">Dur:</span>
						<span class="stop_info_text_content">12.33</span>
					</div>
					<div class="stop_info_text">
						<span class="stop_info_text_title">Type:</span>
						<span class="stop_info_text_content">4 Wheel</span>
					</div>
				</div>
			</div>
			<div id="left_work_info" class="left_part">
				<div class="left_part_header">
					<h3 class="left_part_title">Work Tracker</h3>
					<button class="left_part_header_button" onclick={work_settings}>?</button>
				</div>
				<div id="work_info">
					<div id="work_timer">
						<span id="work_timer_text"><span>🟢</span> 2:33m</span>
						<span>Petar Jovanovic</span>
					</div>
					<div id="work_buttons_cont">
						<button class="work_button" onclick={help_work}>Help</button>
						<button class="work_button" onclick={submit_work}>Submit</button>
					</div>
				</div>
			</div>
			<div id="left_metrics" class="left_part">
				<div class="left_part_header">
					<h3 class="left_part_title">Metrics</h3>
					<button class="left_part_header_button" onclick={metrics_settings}>?</button>
				</div>
				<div id="metrics_cont">
					<!-- {#each metrics as { tag, metrics: metricObj }, index}
						<div class="tag-container">
							<div class="tag-title">{tag}</div>
							<div class="group_metrics_container">
								{#each Object.entries(metricObj) as [metricKey, metricValue]}
									<div class="metric_row">
										<span>{metricKey}:</span>
										{#if metricValue !== null}
											<span>{metricValue}</span>
										{:else}
											<span>00.00</span>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/each} -->

					<MetricView {currentCellIndex} />
				</div>
			</div>
		</div>
		<div id="right" class="section">
			<div id="video_part" class="right_part">
				<div id="video_container">
					<video bind:this={video} muted width="100%">
						<track kind="captions" src="" label="English" />
					</video>
				</div>
			</div>
			<div id="video_controls" class="right_part">
				<Playback {video} on:timeUpdate={(e) => (timeDisplay = e.detail)} />
			</div>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	:root {
		--main-font: 'Poppins', sans-serif;
		--main-color: black;
		--background-color: #aaaaaa;
		--background-color-alt: rgb(145, 145, 145);
		--accent-color: rgb(121, 121, 121);
	}

	:global(*),
	:global(*:before),
	:global(*:after) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font: 'poppins', sans-serif;
		font-weight: 500;
	}

	#body {
		padding: 5px;
		height: 100vh;
		display: grid;
		grid-template-columns: 350px 1fr;
		gap: 5px;
		background-color: var(--background-color-alt);
		color: var(--main-color);
		font-family: var(--main-font);
	}

	.section {
		background-color: var(--accent-color);
		color: var(--main-color);
		border-radius: 20px;
	}
	#left {
		grid-column: 1;
		display: grid;
		/* grid-template-rows: 1fr 3fr 3fr 15fr; */
		gap: 10px;
		height: calc(100vh - 10px);
	}
	#right {
		grid-column: 2;
		display: grid;
		grid-template-rows: 1fr 70px;
		gap: 10px;
	}
	h3 {
		font-size: 1rem;
		font-weight: 500;
	}

	button {
		background-color: #7d7d7d;
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

	.left_part_header_button {
		border-radius: 50%;
		width: 25px;
		height: 25px;
		margin-left: auto;
		background-color: #7d7d7d;
		&:hover {
			background-color: var(--main-color);
			color: var(--background-color);
			transition: all 0.2s ease-in-out;
		}
	}

	#button_edit_stop {
		content: 'Edit';
	}

	.left_part {
		padding: 10px;
		margin: 10px;
		border-radius: 10px;
		background-color: var(--background-color);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.left_part_header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.left_part_title {
		margin: 0;
		color: #555;
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
	}

	#metrics_cont {
		overflow-y: scroll;
		height: 100%;
		gap: 10px;
		border-radius: 10px;
		> * {
			margin-right: 10px;
			margin-bottom: 10px;
		}
	}

	#work_buttons_cont {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	#stop_info {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 10px;
	}

	.tag-container {
		border-radius: 5px;
		padding: 0.5rem;
		background-color: #8c8c8c;
	}

	.group_metrics_container {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.metric_row {
		margin: 5px;
		padding: 5px;
		border-radius: 5px;
		background-color: var(--background-color);
		grid-column: span 2;
		display: grid;
		grid-template-columns: 1fr 1fr;

		cursor: pointer;
	}

	#video_part {
		margin: 10px 10px 0px 10px;
		border-radius: 10px;
		background-color: var(--background-color);
	}

	#video_container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#video_controls {
		margin: 0 10px 10px 10px;
		border-radius: 10px;
		background-color: var(--background-color);
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
		width: 10px;
		border-radius: 5px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 5px;
	}

	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 5px;
		transition: all 0.2s ease-in-out;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #555;
		transition: all 0.2s ease-in-out;
	}
</style>
