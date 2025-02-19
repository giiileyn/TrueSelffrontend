import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Axios from "axios";
import AxiosAIInstance from "../../utils/AxiosAIInstance";
import { getUser, getAge } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const API_KEY = "sk_857c2037241508de1a5690663df2171009e2662d14e06844";
const VOICE_ID = "Xb7hH8MSUJpSbSDYk0k2";

const jobOptions = [
  { value: "student", label: "Student" },
  { value: "engineer", label: "Engineer" },
  { value: "teacher", label: "Teacher" },
  { value: "unemployed", label: "Unemployed" },
  { value: "other", label: "Other" },
];

const yesNoOptions = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

const scale1to5Options = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

const scale1to10Options = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString(),
}));

const questions = [
  {
    key: "jobRole",
    label: "1. What's your occupation?",
    type: "select",
    options: jobOptions,
  },
  {
    key: "sleepDuration",
    label: "2. How many hours do you sleep per day?",
    type: "number",
  },
  {
    key: "exerciseMinutes",
    label: "3. How many minutes do you exercise per week?",
    type: "number",
  },
  {
    key: "caffeineIntake",
    label: "4. What is your daily caffeine intake (milligram)?",
    type: "number",
  },
  {
    key: "alcoholIntake",
    label: "5. How many alcoholic drinks do you consume per week?",
    type: "number",
  },
  {
    key: "heartRateAnxiety",
    label: "6. Typical heart rate during anxiety attack? (beats per minute)",
    type: "number",
  },
  {
    key: "breathingRate",
    label:
      "7. Breathing rate during anxiety attack? (Breaths per Minute - BPM)",
    type: "number",
  },
  {
    key: "sweatingSeverity",
    label:
      "8. On a scale of 1 to 5, how severe is sweating during an anxiety attack? (Subjective scale)",
    type: "select",
    options: scale1to5Options,
  },
  {
    key: "therapySessions",
    label: "9. Therapy sessions per month? (Sessions/Month)",
    type: "number",
  },
  {
    key: "smoking",
    label: "10. Do you currently smoke? (Yes or No)",
    type: "select",
    options: yesNoOptions,
  },
  {
    key: "familyAnxiety",
    label: "11. Family history of anxiety disorders? (Yes or No)",
    type: "select",
    options: yesNoOptions,
  },
  {
    key: "dizziness",
    label: "12. Do you experience dizziness during anxiety attacks?",
    type: "select",
    options: yesNoOptions,
  },
  {
    key: "medication",
    label: "13. Are you taking any medication for anxiety?",
    type: "select",
    options: yesNoOptions,
  },
  {
    key: "lifeEvents",
    label: "14. Have you experienced any major life events recently?",
    type: "select",
    options: yesNoOptions,
  },
  {
    key: "dietQuality",
    label: "15. On a scale of 1 to 10, how would you rate your overall diet?",
    type: "select",
    options: scale1to10Options,
  },
  {
    key: "stressLevel",
    label:
      "16. On a scale of 1 to 10, how would you rate your current stress level?",
    type: "select",
    options: scale1to10Options,
  },
];

