import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import AxiosAIInstance from "../../utils/AxiosAIInstance";
import { getUser, getAge } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

const TestAnxiety = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const user = getUser();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    const occupationOptions = [
      "Engineer",
      "Other",
      "Student",
      "Teacher",
      "Unemployed",
    ];

    let occupationEncoding = {
      Occupation_Engineer: 0,
      Occupation_Other: 0,
      Occupation_Student: 0,
      Occupation_Teacher: 0,
      Occupation_Unemployed: 0,
    };

    const selectedOccupation = data.jobRole.value; // Assuming occupation is stored as { value: "student" }
    if (selectedOccupation) {
      const formattedOccupation = `Occupation_${
        selectedOccupation.charAt(0).toUpperCase() + selectedOccupation.slice(1)
      }`;
      if (occupationEncoding.hasOwnProperty(formattedOccupation)) {
        occupationEncoding[formattedOccupation] = 1;
      }
    }
    const dob = user.dob;

    const cleanedData = {
      // Age: getAge(dob),
      Age: 56,
      "Sleep Hours": data.sleepDuration,
      "Physical Activity (hrs/week)": data.exerciseMinutes,
      "Caffeine Intake (mg/day)": data.caffeineIntake,
      "Alcohol Consumption (drinks/week)": data.alcoholIntake,
      Smoking: data.smoking.value,
      "Family History of Anxiety": data.familyAnxiety.value,
      "Stress Level (1-10)": data.stressLevel, // Ensure this is captured from form
      "Heart Rate (bpm during attack)": data.heartRateAnxiety,
      "Breathing Rate (breaths/min)": data.breathingRate,
      "Sweating Level (1-5)": data.sweatingSeverity,
      Dizziness: data.dizziness.value,
      Medication: data.medication.value,
      "Therapy Sessions (per month)": data.therapySessions,
      "Recent Major Life Event": data.lifeEvents.value,
      "Diet Quality (1-10)": data.dietQuality,
      ...occupationEncoding, // Spread the one-hot encoded occupation fields
    };

    AxiosAIInstance.post("/predict", cleanedData).then((response) => {
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
    <div className="flex justify-center items-center min-h-screen mt-14 bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          AI Prediction Anxiety Level
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Job Role */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              1. What's your job role?
            </label>
            <Controller
              name="jobRole"
              control={control}
              rules={{ required: "This is required" }}
              render={({ field }) => (
                <Select {...field} options={jobOptions} className="mt-1" />
              )}
            />
            {errors.jobRole && (
              <p className="text-red-500 text-sm">{errors.jobRole.message}</p>
            )}
          </div>

          {/* Average Sleep Duration */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              2. Average daily sleep duration (hours, 0-24)
            </label>
            <input
              type="number"
              placeholder="Enter a number between 0 and 24"
              step={0.1}
              {...register("sleepDuration", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "The value must be at least 0",
                },
                max: {
                  value: 24,
                  message: "The value must be at most 24",
                },
              })}
              className="border rounded px-3 py-2 mt-1"
              aria-describedby="sleepDurationError"
            />
            {errors.sleepDuration && (
              <p className="text-red-500 text-sm" id="sleepDurationError">
                {errors.sleepDuration.message}
              </p>
            )}
          </div>

          {/* Other Inputs */}
          {[
            {
              label: "3. How many minutes of physical exercise per day?",
              name: "exerciseMinutes",
            },
            {
              label: "4. Daily caffeine intake (milligrams)?",
              name: "caffeineIntake",
            },
            {
              label: "5. How many alcoholic drinks do you consume per week?",
              name: "alcoholIntake",
            },
            {
              label:
                "6. Typical heart rate during anxiety attack? (beats per minute)",
              name: "heartRateAnxiety",
            },
            {
              label:
                "7. Breathing rate during anxiety attack? (breaths per minute)",
              name: "breathingRate",
            },
            {
              label:
                "8. On a scale of 1 to 5, how severe is sweating during an anxiety attack?",
              name: "sweatingSeverity",
            },
            {
              label: "9. Therapy sessions per month?",
              name: "therapySessions",
            },
          ].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="font-medium text-gray-700">{field.label}</label>
              <input
                type="text"
                {...register(field.name, {
                  required: "This field is required",
                })}
                className="border rounded px-3 py-2 mt-1"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Yes/No Questions as React Select Dropdowns */}
          {[
            { label: "10. Do you currently smoke?", name: "smoking" },
            {
              label: "11. Family history of anxiety disorders?",
              name: "familyAnxiety",
            },
            {
              label: "12. Do you experience dizziness during anxiety attacks?",
              name: "dizziness",
            },
            {
              label: "13. Are you taking any medication for anxiety?",
              name: "medication",
            },
            {
              label: "14. Have you experienced any major life events recently?",
              name: "lifeEvents",
            },
          ].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="font-medium text-gray-700">{field.label}</label>
              <Controller
                name={field.name}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select {...field} options={yesNoOptions} className="mt-1" />
                )}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Diet Quality and Stress Level in one row on larger screens */}
          <div className="md:col-span-2 flex flex-col md:flex-row space-y-4 md:space-x-4">
            {/* Diet Quality */}
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-medium text-gray-700">
                15. On a scale of 1 to 10, how would you rate your overall diet
                quality?
              </label>
              <input
                type="number"
                {...register("dietQuality", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "The value must be at least 1",
                  },
                  max: {
                    value: 10,
                    message: "The value must be at most 10",
                  },
                })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                className="border rounded px-3 py-2 mt-1"
              />
              {errors.dietQuality && (
                <p className="text-red-500 text-sm">
                  {errors.dietQuality.message}
                </p>
              )}
            </div>

            {/* Stress Level */}
            <div className="flex flex-col w-full md:w-1/2">
              <label className="font-medium text-gray-700">
                16. On a scale of 1 to 10, how would you rate your current
                stress level?
              </label>
              <input
                type="number"
                className="border rounded px-3 py-2 mt-1"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                {...register("stressLevel", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "The value must be at least 1",
                  },
                  max: {
                    value: 10,
                    message: "The value must be at most 10",
                  },
                })}
              />
              {errors.stressLevel && (
                <p className="text-red-500 text-sm">
                  {errors.stressLevel.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded mt-6 hover:bg-purple-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestAnxiety;
