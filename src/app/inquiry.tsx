import { useId, useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/lib/icons";
import { IconName } from "@/lib/icons/types";
import { HyperList } from "@/ui/hyper-list";

interface ISelectListItem {
  id: number;
  icon: IconName;
  value: string;
  title: string;
  description: string;
}

export default function Inquiry() {
  const id = useId();
  const select_items = useMemo(
    () =>
      [
        {
          id: 1,
          icon: "sports-car",
          value: "1",
          title: "Auto Insurance",
          description: "CTPL & Comprehensive",
        },
        {
          id: 2,
          icon: "injured",
          value: "2",
          title: "Personal Accident",
          description: "Individual & Family",
        },
        {
          id: 3,
          icon: "fire-extinguisher",
          value: "3",
          title: "Fire Insurance",
          description: "Residential & Commercial",
        },
      ] as ISelectListItem[],
    [],
  );
  return (
    <div className="*:not-first:mt-2 w-full font-quick">
      <Select defaultValue="1">
        <SelectTrigger
          id={id}
          className="h-16 rounded-2xl bg-panel dark:bg-hot-dark border-[0.33px] dark:border-gray-500/50 text-white outline-none text-left w-full py-5"
        >
          <SelectValue
            placeholder="Choose a plan"
            className="text-neutral-200"
          />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-gray-400 [&_*[role=option]]:ps-3 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-4">
          <HyperList
            data={select_items}
            component={SelectListItem}
            direction="up"
            itemStyle="border-b last:border-none"
            keyId="id"
          />
        </SelectContent>
      </Select>
    </div>
  );
}

const SelectListItem = ({ id, icon, title, description }: ISelectListItem) => (
  <SelectItem
    value={`${id}`}
    className="h-20 font-semibold font-quick focus:text-panel"
  >
    <div className="flex items-center px-2 gap-x-4">
      <Icon name={icon} className="" />
      <div className="flex flex-col justify-start">
        <span className="block text-[14px] tracking-tight font-bold">
          {title}
        </span>
        <span className="block text-[12px] font-sans font-normal opacity-60">
          {description}
        </span>
      </div>
    </div>
  </SelectItem>
);
