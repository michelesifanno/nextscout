import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase/client";

export default function useTeamPlayers(id) {
    const [players, setPlayers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cacheTimeMs = 7 * 24 * 60 * 60 * 1000; // 1 settimana

    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();

        async function fetchPlayerStats() {
            setLoading(true);
            setError(null);
            
            try {
                // Controllo se i dati della squadra sono già presenti e aggiornati
                const { data: dbRecords, error: dbError } = await supabase
                    .from("players_duplicate")
                    .select("id, name, age, number, position, photo, team_id, last_update")
                    .match({ team_id: id });

                if (dbError) throw new Error("Errore nel recupero dati da Supabase");

                const now = Date.now();
                const isDataFresh =
                    dbRecords.length > 0 &&
                    now - new Date(dbRecords[0].last_update).getTime() < cacheTimeMs;

                if (isDataFresh) {
                    console.log("Dati aggiornati, uso il Database 2");
                    setPlayers(dbRecords);
                    setLoading(false);
                    console.log('Db Records:', dbRecords);
                    return;
                }

                
                // Chiamata API se i dati non sono aggiornati
                console.log("⚠️ Dati vecchi o assenti, chiamata API in corso 2...");
                const url = `${import.meta.env.VITE_BASE_URL}/players/squads?team=${id}`;
                const response = await axios.get(url, {
                    headers: {
                        "x-rapidapi-host": import.meta.env.VITE_BASE_URL,
                        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
                    },
                    signal: controller.signal,
                });

                if (!response.data.response?.length)
                    throw new Error("Nessun dato ricevuto dall'API");

                const apiPlayers = response.data.response[0].players;

                setPlayers(apiPlayers);                

                // Inserisce i giocatori nel database riga per riga
                const upsertData = apiPlayers.map((player) => ({
                    id: player.id,
                    team_id: id,
                    name: player.name,
                    age: player.age,
                    number: player.number,
                    position: player.position,
                    photo: player.photo,
                    last_update: new Date(),
                }));

                const { error: upsertError } = await supabase
                    .from("players_duplicate")
                    .upsert(upsertData, { onConflict: ["id"] });

                if (upsertError) console.error("Errore durante l'upsert:", upsertError);
            } catch (err) {
                if (axios.isCancel(err)) return;
                console.error("Errore durante il fetch:", err);
                setError("Impossibile caricare i dati");
            } finally {
                setLoading(false);
            }
        }

        fetchPlayerStats();

        return () => controller.abort();
    }, [id]);

    return { players, loading, error };
}