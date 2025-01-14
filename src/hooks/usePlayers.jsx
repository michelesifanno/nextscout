import { useState, useEffect } from 'react';
import supabase from '../supabase/client';


export default function usePlayers (selectedTeam) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data, error } = await supabase.from('players').select('*').eq('team_id', selectedTeam);

        if (error) {
          throw error;
        }

        setPlayers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [selectedTeam]);

  return { players, loading, error };
};