const TestAnxiety = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [audioPlayed, setAudioPlayed] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const [progress, setProgress] = useState(0);
  const user = getUser();
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const speakQuestion = async (text) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause(); // Stop previous audio
        audioRef.current.currentTime = 0; // Reset playback position
      }

      const response = await Axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          text,
          voice_settings: { stability: 0.5, similarity_boost: 0.5 },
        },
        {
          headers: {
            "xi-api-key": API_KEY,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioURL = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioURL);
      audioRef.current = audio; // Store new audio in ref

      const playAudio = () => {
        audio.play();
        setAudioPlayed(true);
      };

      if (!audioPlayed) {
        document.body.addEventListener("click", playAudio, { once: true });
      } else {
        playAudio();
      }
    } catch (error) {
      console.error("TTS error:", error);
    }
  };

  useEffect(() => {
    if (currentQuestion) {
      speakQuestion(currentQuestion.label);
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    }
  }, [currentQuestionIndex]);

  const handleNext = (data) => {
    setAnswers({
      ...answers,
      [currentQuestion.key]: data[currentQuestion.key],
    });
    setValue(currentQuestion.key, "");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log(answers);

      let occupationEncoding = {
        Occupation_Engineer: 0,
        Occupation_Other: 0,
        Occupation_Student: 0,
        Occupation_Teacher: 0,
        Occupation_Unemployed: 0,
      };

      const selectedOccupation = data.jobRole.value;
      if (selectedOccupation) {
        const formattedOccupation = `Occupation_${
          selectedOccupation.charAt(0).toUpperCase() +
          selectedOccupation.slice(1)
        }`;
        if (occupationEncoding.hasOwnProperty(formattedOccupation)) {
          occupationEncoding[formattedOccupation] = 1;
        }
      }

      const dob = user.dob;

      const cleanedData = {
        Age: getAge(dob),
        "Sleep Hours": answers.sleepDuration,
        "Physical Activity (hrs/week)": answers.exerciseMinutes,
        "Caffeine Intake (mg/day)": answers.caffeineIntake,
        "Alcohol Consumption (drinks/week)": answers.alcoholIntake,
        Smoking: answers.smoking.value,
        "Family History of Anxiety": answers.familyAnxiety.value,
        "Stress Level (1-10)": answers.stressLevel.value,
        "Heart Rate (bpm during attack)": answers.heartRateAnxiety,
        "Breathing Rate (breaths/min)": answers.breathingRate,
        "Sweating Level (1-5)": answers.sweatingSeverity.value,
        Dizziness: answers.dizziness.value,
        Medication: answers.medication.value,
        "Therapy Sessions (per month)": answers.therapySessions,
        "Recent Major Life Event": answers.lifeEvents.value,
        "Diet Quality (1-10)": answers.dietQuality.value,
        ...occupationEncoding,
      };

      console.log(cleanedData);
      submitData(cleanedData);
    }
  };

  const submitData = async (data) => {
    const userId = user._id;
    await AxiosAIInstance.post(`/predict/${userId}`, data).then((response) => {
      console.log(response.data);
      const severity = Math.round(response.data.predicted_severity);
      if (severity > 5) {
        navigate("/recommend");
      } else {
        Swal.fire({
          title: "Manage Mild Anxiety",
          html: `
            <p>Your anxiety level is: <strong>${severity}</strong></p>
            <p style="margin-bottom: 15px" >Try these techniques to manage mild anxiety:</p>
            <ul style="text-align: left;">
              <li>- Practice mindfulness (e.g., meditation, deep breathing)</li>
              <li>- Engage in physical activity</li>
              <li>- Maintain a balanced diet and get enough sleep</li>
              <li>- Limit caffeine and alcohol</li>
              <li>- Connect with loved ones for support</li>
              <li>- Enjoy hobbies to relax</li>
            </ul>
            <p>If anxiety persists, consider seeking professional help.</p>
          `,
          icon: "info",
          confirmButtonText: "Got it!",
        });
      }
    });
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-white p-6">
      <form
        onSubmit={handleSubmit(handleNext)}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-xl transition-all duration-300 hover:shadow-lg"
      >
        <progress
          className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
          value={progress}
          max="100"
        ></progress>
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          AI Anxiety Test
        </h2>

        {/* Question Field */}
        <div className="flex flex-col mb-4">
          <label className="text-lg font-semibold text-gray-700 mb-2">
            {currentQuestion.label}
          </label>

          {/* Select Field */}
          {currentQuestion.type === "select" ? (
            <div>
              <Controller
                name={currentQuestion.key}
                rules={{ required: "This field is required" }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={currentQuestion.options}
                    className="mt-1"
                  />
                )}
              />
              {errors[currentQuestion.key] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[currentQuestion.key].message}
                </p>
              )}
            </div>
          ) : (
            // Input Field
            <div>
              <input
                type={currentQuestion.type}
                {...register(currentQuestion.key, {
                  required: "This field is required",
                })}
                className="border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              />
              {errors[currentQuestion.key] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[currentQuestion.key].message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg mt-6 text-lg font-semibold hover:bg-purple-700 transition-all duration-200"
        >
          {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </form>
    </div>
  );
};

export default TestAnxiety;
