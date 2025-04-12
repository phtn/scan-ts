import { HyperList } from "@/ui/hyper-list";
import { useActionState, useCallback, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "../hooks/use-form";
import type { DeviceProfile } from "../_lib/utils";
import type { Station } from "../types";

interface UserFormProps {
  station: Record<string, keyof Station> | null;
  device: DeviceProfile | null;
}

export default function UserForm({ station, device }: UserFormProps) {
  const [error, setError] = useState<string | null>(null);

  const user_fields = useMemo(
    () =>
      [
        {
          id: "1",
          name: "name",
          label: "name",
        },
        {
          id: "2",
          name: "tel",
          label: "tel",
        },
        {
          id: "3",
          name: "email",
          label: "email",
        },
      ] as IFieldItem[],
    [],
  );

  const { submitFn } = useForm("/submit-user-data");

  const initialState = {
    name: "",
    tel: "",
    email: "",
  };

  const handleSubmit = useCallback(
    (_: UserType | null, fd: FormData) => {
      const validated = UserSchema.safeParse({
        name: fd.get("name") as string,
        tel: fd.get("tel") as string,
        email: fd.get("email") as string,
      });

      if (validated.error) {
        console.log(validated.error);
        setError(validated.error.message);
        return null;
      }

      console.log(validated.data, station, device);
      submitFn({ user: validated.data, station, device });

      return validated.data;
    },
    [station, device, submitFn],
  );

  const [, action, pending] = useActionState(handleSubmit, initialState);

  return (
    <div className="bg-white p-1.5 pb-0 rounded-[42px]">
      <form action={action}>
        <div className="py-6 px-4 border-gray-500 border space-y-6 bg-gray-200 rounded-b-[20px] rounded-t-[38px]">
          <h2 className="text-lg font-medium tracking-tighter mb-4 text-slate-700">
            Please enter your contact details.
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
              {error}
            </div>
          )}
          {true ? (
            <HyperList
              data={user_fields}
              component={FieldItem}
              keyId="id"
              container=" space-y-6"
            />
          ) : (
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800">
                Thank You!
              </h2>
              <p className="mt-2">
                Your information has been submitted successfully.
              </p>
            </div>
          )}
        </div>

        <div className="h-20 flex items-center justify-end px-4">
          <button
            type="submit"
            disabled={pending}
            className="w-fit px-6 h-11 text-[16px] font-semibold font-sans tracking-tighter border rounded-3xl border-transparent text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {pending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

const UserSchema = z.object({
  name: z.string().min(1).max(100),
  tel: z.string().max(13),
  email: z.string().email().max(255),
});

export type UserType = z.infer<typeof UserSchema>;

type FieldName = "name" | "tel" | "email";

interface IFieldItem extends HTMLInputElement {
  id: string;
  name: FieldName;
  label: string;
}

const FieldItem = (item: IFieldItem) => (
  <div className="relative">
    <label htmlFor="lname" className={labelClassName}>
      {item.name}
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
