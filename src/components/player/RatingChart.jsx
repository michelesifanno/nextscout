import { useState, useEffect } from "react";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid2 as Grid, Box } from "@mui/material";
import usePlayerSeason from "../../utils/usePlayerSeason";
import usePlayerOldStats from "../../utils/usePlayerOldStats";
import { useParams } from "react-router-dom";
import { LineChart } from "@mui/x-charts";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import supabase from "../../supabase/client";
import axios from "axios";

export default function RatingCharts() {

    const { slug } = useParams();
    const playerId = parseInt(slug, 10); // Converte slug in intero

    const { seasons, loading_season, error } = usePlayerSeason(playerId);

    const { player, stats: oldStats, loading: loading_oldstats, error: error_oldstats } = usePlayerOldStats(playerId, seasons && !loading_season ? seasons : []);


    const controller = new AbortController(); // Per cancellare richieste in corso
    const cacheTimeMs = 7 * 24 * 60 * 60 * 1000; // 1 settimana


    function calculateSeasonalAverageRatings(oldStats) {
        if (!oldStats || oldStats.length === 0) return [];

        return oldStats.map((seasonData) => {
            const { season, stats } = seasonData; // Estraggo stagione e stats

            const validRatings = stats
                .map((item) => parseFloat(item.games.rating)) // Estrai e converte in float
                .filter((rating) => !isNaN(rating)); // Esclude valori non numerici

            const averageRating =
                validRatings.length > 0
                    ? (validRatings.reduce((acc, rating) => acc + rating, 0) / validRatings.length).toFixed(2)
                    : "N/A";

            return { season, averageRating }; // Restituisce un oggetto con stagione e media
        });
    }

    // Esempio di utilizzo
    const seasonalAverageRatings = calculateSeasonalAverageRatings(oldStats);
    console.log("📊 Seasonal Ratings:", seasonalAverageRatings);

    const xAxisData = seasonalAverageRatings.map((season) => (season.season % 100).toString()); // Mostra solo gli ultimi due numeri

    const seriesData = seasonalAverageRatings.map((season) => {
        const rating = parseFloat(season.averageRating);
        return isNaN(rating) ? 0 : rating; // Se il rating è "N/A", sostituiscilo con 0
    }); // Estrai i rating medi, sostituendo "N/A" con 0



    if (loading_season || loading_oldstats) {
        return <Typography variant="h6" color="textSecondary">Caricamento in corso...</Typography>; // Mostra il messaggio di caricamento
    }

    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2, mt: 2 }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'start' }}>
                    <Typography variant="h2" className='title-stats' sx={{ color: '#AE7AFF' }}>
                        Rating Stats
                    </Typography>
                </Grid>
                <Grid item size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <LineChart
                        xAxis={[{ data: xAxisData }]} // Usa xAxisData per l'asse X
                        series={[{ data: seriesData }]} // Usa seriesData per l'asse Y
                        height={300}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
