"use client";

import { AffiliateForm } from "@/components/forms/affiliate-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useToggle } from "@/app/hooks/use-toggle";
import { AffiliatesTable } from "./affiliates-table";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";

export function Affiliates() {
  const { open, toggle } = useToggle();
  const pathname = usePathname();
  const path = pathname.split("/")[3];
  const router = useRouter();
  const pageRoute = useCallback(() => {
    router.push(`/adminx/dashboard/affiliates`);
  }, [router]);
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const WindowOptions = useCallback(() => {
    const options = opts(
      <button
        onClick={goBack}
        className="hover:opacity-100 opacity-60 cursor-pointer"
      >
        <Icon name="minimize-square-bold" solid size={24} />
      </button>,
      <button
        onClick={pageRoute}
        className="hover:opacity-100 opacity-60 cursor-pointer"
      >
        <Icon name="maximize-square" size={24} />
      </button>,
    );
    return (
      <div className="flex items-start justify-center h-full">
        {options.get(path === "affiliates")}
      </div>
    );
  }, [pageRoute, goBack, path]);

  return (
    <Card
      className={cn(
        "bg-gradient-to-b h-full from-ultra-fade/50 to-super-fade",
        "dark:border-panel lg:rounded-lg lg:rounded-br-[3px] rounded-none rounded-s-xl border-[0.33px] border-gray-500 border-e-0 lg:border-e-[0.33px]",
        "dark:from-neutral-400/40 dark:via-neutral-300/80 dark:to-neutral-200/40",
        "overflow-hidden relative flex flex-col justify-between",
      )}
    >
      {/* Add subtle orange glow effect */}
      <div className="absolute -top-20 -left-20 size-56 lg:bg-amber-50/30 rounded-full blur-[8px] opacity-20"></div>
      <div className="absolute -top-20 right-48 w-96 h-44 lg:dark:bg-neutral-100 rounded-full blur-[80px] opacity-40"></div>
      {/* <div className="absolute bottom-0 -right-4 w-44 h-11 bg-neutral-600/80 rounded-full blur-[24px] opacity-80"></div> */}

      <CardHeader className="flex relative flex-1/12 flex-row dark:border-hot-dark items-start h-12 justify-between">
        <div className="flex h-full items-center font-sans gap-3 lg:gap-6">
          <CardTitle className="lg:text-xl ps-2 font-semibold text-[16px] lg:font-medium leading-none dark:portrait:text-blue-400 h-12 flex items-center font-sans tracking-tight px-3">
            Affiliates
          </CardTitle>
          <div className="flex items-center text-sm font-medium gap-1 w-28 tracking-tighter">
            <button
              onClick={toggle}
              className="hover:opacity-100 transition-colors duration-300 hover:text-teal-500 dark:hover:text-teal-300 cursor-pointer flex items-center gap-1.5 group"
            >
              <Icon
                name={open ? "close-square" : "add-square"}
                solid
                size={24}
                className="text-panel dark:text-ultra-fade group-hover:text-teal-500 dark:group-hover:text-teal-300"
              />
              <span className="drop-shadow-xs group">
                {open ? "Close Form" : "Create New"}
              </span>
            </button>
          </div>
          {/* <div className="lg:flex hidden tracking-tight items-center gap-1">
            <div className="size-2 rounded-full bg-blue-400"></div>
            <span className="text-sm">Active</span>
          </div>
          <div className="lg:flex hidden tracking-tight items-center gap-1">
            <div className="size-2 rounded-full dark:bg-orange-300 bg-orange-400"></div>
            <span className="text-sm">Inactive</span>
          </div> */}
        </div>

        <WindowOptions />
      </CardHeader>
      <CardContent className="flex h-full p-0">
        <div className="relative size-full">
          {open ? <AffiliateForm /> : <AffiliatesTable />}
        </div>
      </CardContent>
    </Card>
  );
}
