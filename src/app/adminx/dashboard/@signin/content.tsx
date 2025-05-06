"use client";

import { useAuth } from "@/app/_ctx/auth";
import { cn } from "@/lib/utils";
import { UserCredential } from "firebase/auth";
import Image from "next/image";

export const Content = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <div className="absolute top-16 left-1/4">
      <SignIn signFn={() => signInWithGoogle()} />
    </div>
  );
};

interface ISignIn {
  signFn: () => Promise<UserCredential | undefined>;
}
const SignIn = ({ signFn }: ISignIn) => {
  return (
    <div className="flex items-center flex-col bg-neutral-100 space-y-8 relative dark:bg-transparent justify-center size-[28rem] border border-neutral-400/30 rounded-3xl mt-20">
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
          <stop offset="36%" stopColor="#d9f99d" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#99f6e4" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#5eead4" stopOpacity="0.3" />
          <stop offset="30%" stopColor="#a5f3fc" stopOpacity="0.05" />
        </radialGradient>
        <filter id="blur" x="-50%" y="-70%" width="300%" height="280%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
        </filter>
      </defs>

      <rect x="0" y="0" width="450" height="450" fill="none" />

      <g
        filter="url(#blur)"
        className="animate-[pulse-gradient_4s_ease-in-out_infinite]"
      >
        {/* <circle cx="200" cy="170" r="150" fill="url(#radiantGlow)" /> */}
        <rect x={50} y={25} width={280} height={180} fill="url(#radiantGlow)" />
      </g>
    </svg>
  );
};
