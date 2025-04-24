"use client"

import { Bell } from "lucide-react"

export default function NotificationBell() {
  return (
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2d3748] relative">
      <Bell className="h-4 w-4 text-gray-300" />
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
  )
}
