import React, { useState, useEffect } from "react";
import Calendar from "../components/user/Calendar";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import AxiosInstance from "../../utils/AxiosInstance";
import { getUser, notifyError } from "../../utils/helpers";

const moodColors = {
  Happy: "#FF6467",
  Sad: "#51A2FF",
  Angry: "#FFA2A2",
  Neutral: "#99A1AF",
  Anxious: "#00D5BE",
};

const MoodDashboard = () => {
  const [moodPerMonth, setMoodPerMonth] = useState([]);
  const [moodPercentage, setMoodPercentage] = useState([
    { mood: "Happy", percentage: 0 },
    { mood: "Sad", percentage: 0 },
    { mood: "Angry", percentage: 0 },
    { mood: "Anxious", percentage: 0 },
    { mood: "Neutral", percentage: 0 },
  ]);

  const user = getUser();
  const userId = user._id;

  const fetchMoodPerMonth = async () => {
    try {
      const res = await AxiosInstance.get(
        `/moodEntries/moodPerMonth/${userId}`
      );
      if (res.data.success) {
        const formattedData = res.data.moodsPerMonth.map((entry) => {
          const monthName = new Date(
            entry._id.year,
            entry._id.month - 1
          ).toLocaleString("default", { month: "short" });
          const moodCounts = { month: monthName };

          ["Happy", "Sad", "Angry", "Neutral", "Anxious"].forEach((mood) => {
            const moodEntry = entry.moods.find((m) => m.mood === mood);
            moodCounts[mood] = moodEntry ? moodEntry.count : 0;
          });

          return moodCounts;
        });

        setMoodPerMonth(formattedData);
      }
    } catch (error) {
      console.error(error);
      notifyError("Failed to fetch mood data");
    }
  };

  const fetchMoodPercentage = async () => {
    try {
      const res = await AxiosInstance.get(
        `/moodEntries/moodPercentages/${userId}`
      );
      setMoodPercentage(res.data.moodPercentages);
    } catch (error) {
      console.log(error);
      notifyError("Failed to fetch mood percentage data");
    }
  };

  useEffect(() => {
    fetchMoodPerMonth();
    fetchMoodPercentage();
  }, []);

  return (
    <div className="my-10 px-4 md:px-16">
      <div className="flex justify-center items-center text-center">
        <h1 className="font-semibold font-serif text-xl md:text-2xl ">
          Mood Tracker Dashboard
        </h1>
      </div>

      <Calendar />
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 w-full gap-5">
        {/* Line Chart - Monthly Mood */}
        <div className="w-full md:w-1/2 bg-white shadow-md p-4 rounded-lg">
          <h1 className="font-serif font-semibold text-lg md:text-xl mb-4">
            Monthly Mood Chart
          </h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(moodColors).map((mood) => (
                <Line
                  key={mood}
                  type="monotone"
                  dataKey={mood}
                  stroke={moodColors[mood]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Mood Distribution */}
        <div className="w-full md:w-1/2 bg-white shadow-md p-4 rounded-lg">
          <h1 className="font-serif font-semibold text-lg md:text-xl mb-4">
            Mood Distribution
          </h1>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moodPercentage.map(({ mood, percentage }) => ({
                  name: mood,
                  value: percentage,
                }))}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {moodPercentage.map(({ mood }, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={moodColors[mood] || "#add8e6"}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MoodDashboard;
