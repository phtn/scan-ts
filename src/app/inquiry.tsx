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
          description: "Type of Inquiry",
        },
        {
          id: 2,
          icon: "injured",
          value: "2",
          title: "Personal Accident",
          description: "Individual or Family",
        },
        {
          id: 3,
          icon: "fire-extinguisher",
          value: "3",
          title: "Fire Insurance",
          description: "Residential or Commercial",
        },
      ] as ISelectListItem[],
    [],
  );
  return (
    <div className="*:not-first:mt-2 w-full font-quick">
      <Select defaultValue="1">
        <SelectTrigger
          id={id}
          className="h-16 rounded-2xl bg-hot-dark outline-none text-left w-full py-5"
        >
          <SelectValue
            placeholder="Choose a plan"
            className="text-neutral-200"
          />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-raised/50 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-4">
          <HyperList
            data={select_items}
            component={SelectListItem}
            direction="up"
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
    className="h-16 font-semibold font-quick rounded-sm first:rounded-t-[12px] last:rounded-b-[12px]"
  >
    <span className="flex items-center gap-x-3">
      <Icon name={icon} />
      <div className="flex flex-col justify-start">
        <span className="block text-[14px] font-bold">{title}</span>
        <span className="block text-[12px] font-sans font-normal opacity-60">
          {description}
        </span>
      </div>
    </span>
  </SelectItem>
);
