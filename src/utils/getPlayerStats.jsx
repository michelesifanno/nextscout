import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase/client";

export default function usePlayerStats(id) {
    const [player, setPlayer] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentYear = new Date().getFullYear(); 
    const season = currentYear - 1; // Definizione corretta della stagione
    
    useEffect(() => {
        const fetchPlayerStats = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/players?id=${id}&season=${season}`, {
                    headers: {
                        "x-rapidapi-host": import.meta.env.VITE_BASE_URL,
                        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
                    },
                });
                
                const playerData = response.data.response[0].player; 
                const playerStats = response.data.response[0].statistics;
                
                setPlayer(playerData);
                setStats(playerStats);
            

                // Aggiungi i dati nella tabella players_stats di Supabase
                playerStats.forEach(async (stat) => {
                    const {
                        team: { id: team_id, name: team_name, logo: team_logo },
                        league: { id: league_id, name: league_name, country: league_country, logo: league_logo, flag: league_flag, season: league_season },
                        games: { appearences: games_appearances, lineups: games_lineups, minutes: games_minutes, number: games_number, position: games_position, rating: games_rating, captain: games_captain },
                        substitutes: { in: substitutes_in, out: substitutes_out, bench: substitutes_bench },
                        shots: { total: shots_total, on: shots_on },
                        goals: { total: goals_total, conceded: goals_conceded, assists: goals_assists, saves: goals_saves },
                        passes: { total: passes_total, key: passes_key, accuracy: passes_accuracy },
                        tackles: { total: tackles_total, blocks: tackles_blocks, interceptions: tackles_interceptions },
                        duels: { total: duels_total, won: duels_won },
                        dribbles: { attempts: dribbles_attempts, success: dribbles_success, past: dribbles_past },
                        fouls: { drawn: fouls_drawn, committed: fouls_committed },
                        cards: { yellow: cards_yellow, yellowred: cards_yellowred, red: cards_red },
                        penalty: { won: penalty_won, commited: penalty_commited, scored: penalty_scored, missed: penalty_missed, saved: penalty_saved }
                    } = stat;

                    console.log('Stats:', stat);
                    
                    const { error: supabaseError } = await supabase
                    .from('players_stats')
                    .upsert({
                        player_id: playerData.id, // Devi avere un ID del giocatore da associare
                        name: playerData.name,
                        firstname: playerData.firstname,
                        lastname: playerData.lastname,
                        age: playerData.age,
                        birth_date: playerData.birth.date,
                        birth_place: playerData.birth.place,
                        birth_country: playerData.birth.country,
                        nationality: playerData.nationality,
                        height: playerData.height,
                        weight: playerData.weight,
                        injured: playerData.injured,
                        photo: playerData.photo,
                        team_id,
                        team_name,
                        team_logo,
                        league_id,
                        league_name,
                        league_country,
                        league_logo,
                        league_flag,
                        season,
                        appearances: games_appearances,
                        lineups: games_lineups,
                        minutes: games_minutes,
                        position: games_position,
                        rating: games_rating,
                        captain: games_captain,
                        substitutes_in,
                        substitutes_out,
                        substitutes_bench,
                        shots_total,
                        shots_on,
                        goals_total,
                        goals_conceded,
                        goals_assists,
                        goals_saves,
                        passes_total,
                        passes_key,
                        passes_accuracy,
                        tackles_total,
                        tackles_blocks,
                        tackles_interceptions,
                        duels_total,
                        duels_won,
                        dribbles_attempts,
                        dribbles_success,
                        dribbles_past,
                        fouls_drawn,
                        fouls_committed,
                        cards_yellow,
                        cards_yellowred,
                        cards_red,
                        penalty_won,
                        penalty_committed,
                        penalty_scored,
                        penalty_missed,
                        penalty_saved,
                        last_update: new Date() // Imposta la data dell'ultimo aggiornamento
                    });

                    if (supabaseError) {
                        console.error('Errore nell\'inserimento su Supabase:', supabaseError);
                    } else {
                        console.log('Dati inseriti correttamente in Supabase');
                    }
                });
                
            } catch (err) {
                console.error("Errore durante il fetch delle stats del calciatore:", err);
                setError("Impossibile caricare le stats del calciatore");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerStats();
    }, [id]);

    return {
        player,
        stats,
        error,
        loading
    };
}
