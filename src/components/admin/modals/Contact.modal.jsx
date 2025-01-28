import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../../../utils/helpers";
import AxiosInstance from "../../../../utils/AxiosInstance";

const Contact = ({ onClose, contactToEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    if (contactToEdit) {
      reset({
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        subject: contactToEdit.subject,
        body: contactToEdit.body,
        status: contactToEdit.status,
      });

      const selectedStatus = options.find(
        (option) => option.value === contactToEdit.status
      );
      setValue("status", selectedStatus); // Set initial value for status
    }
  }, [contactToEdit, reset, setValue]);

  const onSubmit = async (data) => {
    const url = `/contacts/${contactToEdit._id}`;
    const method = "PUT";

    try {
      const response = await AxiosInstance({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });

      if (response.status === 200 || response.status === 201) {
        notifySuccess("Contact updated successfully");
        onClose();
      } else {
        notifyError("Failed to update contact");
        console.error("Failed to update contact", response.statusText);
      }
    } catch (err) {
      notifyError("Error updating contact");
      console.error("Error updating contact", err);
    }
  };

  const options = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ];

  const selectedStatus = watch("status");

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        borderRadius: "8px",
        width: "500px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Edit Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <input
            type="text"
            readOnly
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            {...register("name")}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            readOnly
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            {...register("email")}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Phone Number</label>
          <input
            type="text"
            readOnly
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            {...register("phone")}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Subject</label>
          <input
            type="text"
            readOnly
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            {...register("subject")}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Message</label>
          <textarea
            readOnly
            rows="4"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            {...register("body")}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Status</label>
          <select
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            value={selectedStatus ? selectedStatus.value : ""}
            onChange={(event) =>
              setValue(
                "status",
                options.find((option) => option.value === event.target.value)
              )
            }
          >
            <option value="" disabled>
              Select Status
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <p style={{ color: "red", marginTop: "5px" }}>
              Please select a status
            </p>
          )}
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
