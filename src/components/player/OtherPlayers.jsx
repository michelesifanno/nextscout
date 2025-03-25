import * as React from 'react';
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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

    console.log("OtherPlayers players:", players);

    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#AE7AFF' }}>
                See also
            </Typography>
            <TableContainer>
                <Table sx={{ minWidth: '100%' }} aria-label="tabella statistiche Carriera">
                    <TableBody>
                        {filteredPlayers.map((player, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ display: 'flex', alignItems: 'center', padding: '16px 0px' }}>
                                    <img src={player.photo} width="40px" style={{ marginRight: '10px', borderRadius: '50%', border: '1px solid #000' }} />
                                    <div>
                                        <Typography variant="h2" className="title-squad">
                                            {player.name}
                                        </Typography>
                                        <p className="info-title-table"> {player.position}</p>
                                    </div>
                                </TableCell>
                                <TableCell sx={{ textAlign: 'right', padding: '16px 0px' }}>
                                    <Link to={`/player/${player.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                                        <ArrowOutwardIcon sx={{ color: '#fff', fontSize: '18px' }} />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}