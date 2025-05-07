"use client";

import { SubsCtxProvider } from "@/app/_ctx/subs";
import { Subs } from "../../_components/subs";

export const Content = () => {
  return (
    <SubsCtxProvider>
      <Subs />
    </SubsCtxProvider>
  );
};
