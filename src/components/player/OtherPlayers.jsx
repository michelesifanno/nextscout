import * as React from 'react';
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid2 as Grid } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router';
import { useParams } from "react-router-dom";
import useTeamPlayers from '../../utils/useTeamPlayers';


export default function OtherPlayers({ stats }) {

    const { slug } = useParams();
    const playerId = parseInt(slug, 10); // Converte slug in intero

    // Accedi alla prima statistica
    const statistics = stats[0];

    // Verifica se le statistiche e la squadra esistono
    const teamId = statistics.team.id || "N/A"; // Se non ci sono statistiche, mostra "N/A"
    const positionName = statistics.games.position || "N/A"; // Se non ci sono statistiche, mostra "N/A"

    const { players, loading, error } = useTeamPlayers(teamId);

    const filteredPlayers = players
        ? players.filter((player) => player.position === positionName && player.id !== playerId)
        : [];

    return (
        <>
            <Typography variant="h2" className='title-stats' sx={{ color: '#AE7AFF', mb: 2, mt: 2 }}>
                See also
            </Typography>
            <Grid container spacing={2}>
                {filteredPlayers.map((player, index) => (
                    <Grid key={index} size={{ xs: 6, md: 2 }} sx={{ backgroundColor: '#121212', p: { xs: 2, md: 3 }, borderRadius: 2 }}>
                        <Link to={`/player/${player.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                            <img src={player.photo} width="60px" style={{ borderRadius: '50%', border: '1px solid #000', marginBottom: '10px' }} />
                            <div>
                                <Typography variant="h2" className="title-squad">
                                    {player.name}
                                </Typography>
                                <p className="info-title-table"> {player.position}</p>
                            </div>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}