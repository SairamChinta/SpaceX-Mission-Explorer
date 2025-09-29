"use client";

import { useMissionStore } from "../store/missionStore";
import Notification from "./Notification";

export default function NotificationController() {
  const notification = useMissionStore((state) => state.notification);
  const hideNotification = useMissionStore((state) => state.hideNotification);
 
  if (!notification) {
    return null;
  }

  return (
    <Notification
      message={notification.message}
      type={notification.type}
      onClose={hideNotification}
    />
  );
}