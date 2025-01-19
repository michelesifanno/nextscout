import dotenv from 'dotenv';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Carica le variabili d'ambiente
dotenv.config();

// Crea il client di Supabase
const supabaseUrl = 'https://xtnvahewkruhyddveqmd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bnZhaGV3a3J1aHlkZHZlcW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwODM0OTUsImV4cCI6MjA1MTY1OTQ5NX0.v5Xh-9HPI7wTN70VBM8Skpljxc9JDKvjEa3EzDsQcn0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Funzione per recuperare gli ID delle leghe dalla tabella 'leagues'
async function getLeagueIds() {
  const { data, error } = await supabase
    .from('leagues')
    .select('id');

  if (error) {
    console.error('Errore nel recuperare gli ID delle leghe:', error);
    return [];
  }

  return data.map(league => league.id);
}

// Funzione per limitare il numero di richieste a 10 al minuto
let requestCount = 0;
const maxRequestsPerMinute = 10;
const requestInterval = 60000; // 1 minuto in millisecondi
let lastRequestTime = Date.now();

// Funzione per controllare e gestire il rate limit
async function handleRateLimit() {
  const currentTime = Date.now();

  // Se sono passati meno di 60 secondi dall'ultima richiesta
  if (currentTime - lastRequestTime < requestInterval && requestCount >= maxRequestsPerMinute) {
    const waitTime = requestInterval - (currentTime - lastRequestTime);
    console.log(`Limite di richieste raggiunto. Attendere ${waitTime / 1000} secondi...`);
    await new Promise(resolve => setTimeout(resolve, waitTime)); // Aspetta il tempo necessario
  }

  // Aggiorna il conteggio delle richieste
  if (currentTime - lastRequestTime >= requestInterval) {
    lastRequestTime = currentTime;
    requestCount = 0;
  }

  requestCount++;
}


// Funzione per recuperare e salvare i dati delle squadre
async function fetchTeams() {
  const leagueIds = await getLeagueIds();

  if (leagueIds.length === 0) {
    console.log('Nessuna lega trovata');
    return;
  }

  // Cicla su tutti gli ID delle leghe e recupera le squadre per ogni lega
  for (const leagueId of leagueIds) {
    try {
      await handleRateLimit(); // Controlla e gestisce il rate limit

      const response = await axios.get('https://v3.football.api-sports.io/teams', {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": '8df88ef9e627085d1f0ea91f6d2fe526',
        },
        params: {
          league: leagueId,
          season: "2024"
        },
      });

      const teams = response.data.response;

      // Salvo i dati delle squadre nel database Supabase
      for (const team of teams) {
        const { id, name, code, country, founded, national, logo } = team.team;
        const { error } = await supabase
          .from('teams')
          .upsert([
            {
              id,
              name,
              code,
              country,
              founded,
              national,
              logo,
              league_id: leagueId,
            }
          ], { onConflict: ['id'] });

        if (error) {
          console.error(`Errore nel salvare la squadra ${name}:`, error);
        } else {
          console.log(`Squadra ${name} salvata con successo`);
        }
      }
    } catch (err) {
      console.error(`Errore nel recuperare le squadre per la lega ${leagueId}:`, err);
    }
  }
}

// Avvia il processo
fetchTeams();