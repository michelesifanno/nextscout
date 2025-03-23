import { useState, useEffect } from 'react';
import { Typography, Grid2 as Grid, Accordion, AccordionActions, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function PlayerStats({ stats }) {

    const [totalGkStats, setTotalGkStats] = useState({});
    const [totalDefStats, setTotalDefStats] = useState({});
    const [totalMidStats, setTotalMidStats] = useState({});
    const [totalAtkStats, setTotalAtkStats] = useState({});


    // Lista delle statistiche da calcolare per un Portiere
    const gkData = ["goals.conceded", "goals.saves", "penalty.committed", "penalty.saved", "games.appearences", "games.minutes"];

    // Lista delle statistiche da calcolare per un Portiere
    const defData = ["goals.total", "goals.assist", "tackles.total", "tackles.interceptions", "duels.total", "duels.won",
        "fouls.drawn", "fouls.committed", "penalty.commited", "penalty.scored", "shots.total", "shots.on"
    ];

    // Lista delle statistiche da calcolare per un Portiere
    const midData = ["goals.total", "goals.assist", "passes.total", "passes.key", "tackles.total",
        "tackles.interceptions", "duels.total", "duels.won", "dribbles.attempts", "dribbles.success", "fouls.drawn",
        "fouls.committed", "shots.total", "shots.on"
    ];

    // Lista delle statistiche da calcolare per un Portiere
    const atkData = ["goals.total", "goals.assists", "shots.total", "shots.on", "dribbles.success",
        "dribbles.attempts", "passes.total", "passes.key", "penalty.scored", "penalty.missed", "fouls.committed", "fouls.drawn"
    ];


    // Funzione per calcolare il totale di una statistica nidificata
    function calculateTotalStats(stats, name) {
        return stats
            .map((item) => {
                const keys = name.split(".");
                return keys.reduce((acc, key) => acc && acc[key], item);
            })
            .filter((value) => !isNaN(value)) // Solo numeri validi
            .reduce((acc, value) => acc + value, 0); // Somma
    }

    // Calcola tutti i totali e aggiorna lo stato
    useEffect(() => {


        const gkTotals = gkData.reduce((acc, statName) => {
            acc[statName] = calculateTotalStats(stats, statName);
            return acc;
        }, {});
        setTotalGkStats(gkTotals);


        const defTotals = defData.reduce((acc, statName) => {
            acc[statName] = calculateTotalStats(stats, statName);
            return acc;
        }, {});
        setTotalDefStats(defTotals);


        const midTotals = midData.reduce((acc, statName) => {
            acc[statName] = calculateTotalStats(stats, statName);
            return acc;
        }, {});
        setTotalMidStats(midTotals);


        const atkTotals = atkData.reduce((acc, statName) => {
            acc[statName] = calculateTotalStats(stats, statName);
            return acc;
        }, {});
        setTotalAtkStats(atkTotals);


    }, [stats]);


    // Funzione per formattare il titolo (es: "dribbles" → "Dribbles")
    const formatTitle = (key) => key.charAt(0).toUpperCase() + key.slice(1);

    // Raggruppa le statistiche per categoria principale (es: dribbles → [attempts, success])
    const groupedGkStats = gkData.reduce((acc, statName) => {
        const [mainKey, subKey] = statName.split(".");
        if (!acc[mainKey]) acc[mainKey] = [];
        acc[mainKey].push({ subKey, value: totalGkStats[statName] || 0 });
        return acc;
    }, {});

    // Raggruppa le statistiche per categoria principale (es: dribbles → [attempts, success])
    const groupedDefStats = defData.reduce((acc, statName) => {
        const [mainKey, subKey] = statName.split(".");
        if (!acc[mainKey]) acc[mainKey] = [];
        acc[mainKey].push({ subKey, value: totalDefStats[statName] || 0 });
        return acc;
    }, {});

    // Raggruppa le statistiche per categoria principale (es: dribbles → [attempts, success])
    const groupedMidStats = midData.reduce((acc, statName) => {
        const [mainKey, subKey] = statName.split(".");
        if (!acc[mainKey]) acc[mainKey] = [];
        acc[mainKey].push({ subKey, value: totalMidStats[statName] || 0 });
        return acc;
    }, {});

    // Raggruppa le statistiche per categoria principale (es: dribbles → [attempts, success])
    const groupedAtkStats = atkData.reduce((acc, statName) => {
        const [mainKey, subKey] = statName.split(".");
        if (!acc[mainKey]) acc[mainKey] = [];
        acc[mainKey].push({ subKey, value: totalAtkStats[statName] || 0 });
        return acc;
    }, {});


    // Recuper il ruolo del calciatore
    const statistics = stats[1];
    const positionName = statistics.games.position || "N/A";

    // Raggruppo le statistiche per ruolo
    const groupedStats =
        positionName === "Goalkeeper"
            ? groupedGkStats
            : positionName === "Defender"
                ? groupedDefStats
                : positionName === "Midfielder"
                    ? groupedMidStats
                    : groupedAtkStats;


    return (
        <>
            <Accordion sx={{ minWidth: '100%!important', backgroundColor: '#0000', boxShadow: 'none', padding: '0px', minHeight: '0px' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                    aria-controls="panel-content"
                    id="panel-stats"
                    sx={{ margin: '0px', padding: '0px', minHeight: '0px' }}
                >
                    <p className='info-title'>
                        Detail
                    </p>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0px' }}>
                    <Table sx={{ minWidth: '100%' }} aria-label="tabella statistiche">
                        <TableBody>
                            {Object.entries(groupedStats).map(([mainKey, subStats]) => (
                                <TableRow key={mainKey}>
                                    {/* Colonna del titolo principale */}
                                    <TableCell sx={{ fontWeight: 'bold', color: '#fff', padding: '16px 0px' }}>
                                        <Typography variant="h4" className="info-value-stats">
                                            {formatTitle(mainKey)}
                                        </Typography>
                                    </TableCell>
                                    {/* Colonne con ogni sotto-statistica */}
                                    {subStats.map(({ subKey, value }) => (
                                        <TableCell key={subKey} align="right" sx={{ color: '#fff', padding: '16px 0px' }}>
                                            <Typography variant="h2" className="value-stats-table">
                                                {value}<br />
                                            </Typography><br />
                                            <p className="info-title-table">
                                                {formatTitle(subKey)}
                                            </p>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </AccordionDetails>
            </Accordion>
        </>
    )
}