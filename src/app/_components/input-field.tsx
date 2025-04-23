import { Icon } from "@/lib/icons";

type FieldName = "name" | "tel" | "email" | "sid" | "location" | "area";

export interface IFieldItem extends HTMLInputElement {
  id: string;
  name: FieldName;
  label: string;
}

export const FieldItem = (item: IFieldItem) => (
  <div className="relative">
    <div className="flex items-center absolute gap-x-0 justify-start">
      <div className={labelClassName}>
        <label htmlFor={item.name}>{item.label}</label>
      </div>

      {item.required && (
        <div className={requiredClassName}>
          <div className="text-red-500 flex items-center leading-none space-x-1 justify-center py-[1.5px]">
            <Icon name="asterisk" className="size-2" />
            <span className="text-[10px]">Required</span>
          </div>
        </div>
      )}
    </div>
    <input
      id={item.name}
      name={item.name}
      type={item.type}
      required={item.required}
      autoComplete={item.autocomplete}
      className={inputClassName}
    />
  </div>
);

const inputClassName =
  "ps-3 font-sans tracking-tight text-lg block pt-5 h-16 w-full rounded-2xl outline-none bg-gray-200 border border-transparent focus:border-blue-500 focus:ring-blue-500 text-[#14141b]";
const labelClassName =
  "block bg-neutral-50/70 ps-3 pe-2.5 py-0.5 font-sans rounded-tl-[14px] tracking-wider text-[10px] top-0 left-0 rounded-e rounded-bl m-[3px] font-medium text-raised/80 uppercase";
const requiredClassName =
  "bg-neutral-50/70 px-2 py-[3px] font-medium tracking-wide font-quick rounded mr-[3px]";
