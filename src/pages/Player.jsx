import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import InfoPlayer from "../components/player/InfoPlayer";
import ShotsAccurancy from '../components/player/ShotsAccurancy';
import PassesAccurancy from '../components/player/PassesAccurancy';
import DribblesAccurancy from '../components/player/DribblesAccuracy';
import CareerStats from '../components/player/CareerStats';
import usePlayerStats from "../utils/usePlayerStats";
import PlayerStats from '../components/player/PlayerStats';
import PlayerDetails from '../components/player/PlayerDetails';
import RatingChart from '../components/player/RatingChart';
import RadarStats from '../components/player/RadarStats';


export default function Player() {
    const { slug } = useParams();
    const playerId = parseInt(slug, 10); // Converte slug in intero
    const { player, stats, loading, error } = usePlayerStats(playerId);

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
                            <Grid size={{ xs: 12, md: 12 }}>
                                <CareerStats stats={stats} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <RadarStats stats={stats} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    {/* <Grid size={{ xs: 12, md: 6 }}>
                        <PlayerStats stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <AppearencesPlayer stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <ShotsPlayer stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <GoalsPlayer stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <PassesStats stats={stats} />
                    </Grid> */}
                    {/* <Grid size={{ xs: 12, md: 4 }}>
                        <ShotsAccurancy stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <PassesAccurancy stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <DribblesAccurancy stats={stats} />
                    </Grid> */}
                    {/* <Grid size={{ xs: 12, md: 4 }}>
                        <OtherStats stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <CareerStats stats={stats} />
                    </Grid> */}
                </Grid>
            </Box>
        </Container>
    );
}
