import Link from "next/link";
import { Icon } from "@/lib/icons";

export default function Sidebar() {
  return (
    <div className="md:w-60 w-12 bg-gradient-to-b dark:from-hot-dark/20 dark:to-panel/40 overflow-hidden flex flex-col h-full relative">
      {/* Add subtle orange glow effect */}
      <div className="absolute top-40 left-10 size-20 bg-orange-100/10 rounded-full blur-3xl opacity-30"></div>

      <div className="ps-1.5 py-1.5 font-dm h-[7vh] overflow-hidden ">
        <div className="flex items-center leading-none justify-start rounded-md border-[0.0px] dark:border-hot-dark border-gray-400 ps-3 h-full">
          <span className="font-medium opacity-70 dark:text-ultra-fade text-sm tracking-tighter">
            <span className="">BestDeal</span>
            <span className="dark:opacity-60 ml-1">Insurance</span>
          </span>
          <span className="tracking-tight text-xs font-bold px-4 font-sans text-blue-400">
            ADMIN
          </span>
        </div>
      </div>

      <nav className="flex-1 py-0.5 ps-1.5 font-quick tracking-tight font-medium">
        <ul className="space-y-2 px-2">
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 p-3 dark:text-white rounded-lg bg-gray-300 dark:bg-gray-300/40 text-hot-dark"
            >
              <Icon name="chart" size={20} />
              <span className="text-sm">Overview</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md opacity-80 hover:bg-hot-dark dark:hover:bg-ultra-fade/10 hover:text-white transition-colors"
            >
              <Icon name="file" size={20} />
              <span className="text-sm">Reports</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
