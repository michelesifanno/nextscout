import { Typography, Grid2 as Grid } from "@mui/material";



export default function PlayerDetails({ player, stats, team }) {

    function calculateAverageRating(stats) {
        const validRatings = stats
            .map((item) => parseFloat(item.games.rating)) // Estrai e converte in float
            .filter((rating) => !isNaN(rating)); // Esclude valori non numerici

        return validRatings.length > 0
            ? (validRatings.reduce((acc, rating) => acc + rating, 0) / validRatings.length).toFixed(2)
            : "N/A";
    };

    const averageRating = calculateAverageRating(stats);

    function formatValue(value, key) {
        if (value === null || value === undefined) return "-";

        if (typeof value === "object") {
            if (key === "birth" && value.date && value.place && value.country) {
                return `${value.date} (${value.place}, ${value.country})`;
            }
            return JSON.stringify(value);
        }

        if (typeof value === "boolean") {
            return value ? "Yes" : "No";
        }

        if (typeof value === "number") {
            const roundedUp = Math.ceil(value * 100) / 100;
            return Number.isInteger(roundedUp) ? roundedUp.toString() : roundedUp.toFixed(2);
        }

        return value.toString();
    }

    const playerInfo = {
        "Nationality": player.nationality,
        "Age": player.age,
        "Height": player.height,
        "Weight": player.weight,
        "Injured": player.injured,
    }

    console.log("Player:", player);
    console.log("Player info", playerInfo);




    return (
        <>
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 2 }}>
                <Grid container spacing={2} size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Grid size={{ xs: 4, md: 2 }} sx={{ p: { xs: 2, md: 1 }, mt: { xs: '-16px', md: 0 } }}>
                        <img
                            src={team.logo}
                            alt={team.name}
                            width="50"
                            height="50"
                            style={{ objectFit: 'contain' }}
                        />
                        <p className="info-title">
                            {team.name}
                        </p>
                    </Grid>
                    {Object.entries(playerInfo).map(([key, value]) => (
                        <Grid key={key} size={{ xs: 6, md: 2 }} sx={{ p: { xs: 2, md: 1 }, backgroundColor: '#121212' }}>
                            <Typography variant="h4" className="info-value" sx={{ pt: 1, pb: 0.5 }}>
                                {formatValue(value)}
                            </Typography>
                            <p className="info-title" style={{ paddingBottom: "10px" }}>
                                {key}
                            </p>
                        </Grid>
                    ))}


                </Grid>

            </Grid>
        </>
    )
}