import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';



export default function DribblesAccurancy({ stats }) {


    const attemptsDribbles = stats.reduce((acc, curr) => acc + (curr.dribbles.attempts || 0), 0);
    const successDribbles = stats.reduce((acc, curr) => acc + (curr.dribbles.success || 0), 0);

    const accuracyDribbles = attemptsDribbles > 0 ? ((successDribbles / attemptsDribbles) * 100).toFixed(0) : 0;


    const settings = {
        height: 300,
        value: accuracyDribbles,
    };


    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#AE7AFF' }}>
                Dribbles accurancy
            </Typography>
            <Gauge
                {...settings}
                cornerRadius="50%"
                sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 20,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#AE7AFF',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: theme.palette.text.disabled,
                    },
                })}
            />
        </Container>
    )
}