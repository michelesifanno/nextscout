import { Outlet } from 'react-router-dom';
import AppNavbar from '../components/general/AppNavbar';
import AppNavbarMobile from '../components/general/AppNavbarMobile';
import BottomNavigation from '../components/general/BottomNavigation';
import Footer from '../components/general/Footer';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@emotion/react';
import { createTheme, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';



const theme = createTheme({
  palette: {
    mode: 'dark', // <-- Imposta la modalità dark di default
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#7000c6',
    },
    third: {
      main: '#e1ff57',
    },
    background: {
      default: '#000',  // <-- Sfondo nero
      paper: '#121212',  // <-- Sfondo dei componenti più scuro
    },
    text: {
      primary: '#ffffff',  
      secondary: '#B3B3B3',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
  },
});



function AppLayout() {

  const themeRes = useTheme(); // Use theme hook to access the theme
  const isMobileOrTablet = useMediaQuery(themeRes.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        {!isMobileOrTablet ?
          <>
            <div className="layout-container">
              <AppNavbar />
              <div className="main-content">
                <Outlet />
              </div>
            </div>
          </>
          :
          <>
            <AppNavbarMobile />
            <Outlet />
          </>
        }
        <Footer />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default AppLayout;