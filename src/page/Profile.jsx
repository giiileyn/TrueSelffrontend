import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  return (
    <div>
      {/* Title Section */}
      <div className="home-title">True Self</div>
      <div className="curves curve-top-right"></div>
      <div className="curves curve-bottom-left"></div>
      {/* Profile Container */}
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar"></div>
          <h2 className="profile-name">Maria Dela Cruz</h2>
        </div>

        {/* Profile Form */}
        <form className="profile-form">
          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="text" placeholder="Enter your phone number" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="text" placeholder="Enter your password" />
          </div>
          <div className="button-group">
            <button type="button" className="edit-button">
              Edit
            </button>
            <button type="button" className="change-password-button">
              Change Password
            </button>
          </div>
        </form>
      </div>

      
      <div className="recent-posts">
        <h3>Recent Post</h3>
       
      </div>

      
      {/* <div className="navigation-link">
        <Link to="/">Back to Home</Link>
      </div> */}
    </div>
  );
};

export default Profile;
