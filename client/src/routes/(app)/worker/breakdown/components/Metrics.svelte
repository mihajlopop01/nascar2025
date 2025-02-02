<script>
	import { onMount } from 'svelte';
	import { untrack } from 'svelte';

	let {
		selectedMetric = $bindable(),
		currentTime = $bindable(),
		duration,
		template,
		keyboard
	} = $props();

	let metrics_list = $state({}),
		metrics_order,
		metrics_render = $state([]);

	let metrics_container;

	function getMetricsFromTemplate(template) {
		switch (template) {
			case '4 Tire':
				return {
					metrics_list: {
						car_stop: null,
						rs_up: null,
						rs_drop: null,
						ls_up: null,
						ls_drop: null,
						car_goes: null,
						rf_nut_off_start: null,
						rf_clear: null,
						rf_mount: null,
						rf_nut_on_finish: null,
						lf_nut_off_start: null,
						lf_clear: null,
						lf_mount: null,
						lf_nut_on_finish: null,
						rr_nut_off_start: null,
						rr_clear: null,
						rr_mount: null,
						rr_nut_on_finish: null,
						lr_nut_off_start: null,
						lr_clear: null,
						lr_mount: null,
						lr_nut_on_finish: null,
						car_entry: null,
						rs_peg: null,
						dropoff: null,
						ls_peg: null,
						can1_in: null,
						can1_out: null,
						can2_in: null,
						can2_out: null,
						fuel_added: null,
						can1_valid_fuel_flow: null,
						other_category: null,
						rf_nut_off_finish: null,
						rf_pull: null,
						rf_nut_on_start: null,
						lf_nut_off_finish: null,
						lf_pull: null,
						lf_nut_on_start: null,
						rr_nut_off_finish: null,
						rr_pull: null,
						rr_nut_on_start: null,
						lr_nut_off_finish: null,
						lr_pull: null,
						lr_nut_on_start: null,
						rs_wrench_set: null,
						rs_wrench_complete: null,
						ls_wrench_set: null,
						ls_wrench_complete: null,
						sign_position_x: null,
						car_position_x: null,
						lf_position_y: null,
						lr_position_y: null,
						car_exit: null
					},
					metrics_render: [
						{
							tag: 'Entry',
							priority: 'A',
							metrics: {
								car_stop: 'Car Stop',
								rs_up: 'RS Up',
								rs_drop: 'RS Drop',
								ls_up: 'LS Up',
								ls_drop: 'LS Drop',
								car_goes: 'Car Goes'
							}
						},
						{
							tag: 'RF',
							priority: 'B',
							metrics: {
								rf_nut_off_start: 'Nut Off Start',
								rf_clear: 'Clear',
								rf_mount: 'Mount',
								rf_nut_on_finish: 'Nut On Finish'
							}
						},
						{
							tag: 'LF',
							priority: 'B',
							metrics: {
								lf_nut_off_start: 'Nut Off Start',
								lf_clear: 'Clear',
								lf_mount: 'Mount',
								lf_nut_on_finish: 'Nut On Finish'
							}
						},
						{
							tag: 'RR',
							priority: 'B',
							metrics: {
								rr_nut_off_start: 'Nut Off Start',
								rr_clear: 'Clear',
								rr_mount: 'Mount',
								rr_nut_on_finish: 'Nut On Finish'
							}
						},
						{
							tag: 'LR',
							priority: 'B',
							metrics: {
								lr_nut_off_start: 'Nut Off Start',
								lr_clear: 'Clear',
								lr_mount: 'Mount',
								lr_nut_on_finish: 'Nut On Finish'
							}
						},
						{
							tag: 'General',
							priority: 'B',
							metrics: {
								car_entry: 'Car Entry',
								rs_peg: 'RS Peg',
								dropoff: 'Dropoff',
								ls_peg: 'LS Peg'
							}
						},
						{
							tag: 'Fuel',
							priority: 'B',
							metrics: {
								can1_in: 'Can1 In',
								can1_out: 'Can1 Out',
								can2_in: 'Can2 In',
								can2_out: 'Can2 Out',
								fuel_added: 'Fuel Added',
								can1_valid_fuel_flow: 'Can1 Valid'
							}
						},
						{
							tag: 'Other',
							priority: 'B',
							metrics: {
								other_category: 'Category'
							}
						},
						{
							tag: 'RF',
							priority: 'C',
							metrics: {
								rf_nut_off_finish: 'Nut Off Finish',
								rf_pull: 'Pull',
								rf_nut_on_start: 'Nut On Start'
							}
						},
						{
							tag: 'LF',
							priority: 'C',
							metrics: {
								lf_nut_off_finish: 'Nut Off Finish',
								lf_pull: 'Pull',
								lf_nut_on_start: 'Nut On Start'
							}
						},
						{
							tag: 'RR',
							priority: 'C',
							metrics: {
								rr_nut_off_finish: 'Nut Off Finish',
								rr_pull: 'Pull',
								rr_nut_on_start: 'Nut On Start'
							}
						},
						{
							tag: 'LR',
							priority: 'C',
							metrics: {
								lr_nut_off_finish: 'Nut Off Finish',
								lr_pull: 'Pull',
								lr_nut_on_start: 'Nut On Start'
							}
						},
						{
							tag: 'Wrench',
							priority: 'C',
							metrics: {
								rs_wrench_set: 'RS Set',
								rs_wrench_complete: 'RS Complete',
								ls_wrench_set: 'LS Set',
								ls_wrench_complete: 'LS Complete'
							}
						},
						{
							tag: 'Position',
							priority: 'C',
							metrics: {
								sign_position_x: 'Sign X',
								car_position_x: 'Car X',
								lf_position_y: 'LF Y',
								lr_position_y: 'LR Y'
							}
						},
						{
							tag: 'Exit',
							priority: 'C',
							metrics: {
								car_exit: 'Car Exit'
							}
						}
					]
				};
			case '2 RS':
				return {
					metrics_list: {
						car_stop: null,
						rs_up: null,
						rs_drop: null,
						car_goes: null,
						rf_nut_off_start: null,
						rf_clear: null,
						rf_mount: null,
						rf_nut_on_finish: null,
						rr_nut_off_start: null,
						rr_clear: null,
						rr_mount: null,
						rr_nut_on_finish: null,
						car_entry: null,
						rs_peg: null,
						dropoff: null,
						can1_in: null,
						can1_out: null,
						can2_in: null,
						can2_out: null,
						fuel_added: null,
						can1_valid_fuel_flow: null,
						other_category: null,
						rf_nut_off_finish: null,
						rf_pull: null,
						rf_nut_on_start: null,
						rr_nut_off_finish: null,
						rr_pull: null,
						rr_nut_on_start: null,
						rs_wrench_set: null,
						rs_wrench_complete: null,
						ls_wrench_set: null,
						ls_wrench_complete: null,
						sign_position_x: null,
						car_position_x: null,
						lf_position_y: null,
						lr_position_y: null,
						car_exit: null
					},
					metrics_render: [
						{
							tag: 'Entry',
							priority: 'A',
							metrics: {
								car_stop: 'Car Stop',
								rs_up: 'RS Up',
								rs_drop: 'RS Drop',
								car_goes: 'Car Goes'
							}
						},
						{
							tag: 'RF',
							priority: 'B',
							metrics: {
								rf_nut_off_start: 'Nut Off Start',
								rf_clear: 'Clear',
								rf_mount: 'Mount',
								rf_nut_on_finish: 'Nut On Finish'
							}
						},
						{
							tag: 'RR',
							priority: 'B',
							metrics: {
								rr_nut_off_start: 'Nut Off Start',
								rr_clear: 'Clear',
								rr_mount: 'Mount',
								rr_nut_on_finish: 'Nut On Finish'
							}
						},
						{
							tag: 'General',
							priority: 'B',
							metrics: {
								car_entry: 'Car Entry',
								rs_peg: 'RS Peg',
								dropoff: 'Dropoff'
							}
						},
						{
							tag: 'Fuel',
							priority: 'B',
							metrics: {
								can1_in: 'Can1 In',
								can1_out: 'Can1 Out',
								can2_in: 'Can2 In',
								can2_out: 'Can2 Out',
								fuel_added: 'Fuel Added',
								can1_valid_fuel_flow: 'Can1 Valid'
							}
						},
						{
							tag: 'Other',
							priority: 'B',
							metrics: {
								other_category: 'Category'
							}
						},
						{
							tag: 'RF',
							priority: 'C',
							metrics: {
								rf_nut_off_finish: 'Nut Off Finish',
								rf_pull: 'Pull',
								rf_nut_on_start: 'Nut On Start'
							}
						},

						{
							tag: 'RR',
							priority: 'C',
							metrics: {
								rr_nut_off_finish: 'Nut Off Finish',
								rr_pull: 'Pull',
								rr_nut_on_start: 'Nut On Start'
							}
						},

						{
							tag: 'Wrench',
							priority: 'C',
							metrics: {
								rs_wrench_set: 'RS Set',
								rs_wrench_complete: 'RS Complete',
								ls_wrench_set: 'LS Set',
								ls_wrench_complete: 'LS Complete'
							}
						},
						{
							tag: 'Position',
							priority: 'C',
							metrics: {
								sign_position_x: 'Sign X',
								car_position_x: 'Car X',
								lf_position_y: 'LF Y',
								lr_position_y: 'LR Y'
							}
						},
						{
							tag: 'Exit',
							priority: 'C',
							metrics: {
								car_exit: 'Car Exit'
							}
						}
					]
				};
			case '2 LS':
				return {
					metrics_list: {
						car_stop: null,
						ls_up: null,
						ls_drop: null,
						car_goes: null,
						lf_nut_off_start: null,
						lf_clear: null,
						lf_mount: null,
						lf_nut_on_finish: null,
						lr_nut_off_start: null,
						lr_clear: null,
						lr_mount: null,
						lr_nut_on_finish: null,
						car_entry: null,
						dropoff: null,
						ls_peg: null,
						can1_in: null,
						can1_out: null,
						can2_in: null,
						can2_out: null,
						fuel_added: null,
						can1_valid_fuel_flow: null,
						other_category: null,
						lf_nut_off_finish: null,
						lf_pull: null,
						lf_nut_on_start: null,
						lr_nut_off_finish: null,
						lr_pull: null,
						lr_nut_on_start: null,
						rs_wrench_set: null,
						rs_wrench_complete: null,
						ls_wrench_set: null,
						ls_wrench_complete: null,
						sign_position_x: null,
						car_position_x: null,
						lf_position_y: null,
						lr_position_y: null,
						car_exit: null
					},
					metrics_render: [
						{
							tag: 'Entry',
							priority: 'A',
							metrics: {
								car_stop: 'Car Stop',
								ls_up: 'LS Up',
								ls_drop: 'LS Drop',
								car_goes: 'Car Goes'
							}
						},

						{
							tag: 'LF',
							priority: 'B',
							metrics: {
								lf_nut_off_start: 'Nut Off Start',
								lf_clear: 'Clear',
								lf_mount: 'Mount',
								lf_nut_on_finish: 'Nut On Finish'
							}
						},

						{
							tag: 'LR',
							priority: 'B',
							metrics: {
								lr_nut_off_start: 'Nut Off Start',
								lr_clear: 'Clear',
								lr_mount: 'Mount',
								lr_nut_on_finish: 'Nut On Finish'
							}
						},
						{
							tag: 'General',
							priority: 'B',
							metrics: {
								car_entry: 'Car Entry',
								dropoff: 'Dropoff',
								ls_peg: 'LS Peg'
							}
						},
						{
							tag: 'Fuel',
							priority: 'B',
							metrics: {
								can1_in: 'Can1 In',
								can1_out: 'Can1 Out',
								can2_in: 'Can2 In',
								can2_out: 'Can2 Out',
								fuel_added: 'Fuel Added',
								can1_valid_fuel_flow: 'Can1 Valid'
							}
						},
						{
							tag: 'Other',
							priority: 'B',
							metrics: {
								other_category: 'Category'
							}
						},
						{
							tag: 'LF',
							priority: 'C',
							metrics: {
								lf_nut_off_finish: 'Nut Off Finish',
								lf_pull: 'Pull',
								lf_nut_on_start: 'Nut On Start'
							}
						},

						{
							tag: 'LR',
							priority: 'C',
							metrics: {
								lr_nut_off_finish: 'Nut Off Finish',
								lr_pull: 'Pull',
								lr_nut_on_start: 'Nut On Start'
							}
						},
						{
							tag: 'Wrench',
							priority: 'C',
							metrics: {
								rs_wrench_set: 'RS Set',
								rs_wrench_complete: 'RS Complete',
								ls_wrench_set: 'LS Set',
								ls_wrench_complete: 'LS Complete'
							}
						},
						{
							tag: 'Position',
							priority: 'C',
							metrics: {
								sign_position_x: 'Sign X',
								car_position_x: 'Car X',
								lf_position_y: 'LF Y',
								lr_position_y: 'LR Y'
							}
						},
						{
							tag: 'Exit',
							priority: 'C',
							metrics: {
								car_exit: 'Car Exit'
							}
						}
					]
				};
			case 'Fuel Only':
				return {
					metrics_list: {},
					metrics_render: []
				};
			default:
				throw new Error('Invalid template');
			// return {};
		}
	}

	onMount(() => {
		metrics_container = document.querySelector('#metrics_cont_outer');
		// changeTemplate();
	});

	const changeTemplate = () => {
		try {
			if (template) {
				({ metrics_list, metrics_render } = getMetricsFromTemplate(template));
				metrics_order = Object.keys(metrics_list);
			}
		} catch (error) {
			console.error('Neuspesno postavljen template.', error);
		}
	};

	$effect(() => {
		if (template) {
			untrack(() => {
				changeTemplate();
			});
		}
	});

	function selectMetric(metricKey, selectedElement) {
		selectedMetric = metricKey;
		if (metrics_list[metricKey] != null) {
			currentTime = metrics_list[metricKey];
		}

		const tagElement = selectedElement.closest('.tag-container');

		if (metrics_container && tagElement) {
			const topPos = tagElement.offsetTop - metrics_container.offsetTop;
			metrics_container.scrollTo({
				top: topPos,
				behavior: 'smooth'
			});
		}
	}

	function processKeyboard(key) {
		if (key === 'delete') {
			metrics_list[selectedMetric] = null;
			return;
		}
		let newIndex = metrics_order.indexOf(selectedMetric);
		if (key === 'enter') {
			if (!duration) return;
			metrics_list[selectedMetric] = currentTime;
			newIndex++;
		}
		if (key == 'next') newIndex++;
		else if (key == 'previous') newIndex--;
		if (newIndex < 0 || newIndex >= metrics_order.length) return;
		selectedMetric = metrics_order[newIndex];
		if (metrics_list[selectedMetric] != null) {
			currentTime = metrics_list[selectedMetric];
		}

		const currentScrollTop = metrics_container?.scrollTop || 0;
		setTimeout(() => {
			const selectedElement = document.querySelector('.selected-metric');
			selectedElement?.focus();

			const tagElement = selectedElement?.closest('.tag-container');

			if (metrics_container && tagElement) {
				// Temporarily set scroll to stored position
				metrics_container.scrollTop = currentScrollTop;

				metrics_container.scrollTo({
					top: tagElement.offsetTop - metrics_container.offsetTop,
					behavior: 'smooth'
				});
			}
		}, 0);
	}

	$effect(() => {
		let { key } = keyboard;
		untrack(() => processKeyboard(key));
	});
