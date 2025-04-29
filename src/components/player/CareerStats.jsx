import { useState } from "react";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid2 as Grid } from "@mui/material";
import usePlayerSeason from "../../utils/usePlayerSeason";
import { useParams } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import usePlayerStats from "../../utils/usePlayerStats";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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

    const groupedData = {};
    stats?.forEach(stat => {
        const teamName = stat.team.name;
        const leagueName = stat.league.name;

        if (!groupedData[teamName]) {
            groupedData[teamName] = {
                logo: stat.team.logo,
                leagues: {}
            };
        }

        if (!groupedData[teamName].leagues[leagueName]) {
            groupedData[teamName].leagues[leagueName] = [];
        }

        groupedData[teamName].leagues[leagueName].push(stat);
    });

    const renderStatTable = (title, data, fields) => (
        <>
            <Typography variant="h5" sx={{ mt: 2, mb: 1, color: '#AE7AFF', fontWeight: 'bold' }}>{title}</Typography>
            <Table size="small" sx={{ mb: 2 }}>
                <TableBody>
                    {fields.map((field, i) => (
                        <TableRow key={i}>
                            <TableCell sx={{ color: '#bbb', fontWeight: 500, padding: '0px' }}>
                                <Typography variant="h5">{field.label}</Typography></TableCell>
                            <TableCell>
                                <Typography variant="h5" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                    {data.length > 0
                                        ? field.path.split('.').reduce((acc, key) => acc?.[key], data[0]) ?? 0
                                        : 'N/A'}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );



    if (loading) {
        return <Typography variant="h6" color="textSecondary">Caricamento in corso...</Typography>; // Mostra il messaggio di caricamento
    }

    return (
        <Container className="Container-Career-Stats" sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2, mt: 2 }}>
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

            {Object.entries(groupedData).map(([teamName, teamData], index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`team-${index}-header`}>
                        <img src={teamData.logo} width="40" style={{ marginRight: 10 }} />
                        <Typography variant="h2" className="title-squad">{teamName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {Object.entries(teamData.leagues).map(([leagueName, stats], lIndex) => (
                            <Accordion key={lIndex} sx={{ backgroundColor: "#2a2a2a", color: "#fff", mb: 1 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`league-${lIndex}-header`}>
                                    <Typography variant="subtitle1">{leagueName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {renderStatTable("General", stats, [
                                        { label: "Appearances", path: "games.appearences" },
                                        { label: "Minutes", path: "games.minutes" },
                                        { label: "Rating", path: "games.rating" }
                                    ])}

                                    {renderStatTable("Attack", stats, [
                                        { label: "Goals", path: "goals.total" },
                                        { label: "Assists", path: "goals.assists" },
                                        { label: "Dribbles Attempted", path: "dribbles.attempts" },
                                        { label: "Dribbles Succeeded", path: "dribbles.success" }
                                    ])}

                                    {renderStatTable("Defense", stats, [
                                        { label: "Tackles", path: "tackles.total" },
                                        { label: "Blocks", path: "tackles.blocks" },
                                        { label: "Interceptions", path: "tackles.interceptions" },
                                        { label: "Duels Won", path: "duels.won" },
                                        { label: "Goals Conceded", path: "goals.conceded" },
                                        { label: "Saves", path: "goals.saves" }
                                    ])}

                                    {renderStatTable("Passing", stats, [
                                        { label: "Total Passes", path: "passes.total" },
                                        { label: "Key Passes", path: "passes.key" },
                                        { label: "Accuracy (%)", path: "passes.accuracy" }
                                    ])}

                                    {renderStatTable("Discipline", stats, [
                                        { label: "Fouls Committed", path: "fouls.committed" },
                                        { label: "Fouls Drawn", path: "fouls.drawn" },
                                        { label: "Yellow Cards", path: "cards.yellow" },
                                        { label: "Red Cards", path: "cards.red" }
                                    ])}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
}