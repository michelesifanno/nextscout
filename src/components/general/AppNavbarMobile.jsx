import * as React from 'react';
import { Grid2 as Grid, Box } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  Favorite as FavoriteIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  AccountCircle as AccountCircleIcon,
  FlagOutlined as OutlinedFlagIcon,
  Flag as FlagIcon,
  HomeOutlined as HomeOutlinedIcon,
  Home as HomeIcon,
  SearchOutlined as SearchOutlinedIcon,
  Search as SearchIcon,
  ExploreOutlined as ExploreOutlinedIcon,
  Explore as ExploreIcon,
  SendOutlined as SendOutlinedIcon,
  Send as SendIcon,
  QueryStatsOutlined as QueryStatsOutlinedIcon,
  QueryStats as QueryStatsIcon,
} from '@mui/icons-material';



export default function AppNavbarMobile() {


  const location = useLocation(); // Pagina dove ci si trova

  // Funzione per verificare se la pagina corrente corrisponde alla route
  const isActive = (path) => location.pathname === path;


  return (
    <>
    <Grid container sx={{ padding: '16px', backgroundColor: '#edefe7' }}>

      <Grid size={8.4}>
        <img
          src={'/img/logo.png'}
          style={{ maxWidth: '180px', display: 'block' }}
        />
      </Grid>

      <Grid size={1.2}>
        <Link to="/follow">
          {isActive("/follow") ? (
            <FavoriteIcon className="menu-icon" />
          ) : (
            <FavoriteBorderOutlinedIcon className="menu-icon" />
          )}
        </Link>
      </Grid>

      <Grid size={1.2}>
        <Link to="/report">
          {isActive("/report") ? (
            <FlagIcon className="menu-icon" />
          ) : (
            <OutlinedFlagIcon className="menu-icon" />
          )}
        </Link>
      </Grid>

      <Grid size={1.2}>
        <Link to="/profile">
          {isActive("/profile") ? (
            <AccountCircleIcon className="menu-icon" />
          ) : (
            <AccountCircleOutlinedIcon className="menu-icon" />
          )}
        </Link>
      </Grid>

    </Grid>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f3f4ed',
        width: '100%',
        zIndex: '999',
        position: 'fixed',
        bottom:'0'
      }}
    >
      <Link to="/">
        {isActive("/") ? (
          <HomeOutlinedIcon className="menu-icon" />
        ) : (
          <HomeIcon className="menu-icon" />
        )}
      </Link>

      <Link to="/search">
        {isActive("/search") ? (
          <SearchIcon className="menu-icon" />
        ) : (
          <SearchOutlinedIcon className="menu-icon" />
        )}
      </Link>

      <Link to="/analysis">
        {isActive("/analysis") ? (
          <SendIcon className="menu-icon" />
        ) : (
          <SendOutlinedIcon className="menu-icon" />
        )}
      </Link>

      <Link to="/stats">
        {isActive("/stats") ? (
          <QueryStatsIcon className="menu-icon" />
        ) : (
          <QueryStatsOutlinedIcon className="menu-icon" />
        )}
      </Link>

      <Link to="/explore">
        {isActive("/explore") ? (
          <ExploreIcon className="menu-icon" />
        ) : (
          <ExploreOutlinedIcon className="menu-icon" />
        )}
      </Link>
    </Box>
    </>
  );
}