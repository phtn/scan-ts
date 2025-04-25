import type { HTMLProps } from "react";
import { DeviceProfile } from "./_lib/utils";

export type ClassName = HTMLProps<HTMLElement>["className"];

export interface IStation {
  id: string | null;
  param1: string | null;
  param2: string | null;
}

export type Station = Record<string, keyof IStation> | null;
export type Device = DeviceProfile | null;
