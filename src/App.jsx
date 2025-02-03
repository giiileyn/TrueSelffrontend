import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Login from './auth/Login';
import Register from './auth/Register';
import Home from './page/Home';
import Profile from './page/Profile'
import Help from './page/Help';
import Aboutus from './page/Aboutus';
import ComPage from './page/ComPage';
import Desk1 from './page/Desk1';

const App = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/community" element={<ComPage />} />
          <Route path="/desk1" element={<Desk1 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
