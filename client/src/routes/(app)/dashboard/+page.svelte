<script>
	import { onMount } from 'svelte';
	import PitCard from './components/pit-card.svelte';
	import { appState } from '../../js/state.svelte.js';

	let selectedNav = $state('dashboard');

	let cars = [
		{
			num: '16',
			prior: '1.1',
			worker: 'Petar Jovanovic',
			pitstops: [
				{ num: '1', lap: '12', time: '20:43', type: '4W', dur: '10.8s', state: 'yellow' },
				{ num: '2', lap: '13', time: '21:00', type: '2RS', dur: '5.6s', state: 'green' },
				{ num: '3', lap: '14', time: '21:33', type: '4W', dur: '11.2s', state: 'green' },
				{ num: '4', lap: '15', time: '22:45', type: '4W', dur: '10.3s', state: 'green' }
			]
		},
		{
			num: '10',
			prior: '1.2',
			worker: 'Mihailo Jovanovic',
			pitstops: [
				{ num: '1', lap: '12', time: '20:43', type: '4W', dur: '10.8s', state: 'yellow' },
				{ num: '2', lap: '13', time: '21:00', type: '2RS', dur: '5.6s', state: 'red' },
				{ num: '3', lap: '14', time: '21:33', type: '4W', dur: '11.2s', state: 'green' },
				{ num: '4', lap: '15', time: '22:45', type: '4W', dur: '10.3s', state: 'green' }
			]
		},
		{
			num: '34',
			prior: '2.0',
			worker: 'Mihailo Jovanovic',
			pitstops: []
		}
	];

	onMount(async () => {
		appState.page = 'dashboard';
		document.querySelectorAll('.hidden-content button').forEach((button) => {
			button.addEventListener('click', function (event) {
				event.stopPropagation();
			});
		});
	});
</script>

<main>
	<div id="main-section" class="dash-section">
		<div id="main-header">
			<div class="main-header-button">
				<button class="inactive-button">My cars</button>
			</div>
			<div class="main-header-button">
				<button class="active-button">All cars</button>
			</div>
			<div class="main-header-button">
				<button class="inactive-button">NA cars</button>
			</div>
			<div class="main-header-button">
				<button class="inactive-button" id="selection-button">Edit</button>
			</div>
		</div>
		<hr class="divider" />

		<div id="pit-container-wrapper">
			<div id="pitstop-cards-container">
				{#each cars as car}
					<PitCard {car} />
				{/each}
			</div>
		</div>
	</div>

	<div id="race-section" class="dash-section"></div>
	<div id="notif-section" class="dash-section"></div>
</main>

<style>
	main {
		background-color: var(--main-background);
		grid-area: main;
		padding: 0px 20px 20px 0px;
		gap: 20px;
		min-width: 1015px;

		display: grid;
		grid-template-columns: 1fr max(30%, 400px);
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			'centar right-up'
			'centar right-down';

		overflow-y: hidden;
		overflow-x: hidden;
	}

	#main-header {
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		padding-left: 50px;
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		gap: 40px;

		& button {
			font-family: 'Poppins', sans-serif;
			color: white;
			font-weight: 500;
			background-color: var(--main-green);

			&.inactive-button {
				background-color: transparent;
				color: black;
			}

			&#selection-button {
				color: var(--grey-font);
				font-weight: 500;
			}

			&:hover {
				background-color: var(--main-dark);
			}
		}
	}

	.divider {
		border: none;
		border-top: 2px solid var(--main-background);
		width: 100%;
		margin: 20px 0 0 0;
	}

	#race-section {
		text-align: center;

		grid-area: right-up;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		& #race-logo {
			width: 100px;
			height: 100px;
			border-radius: 10px;
			background-color: #fff;
		}

		& #grafik {
			width: 300px;
			border-radius: 10px;
		}
	}

	#notif-section {
		text-align: center;

		padding: 0;
		margin: 0;
		grid-area: right-down;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		/* overflow-y: scroll; */
		overflow-x: hidden;
	}

	#notif-container {
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 20px;
		justify-content: center;
		align-items: center;
	}

	.notif {
		width: 300px;
		background-color: #fff;
		padding: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	#pit-container-wrapper {
		/* ovo postoji zbog onog gapa */
		padding: 0;
		margin: 0;
		height: 100%;
		overflow-y: scroll;
	}

	#pitstop-cards-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 50px;
		padding: 40px 50px;
		margin: 0 0 0 0;
		height: auto;
		/* box-sizing: border-box; */
		overflow-y: hidden;

		& .pitstop-card {
			min-width: 46%;
			width: 45%;
			min-height: 200px;
			background-color: var(--main-background);
			border-radius: 8px;
			padding: 0 20px 0 20px;
			margin: 0;
			/* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
		}
	}

	button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		border-radius: 5px;
		margin-top: 20px;
		transition: background-color 0.3s ease;

		&:hover,
		&:focus {
			background-color: #0056b3;
		}

		&:disabled {
			background-color: #6c757d;
			cursor: not-allowed;
			opacity: 0.65;
		}
	}
</style>
