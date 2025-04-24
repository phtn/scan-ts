import Link from "next/link"
import { LayoutDashboard, ArrowLeftRight, Clock, BarChart3, CreditCard, Bell, Settings } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-60 bg-gradient-to-b from-[#1a2234] to-[#111827] flex flex-col h-full relative">
      {/* Add subtle orange glow effect */}
      <div className="absolute top-40 left-10 w-20 h-20 bg-orange-500/10 rounded-full blur-3xl opacity-30"></div>

      <div className="p-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded"></div>
          <span className="text-xl font-bold">Fundly</span>
        </div>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          <li>
            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#2d3748] text-white">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-[#2d3748] hover:text-white transition-colors"
            >
              <ArrowLeftRight size={20} />
              <span>Transactions</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-[#2d3748] hover:text-white transition-colors"
            >
              <Clock size={20} />
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-[#2d3748] hover:text-white transition-colors"
            >
              <BarChart3 size={20} />
              <span>Exchange</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-[#2d3748] hover:text-white transition-colors"
            >
              <CreditCard size={20} />
              <span>Payments</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-[#2d3748] hover:text-white transition-colors"
            >
              <Bell size={20} />
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:bg-[#2d3748] hover:text-white transition-colors"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
