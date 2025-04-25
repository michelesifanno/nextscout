import { useState } from "react";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid2 as Grid } from "@mui/material";
import usePlayerSeason from "../../utils/usePlayerSeason";
import { useParams } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import usePlayerStats from "../../utils/usePlayerStats";


export default function CareerStats() {
    const { slug } = useParams();
    const playerId = parseInt(slug, 10); // Converte slug in intero

    const currentYear = new Date().getFullYear();
    const actualSeason = currentYear - 1;

    const { seasons, loading_season, error_season } = usePlayerSeason(playerId);

    const [season, setSeason] = useState(actualSeason);

    const { player, stats, loading, error } = usePlayerStats(playerId, season);

    const handleChange = (event) => {
        setSeason(event.target.value);
    };


    const rows = ["League", "Matches", "Goal", "Assist"];

    if (loading) {
        return <Typography variant="h6" color="textSecondary">Caricamento in corso...</Typography>; // Mostra il messaggio di caricamento
    }

    return (
        <Container className="Container-Career-Stats" sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2, mt:2 }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item size={{ xs: 6, md: 6 }} sx={{ display: 'flex', justifyContent: 'start' }}>
                    <Typography variant="h2" className='title-stats' sx={{ color: '#AE7AFF' }}>
                        Career Stats
                    </Typography>
                </Grid>
                <Grid item size={{ xs: 6, md: 6 }} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <FormControl variant="standard" sx={{ minWidth: 120, p: 0, m: 0 }}>
                        <Select
                            labelId="Select Season"
                            id="select-season"
                            value={season}
                            onChange={handleChange}
                            label="Season"
                        >
                            {seasons?.map((season, index) =>
                                <MenuItem key={index} value={season}>{season}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TableContainer>
                <Table sx={{ minWidth: '100%' }} aria-label="tabella statistiche Carriera">
                    <TableHead>
                        {rows.map((row, index) => (
                            <TableCell key={index} className={index >= rows.length - 3 ? "align-right" : ""} sx={{ padding: '16px 0px 16px 10px' }}><p className="info-title-table">{row}</p></TableCell>
                        ))}
                    </TableHead>
                    <TableBody>
                        {stats?.map((stat, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ display: 'flex', alignItems: 'center', padding: '16px 0px 16px 10px' }}>
                                    <img src={stat.team.logo} width="30px" style={{ marginRight: '10px' }} />
                                    <div>
                                        <Typography variant="h2" className="title-squad">
                                            {stat.team.name}
                                        </Typography>
                                        <p className="info-title-table">{stat.league.name}</p>
                                    </div>
                                </TableCell>
                                <TableCell sx={{ padding: '16px 0px 16px 10px' }}><Typography variant="h2" className="value-stats-table-season">{stat.games.appearences}</Typography></TableCell>
                                <TableCell sx={{ padding: '16px 0px 16px 10px' }}><Typography variant="h2" className="value-stats-table-season">{stat.goals.total}</Typography></TableCell>
                                <TableCell sx={{ padding: '16px 0px 16px 10px' }}><Typography variant="h2" className="value-stats-table-season">{stat.goals.assists}</Typography></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}