</script>

<div id="metrics_cont_outer">
	<div id="metrics_cont">
		<!-- {#if template} -->
		{#each metrics_render as { tag, metrics: metricGroup, priority }}
			<div class="tag-container" data-tag={tag}>
				<div class="tag_header">
					<div class="tag-title">{tag}</div>
					<div class="priority_tag">{priority}</div>
				</div>
				<div class="group_metrics_container">
					{#each Object.entries(metricGroup) as [metricKey, metricTitle]}
						<div
							class="metric_row"
							class:selected-metric={selectedMetric === metricKey}
							onclick={(e) => selectMetric(metricKey, e.currentTarget)}
							onkeydown={() => {}}
							role="button"
							tabindex="0"
							data-metric={metricKey}
						>
							<span class="metric-key">{metricTitle}:</span>
							{#if metrics_list[metricKey] !== null}
								<span class="value value-done"
									>{metrics_list[metricKey]?.toFixed(2).padStart(5, '0')}</span
								>
							{:else}
								<span class="value value-empty">--.--</span>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
		<!-- {/if} -->
	</div>
</div>

<style>
	#metrics_cont_outer {
		overflow-y: scroll;
		border-radius: var(--border-radius2);
		margin: 0;
		height: 100%;
	}

	#metrics_cont {
		padding-bottom: calc(100vh - 500px);
		overflow: visible;
		gap: 15px;
		border-radius: 10px;
		margin-right: 5px;
		> * {
			margin-bottom: 15px;
		}
		> :last-child {
			margin-bottom: 0;
		}
	}

	.tag-container {
		border-radius: var(--border-radius2);
		padding: 15px;
		padding-inline: 20px;
		background-color: var(--main-background);
		border: var(--border1);
	}

	.tag_header {
		display: flex;
		justify-content: space-between;
		font-size: 1.2rem;
	}

	.tag-title {
		font-size: 1.2rem;
		font-weight: 500;
		margin-bottom: 3px;
		color: var(--font-color);
	}

	.priority_tag {
		font-weight: 400;
		color: var(--metric-group-priority-color);
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
				/* transition: all 0.2s ease-in-out; */
			}
			.value {
				background-color: var(--light-green);
			}
			.value-empty {
				/* color: rgb(109, 109, 109); */
				/* color: var(--main-dark); */
			}
		}
	}
	.metric_row {
		position: relative;

		font-family: var(--main-font);
		font-weight: 400;
		font-size: 1.2rem; /* 1.1rem; za apple font */
		margin: 0;
		padding-block: 7px;
		/* padding-inline: 7px; */
		background-color: transparent;
		border-bottom: var(--border-metric-divider);
		grid-column: span 2;
		display: grid;
		grid-template-columns: 1fr auto;

		cursor: pointer;

		> * {
			/* font-weight: 500; */
			position: relative;
			color: grey;
			margin: 0;
			padding: 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		& .value {
			color: var(--metric-color);
			font-weight: 400;
			font-family: var(--mono-font);
			font-size: 1.1rem;
			/* line-height: 0; */
			justify-content: flex-end;

			background-color: var(--main-dark);
			/* background-color: transparent; */
			border-radius: var(--border-radius3);
			padding-block: 2px;
			padding-inline: 5px;
			border: var(--border1);
		}
		& .value-empty {
			color: var(--metric-color-empty);
			/* color: var(--main-dark); */
		}
		& .value-done {
			color: var(--metric-color);
		}

		&.selected-metric {
			font-weight: 600;
			border-bottom: 1px solid transparent;
			> * {
				/* transition: all 0.2s ease-in-out; */
				color: white;
			}

			& .value {
				background-color: rgb(107, 107, 107);
				background-color: var(--main-dark);
				color: var(--metric-color);
				/* color: green;
				background-color: rgb(199, 233, 199); */
				/* background-color: var(--main-background); */
			}
			& .value-empty {
				/* box-sizing: content-box; */
				/* color: rgb(109, 109, 109); */
				color: var(--metric-color-empty);
				/* box-shadow: 0 0 0 1px rgb(217, 41, 6); */
			}
		}

		&:focus,
		&:hover {
			outline: none;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: -7px;
				right: -7px;
				bottom: 0;
				border: 1px solid transparent;
				border-radius: 0;
				background-color: var(--metric-hover-color);
				/* transition: all 0.2s ease-in-out; */
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
		background-color: var(--main-green);
		border: 1px solid rgb(217, 41, 6);
		border-radius: var(--border-radius2);
		/* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); */
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
		background: var(--metric-scroll-color);
		border-radius: 5px;
		transition: all 0.2s ease-in-out;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #898989;
		transition: all 0.2s ease-in-out;
		cursor: pointer;
	}
</style>
