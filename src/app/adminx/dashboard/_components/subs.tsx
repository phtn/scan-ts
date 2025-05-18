import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Icon } from "@/lib/icons";
import { SubsTable } from "./subs-table";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";

export const Subs = () => {
  const pathname = usePathname();
  const path = pathname.split("/")[3];
  const router = useRouter();
  const pageRoute = useCallback(() => {
    router.push(`/adminx/dashboard/scans`);
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
        {options.get(path === "scans")}
      </div>
    );
  }, [pageRoute, goBack, path]);

  return (
    <Card
      className={cn(
        "bg-gradient-to-b h-full from-ultra-fade/50 to-super-fade",
        "dark:border-panel lg:rounded-xl lg:rounded-tr-[3px] rounded-none rounded-s-xl border-[0.33px] border-gray-500 border-e-0 lg:border-e-[0.33px]",
        "dark:from-neutral-800/40 dark:via-neutral-800/80 dark:to-neutral-800/40",
        "overflow-hidden relative flex flex-col justify-between shadow-none",
        { " mb-1.5 mx-1.5": path === "scans" },
      )}
    >
      {/* Add subtle orange glow effect */}
      {/* <div className="absolute -top-20 -left-20 size-56 lg:bg-amber-50/30 rounded-full blur-[8px] opacity-20"></div> */}
      <div className="absolute -top-20 right-48 w-96 h-44 lg:dark:bg-neutral-100 rounded-full blur-[80px] opacity-40"></div>
      <div className="absolute bottom-0 -right-4 w-44 h-11 bg-neutral-600/0 rounded-full blur-[24px] opacity-80"></div>

      <CardHeader className="flex relative flex-1 flex-row dark:border-hot-dark items-start h-12 justify-between">
        <div className="flex h-full items-center font-sans gap-3 lg:gap-6">
          <CardTitle className="lg:text-xl ps-2 font-semibold text-[16px] lg:ps-2 lg:font-medium leading-none dark:portrait:text-blue-400 h-12 flex items-center font-sans tracking-tighter px-3">
            {path === "scans" ? "Scans / Submitted Inquiries" : "Latest Scans"}
          </CardTitle>
        </div>

        <WindowOptions />
      </CardHeader>
      <CardContent className="flex flex-11/12 p-0 justify-center items-start">
        <div className="relative size-full">
          <SubsTable />
        </div>
      </CardContent>
    </Card>
  );
};
