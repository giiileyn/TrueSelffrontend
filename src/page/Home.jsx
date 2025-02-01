import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      {/* Curved top section */}

      <div className="register-container">
        {/* Left Section: Text */}
        <div className="left-row">
          <h1 className="home-title1">Embrace yourself</h1>
          <p className="register-subtitle">
            Discover the power within you! Embrace your unique journey and
            unlock your true potential today. Start your transformation now or
            learn more about how we can support you!
          </p>
          <Link to="/login">
            <button type="submit" className="left-startnow-btn">
              Start Now!
            </button>
          </Link>
          <Link to="/about-us">
            <button type="submit" className="right-learnmore-btn">
              Learn More
            </button>
          </Link>
        </div>

        {/* Right Section: Image */}
        <div className="right-row">
          <img className="ml-5" src="/page/removeBgHome.png" alt="image" />
        </div>
      </div>
    </>
  );
};

export default Home;
