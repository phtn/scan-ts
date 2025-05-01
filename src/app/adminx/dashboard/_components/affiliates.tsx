"use client";

import { AffiliateForm } from "@/components/forms/affiliate-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useToggle } from "@/app/hooks/use-toggle";
import { AffiliatesTable } from "./affiliates-table";

export function Affiliates() {
  const { open, toggle } = useToggle(true);

  return (
    <Card
      className={cn(
        "bg-gradient-to-b h-full from-ultra-fade/50 to-super-fade",
        "dark:border-panel rounded-lg rounded-br-[3px] border-[0.33px] border-gray-500",
        "dark:from-neutral-400/60 dark:via-neutral-300/80 dark:to-neutral-200/40",
        "overflow-hidden relative",
      )}
    >
      {/* Add subtle orange glow effect */}
      <div className="absolute -top-20 -left-80 size-56 bg-pink-400/80 rounded-full blur-[8px] opacity-80"></div>
      <div className="absolute -top-20 -left-0 size-72 bg-amber-50/40 rounded-full blur-[80px] opacity-20"></div>
      <div className="absolute -top-24 -right-24 size-64 dark:bg-neutral-100 rounded-full blur-[80px] opacity-40"></div>
      <div className="absolute -bottom-[36rem] -right-0 w-[50rem] h-[47rem] bg-white/50 rounded-full blur-[60px] opacity-80"></div>

      <CardHeader className="flex relative flex-row dark:border-hot-dark items-start h-1/8 justify-between pb-2">
        <div className="flex h-full items-center font-sans gap-6">
          <CardTitle className="text-lg ps-6 font-medium leading-none h-12 flex items-center font-sans tracking-tight px-3">
            Affiliates
          </CardTitle>
          <div className="flex items-center gap-1 w-28 tracking-tighter">
            <button
              onClick={toggle}
              className="hover:opacity-100 cursor-pointer flex items-center gap-1.5 opacity-90"
            >
              <Icon
                name={open ? "close-square" : "add-square"}
                solid
                size={20}
                className="text-panel dark:text-ultra-fade"
              />
              <span className="text-sm">
                {open ? "Close Form" : "Create New"}
              </span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-blue-400"></div>
            <span className="text-sm">Most Active</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full dark:bg-orange-300 bg-orange-400"></div>
            <span className="text-sm">New</span>
          </div>
        </div>

        <div className="flex items-start justify-center h-full gap-6 p-2">
          <button className="hover:opacity-100 opacity-60">
            <Icon name="maximize" solid size={24} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex p-0 justify-center h-7/8 items-start">
        <div className="relative size-full">
          {open ? <AffiliateForm /> : <AffiliatesTable />}
        </div>
      </CardContent>
    </Card>
  );
}
