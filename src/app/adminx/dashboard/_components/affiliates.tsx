"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Icon } from "@/lib/icons";

export function Affiliates() {
  return (
    <Card className="bg-gradient-to-br h-full from-ultra-fade to-ultra-fade dark:from-hot-dark/60 dark:to-hot-dark rounded-md border-[0.33px] dark:border-transparent border-gray-400/50 overflow-hidden relative">
      {/* Add subtle orange glow effect */}
      <div className="absolute -bottom-10 -left-10 size-64 bg-orange-200/20 rounded-full blur-[80px] opacity-20"></div>

      <CardHeader className="flex relative flex-row border items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold font-sans tracking-tight">
          Affiliates
        </CardTitle>
        <div className="flex items-center justify-center gap-6">
          <button className="hover:opacity-100 opacity-60">
            <Icon name="add-circle-line-duotone" solid size={24} />
          </button>
          <button className="hover:opacity-100 opacity-60">
            <Icon name="menu-dots-bold" solid size={20} className="rotate-90" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex h-full items-center font-dm gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-sm opacity-60">Most Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            <span className="text-sm opacity-60">New</span>
          </div>
        </div>

        <div className="relative h-full flex flex-1"></div>
      </CardContent>
    </Card>
  );
}
