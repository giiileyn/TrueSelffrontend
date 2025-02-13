import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import { notifyError, notifySuccess, setUser } from "../../../../utils/helpers";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid2,
} from "@mui/material";
import AxiosInstance from "../../../../utils/AxiosInstance";
import dayjs from "dayjs";

const Profile = ({ onClose, user, isEditing }) => {
  const checkUnique = async (value, field) => {
    const userId = user._id;
    try {
      const response = await AxiosInstance.post(`/users/check-unique`, {
        [field]: value,
        id: userId, // Include user ID in the payload
      });
      return response.data.isUnique;
    } catch (error) {
      console.error("Error checking uniqueness:", error);
      return false;
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      dob: null,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob: user.dob ? dayjs(user.dob) : null,
      });
    }
  }, [user, reset]);

  const [isEmailUnique, setIsEmailUnique] = useState(true);

  const onSubmit = async (data) => {
    const userId = user._id;

    if (!isEmailUnique) {
      notifyError("Email must be unique");
      return;
    }

    const updatedUser = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dob: data.dob.toISOString(),
    };

    AxiosInstance.put(`/users/admin/${userId}`, updatedUser)
      .then((response) => {
        if (response.status === 200) {
          notifySuccess("Successfully updated profile");
          setUser(response.data);
          onClose();
        }
      })
      .catch((error) => {
        console.error(
          "Error updating user:",
          error.response ? error.response.data : error.message
        );
        notifyError("Error updating profile");
      });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" mb={2}>
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", { required: "Name is required" })}
              />
            </Grid2>

            <Grid2 item xs={12}>
              <Controller
                name="dob"
                rules={{ required: "Date of Birth is required" }}
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      label="Date of Birth"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors.dob}
                          helperText={errors.dob?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  validate: async (value) => {
                    const isUnique = await checkUnique(value, "email");
                    if (!isUnique) {
                      setError("email", {
                        type: "manual",
                        message: "Email is already in use",
                      });
                      return false;
                    }
                    return true;
                  },
                })}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                label="Phone Number"
                fullWidth
                variant="outlined"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^((09)|(\+639))\d{9}$/,
                    message: "Invalid phone number format",
                  },
                })}
              />
            </Grid2>
            <Grid2 item xs={12} display="flex" justifyContent="flex-end">
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{ mr: 2 }}
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;
