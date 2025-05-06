"use client";

import { auth } from "@/lib/firebase";
import { useMemo, type ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "./_components/sidebar";
import { cn } from "@/lib/utils";
import { TopOutlines } from "@/app/_components/outlines";
import { Loader } from "./_components/loader";
import { IconButton } from "./_components/icon-button";

interface Props {
  signin: ReactNode;
  overview: ReactNode;
}

const DashboardLayout = ({ signin, overview }: Props) => {
  const [user, loading] = useAuthState(auth);

  const Header = useMemo(
    () => (
      <div className="max-h-[7vh] h-[7vh] py-1.5 lg:py-0 flex-col flex justify-center w-full">
        <header className="flex bg-transparent w-full relative z-10 items-center justify-between px-0.5">
          <div className="px-4 flex items-center gap-2">
            <IconButton
              icon={user ? "siderbar-bold-duotone" : "lock"}
              className={cn("bg-transparent")}
              iconStyle={cn("text-neutral-400", { "": user })}
            />
          </div>
          <div className="flex px-1 items-center gap-4">
            <IconButton icon="question-circle-duotone" />
          </div>
        </header>
        <div className="absolute w-full z-[100] -top-4 md:right-40 pointer-events-none">
          <TopOutlines />
        </div>
      </div>
    ),
    [user],
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="flex h-screen dark:bg-panel-dark/30">
      <Sidebar user={user ?? undefined} />
      <div className={cn("flex-1 justify-between flex relative flex-col")}>
        {Header}
        {user ? overview : signin}
      </div>
    </div>
  );
};
export default DashboardLayout;
