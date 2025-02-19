import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase/client";

export default function getPlayerStats(id) {
  const [player, setPlayer] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentYear = new Date().getFullYear();
  const season = currentYear - 1; // Definizione corretta della stagione

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/players?id=${id}&season=${season}`;

        const response = await axios.get(url, {
          headers: {
            "x-rapidapi-host": import.meta.env.VITE_BASE_URL,
            "x-rapidapi-key": import.meta.env.VITE_API_KEY,
          },
        });

        if (!response.data.response || response.data.response.length === 0) {
          setError("Nessun dato ricevuto dall'API");
          return;
        }

        const playerData = response.data.response[0].player;
        const playerStats = response.data.response[0].statistics;

        setPlayer(playerData);
        setStats(playerStats);

        // Ciclo sulle statistiche ottenute
        let counter = 0;
        for (const stat of playerStats) {
          counter++;

          // Estrazione dei campi tramite destrutturazione
          const {
            team: { id: team_id, name: team_name, logo: team_logo },
            league: {
              id: league_id,
              name: league_name,
              country: league_country,
              logo: league_logo,
              flag: league_flag,
              season: league_season,
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

          // Controlla se esiste già un record per lo stesso giocatore, lega e stagione
          try {
            const { data: existingRecords, error: selectError } = await supabase
              .from("players_stats")
              .select("last_update")
              .match({ player_id: playerData.id, league_id, season });

            if (selectError) {
            } else if (existingRecords && existingRecords.length > 0) {
              // Record esistente: controlla il campo last_update
              const existingRecord = existingRecords[0];
              const lastUpdate = new Date(existingRecord.last_update);
              const now = new Date();
              const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
              if (now - lastUpdate < oneWeekInMs) {
                continue; // Salta l'upsert per questa statistica
              } else {
                console.log(`[DEBUG] Record esistente per player_id ${playerData.id} e league_id ${league_id} ma aggiornato più di una settimana fa. Procedo con upsert per statistica ${counter}.`);
              }
            } else {
              console.log(`[DEBUG] Nessun record esistente per player_id ${playerData.id} e league_id ${league_id}. Procedo con upsert per statistica ${counter}.`);
            }
          } catch (selectErr) {
            console.error(`[DEBUG] Errore durante la verifica del record esistente per statistica ${counter}:`, selectErr);
          }

          // Procede con l'upsert (che inserirà o aggiornerà il record)
          try {
            const { error: supabaseError, data: upsertData } = await supabase
              .from("players_stats")
              .upsert({
                player_id: playerData.id,
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
                last_update: new Date(), // Aggiorna il campo con la data corrente
              });

            if (supabaseError) {
              console.error(`Errore nell'upsert per statistica ${counter}:`, supabaseError);
            } else {
              console.log(`Upsert riuscito per statistica ${counter}:`, upsertData);
            }
          } catch (upsertError) {
            console.error(`[Errore durante l'upsert per statistica ${counter}:`, upsertError);
          }
        }
      } catch (err) {
        console.error("Errore durante il fetch delle stats del calciatore:", err);
        setError("Impossibile caricare le stats del calciatore");
      } finally {
        console.log("Fetch completato. Aggiornamento stato loading a false.");
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [id, season]);

  return {
    player,
    stats,
    error,
    loading,
  };
}
