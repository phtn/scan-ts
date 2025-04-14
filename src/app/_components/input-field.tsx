type FieldName = "name" | "tel" | "email" | "sid" | "location" | "area";

export interface IFieldItem extends HTMLInputElement {
  id: string;
  name: FieldName;
  label: string;
}

export const FieldItem = (item: IFieldItem) => (
  <div className="relative">
    <label htmlFor={item.name} className={labelClassName}>
      {item.label}
    </label>
    <input
      required
      id={item.name}
      name={item.name}
      type={item.type}
      autoComplete={item.autocomplete}
      className={inputClassName}
    />
  </div>
);

const inputClassName =
  "ps-3 font-sans tracking-tight text-lg block pt-5 h-16 w-full rounded-2xl bg-white border-gray-400 border focus:border-blue-500 focus:ring-blue-500 text-[#14141b]";
const labelClassName =
  "block font-sans absolute tracking-tighter text-xs -top-0 border-0 border-gray-300 rounded-md p-2 left-1 text-blue-950/80";
