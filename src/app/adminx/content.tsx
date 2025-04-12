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

export const Content = () => {
  // const { fcmToken } = useFcmToken();
  //   // Use the token as needed
  //   if (fcmToken){
  //    console.log('FCM token:', fcmToken);
  //   }

  //   useEffect(() => {
  //     if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  //       const messaging = getMessaging(app);
  //       const unsubscribe = onMessage(messaging, (payload) => {
  //         console.log('Foreground push notification received:', payload);
  //         // Handle the received push notification while the app is in the foreground
  //         // You can display a notification or update the UI based on the payload
  //       });
  //       return () => {
  //         unsubscribe(); // Unsubscribe from the onMessage event
  //       };
  //     }
  //   }, []);

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
          label: "Generate QR Code",
          href: "/adminx/generate",
          cover: "/svg/qr.svg",
        },
        { id: "2", label: "Reports", href: "#", cover: "/svg/doc.svg" },
      ] as ICardItem[],
    [],
  );
  return (
    <div className="space-y-4">
      <div className="ps-4 text-xl tracking-tighter font-bold py-5">
        Functions
      </div>
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
    <div className="rounded-t-[32px] relative overflow-hidden rounded-b-[16px] border-t border-l bg-gray-700 border-gray-900 h-[180px]">
      <Image
        className={cn(
          "absolute h-28 w-auto aspect-square -bottom-6 right-1/4 rotate-[8deg]",
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
        className="h-[34px] flex items-center justify-center w-fit px-4 bg-[#14141b] rounded-[28px]"
      >
        <span className="text-xs font-bold font-nito">{label}</span>
      </Link>
    </div>
  </div>
);

interface ISignIn {
  signFn: () => Promise<UserCredential | undefined>;
}
const SignIn = ({ signFn }: ISignIn) => {
  return (
    <div className="flex items-center flex-col justify-center w-full h-96">
      <div className="h-[238px] w-64 rounded-[36px] p-1 bg-white">
        <div className="rounded-t-[32px] relative overflow-hidden rounded-b-[16px] border-t border-l bg-gray-700 border-gray-900 h-[180px]">
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
            className="h-[34px] flex items-center justify-center w-fit px-4 bg-[#14141b] rounded-[28px]"
          >
            <span className="text-xs font-bold font-nito">Sign in</span>
          </button>
        </div>
      </div>

      <div className="h-20 flex items-center justify-center">
        <div className="text-sm opacity-60">
          think twice before you proceed.
        </div>
      </div>
    </div>
  );
};
