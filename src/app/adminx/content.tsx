"use client";

import { HyperList } from "@/ui/hyper-list";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ClassName } from "../types";
import { cn } from "@/lib/utils";

export const Content = () => {
  return (
    <main className="relative">
      <div className="">
        <ActionList />
      </div>
    </main>
  );
};

const ActionList = () => {
  const data = useMemo(
    () =>
      [
        {
          id: "1",
          label: "QR Code",
          href: "/adminx/generate",
          cover: "/svg/qr.svg",
        },
        { id: "2", label: "Reports", href: "#", cover: "/svg/doc.svg" },
      ] as ICardItem[],
    [],
  );
  return (
    <div className="w-full px-1 space-y-4">
      <div className="px-3 text-2xl font-bold py-5">Functions</div>
      <HyperList
        data={data}
        keyId="id"
        component={CardItem}
        container="flex items-center w-screen overflow-x-auto space-x-8 px-8 scroll-smooth will-change-auto"
        itemStyle="flex items-center justify-center w-full"
      />
    </div>
  );
};

interface ICardItem {
  id: string;
  label: string;
  cover: string;
  href?: string;
  style?: ClassName;
}
const CardItem = ({ label, href = "#", cover, style }: ICardItem) => (
  // ration h:w = 1.1122:1
  <div className="h-[238px] w-64 rounded-[36px] p-1 bg-white">
    <div className="rounded-t-[32px] relative overflow-hidden rounded-b-[16px] border-t border-l bg-gray-700 border-gray-900 h-[180px]">
      <Image
        className={cn(
          "absolute h-28 w-auto aspect-square -bottom-6 right-1/4 rotate-[8deg]",
          style,
        )}
        alt={label}
        src={cover}
        width={0}
        height={0}
        unoptimized
        priority
      />
    </div>

    <div className="flex h-[54px] pe-3 items-center justify-end">
      <Link
        href={href}
        className="h-[34px] flex items-center justify-center w-[86px] bg-[#14141b] rounded-[28px]"
      >
        <span className="text-xs font-bold font-nito">{label}</span>
      </Link>
    </div>
  </div>
);
