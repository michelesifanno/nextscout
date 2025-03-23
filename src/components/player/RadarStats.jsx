import * as React from 'react';
import { Typography, Container, Grid2 as Grid } from "@mui/material";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import PlayerStats from './PlayerStats';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function RadarStats({ stats }) {

    const totalShots = stats.reduce((acc, curr) => acc + (curr.shots?.total || 0), 0);
    const totalOn = stats.reduce((acc, curr) => acc + (curr.shots?.on || 0), 0);

    const shotsPercentage = totalShots > 0
        ? ((totalOn / totalShots) * 100).toFixed(0)
        : "N/A";


    const totalDribbles = stats.reduce((acc, curr) => acc + (curr.dribbles?.attempts || 0), 0);
    const successDribbles = stats.reduce((acc, curr) => acc + (curr.dribbles?.success || 0), 0);

    const dribblesPercentage = totalDribbles > 0
        ? ((successDribbles / totalDribbles) * 100).toFixed(0)
        : "N/A";


    const totalDuels = stats.reduce((acc, curr) => acc + (curr.duels?.total || 0), 0);
    const wonDuels = stats.reduce((acc, curr) => acc + (curr.duels?.won || 0), 0);

    const duelsPercentage = totalDuels > 0
        ? ((wonDuels / totalDuels) * 100).toFixed(0)
        : "N/A";


    const options = {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
            padding: 0,
            margin: 0
        },
        scales: {
            r: {
                grid: {
                    color: "rgba(255, 255, 255, 0.2)" // Cambia il colore delle griglie
                },
                pointLabels: {
                    color: "white" // Cambia il colore delle etichette
                },
                suggestedMin: 0,
                suggestedMax: 100,
            }
        },
        plugins: {
            legend: {
                display: false // Nasconde la legenda (che contiene il titolo "Performance%")
            }
        }
    };


    const radarData = {
        labels: [],
        datasets: [
            {
                label: 'Performance (%)',
                data: [],
                backgroundColor: 'rgba(181, 54, 235, 0.2)',
                borderColor: '#AE7AFF',
                borderWidth: 1,

            },
        ],
    };

    if (shotsPercentage !== "N/A") {
        radarData.labels.push("Shots");
        radarData.datasets[0].data.push(Number(shotsPercentage)); // CONVERSIONE FORZATA
    }
    if (dribblesPercentage !== "N/A") {
        radarData.labels.push("Dribbles");
        radarData.datasets[0].data.push(Number(dribblesPercentage)); // CONVERSIONE FORZATA
    }
    if (duelsPercentage !== "N/A") {
        radarData.labels.push("Duels");
        radarData.datasets[0].data.push(Number(duelsPercentage)); // CONVERSIONE FORZATA
    }


    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#AE7AFF' }}>
                Season Stats
            </Typography>
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', marginBottom:'-50px!important' }}>
                {radarData.labels.length > 0 ? (
                    <Radar data={radarData} options={options} />
                ) : (
                    <Typography variant="h6" align="center" color="textSecondary">
                        No data
                    </Typography>
                )}
                {console.log("Radar Data:", JSON.stringify(radarData, null, 2))}
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <PlayerStats stats={stats} />
            </Grid>
        </Container>
    );
}
