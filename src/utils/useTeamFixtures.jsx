import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase/client";

export default function useTeamFixtures(id) {
    const [fixtures, setFixtures] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentYear = new Date().getFullYear();
    const season = currentYear - 1;


    const cacheTimeMs = 7 * 24 * 60 * 60 * 1000; // 1 settimana

    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();

        async function fetchFixtures() {
            setLoading(true);
            setError(null);

            try {
                // Controllo se i dati della squadra sono già presenti e aggiornati
                const { data: dbRecords, error: dbError } = await supabase
                    .from("teams_fixtures")
                    .select("team_id, fixtures, last_update, season_year")
                    .match({ team_id: id });

                if (dbError) throw new Error("Errore nel recupero dati da Supabase");

                const now = Date.now();
                const isDataFresh =
                    dbRecords.length > 0 &&
                    now - new Date(dbRecords[0].last_update).getTime() < cacheTimeMs;

                if (isDataFresh) {
                    console.log("Dati aggiornati, uso il Database 2");
                    setFixtures(dbRecords[0].fixtures);;
                    setLoading(false);
                    return;
                }


                // Chiamata API se i dati non sono aggiornati
                console.log("⚠️ Dati vecchi o assenti, chiamata API in corso 2...");
                const url = `${import.meta.env.VITE_BASE_URL}/fixtures?season=${season}&team=${id}&status=ns`;
                const response = await axios.get(url, {
                    headers: {
                        "x-rapidapi-host": import.meta.env.VITE_BASE_URL,
                        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
                    },
                    signal: controller.signal,
                });

                if (!response.data.response?.length)
                    throw new Error("Nessun dato ricevuto dall'API");

                const apiFixtures = response.data.response;

                setFixtures(apiFixtures);

                // Inserisce i giocatori nel database riga per riga
                const upsertData = [{
                    team_id: id,
                    fixtures: apiFixtures,
                    season_year: season,
                    last_update: new Date(),
                }];
                

                const { error: upsertError } = await supabase
                    .from("teams_fixtures")
                    .upsert(upsertData, { onConflict: ["team_id"] });

                if (upsertError) console.error("Errore durante l'upsert:", upsertError);
            } catch (err) {
                if (axios.isCancel(err)) return;
                console.error("Errore durante il fetch:", err);
                setError("Al momento non ci sono partite in programma.");
            } finally {
                setLoading(false);
            }
        }

        fetchFixtures();

        return () => controller.abort();
    }, [id]);

    console.log('Fixtures: ', fixtures);
    

    return { fixtures, loading, error };
}