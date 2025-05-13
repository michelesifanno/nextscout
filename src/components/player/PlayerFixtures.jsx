import {
    Typography,
    Box,
    CircularProgress,
    Card,
    CardContent,
    Stack,
    Chip,
    Avatar,
  } from "@mui/material";
  import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
  import useTeamFixtures from "../../utils/useTeamFixtures";
  
  export default function PlayerFixtures({ team }) {
    const teamId = team.id;
  
    const { fixtures, loading, error } = useTeamFixtures(teamId);
  
    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!fixtures || fixtures.length === 0)
      return <Typography>Nessuna partita trovata.</Typography>;
  
    const upcomingFixtures = Array.isArray(fixtures) ? fixtures : [];

    const sorted = upcomingFixtures
      .filter(f => f.fixture?.status?.short === "NS")
      .sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
    
    return (
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Prossime Partite
        </Typography>
        <Stack spacing={2}>
          {sorted.map((match) => {
            const isHome = match.teams.home.id === teamId;
            const opponent = isHome ? match.teams.away.name : match.teams.home.name;
            const date = new Date(match.fixture.date).toLocaleDateString("it-IT", {
              weekday: "short",
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            });
    
            return (
              <Card key={match.fixture.id} variant="outlined">
                <CardContent>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body1">
                      <SportsSoccerIcon sx={{ fontSize: 18, mr: 1 }} />
                      {date}
                    </Typography>
                    <Typography variant="h6">
                      VS {opponent}
                    </Typography>
                    <Chip
                      label={isHome ? "🏠 Home" : "🚗 Away"}
                      color={isHome ? "success" : "warning"}
                      size="small"
                    />
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>
    );
  }    