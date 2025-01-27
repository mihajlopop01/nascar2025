<script>
	let selectedMetric2 = $state('Car Stop');

	let { selectedMetric = $bindable(), currentTime, template } = $props();
	$effect(() => {
		// console.log('currentTime', currentTime);
	});

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
			tag: 'RF1',
			metrics: {
				'RF Nut Off Start': 12.33,
				'RF Clear': null,
				'RF Mount': null,
				'RF Nut On Finish': null
			}
		},
		{
			tag: 'LF1',
			metrics: {
				'LF Nut Off Start': null,
				'LF Clear': null,
				'LF Mount': null,
				'LF Nut On Finish': null
			}
		},
		{
			tag: 'RR1',
			metrics: {
				'RR Nut Off Start': null,
				'RR Clear': null,
				'RR Mount': null,
				'RR Nut On Finish': null
			}
		},
		{
			tag: 'LR1',
			metrics: {
				'LR Nut Off Start': null,
				'LR Clear': null,
				'LR Mount': null,
				'LR Nut On Finish': null
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
				'Can1 Valid Fuel Flow': null
			}
		},
		{
			tag: 'Other',
			metrics: {
				'Other Category': null
			}
		},
		{
			tag: 'RF2',
			metrics: {
				'RF Nut Off Finish': null,
				'RF Pull': null,
				'RF Nut On Start': null
			}
		},
		{
			tag: 'LF2',
			metrics: {
				'LF Nut Off Finish': null,
				'LF Pull': null,
				'LF Nut On Start': null
			}
		},
		{
			tag: 'RR2',
			metrics: {
				'RR Nut Off Finish': null,
				'RR Pull': null,
				'RR Nut On Start': null
			}
		},
		{
			tag: 'LR2',
			metrics: {
				'LR Nut Off Finish': null,
				'LR Pull': null,
				'LR Nut On Start': null
			}
		},
		{
			tag: 'Wrench',
			metrics: {
				'RS Wrench Set': null,
				'RS Wrench Complete': null,
				'LS Wrench Set': null,
				'LS Wrench Complete': null
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
	const keyMap = {
		RF1: 'RF',
		RF2: 'RF',
		LF1: 'LF',
		LF2: 'LF',
		RR1: 'RR',
		RR2: 'RR',
		LR1: 'LR',
		LR2: 'LR',
		Entry: 'Entry',
		General: 'General',
		Fuel: 'Fuel',
		Other: 'Other',
		Wrench: 'Wrench',
		Position: 'Position',
		Exit: 'Exit',

		'Car Stop': 'Car Stop',
		'RS Up': 'RS Up',
		'RS Drop': 'RS Drop',
		'LS Up': 'LS Up',
		'LS Drop': 'LS Drop',
		'Car Goes': 'Car Goes',

		'RF Nut Off Start': 'Nut Off Start',
		'RF Clear': 'Clear',
		'RF Mount': 'Mount',
		'RF Nut On Finish': 'Nut On Finish',

		'LF Nut Off Start': 'Nut Off Start',
		'LF Clear': 'Clear',
		'LF Mount': 'Mount',
		'LF Nut On Finish': 'Nut On Finish',

		'RR Nut Off Start': 'Nut Off Start',
		'RR Clear': 'Clear',
		'RR Mount': 'Mount',
		'RR Nut On Finish': 'Nut On Finish',

		'LR Nut Off Start': 'Nut Off Start',
		'LR Clear': 'Clear',
		'LR Mount': 'Mount',
		'LR Nut On Finish': 'Nut On Finish',

		'Car Entry': 'Car Entry',
		'RS Peg': 'RS Peg',
		Dropoff: 'Dropoff',
		'LS Peg': 'LS Peg',

		'Can1 In': 'Can1 In',
		'Can1 Out': 'Can1 Out',
		'Can2 In': 'Can2 In',
		'Can2 Out': 'Can2 Out',
		'Fuel Added': 'Fuel Added',
		'Can1 Valid Fuel Flow': 'Can1 Valid',

		'Other Category': 'Category',

		'RF Nut Off Finish': 'Nut Off Finish',
		'RF Pull': 'Pull',
		'RF Nut On Start': 'Nut On Start',

		'LF Nut Off Finish': 'Nut Off Finish',
		'LF Pull': 'Pull',
		'LF Nut On Start': 'Nut On Start',

		'RR Nut Off Finish': 'Nut Off Finish',
		'RR Pull': 'Pull',
		'RR Nut On Start': 'Nut On Start',

		'LR Nut Off Finish': 'Nut Off Finish',
		'LR Pull': 'Pull',
		'LR Nut On Start': 'Nut On Start',

		'RS Wrench Set': 'RS Set',
		'RS Wrench Complete': 'RS Complete',
		'LS Wrench Set': 'LS Set',
		'LS Wrench Complete': 'LS Complete',

		'Sign X': 'Sign X',
		'Car X': 'Car X',
		'LF Y': 'LF Y',
		'LR Y': 'LR Y',

		'Car Exit': 'Car Exit'
	};
	const keyOrder = [
		'Car Stop',
		'RS Up',
		'RS Drop',
		'LS Up',
		'LS Drop',
		'Car Goes',
		'RF Nut Off Start',
		'RF Clear',
		'RF Mount',
		'RF Nut On Finish',
		'LF Nut Off Start',
		'LF Clear',
		'LF Mount',
		'LF Nut On Finish',
		'RR Nut Off Start',
		'RR Clear',
		'RR Mount',
		'RR Nut On Finish',
		'LR Nut Off Start',
		'LR Clear',
		'LR Mount',
		'LR Nut On Finish',
		'Car Entry',
		'RS Peg',
		'Dropoff',
		'LS Peg',
		'Can1 In',
		'Can1 Out',
		'Can2 In',
		'Can2 Out',
		'Fuel Added',
		'Can1 Valid Fuel Flow',
		'Other Category',
		'RF Nut Off Finish',
		'RF Pull',
		'RF Nut On Start',
		'LF Nut Off Finish',
		'LF Pull',
		'LF Nut On Start',
		'RR Nut Off Finish',
		'RR Pull',
		'RR Nut On Start',
		'LR Nut Off Finish',
		'LR Pull',
		'LR Nut On Start',
		'RS Wrench Set',
		'RS Wrench Complete',
		'LS Wrench Set',
		'LS Wrench Complete',
		'Sign X',
		'Car X',
		'LF Y',
		'LR Y',
		'Car Exit'
	];

	const metrics2 = {
		'Car Stop': null,
		'RS Up': null,
		'RS Drop': null,
		'LS Up': null,
		'LS Drop': null,
		'Car Goes': null,
		'RF Nut Off Start': null,
		'RF Clear': null,
		'RF Mount': null,
		'RF Nut On Finish': null,
		'LF Nut Off Start': null,
		'LF Clear': null,
		'LF Mount': null,
		'LF Nut On Finish': null,
		'RR Nut Off Start': null,
		'RR Clear': null,
		'RR Mount': null,
		'RR Nut On Finish': null,
		'LR Nut Off Start': null,
		'LR Clear': null,
		'LR Mount': null,
		'LR Nut On Finish': null,
		'Car Entry': null,
		'RS Peg': null,
		Dropoff: null,
		'LS Peg': null,
		'Can1 In': null,
		'Can1 Out': null,
		'Can2 In': null,
		'Can2 Out': null,
		'Fuel Added': null,
		'Can1 Valid Fuel Flow': null,
		'Other Category': null,
		'RF Nut Off Finish': null,
		'RF Pull': null,
		'RF Nut On Start': null,
		'LF Nut Off Finish': null,
		'LF Pull': null,
		'LF Nut On Start': null,
		'RR Nut Off Finish': null,
		'RR Pull': null,
		'RR Nut On Start': null,
		'LR Nut Off Finish': null,
		'LR Pull': null,
		'LR Nut On Start': null,
		'RS Wrench Set': null,
		'RS Wrench Complete': null,
		'LS Wrench Set': null,
		'LS Wrench Complete': null,
		'Sign X': null,
		'Car X': null,
		'LF Y': null,
		'LR Y': null,
		'Car Exit': null
	};

	let metricIndex = keyOrder.indexOf(selectedMetric);

	function selectMetric(metricKey, tag) {
		selectedMetric = metricKey;
		metricIndex = keyOrder.indexOf(selectedMetric);

		const container = document.querySelector('#metrics_cont_outer');
		const tagElement = document.querySelector(`[data-tag="${tag}"]`);

		if (container && tagElement) {
			const topPos = tagElement.offsetTop - container.offsetTop;
			container.scrollTo({
				top: topPos,
				behavior: 'smooth'
			});
		}
	}

	function nextMetric(e, metricKey, tag) {
		e.preventDefault();
		e.stopPropagation();

		if (e.key === 'Enter') {
			console.log('Enter pressed. Current metric index:', metricIndex);
		} else if (e.key !== 'Tab') {
			return;
		}

		const newIndex = metricIndex + (e.shiftKey ? -1 : 1);
		if (newIndex < 0 || newIndex >= keyOrder.length) return;

		const container = document.querySelector('#metrics_cont_outer');
		const currentScrollTop = container?.scrollTop || 0; // Store current scroll position

		metricIndex = newIndex;
		selectedMetric = keyOrder[metricIndex];

		setTimeout(() => {
			const selectedElement = document.querySelector('.selected-metric');
			selectedElement?.focus();

			const tagElement = selectedElement?.closest('.tag-container');

			if (container && tagElement) {
				// Temporarily set scroll to stored position
				container.scrollTop = currentScrollTop;

				container.scrollTo({
					top: tagElement.offsetTop - container.offsetTop,
					behavior: 'smooth'
				});
			}
		}, 0);
	}
</script>

<div id="metrics_cont_outer">
	<div id="metrics_cont">
		{#each metrics as { tag, metrics: metricObj }, index}
			<div class="tag-container" data-tag={tag}>
				<div class="tag-title">{keyMap[tag]}</div>
				<div class="group_metrics_container">
					{#each Object.entries(metricObj) as [metricKey, metricValue]}
						<div
							class="metric_row"
							class:selected-metric={selectedMetric === metricKey}
							onclick={() => selectMetric(metricKey, tag)}
							onkeydown={(e) => nextMetric(e, metricKey, tag)}
							role="button"
							tabindex="0"
						>
							<span class="metric-key">{keyMap[metricKey]}:</span>
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
	</div>
</div>

<style>
	#metrics_cont_outer {
		overflow-y: scroll;
		margin: 0;
	}

	#metrics_cont {
		padding-bottom: calc(100vh - 595px);
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
		> .metric_row:last-child::before {
			bottom: -4px;
		}

		> .metric_row:first-child {
			border-top: none;
			/* padding-top: 0; */
		}
		& :hover {
			> * {
				transition: all 0.2s ease-in-out;
			}
			.value {
				/* color: green;
				background-color: rgb(199, 233, 199); */
			}
			.value-empty {
				/* color: rgb(159, 210, 159); */
			}
		}
	}
	.metric_row {
		position: relative;

		font-family: var(--main-font);
		font-weight: 400;
		font-size: 1.1rem;
		margin: 0;
		padding-block: 7px;
		/* padding-inline: 7px; */
		background-color: transparent;
		border-bottom: #e6e6e6 1px solid;
		grid-column: span 2;
		display: grid;
		grid-template-columns: 1fr auto;

		cursor: pointer;

		> * {
			/* font-weight: 500; */
			position: relative;
			color: black;
			margin: 0;
			padding: 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		& .value {
			font-family: 'Roboto Mono', monospace;
			font-size: 1.2rem;
			/* line-height: 0; */
			justify-content: flex-end;

			background-color: var(--main-dark);
			/* background-color: transparent; */
			border-radius: 7px;
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

		&.selected-metric {
			border-bottom: 1px solid transparent;
			> * {
				transition: all 0.2s ease-in-out;
				color: white;
			}
			& .metric-key {
				/* color: green; */
				/* font-weight: 700; */
			}
			& .value {
				background-color: rgb(107, 107, 107);
				/* color: green;
				background-color: rgb(199, 233, 199); */
				/* background-color: var(--main-background); */
			}
			& .value-empty {
				/* color: rgb(159, 210, 159); */
				color: #999999;
			}
		}

		&:focus {
			outline: none;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: -7px;
				right: -7px;
				bottom: 0;
				border: 2px solid transparent;
				border-radius: 10px;
				background-color: var(--main-dark);
				transition: all 0.1s ease-in-out;
			}
		}
	}

	.metric_row::before {
		content: '';
		position: absolute;
		top: 0;
		left: -7px;
		right: -7px;
		bottom: 0;
		border: 2px solid transparent;
		border-radius: 10px;
		background-color: var(--main-background);
		/* transition: all 0.2s ease-in-out; */
	}

	.metric_row.selected-metric::before {
		content: '';
		position: absolute;
		top: 0;
		left: -7px;
		right: -7px;
		bottom: 0;
		/* background-color: rgb(211, 249, 211); */
		background-color: rgb(69, 69, 69);
		/* border: 2px solid black; */
		border-radius: 10px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

		transition: all 0.2s ease-in-out;
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
</style>
