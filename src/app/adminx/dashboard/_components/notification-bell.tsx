"use client";

import { Bell } from "lucide-react";

export default function NotificationBell() {
  return (
    <button className="size-10 flex items-center justify-center rounded-xl bg-panel relative">
      <Bell className="size-5 text-gray-300" />
      <span className="absolute top-0 right-0 border-hot-dark border-2 size-3 bg-red-400 rounded-full"></span>
    </button>
  );
}
