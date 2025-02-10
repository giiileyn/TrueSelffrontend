import { toast } from "react-toastify";

export const sexualOrientationOptions = [
  { value: "Lesbian", label: "Lesbian" },
  { value: "Gay", label: "Gay" },
  { value: "Bisexual", label: "Bisexual" },
  { value: "Pansexual", label: "Pansexual" },
  { value: "Asexual", label: "Asexual" },
  { value: "Aromantic", label: "Aromantic" },
  { value: "Demisexual", label: "Demisexual" },
  { value: "Demiromantic", label: "Demiromantic" },
  { value: "Heterosexual", label: "Heterosexual" },
  { value: "Homosexual", label: "Homosexual" },
  { value: "Queer", label: "Queer" },
  { value: "Questioning", label: "Questioning" },
  { value: "Polysexual", label: "Polysexual" },
  { value: "Androsexual", label: "Androsexual" },
  { value: "Gynosexual", label: "Gynosexual" },
  { value: "Skoliosexual", label: "Skoliosexual" },
  { value: "Omnisexual", label: "Omnisexual" },
  { value: "Graysexual", label: "Graysexual" },
  { value: "Grayromantic", label: "Grayromantic" },
  { value: "Allosexual", label: "Allosexual" },
];

export const genderIdentityOptions = [
  { value: "Cisgender", label: "Cisgender" },
  { value: "Transgender", label: "Transgender" },
  { value: "Nonbinary", label: "Nonbinary" },
  { value: "Genderqueer", label: "Genderqueer" },
  { value: "Agender", label: "Agender" },
  { value: "Bigender", label: "Bigender" },
  { value: "Demiboy", label: "Demiboy" },
  { value: "Demigirl", label: "Demigirl" },
  { value: "Two-spirit", label: "Two-spirit" },
  { value: "Androgynous", label: "Androgynous" },
  { value: "Pangender", label: "Pangender" },
  { value: "Xenogender", label: "Xenogender" },
  { value: "Questioning", label: "Questioning" },
  { value: "Third Gender", label: "Third Gender" },
  { value: "Intersex", label: "Intersex" },
];

export const pronounsOptions = [
  { value: "He/Him/His", label: "He/Him/His" },
  { value: "She/Her/Hers", label: "She/Her/Hers" },
  { value: "They/Them/Theirs", label: "They/Them/Theirs" },
  { value: "Ze/Zir/Zirs", label: "Ze/Zir/Zirs" },
  { value: "Xe/Xem/Xyrs", label: "Xe/Xem/Xyrs" },
  { value: "Ve/Vir/Vis", label: "Ve/Vir/Vis" },
  { value: "E/Em/Eirs", label: "E/Em/Eirs" },
  { value: "Ey/Em/Eir", label: "Ey/Em/Eir (Spivak Pronouns)" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

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

export const getAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
