import Link from "next/link";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Clock,
  BarChart3,
  CreditCard,
  Bell,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="md:w-60 w-12 bg-gradient-to-b dark:from-hot-dark dark:to-panel overflow-hidden flex flex-col h-full relative">
      {/* Add subtle orange glow effect */}
      <div className="absolute top-40 left-10 size-20 bg-orange-100/10 rounded-full blur-3xl opacity-30"></div>

      <div className="p-1.5 font-dm h-[7vh] overflow-hidden ">
        <div className="flex items-start leading-none flex-col justify-center rounded-lg ps-3 h-full">
          <div>
            <span className="font-medium dark:text-ultra-fade text-xs tracking-tighter opacity-70">
              <span className="">BestDeal</span>
              <span className="dark:opacity-60 ml-1">Insurance</span>
            </span>
          </div>
          <div>
            <span className="tracking-tight text-sm font-bold font-sans dark:text-indigo-400 text-indigo-400">
              ADMIN
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-2 font-quick tracking-tight font-medium">
        <ul className="space-y-1 px-2">
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-600 text-white"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md opacity-70 hover:bg-[#2d3748] hover:text-white transition-colors"
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
  );
}
