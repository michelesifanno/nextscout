import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';



export default function ShotsAccurancy({ stats }) {


    const totalShots = stats.reduce((acc, curr) => acc + (curr.shots.total || 0), 0);
    const onShots = stats.reduce((acc, curr) => acc + (curr.shots.on || 0), 0);

    const accuracyShots = totalShots > 0 ? ((onShots / totalShots) * 100).toFixed(0) : 0;


    const settings = {
        height: 300,
        value: accuracyShots,
    };


    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#D0FF00' }}>
                Shots accurancy
            </Typography>
            <Gauge
                {...settings}
                cornerRadius="50%"
                sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 20,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#D0FF00',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: theme.palette.text.disabled,
                    },
                })}
            />
        </Container>
    )
}