import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import AxiosInstance from "../../utils/AxiosInstance";
import { getUser, notifyError, notifySuccess } from "../../utils/helpers";

const moodData = [
  {
    id: 1,
    name: "Happy",
    color: "bg-yellow-300",
    icon: "😊",
    suggestions: [
      "Keep spreading positivity!",
      "Celebrate small wins.",
      "Share your happiness with others.",
      "Take a moment to enjoy the good things in life.",
      "Practice gratitude to amplify your joy.",
      "Keep that smile going, it brightens up the world!",
    ],
  },
  {
    id: 2,
    name: "Sad",
    color: "bg-blue-300",
    icon: "😞",
    suggestions: [
      "Take some time for self-care.",
      "Talk to someone you trust about your feelings.",
      "Journaling can help process your emotions.",
      "Do something that relaxes you, like reading or walking.",
      "Consider watching something that makes you laugh.",
      "Practice mindfulness or meditation to find peace.",
    ],
  },
  {
    id: 3,
    name: "Anger",
    color: "bg-red-300",
    icon: "😡",
    suggestions: [
      "Try some deep breathing exercises.",
      "Take a walk to cool off and reset.",
      "Reflect on what triggered your anger and how to address it.",
      "Practice mindfulness or meditation to calm your mind.",
      "Write down your feelings as a form of release.",
      "Engage in a physical activity to release tension.",
    ],
  },
  {
    id: 4,
    name: "Excited",
    color: "bg-green-300",
    icon: "😃",
    suggestions: [
      "Channel your energy into something creative!",
      "Celebrate your excitement with others!",
      "Make a plan to accomplish something you've been wanting to do.",
      "Use your excitement to motivate you to reach your goals.",
      "Find ways to keep your enthusiasm going.",
      "Share your excitement with friends or family!",
    ],
  },
  {
    id: 5,
    name: "Calm",
    color: "bg-indigo-300",
    icon: "😌",
    suggestions: [
      "Enjoy the peace and reflect on your day.",
      "Take time to recharge and relax.",
      "Use this time to engage in a calming activity, like yoga or reading.",
      "Enjoy the moment and focus on your breathing.",
      "Reflect on things you’re grateful for.",
      "Consider taking a nap to refresh your mind.",
    ],
  },
];

const MoodEntry = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const user = getUser();

  const handleMoodSelection = (mood) => {
    const userId = user._id;
    setSelectedMood(mood);

    Swal.fire({
      title: `${mood.name} Mood`,
      html: `
        <p><strong>How are you feeling?</strong></p>
        <textarea 
          id="note" 
          class="swal2-textarea" 
          placeholder="Add a note..." 
          rows="4"></textarea>
      `,
      icon: "info",
      confirmButtonText: "Submit",
      preConfirm: () => {
        const noteValue = document.getElementById("note").value;
        if (!noteValue) {
          Swal.showValidationMessage("Please add a note.");
          return false; // Prevent submission if note is empty
        }
        return noteValue; // Return the note for further processing
      },
      customClass: {
        popup: "bg-[#f7f7f7] p-6 rounded-xl",
        title: "text-2xl font-semibold text-[#C8A2C8]",
        htmlContainer: "text-lg text-gray-700",
        textarea:
          "w-full p-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          mood: mood.name,
          note: result.value,
        };

        // Save mood data to the database
        await AxiosInstance.post(`/moodEntries/${userId}`, data)
          .then((res) => {
            if (res.status === 201) {
              console.log("Mood data saved successfully");
              setIsSubmitted(true); // Set to true after submission
              setNote(result.value); // Save note
              const randomSuggestion =
                mood.suggestions[
                  Math.floor(Math.random() * mood.suggestions.length)
                ];
              setSuggestion(randomSuggestion); // Set random suggestion
              Swal.fire({
                title: "Success!",
                text: "Your mood and note have been submitted successfully.",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                  popup: "bg-[#E0FFEB] p-6 rounded-xl",
                  title: "text-2xl font-semibold text-[#28a745]",
                  htmlContainer: "text-lg text-gray-700",
                },
              });
            }
          })
          .catch((err) => {
            console.error("Error saving mood data", err);
            notifyError("Error saving mood data");
          });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFDAB9] via-[#FFFACD] to-[#B0E0E6] px-8 py-12">
      {/* Only show the suggestion after submission */}
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-6 rounded-xl bg-white shadow-lg">
          <div className="text-4xl mb-4 text-gray-800">
            {selectedMood?.icon}
          </div>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            {selectedMood?.name} Mood
          </h2>
          <div className="text-lg text-center text-gray-600 italic mb-4">
            {note}
          </div>
          <div className="bg-[#f7f7f7] p-6 rounded-xl shadow-lg w-full">
            <p className="text-xl text-gray-800">{suggestion}</p>
          </div>
          <Link to="/mood-dashboard">
            <button className="mt-6 bg-[#B5EAD7] text-[#4A4A4A] px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-[#B0E0E6] transition duration-300">
              View Dashboard
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-[#C8A2C8]">
            Select Your Mood
          </h1>
          <p className="text-lg text-gray-700 mt-4 leading-relaxed">
            Choose a mood that best represents how you're feeling today.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {moodData.map((mood) => (
              <div
                key={mood.id}
                className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg cursor-pointer ${mood.color} hover:scale-105 transition-all duration-200`}
                onClick={() => handleMoodSelection(mood)}
              >
                <div className="text-5xl">{mood.icon}</div>
                <h3 className="mt-2 text-xl font-semibold text-gray-800">
                  {mood.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodEntry;
