import React, { useState, useEffect } from "react";
import { getUser, notifyError } from "../../utils/helpers";
import AxiosInstance from "../../utils/AxiosInstance";
import Sphere from "../components/user/sphere";
import { Link } from "react-router-dom";

const MoodIndex = () => {
  const user = getUser();
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    const userId = user?._id;
    if (!userId) return;
    try {
      const res = await AxiosInstance.get(`/moodEntries/${userId}`);
      if (res.status === 200) {
        setMoods(res.data.moodEntries);
      }
    } catch (err) {
      notifyError(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFDAB9] via-[#FFFACD] to-[#B0E0E6] px-8 py-12">
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
