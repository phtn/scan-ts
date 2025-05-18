"use client";

import { cn } from "@/lib/utils";
import { Affiliates } from "../_components/affiliates";
import { AffiliateCtxProvider } from "@/app/_ctx/affiliate";
import { QRCodeViewer } from "../_components/qrcode-viewer";
import { useMemo } from "react";
import { LogsTable } from "../_components/logs-table";
import { LogCtxProvider } from "@/app/_ctx/log";
import { SubsCtxProvider } from "@/app/_ctx/subs";
import { Subs } from "../_components/subs";

export const Content = () => {
  const Main = useMemo(
    () => (
      <main className="space-y-2.5 lg:h-screen overflow-scroll">
        <div className="lg:h-[54vh]">
          <div
            className={cn(
              "lg:m-1.5 grid h-full grid-cols-12 gap-y-2.5 lg:gap-2.5",
              ``,
            )}
          >
            <div className="col-span-12 lg:col-span-8">
              <Affiliates />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <QRCodeViewer />
            </div>
          </div>
        </div>

        <div className="lg:h-[38vh]">
          <div
            className={cn(
              "lg:mx-1.5 mt-0 grid grid-cols-12 gap-y-2.5 lg:gap-x-2.5",
              ``,
            )}
          >
            <SubsCtxProvider>
              <div className="col-span-12 lg:col-span-8 h-[37.15vh]">
                <Subs />
              </div>
            </SubsCtxProvider>
            <LogCtxProvider>
              <div
                className={cn(
                  "col-span-12 lg:col-span-4 bg-gradient-to-b from-ultra-fade/50 to-super-fade",
                  "dark:border-panel lg:rounded-xl lg:rounded-tl-[3px] rounded-none rounded-s-xl border-[0.33px] border-gray-500 border-e-0 lg:border-e-[0.33px]",
                  "dark:from-neutral-800/40 dark:via-neutral-800/80 dark:to-neutral-800/80",
                  "overflow-hidden relative",
                )}
              >
                <LogsTable />
              </div>
            </LogCtxProvider>
          </div>
        </div>
      </main>
    ),
    [],
  );

  return <AffiliateCtxProvider>{Main}</AffiliateCtxProvider>;
};

export const MockCard = () => {
  return (
    <div
      className={cn(
        "bg-gradient-to-br h-full from-ultra-fade/50 to-super-fade",
        "dark:border-panel rounded-lg rounded-br-[3px] border-[0.33px] border-gray-500",
        "dark:from-neutral-800/30 dark:via-neutral-800/80 dark:to-neutral-800/80",
        "overflow-hidden relative",
      )}
      // className="h-full rounded-lg border-[0.33px] border-gray-400 dark:border-hot-dark bg-gradient-to-r from-ultra-fade to-ultra-fade dark:from-hot-dark/20 dark:to-hot-dark/20"
    />
  );
};
