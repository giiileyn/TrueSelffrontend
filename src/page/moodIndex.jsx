import React from "react";
import { getUser, notifyError } from "../../utils/helpers";
import Sphere from "../components/user/sphere";
import { Link } from "react-router-dom";

const MoodIndex = () => {
  const user = getUser();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-12 ">
      {/*  bg-gradient-to-br from-[#FFDAB9] via-[#FFFACD] to-[#B0E0E6] */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-10">
        {/* Left Section - Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-serif font-bold text-[#C8A2C8]">
            Mood Tracking
          </h1>
          <p className="text-lg text-gray-700 mt-4 leading-relaxed">
            A life-changing personal approach to your mental well-being. Calm
            your body and mind with the power of journaling and mood tracking.
          </p>
          <Link to={"/record-mood"}>
            <button className="mt-6 bg-[#B5EAD7] text-[#4A4A4A] px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-[#B0E0E6] transition duration-300">
              Record Mood
            </button>
          </Link>
          <Link to={"/mood-dashboard"}>
            <button className="mt-6 ml-5 border-2 border-[#B5EAD7] text-[#4A4A4A] px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-[#B0E0E6] hover:border-[#B0E0E6] transition duration-300">
              View Dashboard
            </button>
          </Link>
        </div>

        {/* Right Section - Sphere Visualization */}
        <div className="md:w-1/2 h-80 flex items-center justify-center bg-[#F4DAD1] rounded-xl shadow-md">
          <Sphere /> {/* Three.js Sphere Component */}
        </div>
      </div>
    </div>
  );
};

export default MoodIndex;
