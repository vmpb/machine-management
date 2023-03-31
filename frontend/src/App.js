import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Machines from './components/Machines';
// Import components for hardware components and software here

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/machines" element={<Machines/>}/>
          {/* Add routes for hardware components and software here using the 'element' prop */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;