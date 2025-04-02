import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase/client";

export default function usePlayerOldStats(id, seasons) {
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheTimeMs = 7 * 24 * 60 * 60 * 1000; // 1 settimana

  
  useEffect(() => {
    if (!id || !seasons?.length) return;

    const controller = new AbortController();

    async function fetchPlayerOldStats() {
      setLoading(true);
      setError(null);

      try {
        let allStats = [];

        for (const season of seasons) {
          // Controllo se il player esiste già nel database per la stagione specifica
          const { data: dbRecords, error: dbError } = await supabase
            .from("players_stats_old")
            .select("*")
            .match({ player_id: id, season_year: season });

          if (dbError) throw new Error(`Errore nel recupero dati Supabase: ${dbError.message}`);

          const now = Date.now();

          if (dbRecords?.length > 0 && (now - new Date(dbRecords[0].last_update).getTime() < cacheTimeMs)) {
            console.log(`✅ Dati aggiornati per ${season}, uso il database`);
            allStats.push({ season, stats: dbRecords[0].stats });
          } else {
            // Se i dati sono vecchi o assenti, faccio la chiamata API
            console.log(`⚠️ Dati vecchi o assenti per ${season}, chiamata API...`);
            const url = `${import.meta.env.VITE_BASE_URL}/players?id=${id}&season=${season}`;
            const response = await axios.get(url, {
              headers: {
                "x-rapidapi-host": import.meta.env.VITE_BASE_URL,
                "x-rapidapi-key": import.meta.env.VITE_API_KEY,
              },
              signal: controller.signal,
            });

            if (!response.data.response?.length) throw new Error(`Nessun dato per stagione ${season}`);

            const apiPlayerData = response.data.response[0].player;
            const apiPlayerStats = response.data.response[0].statistics;

            allStats.push({ season, stats: apiPlayerStats });

            if (!player) setPlayer(apiPlayerData); // Salva i dati del giocatore una sola volta

            // Aggiorno il database con i nuovi dati
            const { error: upsertError } = await supabase
              .from("players_stats_old")
              .upsert({
                player_id: apiPlayerData.id,
                player: apiPlayerData,
                stats: apiPlayerStats,
                season_year: season,
                last_update: new Date().toISOString(),
              });

            if (upsertError) console.error(`Errore durante l'upsert per ${season}:`, upsertError);
          }
        }

        setStats(allStats); // Imposto tutte le stats delle stagioni richieste

      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Errore durante il fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerOldStats();    

    return () => controller.abort();
  }, [id, seasons]);

  return { player, stats, loading, error };
}
