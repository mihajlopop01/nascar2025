<script>
	import { onMount } from 'svelte';

	import PitCard from './components/pit-card.svelte';

	// import './dashboard.css';

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

<style></style>
