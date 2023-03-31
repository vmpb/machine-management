import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Machines from './components/Machines';
import MachineDetails from './components/MachineDetails';
import Hardware from './components/Hardware';
import HardwareDetails from './components/HardwareDetails';
import Software from './components/Software';
import SoftwareDetails from './components/SoftwareDetails';
// Import components for hardware components and software here

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/machines" element={<Machines />} />
          <Route path="/machines/:id" element={<MachineDetails />} />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/hardware/:id" element={<HardwareDetails />} />
          <Route path="/software" element={<Software />} />
          <Route path="/software/:id" element={<SoftwareDetails />} />
          {/* Add routes for hardware components and software here using the 'element' prop */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;