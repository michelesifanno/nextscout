import { Grid2 as Grid, Box, Container } from "@mui/material";
import LeagueList from '../components/home/LeagueList';

export default function Home2() {


    return (
        <Container>
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid container size={{ xs: 12, md: 9 }}>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <LeagueList />
                        </Grid>
                    </Grid>
                    {/* <Grid container size={{ xs: 12, md: 8 }}>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <InfoPlayer player={player} stats={stats} />
                            <PlayerDetails player={player} stats={stats} team={team} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <RadarStats stats={stats} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <RatingCharts />
                        </Grid>

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
                    </Grid> */}

                </Grid>
            </Box>
        </Container>
    );
}