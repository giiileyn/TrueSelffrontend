import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      {/* Curved top section */}
      <div className="home-title">True Self</div>

      <div className="register-container">
        {/* Left Section: Text */}
        <div className="left-row">
          <h1 className="home-title1">Embrace yourself</h1>
          <p className="register-subtitle">
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque odio voluptas, obcaecati rerum tempore quidem et
            consequuntur a illum in dignissimos debitis totam delectus dolorum
            soluta temporibus reiciendis molestiae minus!"
          </p>
          <Link to="/login">
            <button type="submit" className="left-startnow-btn">
              Start Now!
            </button>
          </Link>
          <button type="submit" className="right-learnmore-btn">
            Learn More
          </button>
        </div>

        {/* Right Section: Image */}
        <div className="right-row">
          <img className="ml-5" src="/page/removeBgHome.png" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
