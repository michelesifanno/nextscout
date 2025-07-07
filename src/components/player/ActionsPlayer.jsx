import * as React from 'react';
import { Typography, Grid2 as Grid, Stack, Button } from "@mui/material";
import { Link } from 'react-router';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import BestStats from './BestStats';


export default function ActionsPlayer(player) {

    return (


        <Grid container spacing={2} sx={{ display: 'flex', mt: 2, mb: 2, borderRadius: 2 }}>
            <Grid container spacing={2} size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'end', textAlign: 'right' }}>
                <Link to={`/report/${player.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                    <QueryStatsOutlinedIcon className='stats-icon' />
                </Link>
            </Grid>
            <Stack direction="row" spacing={2}>
    <Button variant="outlined" startIcon={<QueryStatsOutlinedIcon className='stats-icon'/>}>
        Report
    </Button>
    <Button variant="contained" endIcon={<FavoriteBorderOutlinedIcon className='favorite-icon'/>}>
        Mi piace
    </Button>
</Stack>
            <Grid container spacing={2} size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <FavoriteBorderOutlinedIcon className='favorite-icon' />
            </Grid>
        </Grid>
    )
};

