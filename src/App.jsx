import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../utils/ProtectedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./page/Home";
import Profile from "./page/Profile";
import Help from "./page/Help";
import Contact from "./page/Contact";
import DiaryEditor from "./page/Diary";
import UserLayout from "./components/user/Layout";
import ResetPassword from "./page/resetPassword";
import ResetPasswordRequest from "./page/resetPasswordRequest";
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
      <Routes>
        {/* Routes for user */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password-request"
          element={<ResetPasswordRequest />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/myDiary" element={<DiaryEditor />}></Route>

        {/* Routes for admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AdminLayout />} adminOnly={true} />
          }
        >
          <Route index element={<AdminIndex />} />
          <Route path="email" element={<AdminEmail />}></Route>
          <Route path="contacts" element={<AdminContact />}></Route>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="spaces" element={<AdminSpaces />}></Route>
        </Route>
      </Routes>

      <ToastContainer />
    </Router>
  );
};

export default App;
