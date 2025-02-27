import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';



export default function ShotsPlayer({ stats }) {

    const totalShots = stats.reduce((acc, curr) => acc + (curr.shots.total || 0), 0);
    const totalOnTarget = stats.reduce((acc, curr) => acc + (curr.shots.on || 0), 0);

    const uData = [totalShots];
    const pData = [totalOnTarget];


    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: 4, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#D0FF00' }}>
                Shots
            </Typography>
            <BarChart
                height={350}
                series={[
                    {
                        data: [totalShots],
                        id: 'shots',
                        label: 'Shots',
                        color: '#D0FF00',
                        barWidth: 20
                    },
                    {
                        data: [totalOnTarget],
                        id: 'ontarget',
                        label: 'On Target',
                        color: '#D0FF00',
                        barWidth: 20
                    }
                ]}
                xAxis={[{ data: ['Shots | Total and On Target'], scaleType: 'band', categoryGapRatio: 0.5, barGapRatio: 0.5 }]}
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