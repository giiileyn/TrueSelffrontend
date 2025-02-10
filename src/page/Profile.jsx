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
        <div className="profile-header">
          <div className="profile-avatar"></div>
          <h2 className="profile-name">{user.name}</h2>
        </div>

        {/* Profile Card */}
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-6 mt-10 flex flex-col gap-4 border border-gray-200">
          {/* Header Section */}
          <div className="border-b pb-3">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.pronouns}</p>
            <span className="inline-block bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full mt-2">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} -{" "}
              {user.status}
            </span>
          </div>

          {/* Information Section */}
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-semibold">Email:</p>
              <p className="text-sm text-gray-600 break-all">{user.email}</p>
            </div>
            <div>
              <p className="font-semibold">Phone:</p>
              <p className="text-sm text-gray-600">{user.phoneNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Gender Identity:</p>
              <p className="text-sm text-gray-600">{user.genderIdentity}</p>
            </div>
            <div>
              <p className="font-semibold">Sexual Orientation:</p>
              <p className="text-sm text-gray-600">{user.sexualOrientation}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold">Date of Birth:</p>
              <p className="text-sm text-gray-600">
                {new Date(user.dob).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex gap-4 mt-4">
            <button className="flex-1 bg-[#B5EAD7] text-[#4A4A4A]  py-2 rounded-lg hover:bg-[#B0E0E6] transition duration-200">
              Change Password
            </button>
            <button className="flex-1 border border-[#B5EAD7] text-[#4A4A4A] font-semibold py-2 rounded-lg hover:bg-[#B0E0E6] hover:border-[#B0E0E6] transition duration-200">
              Update Profile
            </button>
          </div>
        </div>
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
