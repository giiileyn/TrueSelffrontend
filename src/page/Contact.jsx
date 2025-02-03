import React from "react";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "../../utils/AxiosInstance";
import { notifyError, notifySuccess } from "../../utils/helpers";

const Contact = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await AxiosInstance.post("/contacts", data).then((response) => {
        if (response.status === 201) {
          reset();
          notifySuccess("Message sent successfully!");
        }
      });
    } catch (error) {
      notifyError("Something went wrong! Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative Shapes */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-500 rounded-full opacity-50 z-10"></div>
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-yellow-500 rounded-full opacity-30 z-10"></div>
      <div className="absolute bottom-0 right-1/12 w-72 h-76 bg-indigo-500 rounded-full opacity-40 z-10"></div>

      {/* Form Container */}
      <div className="max-w-xl mt-16 w-full p-6 bg-white rounded-lg shadow-lg relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mt-2 text-sm">
            We'd love to hear from you! Please reach out with any questions.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 text-sm">Name</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Your Name"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1B1D3]"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-left ml-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 text-sm">Email</label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Your Email"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D1B1D3]"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-left ml-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 text-sm">Phone Number</label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Your Phone Number"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1B1D3]"
                  maxLength={11}
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-left ml-2">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 text-sm">Subject</label>
            <Controller
              name="subject"
              control={control}
              rules={{ required: "Subject is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Subject"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1B1D3]"
                />
              )}
            />
            {errors.subject && (
              <p className="text-red-500 text-left ml-2">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 text-sm">Message</label>
            <Controller
              name="message"
              control={control}
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Your Message"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D1B1D3] h-24"
                ></textarea>
              )}
            />
            {errors.message && (
              <p className="text-red-500 text-left ml-2">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 border-2 border-purple-500 text-purple-500 font-semibold rounded-md hover:bg-purple-500 hover:text-white transition focus:outline-none"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
