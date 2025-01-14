import React, { useEffect, useState } from "react";
import axios from "axios";

function getLeague() {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchLeagues = async () => {
          try {
            const response = await axios.get(`${import.meta.env.APIFOOTBALL_URL}/league`, {
              headers: {
                "x-rapidapi-host": `${import.meta.env.APIFOOTBALL_URL}`,
                "x-rapidapi-key": `${import.meta.env.APIFOOTBALL_API_KEY}`,
              },
            });
    
            // Filtra i risultati dove country è "Italy"
            const filteredLeagues = response.data.response.filter(
              (league) => league.country.name === "Italy"
            );
    
            setLeagues(filteredLeagues);
          } catch (err) {
            console.error("Errore durante il fetch delle leghe:", err);
            setError("Impossibile caricare le leghe");
          } finally {
            setLoading(false);
          }
        };
    
        fetchLeagues();
      }, []);
        
    return {
        leagues,
        error,
        loading
    };
}

export default getLeague;