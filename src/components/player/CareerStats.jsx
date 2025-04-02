import { useState, useEffect } from "react";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid2 as Grid } from "@mui/material";
import usePlayerSeason from "../../utils/usePlayerSeason";
import usePlayerOldStats from "../../utils/usePlayerOldStats";
import { useParams } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import supabase from "../../supabase/client";
import axios from "axios";

export default function CareerStats({ stats }) {

    const { slug } = useParams();
    const playerId = parseInt(slug, 10); // Converte slug in intero

    const currentYear = new Date().getFullYear();
    const actualSeason = currentYear - 1;

    const { seasons, loading_season, error } = usePlayerSeason(playerId);

    const [season, setSeason] = useState(actualSeason);
    const [oldStats, setOldStats] = useState(stats); // Stato per le statistiche

    const [loading, setLoading] = useState(true); // Stato di caricamento

    console.log("Stats from parent:", oldStats);

    const handleChange = (event) => {
        setSeason(event.target.value);
    };

    const controller = new AbortController(); // Per cancellare richieste in corso
    const cacheTimeMs = 7 * 24 * 60 * 60 * 1000; // 1 settimana

    
    useEffect(() => {

        async function fetchPlayerOldStats() {
            setLoading(true); // Inizia il caricamento

            try {
                // Controllo prima se il player è nel database
                const { data: dbRecords, error: dbError } = await supabase
                    .from("players_stats_old")
                    .select("*")
                    .match({ player_id: playerId, season_year: season });

                if (dbError) throw new Error("Errore nel recupero dati da Supabase");
                const now = Date.now();

                if (
                    dbRecords?.length > 0 &&
                    (now - new Date(dbRecords[0].last_update).getTime() < cacheTimeMs)
                ) {
                    console.log("Dati aggiornati, uso il Database");

                    setOldStats(dbRecords[0].stats);
                } else {
                    // Chiamata API se dati non aggiornati
                    console.log("⚠️ Dati vecchi o assenti, chiamata API in corso...");
                    const url = `${import.meta.env.VITE_BASE_URL}/players?id=${playerId}&season=${season}`;
                    const response = await axios.get(url, {
                        headers: {
                            "x-rapidapi-host": import.meta.env.VITE_BASE_URL,
                            "x-rapidapi-key": import.meta.env.VITE_API_KEY,
                        },
                        signal: controller.signal, // Collego il controller per abortire se cambia `id`
                    });

                    if (!response.data.response?.length) throw new Error("Nessun dato ricevuto dall'API");

                    const apiPlayerData = response.data.response[0].player;
                    const apiPlayerStats = response.data.response[0].statistics;

                    setOldStats(apiPlayerStats);

                    try {
                        const { error: upsertError } = await supabase
                            .from("players_stats_old")
                            .upsert({
                                player_id: apiPlayerData.id,
                                player: apiPlayerData,
                                stats: apiPlayerStats,
                                season_year: season,
                                last_update: new Date(),
                            });

                        if (upsertError) console.error("Errore durante l'upsert:", upsertError);

                    } catch (err) {
                        if (axios.isCancel(err)) return; // Evita errori se la richiesta è stata annullata
                        console.error("Errore durante il fetch:", err);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false); // Fine del caricamento
            }

            return () => controller.abort(); // Cleanup se `id` cambia prima che la chiamata termini
        }

        fetchPlayerOldStats(); // Chiamata alla funzione
        return () => controller.abort(); // Cleanup se `id` cambia
    }, [playerId, season]); // Dipendenze dell'useEffect

    const rows = ["League", "Matches", "Goal", "Assist"];

    if (loading) {
        return <Typography variant="h6" color="textSecondary">Caricamento in corso...</Typography>; // Mostra il messaggio di caricamento
    }

    return (
        <Container className="Container-Career-Stats" sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
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
                        {oldStats?.map((stat, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ display: 'flex', alignItems: 'center', padding: '16px 0px 16px 10px' }}>
                                    <img src={stat.team.logo} width="30px" style={{ marginRight: '10px' }} />
                                    <div>
                                        <Typography variant="h2" className="title-squad">
                                            {stat.team.name}
                                        </Typography>
                                        <p className="info-title-table"> {stat.league.name}</p>
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
