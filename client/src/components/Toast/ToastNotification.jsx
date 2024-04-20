import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  return <ToastContainer position="bottom-right" />;
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default ToastNotification;
