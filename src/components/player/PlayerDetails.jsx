import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';



export default function PlayerDetails({ player, stats }) {

    function calculateAverageRating(stats) {
        const validRatings = stats
            .map((item) => parseFloat(item.games.rating)) // Estrai e converte in float
            .filter((rating) => !isNaN(rating)); // Esclude valori non numerici

        return validRatings.length > 0
            ? (validRatings.reduce((acc, rating) => acc + rating, 0) / validRatings.length).toFixed(2)
            : "N/A";
    };

    const averageRating = calculateAverageRating(stats);


    // Accedi alla prima statistica
    const statistics = stats[0];

    // Verifica se le statistiche e la squadra esistono
    const teamName = statistics.team.name || "N/A"; // Se non ci sono statistiche, mostra "N/A"
    const positionName = statistics.games.position || "N/A"; // Se non ci sono statistiche, mostra "N/A"

    return (
        <>
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                <Grid container size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Grid size={{ xs: 4, md: 2 }} sx={{ p: { xs: 2, md: 1 }, mt: { xs: '-16px', md: 0 }}}>
                            <img
                                src={statistics.team.logo}
                                alt={teamName}
                                width="50"
                                height="50"
                                style={{ objectFit: 'contain' }}
                            />
                        <p className="info-title">
                            {statistics.team.name}
                        </p>
                    </Grid>
                    <Grid size={{ xs: 4, md: 2 }} sx={{ p: { xs: 2, md: 1 }, mt: { xs: '-16px', md: 0 } }}>
                        <Typography variant="h4" className="info-value">
                            {player.nationality ? player.nationality : "N/A"}
                        </Typography>
                        <p className="info-title">
                            Nationality
                        </p>
                    </Grid>
                    <Grid size={{ xs: 4, md: 2 }} sx={{ p: { xs: 2, md: 1 }, mt: { xs: '-16px', md: 0 } }}>
                        <Typography variant="h4" className="info-value">
                            {player.age ? player.age : "N/A"}
                        </Typography>
                        <p className="info-title">
                            Age
                        </p>
                    </Grid>
                    <Grid size={{ xs: 4, md: 2 }} sx={{ p: { xs: 2, md: 1 }, mt: { xs: '-16px', md: 0 } }}>
                        <Typography variant="h4" className="info-value">
                            {player.weight ? player.weight : "N/A"}
                        </Typography>
                        <p className="info-title">
                            Weight
                        </p>
                    </Grid>
                    <Grid size={{ xs: 4, md: 2 }} sx={{ p: { xs: 2, md: 1 }, mt: { xs: '-16px', md: 0 } }}>
                        <Typography variant="h4" className="info-value">
                            {player.height ? player.height : "N/A"}
                        </Typography>
                        <p className="info-title">
                            Height
                        </p>
                    </Grid>
                    <Grid size={{ xs: 4, md: 2 }} sx={{ p: { xs: 2, md: 1 }, mt: { xs: '-16px', md: 0 } }}>
                        <Typography variant="h4" className="info-value">
                            <span style={{ color: '#D0FF00' }}>{averageRating ? averageRating : "N/A"}</span>
                        </Typography>
                        <p className="info-title">
                            <span style={{ color: '#D0FF00' }}>Rating</span>
                        </p>
                    </Grid>
                </Grid>

            </Grid>
        </>
    )
}