<script>
    import { onMount } from 'svelte';

    const metrics = [
        'Car Stop', 'RS Up', 'RS Drop', 'LS Up', 'LS Drop', 'RF Nut off Start',
        'RF Clear', 'RF Mount', 'RF Nut on finish', 'LF Nut off Start', 'LF Clear',
        'LF Mount', 'LF Nut on finish', 'RR Nut off Start', 'RR Clear', 'RR Mount',
        'RR Nut on finish', 'LR Nut off Start', 'LR Clear', 'LR Mount', 'LR Nut on finish',
        'RS Peg', 'Dropoff', 'LS Peg'
    ];

    
    const metricData = metrics.map(metric => ({
        display: metric,
        attr: metric.toLowerCase().replace(/\s+(.)/g, (_, c) => c.toUpperCase())
    }));

    export let currentCellIndex = -1; 

    function updateTimeDisplay(event) {
        const { timeDisplay } = event.detail; 
        if (currentCellIndex >= 0 && currentCellIndex < metricData.length) { 
            const cell = document.querySelector(`td[name="${metricData[currentCellIndex].attr}"]`);
            if (cell) {
                cell.textContent = timeDisplay; 
                //ovde moze logika za cuvanje metrike u bazi
                currentCellIndex++;
                
                if (currentCellIndex >= metricData.length) {
                    currentCellIndex = metricData.length - 1; 
                }
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
        if (index >= 0 && index < metricData.length) {
            const cell = document.querySelector(`td[name="${metricData[index].attr}"]`);
            if (cell) {
                cell.textContent = ''; 
            }
        }
    }

    onMount(() => {
        window.addEventListener('updateTimeDisplay', updateTimeDisplay);
    });
</script>

<div class="metric-container">
    <!-- <div class="time-display">{timeDisplay}</div> -->
    <div><h3>MetricView Component</h3></div>
    
    <table>
        <tbody>
            {#each metricData as {display, attr}, index}
                <tr>
                    <td>{display}</td>
                    <td 
                        name={attr} 
                        class={index === currentCellIndex ? 'highlight' : ''} 
                        on:click={() => handleCellClick(index)}
                        on:contextmenu={(event) => handleCellRightClick(event, index)}
                    ></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .metric-container {
        width: 50%;
        padding: 1rem;
        max-height: 80vh;
        overflow-y: auto;
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