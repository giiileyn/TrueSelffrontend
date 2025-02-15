import React, { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  notifyError,
  notifySuccess,
  setUser,
  sexualOrientationOptions,
  genderIdentityOptions,
  pronounsOptions,
} from "../../../../utils/helpers";
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

const Profile = ({ onClose, user }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      dob: null,
      sexualOrientation: null,
      genderIdentity: null,
      pronouns: null,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob: user.dob ? dayjs(user.dob) : null,
        sexualOrientation: sexualOrientationOptions.find(
          (option) => option.value === user.sexualOrientation
        ),
        genderIdentity: genderIdentityOptions.find(
          (option) => option.value === user.genderIdentity
        ),
        pronouns: pronounsOptions.find(
          (option) => option.value === user.pronouns
        ),
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    const updatedUser = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dob: data.dob.toISOString(),
      sexualOrientation: data.sexualOrientation?.value,
      genderIdentity: data.genderIdentity?.value,
      pronouns: data.pronouns?.value,
    };

    AxiosInstance.put(`/users/admin/${user._id}`, updatedUser)
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
        zIndex: 9999,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" mb={2}>
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12}>
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
                {...register("email", { required: "Email is required" })}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                label="Phone Number"
                style={{ width: "260px" }}
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
            <Grid2 item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Sexual Orientation
              </Typography>
              <Controller
                name="sexualOrientation"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={sexualOrientationOptions}
                    placeholder="Select Sexual Orientation"
                  />
                )}
              />
            </Grid2>

            <Grid2 item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Gender Identity
              </Typography>
              <Controller
                name="genderIdentity"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={genderIdentityOptions}
                    placeholder="Select Gender Identity"
                  />
                )}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Pronouns
              </Typography>
              <Controller
                name="pronouns"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={pronounsOptions}
                    placeholder="Select Pronouns"
                  />
                )}
              />
            </Grid2>
            <Grid2 item xs={12} display="flex" justifyContent="flex-end">
              <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
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
