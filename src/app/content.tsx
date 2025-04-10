"use client";

import { useEffect, useRef, useState } from "react";
import UserForm from "./_components/user-form";
import { DeviceProfile, getDeviceProfile } from "./lib/utils";

export function Content() {
  const [scanResult] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deviceProfile, setDeviceProfile] = useState<DeviceProfile | null>(
    null,
  );

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

  const handleFormSubmit = () => {
    setLoading(true);
    setFormSubmitted(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="h-14 relative z-50 overflow-hidden">
          {/* <div className="h-40 w-36 -skew-y-[12deg] -right-16 absolute bottom-12 rounded-2xl border border-white/10"></div> */}
          <div className="h-20 w-36 -skew-y-[10deg] -right-2 md:w-36 md:right-8 absolute bottom-4 md:rounded-lg md:bottom-6 rounded-xl border-[0.33px] bg-blue-200/5 border-white/50"></div>
          <div className="h-20 w-40 md:w-80 -skew-y-[10deg] border-r-0 rounded-br-none right-6 md:bottom-10 md:-right-16 _bg-black absolute bottom-5 rounded-2xl border border-gray-300"></div>
        </div>
        <div className="text-center pb-6">
          <h1 className="text-3xl tracking-tight text-white font-extrabold">
            AutoProtect{" "}
            <span className="font-mono font-light tracking-tighter text-white">
              Insurance
            </span>
          </h1>
          <p className="mt-0.5 text-sky-100/60">
            {loading ? "Loading..." : "Protecting what matters most."}
          </p>
        </div>

        <div className="px-4">
          {!formSubmitted ? (
            <UserForm qrCodeData={scanResult} onSubmit={handleFormSubmit} />
          ) : (
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800">
                Thank You!
              </h2>
              <p className="mt-2">
                Your information has been submitted successfully.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white">
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <div className="text-orange-300 hidden overflow-scroll border size-96 whitespace-pre-wrap">
        <pre>{deviceProfile && JSON.stringify(deviceProfile, null, 2)}</pre>
      </div>
    </main>
  );
}

/*
!scanResult ? (
          <QRScanner onScan={handleScan} />
        ) :
*/
