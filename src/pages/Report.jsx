import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import InfoPlayer from "../components/player/InfoPlayer";
import CareerStats from '../components/player/CareerStats';
import usePlayerStats from "../utils/usePlayerStats";
import PlayerDetails from '../components/player/PlayerDetails';
import RadarStats from '../components/player/RadarStats';
import OtherPlayers from '../components/player/OtherPlayers';


export default function Report() {

    const { slug } = useParams();
    const playerId = parseInt(slug, 10); // Converte slug in intero
    const { player, stats, loading, error } = usePlayerStats(playerId);
    
    const leagues = stats.map((stat) => stat.league.id);

    console.log('leagues: ', leagues);
    

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error}</p>;

    if (!player || !stats || stats.length === 0) {
        return <p>Dati non disponibili...</p>;  // Mostra un messaggio se i dati non sono disponibili
    }

    return (
        <Container>
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <InfoPlayer player={player} stats={stats} />
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 12 }}>
                                <PlayerDetails player={player} stats={stats} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <RadarStats stats={stats} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <CareerStats stats={stats} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <OtherPlayers stats={stats} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}