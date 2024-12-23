<script>
   
    
    const metrics = [
        'Car Stop', 'RS Up', 'RS Drop', 'LS Up', 'LS Drop', 'RF Nut off Start',
        'RF Clear', 'RF Mount', 'RF Nut on finish', 'LF Nut off Start', 'LF Clear',
        'LF Mount', 'LF Nut on finish', 'RR Nut off Start', 'RR Clear', 'RR Mount',
        'RR Nut on finish', 'LR Nut off Start', 'LR Clear', 'LR Mount', 'LR Nut on finish',
        'RS Peg', 'Dropoff', 'LS Peg'
    ];

    // Pre-calculate attribute names to avoid doing it in the template
    const metricData = metrics.map(metric => ({
        display: metric,
        attr: metric.toLowerCase().replace(/\s+(.)/g, (_, c) => c.toUpperCase())
    }));

    
</script>

<div class="metric-container">
    <!-- <div class="time-display">{timeDisplay}</div> -->
    <div><h3>MetricView Component</h3></div>
    <table>
        <tbody>
            {#each metricData as {display, attr}}
                <tr>
                    <td>{display}</td>
                    <td name={attr}></td>
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

</style>