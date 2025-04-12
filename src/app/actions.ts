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

export const setDevice = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.set("apex-scan-device", key, { ...defaultOpts, path: "/" });
};

export const getDevice = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("apex-scan-device")?.value;
};

export const setToken = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.set("apex-scan-token", key, { ...defaultOpts, path: "/" });
};

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("apex-scan-token")?.value;
};
export const setUID = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.set("apex-scan-uid", key, { ...defaultOpts, path: "/" });
};

export const getUID = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("apex-scan-uid")?.value;
};

export const setUsername = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.set("apex-scan-username", key, { ...defaultOpts, path: "/" });
};

export const getUsername = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("apex-scan-username")?.value;
};
