type FieldName = "name" | "tel" | "email" | "sid" | "location" | "area";

export interface IFieldItem extends HTMLInputElement {
  id: string;
  name: FieldName;
  label: string;
}

export const FieldItem = (item: IFieldItem) => (
  <div className="relative">
    <div className={labelClassName}>
      <label htmlFor={item.name}>{item.label}</label>
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
  "ps-3 font-sans tracking-tight text-lg block pt-5 h-16 w-full rounded-2xl outline-none bg-white border-gray-400 border focus:border-blue-500 focus:ring-blue-500 text-[#14141b]";
const labelClassName =
  "block bg-neutral-100 ps-3 pe-2.5 py-0.5 font-sans rounded-tl-[14px] absolute tracking-wider text-[10px] top-0 left-0 rounded m-[3px] font-medium text-raised/80 uppercase";
