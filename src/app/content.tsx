"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { getDeviceProfile } from "./_lib/utils";
import { TopOutlines } from "./_components/outlines";
import { useSearchParams } from "next/navigation";
import type { Device, Station } from "./types";
import { UserInfoForm } from "@/components/form/forms";
import Inquiry from "./inquiry";
import { ModeSwitch } from "./_components/mode-switch";

export function Content() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Landing />
    </Suspense>
  );
}

function Landing() {
  const [station, setStation] = useState<Station | null>(null);
  const [deviceProfile, setDeviceProfile] = useState<Device>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams) as Record<
      string,
      keyof Station
    >;
    setStation(params);
  }, [searchParams]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (canvasRef.current) {
          const profile = await getDeviceProfile(canvasRef.current);
          console.log("Device profile:", profile); // Add logging
          setDeviceProfile(profile);
        } else {
          console.error("Canvas reference not available");
        }
      } catch (error) {
        console.error("Error getting device profile:", error);
      }
    };

    getProfile();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-ultra-fade dark:bg-hot-dark">
      <div className="w-full max-w-md mx-auto space-y-6 md:space-y-6">
        <TopOutlines />
        <div className="text-center pt-3 md:pb-5">
          <h1 className="text-3xl tracking-tighter font-dm">
            <span className="font-black dark:text-white text-gray-700">
              BestDeal
            </span>
            <span className="font-dm tracking-tight text-amber-400 dark:text-orange-200">
              Insurance
            </span>
          </h1>
          <p className="font-dm opacity-60 text-sm">
            Protecting what matters most.
          </p>
        </div>

        <div className="px-1.5">
          <UserInfoForm station={station} device={deviceProfile}>
            <Inquiry />
          </UserInfoForm>
        </div>

        <div className="h-12 opacity-100 px-8 items-center flex justify-between">
          <ModeSwitch />
          <a href="/adminx" className="dark:text-orange-100/80 font-dm text-xs">
            &copy;2025 BestDeal
          </a>
        </div>
      </div>
      <div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </main>
  );
}
