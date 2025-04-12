"use client";

import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { auth, db } from "@/lib/firebase";
import { signOut, type User, type UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDevice, getToken, setUID, setUsername } from "../actions";
import { requestPermission } from "@/lib/firebase/messaging/get-token";

interface Devices {
  device: string;
  token: string;
}
interface AuthCtxValues {
  signInWithGoogle: () => Promise<UserCredential | undefined>;
  logout: () => Promise<void>;
}

export const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthCtxProvider = ({ children }: { children: ReactNode }) => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);

  const checkIfUserExists = useCallback(async () => {
    if (!user) return;
    requestPermission();
    await setUID(user.uid);
    await setUsername(user.displayName ?? user.email!.split("@").shift()!);
    const device = await getDevice();
    const token = (await getToken()) ?? "";

    const userDocRef = doc(db, "users", String(user.uid));
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const isDeviceRegistered = userData.devices.some(
        (d: Devices) => d.device === device,
      );
      if (isDeviceRegistered) {
        // const token = requestPermission();
      }
    } else {
      const devices = [{ device, token }];
      const userInfo = getUserInfo(user);

      console.log(devices);

      try {
        await setDoc(userDocRef, {
          ...userInfo,
          devices,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log("User document created successfully");
      } catch (error) {
        console.error("Error creating user document:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    checkIfUserExists().catch((error) => {
      console.error("Error checking user existence:", error);
    });
  }, [checkIfUserExists]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out user:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      signInWithGoogle,
      logout,
    }),
    [signInWithGoogle, logout],
  );
  return <AuthCtx value={value}>{children}</AuthCtx>;
};

export const useAuth = () => {
  const context = useContext(AuthCtx);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// const createAuthedUser = async (user: User) => {
//   if (!user) return;

//   const userDocRef = doc(db, "users", user.uid);
//   const devices = [await getDevice()];
//   const userInfo = getUserInfo(user);

//   try {
//     await setDoc(userDocRef, {
//       ...userInfo,
//       devices,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });
//   } catch (error) {
//     console.error("Error creating user document:", error);
//     throw error;
//   }
// };

const getUserInfo = (user: User) => ({
  email: user.email,
  name: user.displayName,
  photoURL: user.photoURL,
  uid: user.uid,
  phone: user.phoneNumber,
});
