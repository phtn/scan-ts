import { DeviceProfile } from "./_lib/utils";
import type { HTMLProps } from "react";

export type ClassName = HTMLProps<HTMLElement>["className"];

export interface IAffiliateParams {
  id: string | null;
  grp: string | null;
  seed: string | null;
  ident: string | null;
}

export type AffiliateId = Record<string, keyof IAffiliateParams> | null;
export type Device = DeviceProfile | null;
