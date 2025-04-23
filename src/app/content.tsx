"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import UserForm from "./_components/user-form";
import { type DeviceProfile, getDeviceProfile } from "./_lib/utils";
import { TopOutlines } from "./_components/outlines";
import { useSearchParams } from "next/navigation";
import { Station } from "./types";

export function Content() {
  return (
    <Suspense>
      <Landing />
    </Suspense>
  );
}

function Landing() {
  const [station, setStation] = useState<Record<string, keyof Station> | null>(
    null,
  );
  const [deviceProfile, setDeviceProfile] = useState<DeviceProfile | null>(
    null,
  );
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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full max-w-md mx-auto space-y-6">
        <TopOutlines />
        <div className="text-center pb-3 md:pb-6">
          <h1 className="text-3xl tracking-tight text-white font-black">
            Best Deal{" "}
            <span className="font-mono font-light tracking-tighter text-orange-200">
              Insurance
            </span>
          </h1>
          <p className="mt-0.5 font-quick text-neutral-50/80">
            Protecting what matters most.
          </p>
        </div>

        <div className="px-4">
          <UserForm station={station} device={deviceProfile} />
        </div>

        <div className="h-6 opacity-0 flex justify-center">
          <a href="/adminx" className="text-orange-200 text-xs">
            admin
          </a>
        </div>
        <div className="h-6 opacity-80 font-quick flex justify-center">
          <a href="/adminx" className="text-orange-100 text-[10px]">
            &copy;2025 BestDeal Insurance
          </a>
        </div>
      </div>
      <div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <div className="text-orange-300 hidden overflow-scroll border size-96 whitespace-pre-wrap">
        <pre>{deviceProfile && JSON.stringify(deviceProfile, null, 2)}</pre>
      </div>
    </main>
  );
}
