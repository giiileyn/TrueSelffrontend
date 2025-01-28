import React from "react";
import "./Login.css";
import AxiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/helpers";
import { useForm, Controller } from "react-hook-form";
import { authenticate } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await AxiosInstance.post("/auth/login", data)
        .then((response) => {
          console.log(response);
          authenticate(response.data, () => {
            console.log("User authenticated");
            notifySuccess("Login successful");
          });
          if (response.data.user.role === "admin") {
            navigate("/admin");
          }
        })
        .catch((error) => {
          console.log(error);
          notifyError(error.data.message);
        });
    } catch (error) {
      console.log(error);
      notifyError("Login failed");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
  };

  return (
    <div>
      {/* Curved top section */}
      {/* <div className="curved-top"></div> */}

      <div className="login-container">
        <h1 className="login-title">True Self</h1>
        <div className="login-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
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
                <p className="text-red-500 text-left ml-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
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
                <p className="text-red-500 text-left ml-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="reset-password">
              <a href="">Reset password?</a>
            </div>
            <div className="social-login">
              <a href="" className="social-icon facebook"></a>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleGoogleLoginSuccess(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              />
            </div>
            <button type="submit" className="login-submit-btn">
              Login
            </button>
          </form>
          <div className="login-register-link">
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </div>

      {/* Curved bottom section */}
      <div className="login-curved-bottom"></div>
    </div>
  );
};

export default Login;
