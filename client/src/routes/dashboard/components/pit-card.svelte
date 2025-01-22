<script>
	let {
		car = {
			num: '00',
			prior: '0.0',
			worker: 'unknown',
			pitstops: []
		}
	} = $props();

	function toggleCard(card) {
		card.classList.toggle('expanded');
	}
</script>

{#snippet row(pitstop)}
	<div class="grid-card" onclick={toggleCard(this)}>
		<div class="grid-card-content">{pitstop.num}.</div>
		<div class="grid-card-content">{pitstop.lap}</div>
		<div class="grid-card-content">{pitstop.time}</div>
		<div class="grid-card-content">{pitstop.type}</div>
		<div class="grid-card-content">{pitstop.dur}</div>
		<div class="grid-card-content indicator blinking1">
			{#if pitstop.state == 'green'}
				🟢
			{:else if pitstop.state == 'yellow'}
				🟡
			{:else if pitstop.state == 'red'}
				🔴
			{/if}
		</div>
		<div class="hidden-content">
			<button>Work</button>
			<button>Help</button>
		</div>
	</div>
{/snippet}

<div class="pit-card-new">
	<div class="pit-card-new-info">
		<span class="car-num">{car.num}</span><span class="car-prior">[{car.prior}]</span><span
			class="ass-unass">{car.worker}</span
		>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="26px"
			viewBox="280 -680 400 400"
			width="16px"
			fill="black"
			class="dots-menu"
		>
			<path
				d="M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z"
			/>
		</svg>
	</div>

	<!-- pit header -->
	<div class="grid-table">
		{#if car.pitstops.length === 0}
			<div class="placeholder">
				<p>No pitstops yet.</p>
			</div>
		{:else}
			<div class="grid-header">No.</div>
			<div class="grid-header">Lap</div>
			<div class="grid-header">Time</div>
			<div class="grid-header">Type</div>
			<div class="grid-header">Dur</div>
			<div class="grid-header">State</div>
		{/if}
	</div>

	<!-- data -->
	<div class="grid-table">
		{#each car.pitstops as pitstop}
			{@render row(pitstop)}
		{/each}
	</div>
</div>

<style>
	.pit-card-new {
		padding: 20px;
		font-family: var(--main-font);
		margin: 0;

		background-color: var(--main-dark);
		border-radius: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

		& .pit-card-new-info {
			display: flex;
			align-items: center;

			& .car-num {
				font-size: 32px;
				font-weight: bold;
				line-height: 1;
			}

			& .car-prior {
				padding-left: 10px;
				font-size: 20px;
				font-weight: bold;
				color: var(--grey-font);
			}

			& .dots-menu {
				margin-left: 20px;
				cursor: pointer;
				fill: var(--grey-font);
				height: 26px;
				width: 16px;
			}
		}
	}

	.grid-table {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		gap: 10px;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}

	/* Table headers */
	.grid-header {
		font-weight: 500;
		padding: 10px 0;
		text-align: center;
		grid-column: span 1;
	}

	/* Each row styled as a card */
	.grid-card {
		grid-column: span 6;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		gap: 10px;
		padding: 15px 0 15px 0;
		background-color: var(--main-light);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		color: black;
		border-radius: 10px;
		transition: all 0.3s;
		cursor: pointer;
		/* position: relative; */
		overflow: hidden;

		&:hover {
			background-color: var(--main-background);
			transition: all 0.3s;
		}
	}

	/* Hidden content that shows on expand */
	.hidden-content {
		grid-column: span 6;
		display: none;
		padding-top: 5px;
		justify-content: center;
		align-items: center;
		gap: 15px;
		transition: all 0.3s;

		& button {
			color: white;
			background-color: var(--main-green);
			width: calc((100% - 3 * 15px) / 2);
			margin: 0;
		}

		& .edit-button {
			width: calc((100% - 2 * 15px));
		}
	}

	/* Expanding the grid-card on click */
	.grid-card.expanded .hidden-content {
		display: flex;
		transition: all 0.3s;
	}

	.grid-card-content {
		text-align: center;
		width: 65px;
	}

	.grid-card :nth-child(1):not(button) {
		color: var(--main-green);
		font-weight: 600;
	}

	.grid-card :nth-child(2):not(button),
	.grid-card :nth-child(4) {
		font-weight: bold;
	}

	/* nove */
	.hidden {
		display: none;
	}

	.placeholder {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--main-dark);
		/* box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), inset -2px -4px 4px rgba(255, 255, 255, 0.1); */
		grid-column: span 6;
		border-radius: 10px;
		width: 435px;
		height: 250px;

		& p {
			font-size: 20px;
			font-weight: 400;
			color: var(--grey-font);
		}
	}

	.ass-unass {
		font-size: 20px;
		font-weight: 500;
		color: var(--grey-font);
		margin-left: auto;
	}
</style>
