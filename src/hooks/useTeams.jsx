import { useState, useEffect } from 'react';
import supabase from '../supabase/client';


export default function useTeams () {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data, error } = await supabase.from('teams').select('*');

        if (error) {
          throw error;
        }

        setTeams(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return { teams, loading, error };
};