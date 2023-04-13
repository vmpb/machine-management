import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DevicesIcon from '@mui/icons-material/Devices';
import MemoryIcon from '@mui/icons-material/Memory';
import SoftwareIcon from '@mui/icons-material/Code';
import PeopleIcon from '@mui/icons-material/People'


function Sidenav({ handleDrawerToggle, drawerOpen, isLoggedIn }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    handleDrawerToggle(); // Close the drawer after navigation
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    handleDrawerToggle(); 
    navigate('/login');
  };
  

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
      <List>
        <ListItem button onClick={() => handleClick('/machines')}>
          <ListItemIcon>
            <DevicesIcon />
          </ListItemIcon>
          <ListItemText primary="Machines" />
        </ListItem>
        <ListItem button onClick={() => handleClick('/hardware')}>
          <ListItemIcon>
            <MemoryIcon />
          </ListItemIcon>
          <ListItemText primary="Hardware" />
        </ListItem>
        <ListItem button onClick={() => handleClick('/software')}>
          <ListItemIcon>
            <SoftwareIcon />
          </ListItemIcon>
          <ListItemText primary="Software" />
        </ListItem>
        <ListItem button onClick={() => handleClick('/clients')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItem>
        <Divider/>
        {isLoggedIn() && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </List>
    </Drawer>
  );
}

export default Sidenav;
