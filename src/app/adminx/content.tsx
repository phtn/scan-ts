"use client";

import { HyperList } from "@/ui/hyper-list";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { ClassName } from "../types";
import { cn } from "@/lib/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { Loader } from "../_components/loader";
import { useAuth } from "../_ctx/auth";
import { UserCredential } from "firebase/auth";
import { getDeviceProfile } from "../_lib/utils";
import { setDevice } from "../actions";
import { PageTitle } from "./components";
import { Header } from "../_components/header";

export const Content = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (canvasRef.current) {
          const profile = await getDeviceProfile(canvasRef.current);
          await setDevice(profile.fingerprintId);
        }
      } catch (error) {
        console.error("Error getting device profile:", error);
      }
    };
    getProfile();
  }, []);

  const [user, loading] = useAuthState(auth);
  const { signInWithGoogle } = useAuth();

  const signFn = useCallback(
    async () => await signInWithGoogle(),
    [signInWithGoogle],
  );

  const render = useCallback(
    () =>
      loading ? <Loader /> : user ? <ActionList /> : <SignIn signFn={signFn} />,
    [loading, user, signFn],
  );

  return (
    <div>
      {render()}
      <canvas ref={canvasRef} className="hidden size-10" />
    </div>
  );
};

const ActionList = () => {
  const data = useMemo(
    () =>
      [
        {
          id: "1",
          label: "QR Codes",
          href: "/adminx/generate",
          cover: "/svg/qr.svg",
        },
        {
          id: "2",
          label: "Stations",
          href: "/adminx/stations",
          cover: "/svg/pin.svg",
        },
      ] as ICardItem[],
    [],
  );
  return (
    <div className="space-y-4">
      <Header>
        <PageTitle title="Main" />
      </Header>
      <HyperList
        keyId="id"
        data={data}
        component={CardItem}
        container="flex items-center overflow-x-auto pe-10 scroll-smooth will-change-auto"
        itemStyle="ml-10 flex items-center justify-center"
      />
    </div>
  );
};

interface ICardItem {
  id: string;
  label: string;
  cover: string;
  href?: string;
  style?: ClassName;
}
const CardItem = ({ label, href = "#", cover, style }: ICardItem) => (
  // ration h:w = 1.1122:1
  <div className="h-[238px] w-64 rounded-[36px] p-1 bg-white">
    <div className="rounded-t-[32px] relative overflow-hidden rounded-b-3xl border-t border-l bg-raised border-gray-900 h-[180px]">
      <Image
        className={cn(
          "absolute h-32 w-auto aspect-square -bottom-6 pointer-events-none select-none right-1/5 rotate-[8deg]",
          style,
        )}
        alt={label}
        src={cover}
        width={0}
        height={0}
        unoptimized
        priority
      />
    </div>

    <div className="flex h-[54px] pe-3 items-center justify-end">
      <Link
        href={href}
        className="h-8 flex items-center justify-center w-fit px-4 bg-raised rounded-full"
      >
        <span className="text-xs font-extrabold font-quick tracking-tight">
          {label}
        </span>
      </Link>
    </div>
  </div>
);

interface ISignIn {
  signFn: () => Promise<UserCredential | undefined>;
}
const SignIn = ({ signFn }: ISignIn) => {
  return (
    <div className="flex items-center flex-col space-y-8 relative justify-center w-full h-96 mt-20">
      <div className="absolute size-full">
        <Radiance />
      </div>
      <div className="h-[238px] relative z-50 w-64 rounded-[36px] p-1 bg-gray-300">
        <div className="rounded-t-[32px] relative overflow-hidden rounded-b-[16px] border-t border-l bg-gray-400 border-gray-500 h-[180px]">
          <Image
            className={cn(
              "absolute h-28 w-auto aspect-square -bottom-6 right-1/4 rotate-[8deg]",
            )}
            alt={"lock"}
            src={"/svg/lock.svg"}
            width={0}
            height={0}
            unoptimized
            priority
          />
        </div>

        <div className="flex h-[54px] pe-3 items-center justify-end">
          <button
            onClick={signFn}
            className="h-[34px] flex items-center cursor-pointer text-white justify-center w-fit px-6 bg-[#14141b] rounded-[28px]"
          >
            <span className="text-xs font-bold font-nito">Sign in</span>
          </button>
        </div>
      </div>

      <div className="h-20 flex items-center justify-center">
        <div className="text-sm font-quick opacity-60">
          think twice before you proceed.
        </div>
      </div>
    </div>
  );
};

const Radiance = () => {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient
          id="radiantGlow"
          cx="50%"
          cy="50%"
          r="70%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#ff7eb3" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#a7f3d0" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#99f6e4" stopOpacity="0.4" />
          <stop offset="80%" stopColor="#a5f3fc" stopOpacity="0.1" />
        </radialGradient>
        <filter id="blur" x="-50%" y="-70%" width="300%" height="280%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
        </filter>
      </defs>

      <rect x="0" y="0" width="400" height="400" fill="none" />

      <g filter="url(#blur)" className="animate-pulse">
        {/* <circle cx="200" cy="170" r="150" fill="url(#radiantGlow)" /> */}
        <rect x={52} y={22} width={280} height={280} fill="url(#radiantGlow)" />
      </g>
    </svg>
  );
};
