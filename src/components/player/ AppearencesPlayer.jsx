import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";


export default function AppearencesPlayer({stats}) {

    // Calcola la media del rating
    function calculateTotal(stats) {
        const validAppearences = stats
            .map((item) => parseFloat(item.games.rating)) // Estrai e converte in float
            .filter((rating) => !isNaN(rating)); // Esclude valori non numerici

        return validAppearences.length > 0
            ? (validAppearences.reduce((acc, rating) => acc + rating, 0) / validRatings.length).toFixed(2)
            : "N/A";
    };

    const averageRating = calculateAverageRating(stats);


    // Accedi alla prima statistica
    const statistics = stats[1];

    // Verifica se le statistiche e la squadra esistono
    const teamName = statistics.team.name || "N/A"; // Se non ci sono statistiche, mostra "N/A"
    const positionName = statistics.games.position || "N/A"; // Se non ci sono statistiche, mostra "N/A"

    return (
        <Container>
            <Box className="info-player">
                <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid size={5} style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={player.photo}
                            alt={player.name}
                            width="90"
                            style={{ borderRadius: "50%", border: '2px solid', marginRight: '16px' }}
                        />
                        <div>
                            <Typography variant="h2" className="title-player">
                                {player.name}
                            </Typography>
                            <Typography variant="h6" className="role-player">
                                {positionName}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid size={7}>
                        <Grid container sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Grid size={2} sx={{ padding: '10px' }}>
                                <img
                                    src={statistics.team.logo}
                                    alt={teamName}
                                    width="50"
                                />
                            </Grid>
                            <Grid size={2} sx={{ padding: '10px' }}>
                                <Typography variant="h4" className="info-value">
                                    {player.nationality}
                                </Typography>
                                <p className="info-title">
                                    Nationality
                                </p>
                            </Grid>
                            <Grid size={2} sx={{ padding: '10px' }}>
                                <Typography variant="h4" className="info-value">
                                    {player.age}
                                </Typography>
                                <p className="info-title">
                                    Age
                                </p>
                            </Grid>
                            <Grid size={2} sx={{ padding: '10px' }}>
                                <Typography variant="h4" className="info-value">
                                    {player.weight}
                                </Typography>
                                <p className="info-title">
                                    Weight
                                </p>
                            </Grid>
                            <Grid size={2} sx={{ padding: '10px' }}>
                                <Typography variant="h4" className="info-value">
                                    {player.height}
                                </Typography>
                                <p className="info-title">
                                    Height
                                </p>
                            </Grid>
                            <Grid size={2} sx={{ backgroundColor: '#D0FF00', padding: '10px' }}>
                                <Typography variant="h4" className="info-value">
                                    {averageRating}
                                </Typography>
                                <p className="info-title">
                                    Rating
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container >

    )
}