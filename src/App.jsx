import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Login from './auth/Login';
import Register from './auth/Register';
import Home from './page/Home';
import Profile from './page/Profile'

const App = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
