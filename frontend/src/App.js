import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Machines from './components/Machines';
import MachineDetails from './components/MachineDetails';
import Hardware from './components/Hardware';
import HardwareDetails from './components/HardwareDetails';
import Software from './components/Software';
import SoftwareDetails from './components/SoftwareDetails';
import { Snackbar, Alert, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Sidenav from './components/Sidenav';
import { useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

// Import components for hardware components and software here

function App() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <Router>
      <div className="App">
      <Sidenav handleDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />
        <Navbar onHamburgerClick={handleDrawerToggle} />
        <Routes>
          <Route path="/machines" element={<Machines />} />
          <Route
            path="/machines/:id"
            element={
              <MachineDetails
                handleSnackbarOpen={handleSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
              />
            }
          />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/hardware/:id" element={<HardwareDetails />} />
          <Route path="/software" element={<Software />} />
          <Route path="/software/:id" element={<SoftwareDetails />} />
          {/* Add routes for hardware components and software here using the 'element' prop */}
        </Routes>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </Router>
  );
};
export default App;