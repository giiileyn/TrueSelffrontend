import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./page/Home";
import Profile from "./page/Profile";
import Help from "./page/Help";
import Contact from "./page/Contact";
import DiaryEditor from "./page/Diary";
import "./index.css";
import { ToastContainer } from "react-toastify";

// Admin components and pages
import AdminLayout from "./components/admin/Layout";
import AdminIndex from "./page/admin/index";
import AdminEmail from "./page/admin/email";
import AdminContact from "./page/admin/contacts";
import AdminProfile from "./page/admin/profile";
import AdminSpaces from "./page/admin/spaces";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/myDiary" element={<DiaryEditor />}></Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminIndex />} />
            <Route path="email" element={<AdminEmail />}></Route>
            <Route path="contacts" element={<AdminContact />}></Route>
            <Route path="profile" element={<AdminProfile />} />
            <Route path="spaces" element={<AdminSpaces />}></Route>
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
