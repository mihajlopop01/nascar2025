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

<style src="../dashboard.css">
</style>
