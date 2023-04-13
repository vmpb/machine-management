import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Concurrent
        </Typography>
        {isLoggedIn() && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
