"use server";

import { cookies } from "next/headers";

const defaultOpts = {
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax" as const,
};

export const setAPI = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.set("apex-scan-apikey", key, { ...defaultOpts, path: "/" });
};

export const getAPI = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("apex-scan-apikey")?.value;
};
