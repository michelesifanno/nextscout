import React, { useState, useEffect } from 'react';
import { Box, Grid2 as Grid, Typography, useTheme } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import supabase from '../supabase/client';

function Welcome () {
    const [fullName, setFullName] = useState('');
    const theme = useTheme();

    const pageTitle = `NextScout`;
    const metaDescription = `NextScout is the platform to monitor and analyze the best football talents. Up-to-date data and advanced algorithms to evaluate top prospects.`;

useEffect(() => {
  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data && data.user) {
      // Verifica che l'utente abbia metadati
      const fullName = data.user.user_metadata?.full_name || 'Nome non disponibile';
      setFullName(fullName);
    } else {
      console.error('Errore nell\'ottenere i dati dell\'utente:', error);
    }
  };

  fetchUser();
}, []);

    

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <Box sx={{ padding: '16px', backgroundColor: 'primary.background' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <Typography variant='h2'>
                                Benvenuto su NextScout, {fullName}!
                            </Typography>
                            <Typography variant='p'>
                                Abbiamo sistemato la tua dashboard visibile da qui!
                                Se è la tua prima volta qui, dai una lettura a ciò che puoi fare con NextScout.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Welcome;
