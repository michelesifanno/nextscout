import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';



export default function AppearencesPlayer({ stats }) {

    const totalAppearances = stats.reduce((acc, curr) => acc + (curr.games.appearences || 0), 0);
    const totalLineups = stats.reduce((acc, curr) => acc + (curr.games.lineups || 0), 0);

    const uData = [totalAppearances];
    const pData = [totalLineups];


    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: 4, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#7A92FF' }}>
                Appearences
            </Typography>
            <BarChart
                height={350}
                series={[
                    {
                        data: [totalAppearances],
                        id: 'appearancesId',
                        label: 'Appearences',
                        color: '#7A92FF',
                        barWidth: 20
                    },
                    {
                        data: [totalLineups],
                        id: 'lineupsId',
                        label: 'Lineups',
                        color: '#7A92FF',
                        barWidth: 20
                    }
                ]}
                xAxis={[{ data: ['Appearances and Lineups'], scaleType: 'band', categoryGapRatio: 0.5, barGapRatio: 0.5 }]}
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