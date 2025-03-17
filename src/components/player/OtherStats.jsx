import { useState, useEffect } from "react";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function OtherStats({ stats }) {
    
    const [totalStats, setTotalStats] = useState({});

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

    // Lista delle statistiche da calcolare
    const data = [
        "dribbles.attempts", "dribbles.success", "substitutes.in", "substitutes.bench",
        "tackles.blocks", "tackles.interceptions", "duels.total", "duels.won",
        "fouls.drawn", "fouls.committed", "cards.yellow", "cards.red"
    ];

    // Calcola tutti i totali e aggiorna lo stato
    useEffect(() => {
        const totals = data.reduce((acc, statName) => {
            acc[statName] = calculateTotalStats(stats, statName);
            return acc;
        }, {});
        setTotalStats(totals);
    }, [stats]);

    // Funzione per formattare il titolo (es: "dribbles" → "Dribbles")
    const formatTitle = (key) => key.charAt(0).toUpperCase() + key.slice(1);

    // Raggruppa le statistiche per categoria principale (es: dribbles → [attempts, success])
    const groupedStats = data.reduce((acc, statName) => {
        const [mainKey, subKey] = statName.split(".");
        if (!acc[mainKey]) acc[mainKey] = [];
        acc[mainKey].push({ subKey, value: totalStats[statName] || 0 });
        return acc;
    }, {});



    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: 4, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#fff' }}>
                Other Stats
            </Typography>
            <TableContainer>
                <Table sx={{ minWidth: '100%' }} aria-label="tabella statistiche">
                    <TableBody>
                        {Object.entries(groupedStats).map(([mainKey, subStats]) => (
                            <TableRow key={mainKey}>
                                {/* Colonna del titolo principale */}
                                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    {formatTitle(mainKey)}
                                </TableCell>
                                {/* Colonne con ogni sotto-statistica */}
                                {subStats.map(({ subKey, value }) => (
                                    <TableCell key={subKey} align="right" sx={{ color: '#fff' }}>
                                        {value}<br />
                                        {formatTitle(subKey)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
