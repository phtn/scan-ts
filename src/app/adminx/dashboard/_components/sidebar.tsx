import Link from "next/link";
import { Icon } from "@/lib/icons";
import { ToggleSwitch } from "@/app/_components/mode-switch";
import { User } from "firebase/auth";
import Image from "next/image";

interface SidebarProps {
  user: User | undefined;
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <div className="lg:w-56 w-10 bg-gradient-to-b dark:from-hot-dark/20 dark:to-zark/20 overflow-hidden flex flex-col h-full relative">
      {/* Add subtle orange glow effect */}
      <div className="absolute top-40 left-10 size-20 bg-orange-100/10 rounded-full blur-3xl opacity-30"></div>

      <div className="ps-1.5 py-1.5 font-dm h-[7vh] overflow-hidden">
        <div className="lg:hidden text-3xl font-dm">
          <span className="font-extrabold tracking-tighter">B</span>d
        </div>
        <div className="lg:flex hidden items-center leading-none justify-start rounded-md border-[0.0px] dark:border-hot-dark border-gray-400 ps-3 h-full">
          <span className="font-medium opacity-70 dark:text-ultra-fade text-sm tracking-tighter">
            <span className="font-extrabold -tracking-widest">BestDeal</span>
            <span className="dark:opacity-60 ml-1">Insurance</span>
          </span>
          <span className="tracking-tight text-xs font-bold px-4 font-sans text-indigo-500 dark:text-indigo-300">
            ADMIN
          </span>
        </div>
      </div>

      <nav className="flex-1 py-0.5 ps-1.5 font-dm tracking-tight font-medium">
        <ul className="space-y-2 lg:px-2">
          <li>
            <Link
              href="#"
              className="flex items-center lg:gap-3 lg:p-3 px-0.5 py-1.5 justify-center lg:justify-start dark:text-white rounded-lg lg:bg-gray-300/40 dark:bg-gray-300/30 text-panel"
            >
              <Icon
                name="chart"
                size={20}
                className="text-teal-600 dark:text-teal-300"
              />
              <span className="text-sm hidden lg:flex">Overview</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 lg:p-3 p-2 justify-center lg:justify-start dark:text-white/60 rounded-lg lg:bg-gray-300/0 text-panel"
            >
              <Icon name="file" size={20} />
              <span className="text-sm lg:flex hidden">Reports</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex lg:p-4 items-center justify-center pb-4 lg:h-44">
        <div className="lg:space-y-6 space-y-3">
          <div className="flex items-center lg:space-x-5">
            <ToggleSwitch />
            <div className="text-xs lg:flex hidden font-quick">Light</div>
          </div>
          <div className="flex items-center justify-center lg:justify-start lg:space-x-5">
            <div>
              <Image
                src={user?.photoURL ?? "/svg/qr.svg"}
                alt="User Avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
            </div>
            <div className="font-quick text-xs lg:flex hidden">
              {user?.displayName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
