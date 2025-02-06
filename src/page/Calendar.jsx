// import React from "react";
// import "./Calendar.css";
// import { FaRegBell, FaUserCircle } from "react-icons/fa";

// const Calendar = () => {
//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//   const dates = [
//     ["", "", "", "", "", "", "01"],
//     ["02", "03", "04", "05", "06", "07", "08"],
//     ["09", "10", "11", "12", "13", "14", "15"],
//     ["16", "17", "18", "19", "20", "21", "22"],
//     ["23", "24", "25", "26", "27", "28", "29"],
//     ["30", "31", "", "", "", "", ""],
//   ];

//   return (
//     <div className="calendar-container">
//       <aside className="sidebar">
//         <h1 className="date">19</h1>
//         <h2 className="month-year">March 2025</h2>
//         <button className="calendar-button">📅 Calendar</button>
//         <ul className="menu">
//           <li>📅 Events</li>
//           <li>📝 Notes</li>
//           <li>📞 Reminders</li>
//           <li>📂 Documents</li>
//           <li>🗑 Trash</li>
//         </ul>
//         <div className="settings">⚙ Settings</div>
//       </aside>

//       <main className="calendar-content">
//         <header className="calendar-header">
//           <div className="view-buttons">
//             <button>Year</button>
//             <button className="active">Month</button>
//             <button>Week</button>
//           </div>
//           <div className="view-options">
//             <span>View:</span>
//             <select>
//               <option>March</option>
//             </select>
//             <select>
//               <option>2025</option>
//             </select>
//           </div>
//           <div className="icons">
//             <FaRegBell className="icon" />
//             <FaUserCircle className="icon" />
//           </div>
//         </header>

//         <div className="calendar-grid">
//           <div className="day-names">
//             {daysOfWeek.map((day, index) => (
//               <div key={index} className="day">{day}</div>
//             ))}
//           </div>

//           <div className="dates">
//             {dates.flat().map((date, index) => (
//               <div key={index} className={`date-box ${date ? "" : "empty"}`}>
//                 {date}
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Calendar;
