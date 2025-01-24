import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div>
      {/* Curved top section */}
      <div className="register-curved-top"></div>

      <div className="register-container">
        {/* Left Section: Registration Form */}
        <div className="register-card">
          <form>
            <div className="register-form-group-reg">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="register-form-group-reg">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="register-form-group-reg">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" placeholder="Enter your phone number" />
            </div>
            <div className="register-form-group-reg">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <div className="register-form-group-reg">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm your password" />
            </div>
            <button type="submit" className="register-submit-btn">Submit</button>
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
          <p className="register-subtitle">"Embrace differences in one voice"</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
