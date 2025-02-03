import React from "react";
import "./Desk1.css";

const Desk1 = () => {
  return (
    <div className="desk1">
    <div className="desk1-container">
      <div className="desk-purple-circle left"></div>
      <div className="desk-purple-circle right"></div>
      <h2 className="desk1-heading">Recommended Hospitals</h2>
      <div className="desk1-content">

         <div className="desk-doctor-illustration">
          <img
            src="/page/Lifesavers - Bust 1.png"
            alt="Doctor Illustration"
            className="desk-doctor-image"
          />
        </div>
        <div className="desk-hospital-list">
          <ul>
            <li>
              <div className="desk-hospital-info">
                <h3>Taguig Pateros</h3>
                <p>Service Rd, Taguig <span>• 2k away</span></p>
              </div>
              <div className="desk-circle"></div>
            </li>
            <li>
              <div className="desk-hospital-info">
                <h3>Taguig Pateros</h3>
                <p>Service Rd, Taguig <span>• 2k away</span></p>
              </div>
              <div className="desk-circle"></div>
            </li>
            <li>
              <div className="desk-hospital-info">
                <h3>Taguig Pateros</h3>
                <p>Service Rd, Taguig <span>• 2k away</span></p>
              </div>
              <div className="desk-circle"></div>
            </li>
          </ul>
          <a href="#" className="desk-see-more">See more</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Desk1;
