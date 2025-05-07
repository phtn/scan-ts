import Link from "next/link";
import { Icon, IconName } from "@/lib/icons";
import { User } from "firebase/auth";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { HyperList } from "@/ui/hyper-list";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LilSwitch } from "./ui/switch";

interface INav {
  id: string;
  icon: IconName;
  label: string;
  href?: string;
}

interface SidebarProps {
  user: User | undefined;
}
export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const path = pathname.split("/")[3];
  const navs = useMemo(
    () =>
      [
        {
          id: "overview",
          label: "Overview",
          icon: "chart",
        },
        {
          id: "affiliates",
          label: "Affiliates",
          icon: "user-rounded",
          href: "affiliates",
        },
        {
          id: "scans",
          label: "Scans",
          icon: "object-scan-linear",
          href: "scans",
        },
        {
          id: "settings",
          label: "Settings",
          icon: "settings",
          href: "settings",
        },
      ] as INav[],
    [],
  );

  const NavItem = useCallback(
    ({ icon, label, href }: INav) => {
      return (
        <Link
          href={`/adminx/dashboard/${href ?? ""}`}
          className={cn(
            "flex items-center w-full lg:gap-3 lg:p-3 px-0.5 py-1.5 justify-center lg:justify-start dark:text-white rounded-lg text-panel",
            { " lg:bg-gray-300/40 dark:bg-gray-300/30": path === href },
          )}
        >
          <Icon
            name={icon}
            size={20}
            className={cn("", {
              "text-teal-600 dark:text-teal-300": path === href,
            })}
          />
          <span className="text-sm hidden lg:flex">{label}</span>
        </Link>
      );
    },
    [path],
  );

  return (
    <div className="lg:w-56 w-12 bg-gradient-to-b dark:from-hot-dark/20 dark:to-zark/20 overflow-hidden flex flex-col h-full relative">
      {/* Add subtle orange glow effect */}
      <div className="absolute top-40 left-10 size-20 bg-orange-100/10 rounded-full blur-3xl opacity-30"></div>

      <div className="ps-1.5 py-1.5 font-dm h-[7vh] overflow-hidden">
        <div className="lg:hidden text-3xl font-dm">
          <span className="font-extrabold tracking-tighter">B</span>d
        </div>
        <div className="lg:flex hidden items-center leading-none justify-start rounded-md border-[0.0px] dark:border-hot-dark border-gray-400 ps-3 h-full">
          <span className="font-medium opacity-70 dark:text-ultra-fade text-lg tracking-tighter">
            <span className="font-extrabold -tracking-widest">BestDeal</span>
          </span>
          <span className="tracking-tight text-xs font-bold px-4 font-sans text-indigo-500 dark:text-indigo-300">
            ADMIN
          </span>
        </div>
      </div>

      <nav className="flex-1 py-0.5 px-1.5 font-dm tracking-tight font-medium">
        <HyperList
          container="space-y-4 lg:px-2"
          data={user ? navs : []}
          component={NavItem}
          itemStyle="hover:bg-slate-100 rounded-lg dark:hover:bg-zinc-800"
        />
      </nav>
      <div className="flex lg:p-4 w-12 lg:w-full items-center justify-center lg:justify-start pb-4 lg:h-44">
        <div className="lg:space-y-6 flex flex-col items-start space-y-6">
          <div className="flex items-center w-12 lg:w-full justify-center lg:space-x-5">
            <LilSwitch />
            <div className="text-xs lg:flex hidden font-quick">light</div>
          </div>
          <Link
            href={"/adminx/dashboard/profile"}
            className="flex items-center justify-center w-12 lg:w-full lg:justify-start lg:space-x-4"
          >
            <div>
              <Image
                src={user?.photoURL ?? "/svg/qr.svg"}
                alt="User Avatar"
                width={28}
                height={28}
                className={cn("rounded-full border-2", { hidden: !user })}
              />
            </div>
            <div className="font-quick text-xs whitespace-nowrap lg:flex hidden">
              {user?.displayName}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
