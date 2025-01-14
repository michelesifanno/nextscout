import dotenv from 'dotenv';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Carica le variabili d'ambiente
dotenv.config();

// Crea il client di Supabase
const supabaseUrl = 'https://xtnvahewkruhyddveqmd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bnZhaGV3a3J1aHlkZHZlcW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwODM0OTUsImV4cCI6MjA1MTY1OTQ5NX0.v5Xh-9HPI7wTN70VBM8Skpljxc9JDKvjEa3EzDsQcn0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Funzione per recuperare gli ID dei team dalla tabella 'teams'
async function getTeamIds() {
  const { data, error } = await supabase
    .from('team_fetch')
    .select('id');
  
  if (error) {
    console.error('Errore nel recuperare gli ID dei team:', error);
    return [];
  }

  return data.map(team => team.id);
}

// Funzione per limitare il numero di richieste a 10 al minuto
let requestCount = 0;
const maxRequestsPerMinute = 9;
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

// Funzione per recuperare i giocatori delle squadre
async function fetchPlayers() {
    const teamIds = await getTeamIds(); // Uso della funzione corretta

    if (teamIds.length === 0) {
      console.log('Nessun team trovato');
      return;
    }
  
    for (const teamId of teamIds) {
        try {
            await handleRateLimit(); // Controlla e gestisce il rate limit
            const response = await axios.get(`https://v3.football.api-sports.io/players/squads?team=${teamId}`, {
                headers: {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": '8df88ef9e627085d1f0ea91f6d2fe526', // Usa la variabile di ambiente
                }
            });

            const data = response.data;

            // Log per ogni risposta
            console.log(`Risposta per squadra con ID ${teamId}:`, data);

            if (data.response && data.response.length > 0) {
                const team = data.response[0].team;
                const players = data.response[0].players;

                // Log dettagli del team e dei giocatori
                console.log('Dettagli della squadra:', team);
                console.log('Giocatori della squadra:', players);

                for (const player of players) {
                    const { id, name, age, number, position, photo } = player; 
                    const { error } = await supabase
                      .from('players')
                      .upsert([
                        {
                            id,
                            name,
                            age,
                            number,
                            position,
                            photo,
                            team_id: teamId,
                        }
                      ], { onConflict: ['id'] }); 
            
                    if (error) {
                      console.error(`Errore nel salvare il giocatore ${name}:`, error);
                    } else {
                      console.log(`Giocatore ${name} salvato con successo`);
                    }
                }
            }
        } catch (error) {
            console.error(`Errore nel recupero dei giocatori per la squadra con ID ${teamId}:`, error);
        }
    }
}

// Avvia il processo
fetchPlayers();
