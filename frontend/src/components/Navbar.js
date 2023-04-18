import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  InputBase,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function Navbar({ onHamburgerClick, isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isLoggedIn() && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onHamburgerClick}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          Concurrent
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 1,
            pl: 0.5,
            pr: 0.5,
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            sx={{
              color: 'inherit',
              ml: 1,
            }}
            disableUnderline
          />
        </Box>
        {isLoggedIn() && (
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
