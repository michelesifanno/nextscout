import { Box } from '@mui/material';
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
} from '@mui/icons-material';

export default function BottomNavigation() {
  const location = useLocation(); // Pagina dove ci si trova

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#edefe7',
        width: '100%',
        zIndex: '999',
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
  );
}
