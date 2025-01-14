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
    primary: {
      main: '#280047',  // Il colore che hai fornito
    },
    secondary: {
      main: '#7000c6',  // Colore complementare ispirato a Sofascore
    },
    third: {
      main: '#e1ff57',
    },
    background: {
      default: '#edefe7',  // Colore di sfondo chiaro
      paper: '#edefe7',  // Colore di sfondo dei componenti
    },
    text: {
      primary: '#280047',  // Colore del testo primario scuro
      secondary: '#e1ff57',  // Colore del testo secondario più chiaro
    },
    error: {
      main: '#d32f2f',  // Colore di errore
    },
    warning: {
      main: '#ffa726',  // Colore di avviso
    },
    info: {
      main: '#29b6f6',  // Colore di informazione
    },
    success: {
      main: '#66bb6a',  // Colore di successo
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
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