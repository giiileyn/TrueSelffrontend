import React, { useState, useRef } from "react";
import Calendar from "../components/user/Calendar";
import { getUser } from "../../utils/helpers";
import PieChart from "../components/user/charts/PieChart";
import MoodLineChart from "../components/user/charts/LineCharts";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const MoodDashboard = () => {
  const user = getUser();
  const userId = user._id;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="my-10 px-6 md:px-20 lg:px-32">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="font-serif font-bold text-2xl md:text-3xl">
          Mood Tracker Dashboard
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Reflect, relax, and gain insights into your emotional well-being.
        </p>
      </div>

      {/* Calendar & Music Player + CTA Section */}
      <div className="flex flex-col md:flex-row mt-8 gap-8">
        {/* Calendar Section */}
        <div className="w-full md:w-1/2">
          <Calendar />
        </div>

        {/* Music Player & CTA Section */}
        <div className="w-full md:w-[400px] lg:w-[500px] xl:w-[600px] bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-2xl text-white shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
            <MusicNoteIcon className="text-white" />
            Relaxing Music 🎵
          </h2>
          <p className="text-sm md:text-base mb-5 italic">
            "Music is the medicine of the mind." – John A. Logan
          </p>
          <p className="text-sm md:text-base mb-4">
            Take a deep breath and enjoy some calming music to ease your mind.
            Listening to music can help reduce stress, improve focus, and
            enhance your mood.
          </p>

          <ul className="list-disc list-inside text-sm md:text-base mb-6">
            <li>Relieves stress and anxiety</li>
            <li>Boosts concentration</li>
            <li>Enhances emotional well-being</li>
          </ul>

          {/* Play Music Button */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={toggleMusic}
              className="flex items-center gap-2 bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-100 transition"
            >
              {isPlaying ? <StopCircleIcon /> : <PlayCircleIcon />}
              {isPlaying ? "Stop Music" : "Play Music"}
            </button>
            <audio ref={audioRef} src="/path-to-your-music.mp3" loop />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <button className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-800 transition">
              <SentimentSatisfiedAltIcon />
              Record Mood
            </button>
            <button className="flex items-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-purple-800 transition">
              <EditNoteIcon />
              Write Journal
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Line Chart - Monthly Mood */}
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="font-serif font-semibold text-lg md:text-xl mb-4">
            Monthly Mood Trend
          </h2>
          <MoodLineChart />
        </div>

        {/* Pie Chart - Mood Distribution */}
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="font-serif font-semibold text-lg md:text-xl mb-4">
            Mood Distribution Overview
          </h2>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default MoodDashboard;
