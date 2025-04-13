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

export default function usePlayerStats(id, season) {
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheTimeMs = 7 * 24 * 60 * 60 * 1000; // 1 settimana

  useEffect(() => {
    if (!id) return; // la funzione non parte se cambia l'ID

    const controller = new AbortController(); // Per cancellare richieste in corso

    async function fetchPlayerStats() {
      setLoading(true);
      setError(null);

      try {
        // Controllo prima se il player è nel database
        const { data: dbRecords, error: dbError } = await supabase
          .from("players_stats")
          .select("*")
          .match({ player_id: id, season_year: season });

        if (dbError) throw new Error("Errore nel recupero dati da Supabase");
        const now = Date.now();

        if (
          dbRecords?.length > 0 &&
          (now - new Date(dbRecords[0].last_update).getTime() < cacheTimeMs)
        ) {
          console.log("Dati aggiornati, uso il Database MURT D MAMT");

          setPlayer(dbRecords[0].player);
          setStats(dbRecords[0].stats);
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


        try {
          const { error: upsertError } = await supabase
            .from("players_stats")
            .upsert({
              player_id: apiPlayerData.id,
              player: apiPlayerData,
              stats: apiPlayerStats,
              last_update: new Date(),
              season_year: season,
            });

          if (upsertError) console.error("Errore durante l'upsert:", upsertError);

        } catch (err) {
          if (axios.isCancel(err)) return; // Evita errori se la richiesta è stata annullata
          console.error("Errore durante il fetch:", err);
          setError("Impossibile caricare i dati");
        } finally {
          setLoading(false);
        }
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