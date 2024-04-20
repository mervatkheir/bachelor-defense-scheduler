import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// This component wraps the ToastContainer provided by react-toastify
const ToastNotification = () => {
  return <ToastContainer position="bottom-right" />;
};

// Custom functions to show toast messages
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
