"use client";

import { cn } from "@/lib/utils";
import { Affiliates } from "../_components/affiliates";
import { AffiliateCtxProvider } from "@/app/_ctx/affiliate";
import { QRCodeViewer } from "../_components/qrcode-viewer";
import { useMemo } from "react";

export const Content = () => {
  const Main = useMemo(
    () => (
      <main className="space-y-2.5 lg:h-screen overflow-scroll">
        <div className="lg:h-[56vh]">
          <div className={cn("h-full m-1.5 grid grid-cols-12 gap-2.5", ``)}>
            <div className="col-span-12 lg:col-span-8">
              <Affiliates />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <QRCodeViewer />
            </div>
          </div>
        </div>

        <div className="lg:h-[36vh] pb-1.5">
          <div
            className={cn("h-full m-1.5 mt-0 grid grid-cols-12 gap-2.5", ``)}
          >
            <div className="col-span-12 lg:col-span-8">
              <MockCard />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <MockCard />
            </div>
          </div>
        </div>
      </main>
    ),
    [],
  );

  return <AffiliateCtxProvider>{Main}</AffiliateCtxProvider>;
};

const MockCard = () => {
  return (
    <div
      className={cn(
        "bg-gradient-to-br h-full min-h-96 from-ultra-fade/50 to-super-fade",
        "dark:border-panel rounded-lg rounded-br-[3px] border-[0.33px] border-gray-500",
        "dark:from-neutral-800/30 dark:via-neutral-800/80 dark:to-neutral-800/80",
        "overflow-hidden relative",
      )}
      // className="h-full rounded-lg border-[0.33px] border-gray-400 dark:border-hot-dark bg-gradient-to-r from-ultra-fade to-ultra-fade dark:from-hot-dark/20 dark:to-hot-dark/20"
    />
  );
};
