import React, { useState } from "react";
import "./Profile.css";
import { getUser } from "../../utils/helpers";
import ChangePasswordModal from "../components/user/modals/ChangePassword";

const Profile = () => {
  const user = getUser();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  return (
    <div>
      <div className="curves curve-top-right"></div>
      <div className="curves curve-bottom-left"></div>
      {/* Profile Container */}
      <div className="profile-container">
        {/* Profile Header */}
        <di v className="profile-header">
          <div className="profile-avatar"></div>
          <h2 className="profile-name">{user.name}</h2>
          <p>{user.pronouns}</p>
        </di>

        {/* Profile Card */}
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            {user.name}
          </h2>
          <p className="text-gray-600"></p>
          <p className="text-gray-600">{user.phoneNumber}</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Contact
          </button>
        </div>
        {/* <form className="profile-form">
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
            <button
              type="button"
              className="change-password-button"
              onClick={handleOpenPasswordModal}
            >
              Change Password
            </button>
          </div>
        </form> */}
      </div>

      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={handleClosePasswordModal}
        />
      )}
    </div>
  );
};

export default Profile;
