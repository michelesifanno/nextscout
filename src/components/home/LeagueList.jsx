import { Box, Grid2 as Grid, Typography, CircularProgress, Container } from '@mui/material';
import LazyLoad from 'react-lazyload';
import useLeagues from '../../hooks/useLeagues';



export default function LeagueList() {

    const { leagues, loading, error } = useLeagues();

    // Combine all loading states
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Handle errors
    if (error) {
        return <div>Errore: {error}</div>;
    }


    return (
        <>
            <Container sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                <Typography variant="h2" className='title-stats' sx={{ color: '#AE7AFF', mb: 2 }}>
                    Select League
                </Typography>
                <Grid container spacing={4}>
                    {leagues.length > 0 ? (
                        leagues.map((league) => (
                            <Grid
                                key={league.id}
                                size={{ xs: 6, md: 2.4 }}
                                spacing={2}
                                alignItems="center"
                                sx={{
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 2 }}>
                                    <LazyLoad height={30} offset={100}>
                                        <img
                                            src={league.logo}
                                            alt={league.name}
                                            style={{
                                                objectFit: 'contain',
                                                width: '100%',
                                                height: 'auto',
                                                maxHeight: '80px',
                                            }}
                                        />
                                    </LazyLoad>
                                </div>
                                <div>
                                    <Typography className="league-name-select">
                                        {league.name}
                                    </Typography>
                                </div>
                            </Grid>
                        ))
                    ) : (
                        <p>Nessuna lega trovata.</p>
                    )}
                </Grid>
            </Container>
        </>
    );
}