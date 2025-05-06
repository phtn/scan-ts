import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon, type IconName } from "@/lib/icons";
import { HyperList } from "@/ui/hyper-list";
import { SelectFieldConfig } from "../schema";

export interface IInquiry {
  id: string;
  icon: IconName;
  value: string;
  name: string;
  label: string;
  description: string;
}

// interface InquiryTypeProps extends  {
//   name: string;
//   value?: string;
// }

export const InquiryType = (item: SelectFieldConfig) => {
  const inquiry_types = useMemo(
    () =>
      [
        {
          id: "1",
          icon: "sports-car",
          value: "car",
          name: "car",
          label: "Car Insurance",
          description: "CTPL & Comprehensive",
        },
        {
          id: "2",
          icon: "injured",
          value: "pa",
          label: "Personal Accident",
          description: "Individual & Family",
        },
        {
          id: "3",
          icon: "fire-extinguisher",
          value: "fire",
          label: "Fire Insurance",
          description: "Residential & Commercial",
        },
      ] as IInquiry[],
    [],
  );

  return (
    <Select name={item.name.toString()} defaultValue={"car"}>
      <SelectTrigger className="h-16 cursor-pointer rounded-2xl bg-panel dark:bg-hot-dark border-[0.33px] dark:border-gray-500/50 text-white outline-none text-left w-full py-5">
        <SelectValue
          placeholder="Choose type of inquiry"
          className="text-neutral-200"
        />
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-gray-400 [&_*[role=option]]:ps-3 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-4">
        <HyperList
          data={inquiry_types}
          component={InquiryField}
          direction="up"
          itemStyle="border-b last:border-none"
          keyId="id"
        />
      </SelectContent>
    </Select>
  );
};

export const InquiryField = ({ value, icon, label, description }: IInquiry) => (
  <SelectItem
    value={value}
    className="h-20 font-semibold font-quick cursor-pointer focus:text-panel"
  >
    <div className="flex items-center px-2 gap-x-4">
      <Icon name={icon} className="" />
      <div className="flex flex-col justify-start">
        <span className="block text-[14px] tracking-tight font-bold">
          {label}
        </span>
        <span className="block text-[12px] font-sans font-normal opacity-60">
          {description}
        </span>
      </div>
    </div>
  </SelectItem>
);
