import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase/client";

export default function usePlayerSeason(id) {
    const [seasons, setSeasons] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cacheTimeMs = 7 * 24 * 60 * 60 * 1000; // 1 settimana


    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();

        async function fetchPlayerSeasons() {
            setLoading(true);
            setError(null);

            try {
                // Controllo se i dati della squadra sono già presenti e aggiornati
                const { data: dbRecords, error: dbError } = await supabase
                    .from("player_seasons")
                    .select('*')
                    .match({ player_id: id });

                if (dbError) throw new Error("Errore nel recupero dati da Supabase");

                const now = Date.now();
                const isDataFresh =
                    dbRecords.length > 0 &&
                    now - new Date(dbRecords[0].created_at).getTime() < cacheTimeMs;

                if (isDataFresh) {
                    console.log("Dati aggiornati, uso il Database 4");
                    setSeasons(dbRecords[0].seasons);                    
                    setLoading(false);
                    return;
                }


                // Chiamata API se i dati non sono aggiornati
                console.log("⚠️ Dati vecchi o assenti, chiamata API in corso 3...");
                const url = `${import.meta.env.VITE_BASE_URL}/players/seasons?player=${id}`;
                const response = await axios.get(url, {
                    headers: {
                        "x-rapidapi-host": import.meta.env.VITE_BASE_URL,
                        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
                    },
                    signal: controller.signal,
                });

                if (!response.data.response?.length)
                    throw new Error("Nessun dato ricevuto dall'API");

                const apiSeasons = response.data.response;

                
                const upsertData = {
                    player_id: id,
                    seasons: apiSeasons,
                    created_at: new Date(),
                };
                
                const { error: upsertError } = await supabase
                    .from("player_seasons")
                    .upsert(upsertData);

                if (upsertError) console.error("Errore durante l'upsert:", upsertError);
            } catch (err) {
                if (axios.isCancel(err)) return;
                console.error("Errore durante il fetch:", err);
                setError("Impossibile caricare i dati");
            } finally {
                setLoading(false);
            }
        }

        fetchPlayerSeasons();

        return () => controller.abort();
    }, [id]);

    return { seasons, loading, error };
}