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


export default function BestStats({ player, stats }) {
    const role = stats[0]?.games?.position || "";

    const aggregatedStats = stats.reduce((acc, stat) => {
        const rating = stat.games?.rating ?? 0;

        return {
            minutes: acc.minutes + (stat.games?.minutes || 0),
            goalsSaves: acc.goalsSaves + (stat.goals?.saves || 0),
            goalsConceded: acc.goalsConceded + (stat.goals?.conceded || 0),
            ratingSum: acc.ratingSum + rating,
            ratingCount: acc.ratingCount + (stat.games?.rating !== undefined ? 1 : 0),
            penaltySaved: acc.penaltySaved + (stat.penalty?.saved || 0),
            passesAccuracySum: acc.passesAccuracySum + (stat.passes?.accuracy || 0),
            passesAccuracyCount: acc.passesAccuracyCount + (stat.passes?.accuracy !== undefined ? 1 : 0),
            tacklesTotal: acc.tacklesTotal + (stat.tackles?.total || 0),
            tacklesInterceptions: acc.tacklesInterceptions + (stat.tackles?.interceptions || 0),
            duelsWon: acc.duelsWon + (stat.duels?.won || 0),
            cardsYellow: acc.cardsYellow + (stat.cards?.yellow || 0),
            cardsRed: acc.cardsRed + (stat.cards?.red || 0),
            passesKey: acc.passesKey + (stat.passes?.key || 0),
            assists: acc.assists + (stat.goals?.assists || 0),
            goalsTotal: acc.goalsTotal + (stat.goals?.total || 0),
            shotsTotal: acc.shotsTotal + (stat.shots?.total || 0),
            dribblesSuccess: acc.dribblesSuccess + (stat.dribbles?.success || 0),
        };
    }, {
        minutes: 0,
        goalsSaves: 0,
        goalsConceded: 0,
        ratingSum: 0,
        ratingCount: 0,
        penaltySaved: 0,
        passesAccuracySum: 0,
        passesAccuracyCount: 0,
        tacklesTotal: 0,
        tacklesInterceptions: 0,
        duelsWon: 0,
        cardsYellow: 0,
        cardsRed: 0,
        passesKey: 0,
        assists: 0,
        goalsTotal: 0,
        shotsTotal: 0,
        dribblesSuccess: 0,
    });

    // Derivati

    function getAverageRating(stats) {
        const validRatings = stats
            .map(stat => parseFloat(stat.games?.rating))
            .filter(r => !isNaN(r));

        if (validRatings.length === 0) return "-";

        const avg = validRatings.reduce((sum, r) => sum + r, 0) / validRatings.length;

        return (Math.ceil(avg * 100) / 100); // Ritorna come numero, sarà formattato dopo
    }
    const averagePassesAccuracy = aggregatedStats.passesAccuracyCount > 0 ? (aggregatedStats.passesAccuracySum / aggregatedStats.passesAccuracyCount) : 0;
    const minutesPerGoal = aggregatedStats.goalsTotal > 0 ? (aggregatedStats.minutes / aggregatedStats.goalsTotal) : 0;

    // 4 oggetti distinti per ruolo
    const Goalkeeper = {
        "Saves": aggregatedStats.goalsSaves,
        "Goals Conceded": aggregatedStats.goalsConceded,
        "Rating": getAverageRating(stats),
        "Penalty Saved": aggregatedStats.penaltySaved,
        "Passes Accuracy": averagePassesAccuracy,
        "Minutes": aggregatedStats.minutes,
    };

    const Defender = {
        "Total Tackles": aggregatedStats.tacklesTotal,
        "Interceptions Tackles": aggregatedStats.tacklesInterceptions,
        "Duels won": aggregatedStats.duelsWon,
        "Rating": getAverageRating(stats),
        "Cards Y e R": aggregatedStats.cardsYellow + " | " + aggregatedStats.cardsRed,
        "Passes Accuracy": averagePassesAccuracy,
    };

    const Midfielder = {
        "Key Passes": aggregatedStats.passesKey,
        "Assists": aggregatedStats.assists,
        "Passes Accuracy": averagePassesAccuracy,
        "Total Tackles": aggregatedStats.tacklesTotal,
        "Duels Won": aggregatedStats.duelsWon,
        "Rating": getAverageRating(stats),
    };

    const Attacker = {
        "Total Goals": aggregatedStats.goalsTotal,
        "Assists": aggregatedStats.assists,
        "Total Shots": aggregatedStats.shotsTotal,
        "Success Dribbles": aggregatedStats.dribblesSuccess,
        "Rating": getAverageRating(stats),
        "Goals per Minutes": minutesPerGoal,
    };

    // Scegli i dati da mostrare in base al ruolo
    let roleStats = {};
    if (role === "Goalkeeper") roleStats = Goalkeeper;
    else if (role === "Defender") roleStats = Defender;
    else if (role === "Midfielder") roleStats = Midfielder;
    else if (role === "Attacker") roleStats = Attacker;


    function formatNumber(num) {
        if (typeof num !== "number" || isNaN(num)) return "-";

        if (Number.isInteger(num)) {
            // Numero intero → mostra senza punto
            return num.toString();
        }

        // Arrotondo per eccesso a 2 decimali
        const roundedUp = Math.ceil(num * 100) / 100;

        // Se dopo arrotondamento diventa intero (es: 2.00 → 2)
        if (Number.isInteger(roundedUp)) {
            return roundedUp.toString();
        }

        // Altrimenti mostro con 2 decimali
        return roundedUp.toFixed(2);
    }



    return (
        <>
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 2 }}>
                <Grid container spacing={2} size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    {Object.entries(roleStats).map(([key, value]) => (
                        <Grid key={key} size={{ xs: 6, md: 2 }} sx={{ p: { xs: 2, md: 1 }, backgroundColor: '#121212' }}>
                            <Typography variant="h4" className="info-value" sx={{ pt:1, pb:0.5 }}>
                                {formatNumber(value)}
                            </Typography>
                            <p className="info-title" style={{ paddingBottom:"10px" }}>
                                {key}
                            </p>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}

