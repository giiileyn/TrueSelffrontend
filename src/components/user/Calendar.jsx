import React, { useState } from "react";
import dayjs from "dayjs";
import {
  SentimentSatisfiedAlt,
  SentimentDissatisfied,
  MoodBad,
  SentimentNeutral,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";

const moodColors = {
  Happy: "#FF6467",
  Sad: "#51A2FF",
  Angry: "#FFA2A2",
  Neutral: "#99A1AF",
  Anxious: "#00D5BE",
};

const moodIcons = {
  Happy: <SentimentSatisfiedAlt />,
  Sad: <SentimentDissatisfied />,
  Angry: <MoodBad />,
  Neutral: <SentimentNeutral />,
  Anxious: <SentimentVeryDissatisfied />,
};

const MoodCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [moodData, setMoodData] = useState({});

  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month");
  const firstDayIndex = startOfMonth.day();

  const days = Array.from({ length: daysInMonth }, (_, i) =>
    startOfMonth.add(i, "day")
  );
  const blankDays = Array.from({ length: firstDayIndex }, (_, i) => i);

  const handleMoodSelect = (day) => {
    const moodOptions = Object.keys(moodColors);
    const currentMood = moodData[day] || "Neutral";
    const nextMood =
      moodOptions[(moodOptions.indexOf(currentMood) + 1) % moodOptions.length];
    setMoodData({ ...moodData, [day]: nextMood });
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-lg w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={() => setCurrentDate(currentDate.add(1, "month"))}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-700">
            {day}
          </div>
        ))}
        {blankDays.map((_, index) => (
          <div key={index} className="w-10 h-10"></div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleMoodSelect(day.format("YYYY-MM-DD"))}
            className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer"
            style={{
              backgroundColor:
                moodColors[moodData[day.format("YYYY-MM-DD")]] || "#E0E0E0",
            }}
          >
            {moodIcons[moodData[day.format("YYYY-MM-DD")]] || day.format("D")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodCalendar;
