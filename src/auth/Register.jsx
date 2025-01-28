import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./Register.css";
import AxiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/helpers";
import DatePicker from "react-date-picker";
import Select from "react-select";

const Register = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      dob: null,
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    notifySuccess("Registration successful");

    try {
      await AxiosInstance.post("/auth/register", data).then((response) => {
        console.log(response);
        alert("Registration successful");
      });
    } catch (error) {
      console.log(error);
      notifyError("Registration failed");
    }
  };

  return (
    <div>
      {/* Curved top section */}
      <div className="register-curved-top"></div>

      <div className="register-container">
        {/* Left Section: Registration Form */}
        <div className="register-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="register-form-group-reg">
              <label htmlFor="name">Name</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="register-form-group-reg">
              <label htmlFor="email">Email</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="register-form-group-reg">
              <label htmlFor="phone">Phone Number</label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Phone number must be 11 digits",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="register-form-group-reg">
              <label htmlFor="password">Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="register-form-group-reg">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 ">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button type="submit" className="register-submit-btn">
              Submit
            </button>
          </form>
          <div className="register-login-link">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>

        {/* Right Section: Text */}
        <div className="register-text-section">
          <h1 className="register-title">True Self</h1>
          <p className="register-subtitle">
            "Embrace differences in one voice"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
