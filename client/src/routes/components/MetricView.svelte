<script>
	import { onMount } from 'svelte';

	// const metrics = [
	// 	'Car Stop',
	// 	'RS Up',
	// 	'RS Drop',
	// 	'LS Up',
	// 	'LS Drop',
	// 	'RF Nut off Start',
	// 	'RF Clear',
	// 	'RF Mount',
	// 	'RF Nut on finish',
	// 	'LF Nut off Start',
	// 	'LF Clear',
	// 	'LF Mount',
	// 	'LF Nut on finish',
	// 	'RR Nut off Start',
	// 	'RR Clear',
	// 	'RR Mount',
	// 	'RR Nut on finish',
	// 	'LR Nut off Start',
	// 	'LR Clear',
	// 	'LR Mount',
	// 	'LR Nut on finish',
	// 	'RS Peg',
	// 	'Dropoff',
	// 	'LS Peg'
	// ];

	// let metrics2 = [
	// 	{
	// 		tag: 'General',
	// 		metrics: {
	// 			'Car Stop': null,
	// 			'RS Up': null,
	// 			'RS Drop': null,
	// 			'LS Up': null,
	// 			'LS Drop': null,
	// 			'Car Goes': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'RF',
	// 		metrics: {
	// 			'Nut Off Start': 12.33,
	// 			Clear: null,
	// 			Mount: null,
	// 			'Not On Finish': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'LF',
	// 		metrics: {
	// 			'Nut Off Start': null,
	// 			Clear: null,
	// 			Mount: null,
	// 			'Not On Finish': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'RR',
	// 		metrics: {
	// 			'Nut Off Start': null,
	// 			Clear: null,
	// 			Mount: null,
	// 			'Not On Finish': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'LR',
	// 		metrics: {
	// 			'Nut Off Start': null,
	// 			Clear: null,
	// 			Mount: null,
	// 			'Not On Finish': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'Pegs',
	// 		metrics: {
	// 			'RS Peg': null,
	// 			Dropoff: null,
	// 			'LS Peg': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'Fuel',
	// 		metrics: {
	// 			'Can1 In': null,
	// 			'Can1 Out': null,
	// 			'Can2 In': null,
	// 			'Can2 Out': null,
	// 			'Fuel Added': null,
	// 			'Can1 Valid': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'Other',
	// 		metrics: {
	// 			Other: null,
	// 			Category: null
	// 		}
	// 	},
	// 	{
	// 		tag: 'RF',
	// 		metrics: {
	// 			'Nut On Finish': null,
	// 			Pull: null,
	// 			'Nut On Start': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'LF',
	// 		metrics: {
	// 			'Nut On Finish': null,
	// 			Pull: null,
	// 			'Nut On Start': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'RR',
	// 		metrics: {
	// 			'Nut On Finish': null,
	// 			Pull: null,
	// 			'Nut On Start': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'LR',
	// 		metrics: {
	// 			'Nut On Finish': null,
	// 			Pull: null,
	// 			'Nut On Start': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'Wrench',
	// 		metrics: {
	// 			'RS Set': null,
	// 			'RS Complete': null,
	// 			'LS Set': null,
	// 			'LS Complete': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'Position',
	// 		metrics: {
	// 			'Sign X': null,
	// 			'Car X': null,
	// 			'LF Y': null,
	// 			'LR Y': null
	// 		}
	// 	},
	// 	{
	// 		tag: 'Exit',
	// 		metrics: {
	// 			'Car Exit': null
	// 		}
	// 	}
	// ];
	const metrics = [
		'Car Stop',
		'RS Up',
		'RS Drop',
		'LS Up',
		'LS Drop',
		'RF Nut off Start',
		'RF Clear',
		'RF Mount',
		'RF Nut on finish',
		'LF Nut off Start',
		'LF Clear',
		'LF Mount',
		'LF Nut on finish',
		'RR Nut off Start',
		'RR Clear',
		'RR Mount',
		'RR Nut on finish',
		'LR Nut off Start',
		'LR Clear',
		'LR Mount',
		'LR Nut on finish',
		'RS Peg',
		'Dropoff',
		'LS Peg'
	];

	const metricData = metrics.map((metric) => ({
		display: metric,
		attr: metric.toLowerCase().replace(/\s+(.)/g, (_, c) => c.toUpperCase())
	}));

	// export let currentCellIndex = -1;
	// export let selectedTemplate = '4 Tire';
	let { currentCellIndex, selectedTemplate } = $props();

	// Cuvamo vrednosti metrika kako bismo mogli da sacuvamo metrike kada se promeni template
	let metricValues = $state({});

	const templateMetrics = {
		'4 Tire': metrics,
		'2 RS': [
			'Car Stop',
			'RS Up',
			'RS Drop',
			'RF Nut off Start',
			'RF Clear',
			'RF Mount',
			'RF Nut on finish',
			'RR Nut off Start',
			'RR Clear',
			'RR Mount',
			'RR Nut on finish',
			'RS Peg',
			'Dropoff'
		],
		'2 LS': [
			'Car Stop',
			'LS Up',
			'LS Drop',
			'LF Nut off Start',
			'LF Clear',
			'LF Mount',
			'LF Nut on finish',
			'LR Nut off Start',
			'LR Clear',
			'LR Mount',
			'LR Nut on finish',
			'Dropoff',
			'LS Peg'
		],
		'Fuel Only': ['Car Stop']
	};

	// $:metricsToDisplay = templateMetrics[selectedTemplate];

	// $: {
	// 	metricsToDisplay.forEach(metric => {
	// 		if (!(metric in metricValues)) {
	// 			metricValues[metric] = '';
	// 		}
	// 	});
	// }

	//Metrike koje se prikazuju se menjaju kada god se promeni template
	let metricsToDisplay = $derived(templateMetrics[selectedTemplate]);

	// Kada se metricToDisplay promeni (odnosno kad se promeni template) proveravamo da li vec postoji vrednost za svaku metriku.
	$effect(() => {
		metricsToDisplay.forEach((metric) => {
			if (!(metric in metricValues)) {
				metricValues[metric] = '';
			}
		});
	});

	function updateTimeDisplay(event) {
		//timeDisplay je primeljne od VideoPlayer komponente preko custom eventa
		const { timeDisplay } = event.detail;
		if (currentCellIndex >= 0 && currentCellIndex < metricsToDisplay.length) {
			const metric = metricsToDisplay[currentCellIndex];
			metricValues[metric] = timeDisplay;
			currentCellIndex++;
			if (currentCellIndex >= metricsToDisplay.length) {
				currentCellIndex = metricsToDisplay.length - 1;
			}
		}
	}
	//funkcija za odabir celije u kojoj zelimo da unesemo trenutnu timeDisplay vrednost klikom na Enter
	function handleCellClick(index) {
		currentCellIndex = index;
	}
	//funkcija za brisanje vrednosti metrike. Metrike se brisu na desni klik. Lako mozemo da promenimo ako hoces
	function handleCellRightClick(event, index) {
		event.preventDefault();
		if (index >= 0 && index < metricsToDisplay.length) {
			const metric = metricsToDisplay[index];
			metricValues[metric] = '';
		}
	}

	onMount(() => {
		window.addEventListener('updateTimeDisplay', updateTimeDisplay);
	});
</script>

<div class="metric-container">
	<table>
		<tbody>
			{#each metricsToDisplay as metric, index}
				<tr>
					<td>{metric}</td>
					<td
						name={metric.toLowerCase().replace(/\s+(.)/g, (_, c) => c.toUpperCase())}
						class={index === currentCellIndex ? 'highlight' : ''}
						onclick={() => handleCellClick(index)}
						oncontextmenu={(event) => handleCellRightClick(event, index)}>{metricValues[metric]}</td
					>
					<!--Upisuje vrednost metrike u polje, ako vrednost postoji-->
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!-- <div id="metrics_cont">
	{#each metrics as { tag, metrics: metricObj }, index}
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
	{/each}
</div> -->

<style>
	.metric-container {
		width: 100%;
		padding: 0;
		margin: 0;
		max-height: 80vh;
		overflow-y: hidden;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}

	td {
		border: 1px solid black;
		width: 40%;
		padding: 8px;
	}

	.highlight {
		background-color: rgb(0, 238, 255);
	}
</style>
