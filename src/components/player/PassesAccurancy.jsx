import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';



export default function PassesAccurancy({ stats }) {


    // Calcola la media del Passes Accurancy
    function calculateAverageAccurancy(stats) {
        const validAccuracy = stats
            .map((item) => parseFloat(item.passes.accuracy))
            .filter((accuracy) => !isNaN(accuracy));

        return validAccuracy.length > 0
            ? (validAccuracy.reduce((acc, accuracy) => acc + accuracy, 0) / validAccuracy.length).toFixed(0)
            : "N/A";
    };

    const averageAccuracy = calculateAverageAccurancy(stats);



    const settings = {
        height: 300,
        value: averageAccuracy,
    };


    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#FF7AD9' }}>
                Passes accurancy
            </Typography>
            <Gauge
                {...settings}
                cornerRadius="50%"
                sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 20,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#FF7AD9',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: theme.palette.text.disabled,
                    },
                })}
            />
        </Container>
    )
}