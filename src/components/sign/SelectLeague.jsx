import React, { useState } from 'react';
import { Grid2 as Grid, Typography, Box } from '@mui/material';
import LazyLoad from 'react-lazyload';

export default function SelectLeague({ leagues, onLeagueSelect }) {
    
    const [selectedLeague, setSelectedLeague] = useState(null);

    const handleLeagueClick = (league) => {
        setSelectedLeague(league); // Imposta la lega selezionata localmente
        if (onLeagueSelect) {
            onLeagueSelect(league); // Comunica la selezione al componente padre
        }
    };

    return (
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
                                    onClick={() => handleLeagueClick(league)} // Usa handleLeagueClick
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
    )
}
