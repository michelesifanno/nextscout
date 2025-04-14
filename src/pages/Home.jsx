import React, { useState, useEffect } from 'react';
import { Box, Grid2 as Grid, Typography, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet-async';
import useLeagues from '../hooks/useLeagues';
import useTeams from '../hooks/useTeams';
import usePlayers from '../hooks/usePlayers';



function Home() {
    const { leagues, loading, error } = useLeagues();
    const { teams, loadingTeams, errorTeams } = useTeams();
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const { players, loadingPlayers, errorPlayers } = usePlayers(selectedTeam?.id);
    const theme = useTheme();
    const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

    const pageTitle = `NextScout`;
    const metaDescription = `NextScout is the platform to monitor and analyze the best football talents. Up-to-date data and advanced algorithms to evaluate top prospects.`;

    // Combine all loading states
    if (loading || loadingTeams || loadingPlayers) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Handle errors
    if (error || errorTeams || errorPlayers) {
        return <div>Errore: {error || errorTeams || errorPlayers}</div>;
    }

    // Filter teams based on the selected league
    const filteredTeams = selectedLeague
        ? teams.filter((team) => team.league_id === selectedLeague.id)
        : [];

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <Box sx={{ padding: '16px', backgroundColor: 'primary.background' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <Typography className="title-select">
                                Scegli campionato
                            </Typography>
                            <Grid container spacing={2}>
                                {leagues.length > 0 ? (
                                    leagues.map((league) => (
                                        <Grid
                                            container
                                            key={league.id}
                                            className="league-select"
                                            spacing={2}
                                            alignItems="center"
                                            onClick={() => setSelectedLeague(league)}
                                            sx={{
                                                cursor: 'pointer',
                                                border: selectedLeague?.id === league.id ? '2px solid #1976d2' : '1px solid #ccc',
                                                borderRadius: '8px',
                                                padding: '8px',
                                                backgroundColor: selectedLeague?.id === league.id ? '#e3f2fd' : '#fff',
                                            }}
                                        >
                                            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <LazyLoad height={30} offset={100}>
                                                    <img
                                                        src={league.logo}
                                                        alt={league.name}
                                                        style={{
                                                            objectFit: 'contain',
                                                            width: '100%',
                                                            height: 'auto',
                                                            maxWidth: '30px',
                                                            maxHeight: '30px',
                                                        }}
                                                    />
                                                </LazyLoad>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography className="league-name-select">
                                                    {league.name}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))
                                ) : (
                                    <p>Nessuna lega trovata.</p>
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: '16px', backgroundColor: '#fff' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <Typography className="title-select">
                                Scegli la tua squadra
                            </Typography>
                            <Grid container spacing={2}>
                                {selectedLeague && filteredTeams.length > 0 ? (
                                    filteredTeams.map((team) => (
                                        <Grid
                                            container
                                            key={team.id}
                                            className="team-select"
                                            spacing={2}
                                            alignItems="center"
                                            onClick={() => setSelectedTeam(team)}
                                            sx={{
                                                cursor: 'pointer',
                                                border: selectedTeam === team.id ? '2px solid #1976d2!important' : '1px solid #ccc',
                                                borderRadius: '8px',
                                                padding: '8px',
                                                backgroundColor: selectedTeam === team.id ? '#e3f2fd!important' : '#fff',
                                            }}
                                        >
                                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                <LazyLoad height={50} offset={100}>
                                                    <img
                                                        src={team.logo}
                                                        alt={team.name}
                                                        style={{
                                                            objectFit: 'contain',
                                                            width: '100%',
                                                            height: 'auto',
                                                            maxWidth: '50px',
                                                            maxHeight: '50px',
                                                        }}
                                                    />
                                                </LazyLoad>
                                                <Typography className="team-name-select">
                                                    {team.name}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))
                                ) : selectedLeague ? (
                                    <p>Nessuna squadra trovata per questa lega.</p>
                                ) : (
                                    <p>Seleziona una lega per vedere le squadre.</p>
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: '16px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <Typography className="title-select">
                                Lista dei calciatori
                            </Typography>
                            <Grid container spacing={2}>
                                {selectedTeam ? (
                                    players.length > 0 ? (
                                        players.map((player) => (
                                            <Grid container key={player.id} className="team-select" spacing={2} alignItems="center">
                                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                <Link
                                                to={`/player/${player.id}`}
                                                state={{id: selectedTeam.id, name: selectedTeam.name, logo: selectedTeam.logo }}
                                                style={{ textDecoration: 'none', color: '#333' }}>
                                                    <LazyLoad height={50} offset={100}>
                                                        <img
                                                            src={player.photo}
                                                            alt={player.name}
                                                            style={{
                                                                objectFit: 'contain',
                                                                width: '100%',
                                                                height: 'auto',
                                                                maxWidth: '50px',
                                                                maxHeight: '50px',
                                                            }}
                                                        />
                                                    </LazyLoad>
                                                    <Typography className="team-name-select">
                                                        {player.name}
                                                    </Typography>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        ))
                                    ) : (
                                        <p>Nessun giocatore trovato per questa squadra.</p>
                                    )
                                ) : (
                                    <p>Seleziona una squadra per vedere i calciatori.</p>
                                )}

                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Home;