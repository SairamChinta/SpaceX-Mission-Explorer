"use client";

import { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyle = "fixed top-5 right-5 p-4 rounded-md shadow-lg text-white z-50";
  const typeStyle = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div className={`${baseStyle} ${typeStyle}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold">
        &times;
      </button>
    </div>
  );
}