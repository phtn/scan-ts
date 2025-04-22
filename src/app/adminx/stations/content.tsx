"use client";

import { useMemo } from "react";
import { PageTitle } from "../components";
import { Header } from "@/app/_components/header";
import { Button } from "@/app/_components/button";

interface IHeaderItem {
  id: number;
  title: string;
  className?: string;
}

export const Content = () => {
  const headers = useMemo(
    () =>
      [
        {
          id: 1,
          title: "id",
          className: "font-semibold tracking-tight",
        },
        {
          id: 2,
          title: "scans",
          className: "font-semibold tracking-tight",
        },
        {
          id: 3,
          title: "name",
          className: "font-semibold tracking-tight",
        },
        {
          id: 4,
          title: "location",
          className: "font-semibold tracking-tight",
        },
        {
          id: 5,
          title: "area",
          className: "font-semibold tracking-tight",
        },
        {
          id: 6,
          title: "tag",
          className: "font-semibold tracking-tight",
        },
        {
          id: 7,
          title: "",
          className: "font-semibold tracking-tight",
        },
      ] as IHeaderItem[],
    [],
  );

  return (
    <main>
      <Header>
        <PageTitle title="Stations" />
        <Button>+ Add Station</Button>
      </Header>
      <div className="px-4">
        <div className="border border-gray-300/50 rounded-lg">
          <div className="grid grid-cols-8 border-b-[0.33px] h-8 border-gray-300/40 bg-gray-300/10">
            {headers.map((header) => (
              <div
                key={header.id}
                className="col-span-1 flex items-center justify-center"
              >
                <h2 className="text-sm tracking-tight">{header.title}</h2>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-8 border-b-[0.33px] h-10 border-gray-300/40">
            <div className="col-span-1 flex items-center justify-center">
              <h3 className="tracking-tight text-sm">ID</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
