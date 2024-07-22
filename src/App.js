import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
