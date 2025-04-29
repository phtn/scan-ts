"use client";

import Sidebar from "./_components/sidebar";
import NotificationBell from "./_components/notification-bell";
import { TopOutlines } from "@/app/_components/outlines";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/app/_components/mode-switch";
import { Affiliates } from "./_components/affiliates";

export const Content = () => {
  return (
    <div className="flex h-screen dark:bg-panel-dark/30">
      <Sidebar />
      <div className={cn("flex-1 justify-between flex relative flex-col")}>
        <div className="h-[7vh] flex-col flex justify-center w-full">
          <header className="flex bg-transparent w-full relative z-10 items-center justify-between px-1.5">
            <div className="px-5">Overview</div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <NotificationBell />
            </div>
          </header>
          <div className="absolute w-full z-[100] -top-4 md:right-40 pointer-events-none">
            <TopOutlines />
          </div>
        </div>
        <main className="space-y-1.5">
          <div className="h-[42vh] flex-1">
            <div className={cn("h-full m-1.5 grid grid-cols-12 gap-1.5", ``)}>
              <div className="col-span-12 lg:col-span-8">
                <Affiliates />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <MockCard />
              </div>
            </div>
          </div>

          <div className="h-[50vh] flex-1">
            <div
              className={cn("h-full m-1.5 mt-0 grid grid-cols-12 gap-1.5", ``)}
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
    <div className="h-full rounded-lg border dark:border-hot-dark bg-gradient-to-r from-ultra-fade to-ultra-fade dark:from-hot-dark/20 dark:to-hot-dark/20" />
  );
};
