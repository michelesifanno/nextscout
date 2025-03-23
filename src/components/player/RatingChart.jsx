import * as React from 'react';
import { Typography, Grid2 as Grid } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';




export default function RatingChart({ stats }) {


    const average = stats.map(item => item.games.rating);

    const leagues = stats.map(item => item.league.name);

    return (
        <>
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2, mb: 2 }}>
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center' }}>

                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        width={500}
                        height={300}
                    />

                </Grid>
            </Grid>
        </>
    )
}