import { toast } from "react-toastify";

export const authenticate = (data, next) => {
  if (window !== "undefined") {
    sessionStorage.setItem("token", JSON.stringify(data.token));
    sessionStorage.setItem("user", JSON.stringify(data.user));
  }
  next();
};

export const getUser = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

export const setUser = (data) => {
  if (window !== "undefined") {
    sessionStorage.setItem("user", JSON.stringify(data.user));
  }
};

export const logout = (next) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
  next();
};

export const notifySuccess = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

// Notify error message using Toastify
export const notifyError = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
