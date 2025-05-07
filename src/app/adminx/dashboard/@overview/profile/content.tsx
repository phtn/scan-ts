"use client";

import { useAuth } from "@/app/_ctx/auth";
import { useCallback } from "react";

export const Content = () => {
  const { logout } = useAuth();
  const handleSignOut = useCallback(async () => {
    await logout();
  }, [logout]);
  return (
    <main className="h-screen w-full bg-ultra-fade rounded-xl dark:bg-zark">
      <div className="p-6 text-2xl font-sans font-medium tracking-tighter">
        Profile
      </div>
      <div className="px-6">
        <button
          className="text-xs cursor-pointer select-none font-semibold rounded-lg bg-slate-300 dark:bg-slate-800 py-1.5 px-2 font-quick tracking-tighter"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </main>
  );
};
