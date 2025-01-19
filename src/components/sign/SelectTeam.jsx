import React, { useState, useEffect } from 'react';
import { Grid2 as Grid, Typography, Box } from '@mui/material';
import LazyLoad from 'react-lazyload';

export default function SelectTeam({ teams, onTeamSelect }) {

    const [selectedTeam, setSelectedTeam] = useState(null);

    const handleTeamClick = (team) => {
        setSelectedTeam(team); 
        if (onTeamSelect) {
            onTeamSelect(team);
        }
    };

    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box>
                    <Typography className="title-select">Scegli la tua squadra</Typography>
                    <Grid container spacing={2}>
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <Grid
                                    container
                                    key={team.id}
                                    className="team-select"
                                    spacing={2}
                                    alignItems="center"
                                    onClick={() => handleTeamClick(team.id)}
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
                                        <Typography className="team-name-select">{team.name}</Typography>
                                    </Grid>
                                </Grid>
                            ))
                        )
                            :
                            <p>Nessuna squadra trovata per questa lega.</p>
                        }
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}
