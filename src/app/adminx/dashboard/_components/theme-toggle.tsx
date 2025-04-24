"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2d3748]"
    >
      {isDark ? <Moon className="h-4 w-4 text-yellow-300" /> : <Sun className="h-4 w-4 text-yellow-300" />}
    </button>
  )
}
