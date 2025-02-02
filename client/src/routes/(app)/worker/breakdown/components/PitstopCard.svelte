<script>
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import Playback from './Playback.svelte';

	let {
		videoElement,
		currentTime = $bindable(),
		paused = $bindable(),
		selectedPanel = $bindable(),
		selectedTemplate = $bindable(),
		duration,
		frameRate,
		handleFileUpload
	} = $props();
	let isExtended = $state(false);
	let speedVideo = $state('1');
</script>

<div id="pitstop" class="card" class:extended={isExtended}>
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
	{#if isExtended}
		<div id="settings-extension">
			<select name="speed" id="speed-select" bind:value={speedVideo}>
				<option value="0.5">0.5x</option>
				<option value="1">1x</option>
				<option value="1.5">1.5x</option>
				<option value="2">2x</option>
			</select>

			<select name="template" id="template-select" bind:value={selectedTemplate}>
				<option value="4 Tire">4 Tire</option>
				<option value="2 RS">2 RS</option>
				<option value="2 LS">2 LS</option>
				<option value="Fuel Only">Fuel Only</option>
			</select>

			<select name="panel" id="panel-select" bind:value={selectedPanel}>
				<option value="OH">OH</option>
				<option value="E1">E1</option>
				<option value="E2">E2</option>
				<option value="E3">E3</option>
			</select>
		</div>
	{/if}
	<Playback
		video={videoElement}
		bind:currentTime
		bind:paused
		bind:selectedPanel
		bind:isExtended
		bind:speedVideo
		{duration}
		{frameRate}
		on:keydown={(e) => e.preventDefault()}
	/>
</div>

<style>
	#pitstop {
		display: flex;
		flex-direction: column;
		gap: 15px;
		&.extended {
			height: auto;
		}
	}
	#pitstop-container {
		width: 100%;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: row;
		gap: 15px;
	}
	.pitstop-card {
		height: 70px;
		/* transition: all 0.2s ease-in-out; */
		position: relative;
		padding: 10px;
		background-color: var(--main-background);
		border: var(--border1);
		border-radius: var(--border-radius2);
		cursor: pointer;
		&:hover {
			/* transition: all 0.2s ease-in-out; */
			background-color: rgb(240, 240, 240);
			/* transform: scale(1.05); */
		}
	}
	#car-info-card {
		width: auto;
		box-sizing: border-box;

		/* transition: all 0.2s ease-in-out; */

		&:hover {
			/* transition: all 0.2s ease-in-out; */
		}

		> label {
			box-sizing: border-box;
			/* building-block-size: 100%; */
			width: 50px;
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
		opacity: 0;
		top: 10px;
		left: 10px;
		position: absolute;
		height: auto;
		color: grey;
		line-height: 1;
	}
	#stop-info-card {
		box-sizing: border-box;
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
			line-height: 1;
			color: grey;
			font-size: 1.1rem;
			width: 100%;
			/* height: 100%; */
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: left;
			/* gap: 3px; */
		}
	}
	#settings-extension {
		/* height: 45px; */
		/* background-color: var(--main-background); */
		/* border-radius: var(--border-radius2); */
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;

		gap: 15px;
		> select {
			height: 30px;
			width: 100%;
			color: var(--font-color);
			color: grey;
			font-size: 1.1rem;
			border-radius: var(--border-radius2);
			line-height: 1;
			margin: 0;
			background-color: var(--main-background);
			outline: none;
			border: var(--border1);
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			/* appearance: none; */
			outline: none;
			> option {
				text-align: center;
			}
		}
	}

	.pitstop-number-big {
		color: var(--stop-number-color);
		font-size: 2.3rem;
		font-weight: 500;
		/* height: 100%; */
	}
	.pitstop-number-mid {
		font-size: 2.3rem;
		font-weight: 500;
		color: var(--stop-number-color);
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
	}
</style>
