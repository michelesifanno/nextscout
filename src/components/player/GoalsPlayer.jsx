import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';



export default function GoalsPlayer({ stats }) {

    const totalGoals = stats.reduce((acc, curr) => acc + (curr.goals.total || 0), 0);
    const totalPenalty = stats.reduce((acc, curr) => acc + (curr.penalty.scored || 0), 0);

    const uData = [totalGoals];
    const pData = [totalPenalty];


    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: 4, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#AE7AFF' }}>
                Goals
            </Typography>
            <BarChart
                height={350}
                series={[
                    {
                        data: [totalGoals],
                        id: 'goals',
                        label: 'Goals',
                        color: '#AE7AFF',
                        barWidth: 20
                    },
                    {
                        data: [totalPenalty],
                        id: 'Penalty',
                        label: 'Penalty',
                        color: '#AE7AFF',
                        barWidth: 20
                    }
                ]}
                xAxis={[{ data: ['Goals and Penalty'], scaleType: 'band', categoryGapRatio: 0.5, barGapRatio: 0.5 }]}
                slotProps={{
                    legend: {
                        position: { vertical: 'bottom', horizontal: 'right' }, // Posizione della legenda
                        labelStyle: {
                            fontSize: 12,
                            fill: '#B3B3B3',
                        },
                        markSize: 12,
                        itemGap: 8,
                    },
                }}
                style={{ width: '100%' }}
                margin={{ top: 25, right: 25, bottom: 80, left: 25 }}
            />
        </Container>
    )
}