import React, { useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import {
  Button,
  Typography,
  Grid2,
  Paper,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import {
  getUser,
  formatDate,
  notifySuccess,
  notifyError,
  setUser,
} from "../../../utils/helpers";
import ProfileModal from "../../components/admin/modals/Profile.modal";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ChangePasswordModal from "../../components/admin/modals/ChangePassword.modal";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import AxiosInstance from "../../../utils/AxiosInstance";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const user = getUser();

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleLinkGoogleAccount = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    const userId = user._id;
    const clean_data = {
      provider_id: decoded.sub,
    };
    console.log(clean_data);
    await AxiosInstance.put(`/auth/googleLinkAccount/${userId}`, clean_data)
      .then((response) => {
        if (response.status === 200) {
          notifySuccess("Successfully linked");
          setUser(response.data);
        } else {
          notifyError("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error linking google account", error);
        notifyError("Failed to link Google account.");
      });
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        notifyError("Please select a valid image file.");
        return;
      }

      const userId = user._id;
      const formData = new FormData();
      formData.append("profilePicture", file);
      AxiosInstance.put(`/users/update-profile-picture/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        setUser(res.data);
        notifySuccess("Profile picture updated");
        window.location.reload();
        console.log("Profile picture updated");
      });
      setSelectedFile(file);
    }
  };

  return (
    <Box className="container" sx={{ maxWidth: "lg", marginTop: 8 }}>
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Admin Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span className="text-blue-500 hover:underline">Home</span> /{" "}
          <span> Profile</span>
        </Typography>
      </Box>

      {/* Profile Information Section */}
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            {/* Profile Image with Camera Icon */}
            <Box
              sx={{
                position: "relative",
                width: 96,
                height: 96,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #ccc",
              }}
            >
              <Avatar
                alt="Profile"
                src={user.profile.url}
                sx={{ width: "100%", height: "100%" }}
              />
              {/* Camera Icon */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <CameraAltIcon />
                {/* File Input to select images */}
                <input
                  type="file"
                  accept="image/*" // Restrict file types to images
                  onChange={handleFileChange} // Handle file change
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </Box>
            {/* User Details */}
            <Box>
              <Typography variant="h6" fontWeight="semibold">
                {user.name || "Admin"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || "admin@example.com"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                Administrator
              </Typography>
            </Box>
          </Box>
          {/* Edit Profile Button */}
          <IconButton onClick={handleEditProfile} color="primary">
            <EditOutlined />
          </IconButton>
        </Box>
      </Paper>

      <Grid2 container spacing={4} mt={4}>
        <Grid2 item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="semibold" gutterBottom>
              Profile Details
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Name:</strong> {user.name || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Date of Birth:</strong>{" "}
              {user?.dob ? formatDate(user.dob) : "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Email:</strong> {user?.email || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Phone:</strong> {user?.phoneNumber || "N/A"}
            </Typography>

            {/* Change Password Button */}
            <Box display="flex" justifyContent="center" mt={4}>
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenPasswordModal}
              >
                Change Password
              </Button>
            </Box>
          </Paper>
        </Grid2>

        {/* Linked Accounts Section */}
        <Grid2 item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="semibold" gutterBottom>
              Linked Accounts
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Facebook:</strong>{" "}
              {user?.linkedAccounts?.facebook || "Not Linked"}
              {!user?.linkedAccounts?.facebook && (
                <Button variant="outlined" color="primary" sx={{ ml: 2 }}>
                  Link Facebook
                </Button>
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Google:</strong>{" "}
              {user?.socialAccounts?.find(
                (account) => account.provider === "google"
              ) ? (
                <Button variant="outlined" color="primary" sx={{ ml: 2 }}>
                  Already Linked
                </Button>
              ) : (
                <GoogleLogin
                  onSuccess={handleLinkGoogleAccount}
                  onError={() => {
                    console.error("Google login failed");
                    alert("Failed to authenticate with Google.");
                  }}
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                />
              )}
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>

      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={user}
        />
      )}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={handleClosePasswordModal}
        />
      )}
    </Box>
  );
};

export default Profile;
