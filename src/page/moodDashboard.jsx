import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// Mock Data
const pieData = [
  { name: "Happy", value: 400 },
  { name: "Sad", value: 300 },
  { name: "Neutral", value: 300 },
  { name: "Excited", value: 200 },
];

const areaData = [
  { date: "2025-01-01", happy: 80, sad: 10, excited: 50 },
  { date: "2025-01-02", happy: 70, sad: 20, excited: 60 },
  { date: "2025-01-03", happy: 90, sad: 30, excited: 40 },
  { date: "2025-01-04", happy: 100, sad: 40, excited: 30 },
  { date: "2025-01-05", happy: 80, sad: 20, excited: 60 },
];

const barData = [
  { name: "2025-01-01", mood: 4 },
  { name: "2025-01-02", mood: 3 },
  { name: "2025-01-03", mood: 5 },
  { name: "2025-01-04", mood: 2 },
  { name: "2025-01-05", mood: 4 },
];

// Radar Chart Data
const radarData = [
  { date: "2025-01-01", happy: 80, sad: 10, excited: 50 },
  { date: "2025-01-02", happy: 70, sad: 20, excited: 60 },
  { date: "2025-01-03", happy: 90, sad: 30, excited: 40 },
  { date: "2025-01-04", happy: 100, sad: 40, excited: 30 },
  { date: "2025-01-05", happy: 80, sad: 20, excited: 60 },
];

// Colors for mood data representation
const COLORS = ["#FFDF20", "#8EC5FF", "#FFA2A2", "#7BF1A8"];

const MoodDashboard = () => {
  return (
    <div>
      <h2>Mood Tracking Dashboard</h2>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Area Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={areaData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="happy"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area type="monotone" dataKey="sad" stroke="#8884d8" fill="#8884d8" />
          <Area
            type="monotone"
            dataKey="excited"
            stroke="#ff7300"
            fill="#ff7300"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="mood" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Radar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius="80%" width={730} height={250} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="date" />
          <PolarRadiusAxis />
          <Radar
            name="Happy"
            dataKey="happy"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Radar
            name="Sad"
            dataKey="sad"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Excited"
            dataKey="excited"
            stroke="#ff7300"
            fill="#ff7300"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodDashboard;
