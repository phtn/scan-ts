"use client";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { auth } from "@/lib/firebase";
import { UserCredential } from "firebase/auth";

interface AuthCtxValues {
  signInWithGoogle: () => Promise<UserCredential | undefined>;
}
export const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthCtxProvider = ({ children }: { children: ReactNode }) => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const value = useMemo(
    () => ({
      signInWithGoogle,
    }),
    [signInWithGoogle],
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
