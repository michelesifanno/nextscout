import * as React from 'react';
import { Box, Grid2 as Grid } from '@mui/material';


export default function LogoBar() {


  return (
    <>
    <Box>
        <Grid container>
            <Grid size={12}>
            <img
              src={'/img/logo.png'}
              style={{ maxWidth: '180px', display: 'block', padding: '30px 16px' }}
            />
            </Grid>
        </Grid>
    </Box>
    </>
  );
}