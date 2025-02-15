import React, { useState, useEffect, use } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import {
  IconButton,
  Modal,
  Box,
  Slider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser, notifyError, notifySuccess } from "../../utils/helpers";
import { useForm } from "react-hook-form";
import { modules } from "../../configs/ReactQuill.config";
import AxiosInstance from "../../utils/AxiosInstance";
import JournalCard from "../components/user/JournalEntryCard";
import Swal from "sweetalert2";

const images = [
  "/page/journal/1.jpg",
  "/page/journal/2.jpg",
  "/page/journal/3.jpg",
  "/page/journal/4.jpg",
  "/page/journal/5.jpg",
  "/page/journal/6.jpg",
  "/page/journal/7.jpg",
  "/page/journal/8.jpg",
  "/page/journal/9.jpg",
  "/page/journal/10.jpg",
];

const moodData = [
  {
    id: 1,
    name: "Neutral",
    color: "bg-gray-400",
    icon: "/moods/neutral.png",
    suggestions: [
      "Enjoy the present moment and take a deep breath.",
      "Take some time to relax, maybe listen to calming music.",
      "Engage in a simple, calming activity like stretching or journaling.",
      "Reflect on things you're grateful for or things you've accomplished.",
      "Embrace the peace, focus on being in the here and now.",
      "Spend some time outdoors to recharge your energy.",
    ],
  },
  {
    id: 2,
    name: "Happy",
    color: "bg-yellow-400",
    icon: "/moods/smiley.png",
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
    id: 3,
    name: "Anxious",
    color: "bg-teal-400",
    icon: "/moods/anxious.png",
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
    id: 4,
    name: "Sad",
    color: "bg-blue-400",
    icon: "/moods/sad.png",
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
    id: 5,
    name: "Angry",
    color: "bg-red-400",
    icon: "/moods/angry.png",
    suggestions: [
      "Try some deep breathing exercises.",
      "Take a walk to cool off and reset.",
      "Reflect on what triggered your anger and how to address it.",
      "Practice mindfulness or meditation to calm your mind.",
      "Write down your feelings as a form of release.",
      "Engage in a physical activity to release tension.",
    ],
  },
];

const Diary = () => {
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    sessionStorage.getItem("selectedImage") || images[0]
  );
  const [journalEntries, setJournalEntries] = useState([]);

  const user = getUser();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { title: "", journalEntry: "" },
  });
  const journalEntry = watch("journalEntry");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("http://api.quotable.io/random");
        const data = await response.json();
        setQuote(data);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    fetchQuote();
  }, []);

  const handleSelectImage = (img) => {
    setSelectedImage(img);
    sessionStorage.setItem("selectedImage", img);
    setOpen(false);
  };

  const handleJournalChange = (content) => {
    setValue("journalEntry", content, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const userId = user._id;
    const cleanedData = {
      userId,
      title: data.title,
      content: data.journalEntry,
    };
    console.log(cleanedData);
    await AxiosInstance.post(`/journalEntries/${userId}`, cleanedData).then(
      (response) => {
        console.log(response.data);
        if (response.status === 201) {
          notifySuccess("Journal entry saved successfully");
          getAllJournalEntry();
        } else {
          console.error("Error saving journal entry:", response.data.message);
          notifyError("Error saving journal entry");
        }
      }
    );
  };
  const handleDelete = async (id) => {
    console.log("Delete journal entry with id:", id);
    const result = await Swal.fire({
      title: "Do you want to delete this journal entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        await AxiosInstance.delete(`/journalEntries/${id}`).then((res) => {
          if (res.status === 200) {
            notifySuccess("Journal entry deleted successfully");
            getAllJournalEntry();
          } else {
            console.error("Error deleting journal entry:", res.data.message);
            notifyError("Error deleting journal entry");
          }
        });
      } catch (error) {
        console.error("Error deleting journal entry:", error);
        notifyError("Error deleting journal entry");
      }
    }
  };

  const getAllJournalEntry = async () => {
    const userId = user._id;
    await AxiosInstance.get(`/journalEntries/${userId}`).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        setJournalEntries(response.data.data);
      } else {
        console.error("Error saving journal entry:", response.data.message);
        notifyError("Error saving journal entry");
      }
    });
  };

  useEffect(() => {
    getAllJournalEntry();
  }, []);

  return (
    <div className="my-10">
      <div className="flex justify-center items-center">
        <h1 className="font-semibold text-3xl">Digital Journal</h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 my-10">
        <div className="relative">
          <img
            src={selectedImage}
            alt="Journal Illustration"
            className="w-60 h-60 rounded-full shadow-lg"
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 40,
              left: 180,
              backgroundColor: "white",
              boxShadow: 3,
            }}
            onClick={() => setOpen(true)}
          >
            <EditIcon fontSize="medium" />
          </IconButton>
        </div>

        <div className="text-center mt-8 px-6">
          {quote ? (
            <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
              <p className="text-xl font-semibold">"{quote.content}"</p>
              <p className="mt-2 text-gray-600">- {quote.author}</p>
            </div>
          ) : (
            <p className="text-gray-500">Loading quote...</p>
          )}
        </div>
        <div className="text-center">
          <p className="text-xl font-medium bg-gray-100 p-3 rounded-lg shadow">
            {time.toDateString()}
          </p>
          <Clock className="mt-4  p-2 rounded-lg" value={time} />
        </div>
      </div>

      {/* Create journal */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 p-6  ">
          <h2 className="text-2xl font-bold mb-4">Journal Entry</h2>

          {/* Title Input */}
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Enter journal title"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          {/* Rich Text Editor */}
          <ReactQuill
            theme="snow"
            value={journalEntry}
            onChange={handleJournalChange}
            modules={modules}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Entry
          </button>
        </form>
      </div>

      {/* List of journals */}
      <div className="my-5">
        <h3 className="text-lg font-semibold">Journal Entries</h3>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {journalEntries.map((entry) => (
            <JournalCard
              key={entry._id}
              id={entry._id}
              title={entry.title}
              content={entry.content} // HTML content from ReactQuill
              createdAt={entry.createdAt}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* <ul className="mt-2">
        {journalEntries.map((entry, index) => (
          <li key={index} className="p-2 border-b">{entry}</li>
        ))}
      </ul> */}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: { xs: "80%", md: "50%", lg: "40%" },
          }}
        >
          <h2 className="text-2xl font-bold mb-4">Select an Image</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                className="w-24 h-24 rounded-lg cursor-pointer hover:opacity-80"
                onClick={() => handleSelectImage(img)}
              />
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Diary;
