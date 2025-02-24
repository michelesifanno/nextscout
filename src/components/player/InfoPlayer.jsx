import * as React from 'react';
import { Typography, Grid2 as Grid, Box, Container } from "@mui/material";


export default function InfoPlayer({player, stats}) {

    // Calcola la media del rating
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
    const statistics = stats[1];

    // Verifica se le statistiche e la squadra esistono
    const teamName = statistics.team.name || "N/A"; // Se non ci sono statistiche, mostra "N/A"
    const positionName = statistics.games.position || "N/A"; // Se non ci sono statistiche, mostra "N/A"

    return (
        <Container>
            <Box className="info-player">
                <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', alignItems: 'center', p:3, borderBottom: { xs: '2px solid #000', md: 'none' } }}>
                        <img
                            src={player.photo}
                            alt={player.name}
                            width="80"
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
                    <Grid size={{xs: 12, md:7}} sx={{p:{xs:0, md:4}}}>
                        <Grid container sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Grid size={{xs: 4, md:2}} sx={{ p: { xs:3, md:1}, mt: {xs: '-16px', md:0}}}>
                                <img
                                    src={statistics.team.logo}
                                    alt={teamName}
                                    width="50"
                                    height="50"
                                    style={{objectFit:'contain'}}
                                />
                            </Grid>
                            <Grid size={{xs: 4, md:2}} sx={{ p: { xs:3, md:1}, mt: {xs: '-16px', md:0}}}>
                                <Typography variant="h4" className="info-value">
                                {player.nationality ? player.nationality : "N/A"}
                                </Typography>
                                <p className="info-title">
                                    Nationality
                                </p>
                            </Grid>
                            <Grid size={{xs: 4, md:2}} sx={{ p: { xs:3, md:1}, mt: {xs: '-16px', md:0}}}>
                                <Typography variant="h4" className="info-value">
                                {player.age ? player.age : "N/A"}
                                </Typography>
                                <p className="info-title">
                                    Age
                                </p>
                            </Grid>
                            <Grid size={{xs: 4, md:2}} sx={{ p: { xs:3, md:1}, mt: {xs: '-16px', md:0}}}>
                                <Typography variant="h4" className="info-value">
                                {player.weight ? player.weight : "N/A"}
                                </Typography>
                                <p className="info-title">
                                    Weight
                                </p>
                            </Grid>
                            <Grid size={{xs: 4, md:2}} sx={{ p: { xs:3, md:1}, mt: {xs: '-16px', md:0}}}>
                                <Typography variant="h4" className="info-value">
                                {player.height ? player.height : "N/A"}
                                </Typography>
                                <p className="info-title">
                                    Height
                                </p>
                            </Grid>
                            <Grid size={{xs: 4, md:2}} sx={{ backgroundColor: '#D0FF00', p: { xs:3, md:1}, mt: {xs: '-16px', md:0}}}>
                                <Typography variant="h4" className="info-value">
                                {averageRating ? averageRating : "N/A"}
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