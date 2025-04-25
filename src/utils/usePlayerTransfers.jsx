import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase/client";


export default function usePlayerTransfers(id) {

    const [players, setPlayer] = useState([]);
    const [transfers, setTransfer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cacheTimeMs = 365.5 * 24 * 60 * 60 * 1000; // 1 settimana

    useEffect(() => {
        if (!id) return; // la funzione non parte se cambia l'ID

        const controller = new AbortController(); // Per cancellare richieste in corso

        async function fetchPlayerTransfers() {
            setLoading(true);
            setError(null);

            try {
                // Controllo prima se il player è nel database
                const { data: dbRecords, error: dbError } = await supabase
                    .from("players_transfer")
                    .select("*")
                    .match({ player_id: id });

                if (dbError) throw new Error("Errore nel recupero dati da Supabase");
                const now = Date.now();

                if (
                    dbRecords?.length > 0 &&
                    (now - new Date(dbRecords[0].last_update).getTime() < cacheTimeMs)
                ) {
                    console.log("Dati aggiornati, uso il Database Player Transfers");

                    setPlayer(dbRecords[0].player);
                    setTransfer(dbRecords[0].transfers);
                    setLoading(false);
                    return;
                }

                // Chiamata API se dati non aggiornati
                console.log("⚠️ Dati vecchi o assenti, chiamata API in corso...");
                const url = `${import.meta.env.VITE_BASE_URL}/transfers?player=${id}`;
                const response = await axios.get(url, {
                    headers: {
                        "x-rapidapi-host": import.meta.env.VITE_BASE_URL,
                        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
                    },
                    signal: controller.signal, // Collego il controller per abortire se cambia `id`
                });

                if (!response.data.response?.length) throw new Error("Nessun dato ricevuto dall'API");

                const apiPlayerData = response.data.response[0].player;
                const apiPlayerTransfer = response.data.response[0].transfers;

                setPlayer(apiPlayerData);
                setTransfer(apiPlayerTransfer);


                try {
                    // Eliminare il record esistente prima di fare l'upsert
                    const { error: deleteError } = await supabase
                        .from("players_transfer")
                        .delete()
                        .match({ player_id: apiPlayerData.id });

                    if (deleteError) {
                        console.error("Errore durante la cancellazione:", deleteError);
                    }

                    const { error: upsertError } = await supabase
                        .from("players_transfer")
                        .upsert({
                            player_id: apiPlayerData.id,
                            transfers: apiPlayerTransfer,
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
            } catch (err) {
                console.error(err);
            }

            return () => controller.abort(); // Cleanup se `id` cambia prima che la chiamata termini
        }

        fetchPlayerTransfers(); // Chiamata alla funzione
        return () => controller.abort(); // Cleanup se `id` cambia
    }, [id]); // Dipendenze dell'useEffect

    return { transfers, loading, error };
}