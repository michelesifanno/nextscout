import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container, Rating } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import InfoPlayer from "../components/player/InfoPlayer";
import CareerStats from '../components/player/CareerStats';
import usePlayerStats from "../utils/usePlayerStats";
import PlayerDetails from '../components/player/PlayerDetails';
import RadarStats from '../components/player/RadarStats';
import OtherPlayers from '../components/player/OtherPlayers';
import RatingCharts from '../components/player/RatingChart';
import usePlayerSeason from '../utils/usePlayerSeason';


export default function Player() {
    const { slug } = useParams();
    const location = useLocation();

    const { id, name, logo } = location.state || {};

    const team = { id, name, logo };

    const playerId = parseInt(slug, 10); // Converte slug in intero


    const currentYear = new Date().getFullYear();
    const actualSeason = currentYear - 1;

    const { player, stats, loading, error } = usePlayerStats(playerId, actualSeason);


    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error}</p>;

    if (!player || !stats || (Array.isArray(stats) && stats.length === 0)) {
        return <p>Dati non disponibili...</p>;
    }


    return (
        <Container>
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid container size={{ xs: 12, md: 8 }}>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <InfoPlayer player={player} stats={stats} />
                            <PlayerDetails player={player} stats={stats} team={team} />
                        </Grid>

                        {/* <Grid size={{ xs: 12, md: 4 }}>
                            <RadarStats stats={stats} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <RatingCharts />
                        </Grid> */}

                        <Grid size={{ xs: 12, md: 12 }}>
                            <CareerStats />
                        </Grid>

                        <Grid size={{ xs: 12, md: 12 }}>
                            <OtherPlayers stats={stats} team={team} />
                        </Grid>
                    </Grid>
                    <Grid container size={{ xs: 12, md: 4 }}>
                        <Grid size={{ xs: 12 }}>
                            <RadarStats stats={stats} />
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}