import dotenv from 'dotenv';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Carica le variabili d'ambiente
dotenv.config();

// Crea il client di Supabase
const supabaseUrl = 'https://xtnvahewkruhyddveqmd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bnZhaGV3a3J1aHlkZHZlcW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwODM0OTUsImV4cCI6MjA1MTY1OTQ5NX0.v5Xh-9HPI7wTN70VBM8Skpljxc9JDKvjEa3EzDsQcn0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchLeagues() {
  try {
    const response = await axios.get('https://v3.football.api-sports.io/leagues', {
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": '8df88ef9e627085d1f0ea91f6d2fe526',
      },
      params: { country: "Italy" },
    });

    const leaguesData = response.data.response || [];
    console.log(`Fetched ${leaguesData.length} leagues.`);

    for (const leagueItem of leaguesData) {
      const { id, name, type, logo } = leagueItem.league;
      const { name: countryName, code: countryCode, flag: countryFlag } = leagueItem.country;

      // Save league to Supabase
      const { error: leagueError } = await supabase
        .from("leagues")
        .upsert(
          { id, name, type, logo, country_name: countryName, country_code: countryCode, country_flag: countryFlag },
          { onConflict: ["id"] }
        );

      if (leagueError) {
        console.error(`Error saving league ${name}:`, leagueError.message);
      } else {
        console.log(`League ${name} saved successfully.`);
      }
    }
  } catch (error) {
    console.error("Error fetching leagues:", error.message);
  }
}

// Esegui la funzione
fetchLeagues();
