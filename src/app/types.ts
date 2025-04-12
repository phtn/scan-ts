import type { HTMLProps } from "react";

export type ClassName = HTMLProps<HTMLElement>["className"];

export interface Station {
  id: string | null;
  param1: string | null;
  param2: string | null;
}
