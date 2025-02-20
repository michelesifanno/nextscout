import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase/client";

function formatDateItalian(date) {
  return new Date(date).toLocaleString("it-IT", {
    timeZone: "Europe/Rome",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function usePlayerStats(id) {
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentYear = new Date().getFullYear();
  const season = currentYear - 1;
  const cacheTimeMs = 7 * 24 * 60 * 60 * 1000; // 1 settimana

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController(); // Per cancellare richieste in corso

    async function fetchPlayerStats() {
      setLoading(true);
      setError(null);

      try {
        // Controllo cache nel database
        const { data: dbRecords, error: dbError } = await supabase
          .from("players_stats")
          .select("*")
          .match({ player_id: id, season });

        if (dbError) throw new Error("Errore nel recupero dati da Supabase");
        const now = Date.now();

        if (
          dbRecords?.length > 0 &&
          (now - new Date(dbRecords[0].last_update).getTime() < cacheTimeMs)
        ) {
          console.log("✅ Dati aggiornati, uso cache");
          console.log("DbRecords", dbRecords[0], dbRecords);
          
          setPlayer(dbRecords[0]);
          setStats(dbRecords);
          setLoading(false);
          return;
        }

        // Chiamata API se dati non aggiornati
        console.log("⚠️ Dati vecchi o assenti, chiamata API in corso...");
        const url = `${import.meta.env.VITE_BASE_URL}/players?id=${id}&season=${season}`;
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

        setPlayer(apiPlayerData);
        setStats(apiPlayerStats);

        console.log(apiPlayerStats);

        for (const stat of apiPlayerStats) {
          const {
            team: { id: team_id, name: team_name, logo: team_logo },
            league: {
              id: league_id,
              name: league_name,
              country: league_country,
              logo: league_logo,
              flag: league_flag,
            },
            games: {
              appearences: games_appearances,
              lineups: games_lineups,
              minutes: games_minutes,
              number: games_number,
              position: games_position,
              rating: games_rating,
              captain: games_captain,
            },
            substitutes: { in: substitutes_in, out: substitutes_out, bench: substitutes_bench },
            shots: { total: shots_total, on: shots_on },
            goals: { total: goals_total, conceded: goals_conceded, assists: goals_assists, saves: goals_saves },
            passes: { total: passes_total, key: passes_key, accuracy: passes_accuracy },
            tackles: { total: tackles_total, blocks: tackles_blocks, interceptions: tackles_interceptions },
            duels: { total: duels_total, won: duels_won },
            dribbles: { attempts: dribbles_attempts, success: dribbles_success, past: dribbles_past },
            fouls: { drawn: fouls_drawn, committed: fouls_committed },
            cards: { yellow: cards_yellow, yellowred: cards_yellowred, red: cards_red },
            penalty: { won: penalty_won, committed: penalty_committed, scored: penalty_scored, missed: penalty_missed, saved: penalty_saved },
          } = stat;

          try {
            const { error: upsertError } = await supabase
              .from("players_stats")
              .upsert({
                player_id: apiPlayerData.id,
                name: apiPlayerData.name,
                firstname: apiPlayerData.firstname,
                lastname: apiPlayerData.lastname,
                age: apiPlayerData.age,
                birth_date: apiPlayerData.birth.date,
                birth_place: apiPlayerData.birth.place,
                birth_country: apiPlayerData.birth.country,
                nationality: apiPlayerData.nationality,
                height: apiPlayerData.height,
                weight: apiPlayerData.weight,
                injured: apiPlayerData.injured,
                photo: apiPlayerData.photo,
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
                last_update: new Date(),
              });

            if (upsertError) console.error("Errore durante l'upsert:", upsertError);

          } catch (err) {
            if (axios.isCancel(err)) return; // Evita errori se la richiesta è stata annullata
            console.error("Errore durante il fetch:", err);
            setError("Impossibile caricare i dati");
          } finally {
            setLoading(false);
          }
        };
      } catch (err) {
        console.error(err);
      }

      return () => controller.abort(); // Cleanup se `id` cambia prima che la chiamata termini
    }

    fetchPlayerStats(); // Chiamata alla funzione
    return () => controller.abort(); // Cleanup se `id` cambia
  }, [id, season]); // Dipendenze dell'useEffect

  return { player, stats, loading, error };
}
