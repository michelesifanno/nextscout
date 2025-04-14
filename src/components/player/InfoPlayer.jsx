import * as React from 'react';
import { Typography, Grid2 as Grid } from "@mui/material";
import { Link } from 'react-router';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';


export default function InfoPlayer({ player, stats, team }) {

    // Accedi alla prima statistica
    const statistics = stats[0];

    // Verifica se le statistiche e la squadra esistono
    const teamName = statistics.team.name || "N/A"; // Se non ci sono statistiche, mostra "N/A"
    const positionName = statistics.games.position || "N/A"; // Se non ci sono statistiche, mostra "N/A"

    return (
        <>
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2, mb: 2 }}>
                <Grid size={{ xs: 8, md: 10 }} sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={player.photo}
                        alt={player.name}
                        width="80"
                        style={{ borderRadius: "50%", border: '2px solid #000', marginRight: '16px' }}
                    />
                    <div>
                        <Typography variant="h2" className="title-player">
                            {player.firstname} {player.lastname}
                        </Typography>
                        <Typography variant="h6" className="role-player">
                            {positionName}
                        </Typography>
                    </div>
                </Grid>
                <Grid size={{ xs: 4, md: 2 }}>
                    <Grid container sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Grid size={{ xs: 6, md: 6 }} sx={{ p: { xs: 1, md: 1 }, mt: { xs: '6px', md: 0 } }}>
                            <Link to={`/report/${player.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                                <QueryStatsOutlinedIcon className='stats-icon' />
                            </Link>
                        </Grid>
                        <Grid size={{ xs: 6, md: 6 }} sx={{ p: { xs: 1, md: 1 }, mt: { xs: '6px', md: 0 } }}>
                            <FavoriteBorderOutlinedIcon className='favorite-icon' />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}