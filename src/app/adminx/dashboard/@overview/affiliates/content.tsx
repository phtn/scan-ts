"use client";

import { AffiliateCtxProvider } from "@/app/_ctx/affiliate";
import { Affiliates } from "../../_components/affiliates";

export const Content = () => {
  return (
    <AffiliateCtxProvider>
      <Affiliates />
    </AffiliateCtxProvider>
  );
};
