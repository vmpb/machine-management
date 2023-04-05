import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DevicesIcon from '@mui/icons-material/Devices';
import MemoryIcon from '@mui/icons-material/Memory';
import SoftwareIcon from '@mui/icons-material/Code';

function Sidenav({ handleDrawerToggle, drawerOpen }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    handleDrawerToggle(); // Close the drawer after navigation
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
      </List>
    </Drawer>
  );
}

export default Sidenav;
