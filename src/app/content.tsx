"use client";

import { useEffect, useRef, useState } from "react";
import UserForm from "./_components/user-form";
import { DeviceProfile, getDeviceProfile } from "./_lib/utils";
import { TopOutlines } from "./_components/outlines";

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
        <TopOutlines />
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
