import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';



export default function PassesStats({ stats }) {

    const totalPasses = stats.reduce((acc, curr) => acc + (curr.passes.key || 0), 0);
    const totalAssist = stats.reduce((acc, curr) => acc + (curr.goals.assists || 0), 0);

    const uData = [totalPasses];
    const pData = [totalAssist];


    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: 4, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#FF7AD9' }}>
                Passes
            </Typography>
            <BarChart
                height={350}
                series={[
                    {
                        data: [totalPasses],
                        id: 'key-pass',
                        label: 'Key Pass',
                        color: '#FF7AD9',
                        barWidth: 20
                    },
                    {
                        data: [totalAssist],
                        id: 'assist',
                        label: 'Assist',
                        color: '#FF7AD9',
                        barWidth: 20
                    }
                ]}
                xAxis={[{ data: ['Key Passes and Assist'], scaleType: 'band', categoryGapRatio: 0.5, barGapRatio: 0.5 }]}
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