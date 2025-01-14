import React from 'react';
import { Box, Grid2 as Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Footer() {

    const themeRes = useTheme(); // Use theme hook to access the theme
    const isMobileOrTablet = useMediaQuery(themeRes.breakpoints.down('md'));
  


    return (
        <>
            <Box sx={{ backgroundColor: '#edefe7', borderTop: '1px solid #280047', display: isMobileOrTablet ? 'none' : 'block' }}>
                <Grid container>
                    <Grid
                        size={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            padding: '20px 30px!important',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '14px',
                                color:'#121212'
                            }}
                        >
                            © 2024 NextScout – All Rights Reserved.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        size={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            padding: '20px 30px!important',
                        }}
                    >
                        <Link to="/privacy-policy" style={{ textDecoration: 'none', marginBottom: '-5px!important' }} onClick={() => window.scrollTo(0, 0)}>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                Privacy Policy
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
