"use client";

import Sidebar from "./_components/sidebar";
import NotificationBell from "./_components/notification-bell";
import { TopOutlines } from "@/app/_components/outlines";
import { cn } from "@/lib/utils";
import { ToggleSwitch } from "@/app/_components/mode-switch";
import { Affiliates } from "./_components/affiliates";
import { Icon } from "@/lib/icons";

export const Content = () => {
  return (
    <div className="flex h-screen dark:bg-panel-dark/30">
      <Sidebar />
      <div className={cn("flex-1 justify-between flex relative flex-col")}>
        <div className="max-h-[7vh] h-[7vh] flex-col flex justify-center w-full">
          <header className="flex bg-transparent w-full relative z-10 items-center justify-between px-1.5">
            <div className="px-2 flex items-center gap-2">
              <Icon name="chart" className="size-4" />
              <Icon name="chev-up" className="size-4 rotate-90" />
            </div>
            <div className="flex px-1 items-center gap-4">
              <ToggleSwitch />
              <NotificationBell />
            </div>
          </header>
          <div className="absolute w-full z-[100] -top-4 md:right-40 pointer-events-none">
            <TopOutlines />
          </div>
        </div>
        <main className="space-y-2.5">
          <div className="h-[56vh]">
            <div className={cn("h-full m-1.5 grid grid-cols-12 gap-2.5", ``)}>
              <div className="col-span-12 lg:col-span-8">
                <Affiliates />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <MockCard />
              </div>
            </div>
          </div>

          <div className="h-[36vh] pb-1.5">
            <div
              className={cn("h-full m-1.5 mt-0 grid grid-cols-12 gap-2.5", ``)}
            >
              <div className="col-span-12 lg:col-span-8">
                <MockCard />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <MockCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const MockCard = () => {
  return (
    <div
      className={cn(
        "bg-gradient-to-br h-full from-ultra-fade/50 to-super-fade",
        "dark:border-panel rounded-lg rounded-br-[3px] border-[0.33px] border-gray-500",
        "dark:from-neutral-800/30 dark:via-neutral-800/80 dark:to-neutral-800/80",
        "overflow-hidden relative",
      )}
      // className="h-full rounded-lg border-[0.33px] border-gray-400 dark:border-hot-dark bg-gradient-to-r from-ultra-fade to-ultra-fade dark:from-hot-dark/20 dark:to-hot-dark/20"
    />
  );
};
