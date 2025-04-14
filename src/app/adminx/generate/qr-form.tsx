import { FieldItem, IFieldItem } from "@/app/_components/input-field";
import { HyperList } from "@/ui/hyper-list";
import { useMemo } from "react";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-fit px-4 cursor-pointer h-12 text-[16px] font-semibold font-sans tracking-tighter border rounded-full border-transparent text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {pending ? "Generating..." : "Generate QR Code"}
    </button>
  );
}

interface QrFormProps {
  action: (data: FormData) => void;
  pending: boolean;
}

export const QrForm = ({ action, pending }: QrFormProps) => {
  const data = useMemo(
    () =>
      [
        {
          label: "Unique ID",
          name: "sid",
          type: "text",
          placeholder: "Enter unique ID",
          required: true,
        },
        {
          label: "Location",
          name: "location",
          type: "text",
          placeholder: "Enter location identifier",
          required: true,
        },
        {
          label: "Area",
          name: "area",
          type: "text",
          placeholder: "Enter Area identifier",
          required: true,
        },
      ] as IFieldItem[],
    [],
  );
  return (
    <div className="bg-white p-1.5 pb-0 rounded-[42px]">
      <form action={action}>
        <div className="py-6 px-4 border-gray-500 border space-y-6 bg-gray-300 rounded-b-[20px] rounded-t-[38px]">
          <h2 className="text-lg font-medium tracking-tighter mb-4 text-slate-700">
            Enter QR details.
          </h2>
          <HyperList
            keyId="id"
            container="space-y-6"
            data={data}
            component={FieldItem}
          />
        </div>

        <div className="h-24 flex items-center justify-end px-4">
          <SubmitButton pending={pending} />
        </div>
      </form>
    </div>
  );
};
