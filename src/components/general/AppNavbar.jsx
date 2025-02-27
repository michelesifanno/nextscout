import * as React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import {
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
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  Favorite as FavoriteIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  AccountCircle as AccountCircleIcon,
  MenuOutlined as MenuOutlinedIcon,
  FlagOutlined as OutlinedFlagIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import Search from '../navbar/Search';
import Follow from '../navbar/Follow';

const CustomDrawer = ({ open, onClose, children }) => (
  <Drawer
    variant="temporary"
    open={open}
    onClose={onClose}
    ModalProps={{
      BackdropProps: { invisible: true },
    }}
    sx={{
      width: 300,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 300,
        minHeight: '100vh',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 61,
        boxShadow: 'none!important',
        borderLeft: '1px solid #280047',
      },
    }}
  >
    {children}
  </Drawer>
);


export default function AppNavbar() {

  const [isSearchActive, setSearchActive] = React.useState(false);  // Stato per cambiare modalità di Drawer
  const [isFollowActive, setFollowActive] = React.useState(false);  // Stato per cambiare modalità di Drawer

  const handleSearchToggle = () => {
    setSearchActive((prev) => !prev);  // Alterna la modalità di ricerca
  };

  const handleFollowToggle = () => {
    setFollowActive((prev) => !prev);  // Alterna la modalità di ricerca
  };


  const location = useLocation(); // Pagina dove ci si trova

  // Funzione per verificare se la pagina corrente corrisponde alla route
  const isActive = (path) => location.pathname === path;


  const list = () => (
    <Box
      sx={{
        width: isSearchActive ? 62 : 250,
      }}
      role="presentation"
    >
      <Box>
        <List>
          {isFollowActive || isSearchActive
            ?
            <ListItem key="logo" disablePadding>
              <ListItemButton className="list-menu">
                <img
                  src={'/img/favicon.png'}
                  style={{ maxWidth: '30px', display: 'flex', justifyContent: 'center', padding: '20px 0px 10px 0px' }}
                />
              </ListItemButton>
            </ListItem>
            :
            <img
              src={'/img/logo.png'}
              style={{ maxWidth: '180px', display: 'block', padding: '30px 16px' }}
            />
          }
          <ListItem key="dashboard" disablePadding>
            <ListItemButton className="list-menu">
              <ListItemIcon>
                {isActive("/") ? <HomeIcon className="menu-icon" /> : <HomeOutlinedIcon className="menu-icon" />}
              </ListItemIcon>
              {(!isFollowActive || !isSearchActive) && <ListItemText primary="Dashboard" className="text-icon" />}
            </ListItemButton>
          </ListItem>

          <ListItem key="search" disablePadding>
            <ListItemButton className="list-menu" onClick={handleSearchToggle}>
              <ListItemIcon>
                {isSearchActive ? <SearchIcon className="menu-icon" /> : <SearchOutlinedIcon className="menu-icon" />}
              </ListItemIcon>
              {(!isFollowActive || !isSearchActive) && <ListItemText primary="Search" className="text-icon" />}
            </ListItemButton>
          </ListItem>

          <ListItem key="explore" disablePadding>
            <ListItemButton className="list-menu">
              <ListItemIcon>
                {isActive("/explore") ? <ExploreIcon className="menu-icon" /> : <ExploreOutlinedIcon className="menu-icon" />}
              </ListItemIcon>
              {(!isFollowActive || !isSearchActive) && <ListItemText primary="Scopri" className="text-icon" />}
            </ListItemButton>
          </ListItem>

          <ListItem key="analysis" disablePadding>
            <ListItemButton className="list-menu">
              <ListItemIcon>
                {isActive("/analysis") ? <SendIcon className="menu-icon" /> : <SendOutlinedIcon className="menu-icon" />}
              </ListItemIcon>
              {(!isFollowActive || !isSearchActive) && <ListItemText primary="Analisi" className="text-icon" />}
            </ListItemButton>
          </ListItem>

          <ListItem key="stats" disablePadding>
            <ListItemButton className="list-menu">
              <ListItemIcon>
                {isActive("/stats") ? <QueryStatsIcon className="menu-icon" /> : <QueryStatsOutlinedIcon className="menu-icon" />}
              </ListItemIcon>
              {(!isFollowActive || !isSearchActive) && <ListItemText primary="Statistiche" className="text-icon" />}
            </ListItemButton>
          </ListItem>

          <ListItem key="follow" disablePadding>
            <ListItemButton className="list-menu" onClick={handleFollowToggle}>
              <ListItemIcon>
                {isFollowActive ? <FavoriteIcon className="menu-icon" /> : <FavoriteBorderOutlinedIcon className="menu-icon" />}
              </ListItemIcon>
              {(!isFollowActive || !isSearchActive) && <ListItemText primary="Seguiti" className="text-icon" />}
            </ListItemButton>
          </ListItem>

          <ListItem key="report" disablePadding>
            <ListItemButton className="list-menu">
              <ListItemIcon>
                {isActive("/report") ? <FlagIcon className="menu-icon" /> : <OutlinedFlagIcon className="menu-icon" />}
              </ListItemIcon>
              {(!isFollowActive || !isSearchActive) && <ListItemText primary="Report" className="text-icon" />}
            </ListItemButton>
          </ListItem>

          <ListItem key="profile" disablePadding>
            <ListItemButton className="list-menu">
              <ListItemIcon>
                {isActive("/profile") ? <AccountCircleIcon className="menu-icon" /> : <AccountCircleOutlinedIcon className="menu-icon" />}
              </ListItemIcon>
              {(!isFollowActive || !isSearchActive) && <ListItemText primary="Profilo" className="text-icon" />}
            </ListItemButton>
          </ListItem>

          <ListItem key="others" disablePadding>
            <ListItemButton className="list-menu">
              <ListItemIcon>
                <MenuOutlinedIcon className="menu-icon" />
              </ListItemIcon>
              {!isSearchActive && <ListItemText primary="Altro" className="text-icon" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* <Drawer
        variant="permanent"
        sx={{
          width: isSearchActive ? 62 : 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isSearchActive ? 62 : 250,
            minHeight: '100vh',
            position: 'sticky',
            top: 0,
            borderRight: '1px solid #280047'
          },
        }}
      >
        {list()}
      </Drawer>

      <CustomDrawer open={isSearchActive} onClose={handleSearchToggle}>
        <Search />
      </CustomDrawer>

      <CustomDrawer open={isFollowActive} onClose={handleFollowToggle}>
        <Follow />
      </CustomDrawer> */}

    </>
  );
}