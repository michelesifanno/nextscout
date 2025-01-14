import { useState, useEffect } from 'react';
import supabase from '../supabase/client';


export default function useLeagues () {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const { data, error } = await supabase.from('leagues').select('*');

        if (error) {
          throw error;
        }

        setLeagues(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  return { leagues, loading, error };
};