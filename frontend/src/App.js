import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Home = () => {
  return <h1>Home</h1>;
};

const Machines = () => {
  return <h1>Machines</h1>;
};

const Hardware = () => {
  return <h1>Hardware</h1>;
};

const Software = () => {
  return <h1>Software</h1>;
};

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/machines">Machines</Link>
            </li>
            <li>
              <Link to="/hardware">Hardware</Link>
            </li>
            <li>
              <Link to="/software">Software</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/software" element={<Software />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
