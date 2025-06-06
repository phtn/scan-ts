"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getDeviceProfile } from "./_lib/utils";
import { TopOutlines } from "./_components/outlines";
import { useRouter, useSearchParams } from "next/navigation";
import type { Device, AffiliateId } from "./types";
import { UserInquiryForm } from "@/components/forms";
import { ModeSwitch } from "./_components/mode-switch";
import { Brand } from "./_components/brand";
import { Icon } from "@/lib/icons";

export function Content() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Landing />
    </Suspense>
  );
}

function Landing() {
  const [affiliateId, setAffiliateId] = useState<AffiliateId | null>(null);
  const [deviceProfile, setDeviceProfile] = useState<Device>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNavToAdmin = useCallback(() => {
    router.push("/adminx/dashboard");
  }, [router]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams) as Record<
      string,
      keyof AffiliateId
    >;
    setAffiliateId({ ...params, ident: params.iztp1nk });
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
  const Header = useMemo(
    () => (
      <>
        <TopOutlines />
        <Brand />
      </>
    ),
    [],
  );

  const Footer = useMemo(
    () => (
      <div>
        <div className="h-10 px-8 items-center flex justify-between">
          <ModeSwitch />
          <a href="/adminx" className="dark:text-orange-100/80 font-dm text-xs">
            &copy;2025 BestDeal
          </a>
        </div>
        {process.env.NODE_ENV === "development" && (
          <div className="h-14 border-t-[0.33px] border-panel/40 tracking-tight px-8 items-center flex justify-between">
            <button
              onClick={handleNavToAdmin}
              className="flex cursor-pointer items-center justify-center gap-1.5"
            >
              <Icon name="laptop" className="size-5 text-gray-500" />
              <span className="text-sm -mb-0.5 select-none opacity-80 font-dm text-gray-500">
                admin
              </span>
            </button>
          </div>
        )}
      </div>
    ),
    [handleNavToAdmin],
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-ultra-fade dark:bg-hot-dark">
      <div className="w-full max-w-md mx-auto space-y-6 md:space-y-6">
        {Header}

        <div className="px-1.5">
          <UserInquiryForm
            affiliateId={affiliateId}
            device={deviceProfile}
          ></UserInquiryForm>
        </div>

        {Footer}
      </div>
      <div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </main>
  );
}
