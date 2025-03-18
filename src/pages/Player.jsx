import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import InfoPlayer from "../components/player/InfoPlayer";
import AppearencesPlayer from "../components/player/ AppearencesPlayer";
import ShotsPlayer from '../components/player/ShotsPlayer';
import GoalsPlayer from '../components/player/GoalsPlayer';
import PassesStats from '../components/player/PassesStats';
import ShotsAccurancy from '../components/player/ShotsAccurancy';
import PassesAccurancy from '../components/player/PassesAccurancy';
import DribblesAccurancy from '../components/player/DribblesAccuracy';
import OtherStats from '../components/player/OtherStats';
import CareerStats from '../components/player/CareerStats';
import RadarStats from '../components/player/radarStats';
import usePlayerStats from "../utils/usePlayerStats";

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
            <Box>
                <InfoPlayer player={player} stats={stats} />
            </Box>
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                        <RadarStats stats={stats} />
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
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <ShotsAccurancy stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <PassesAccurancy stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <DribblesAccurancy stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <OtherStats stats={stats} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <CareerStats stats={stats} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
