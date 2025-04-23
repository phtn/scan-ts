import { addNewData } from "@/lib/firebase/add-user-doc";
import { HyperList } from "@/ui/hyper-list";
import { useActionState, useCallback, useMemo, useState } from "react";
import { z } from "zod";
import { gsec, type DeviceProfile } from "../_lib/utils";
import type { Station } from "../types";
import toast from "react-hot-toast";
import { FieldItem, IFieldItem } from "./input-field";
import Inquiry from "@/app/inquiry";
import { Icon } from "@/lib/icons";

interface UserFormProps {
  station: Record<string, keyof Station> | null;
  device: DeviceProfile | null;
}

export default function UserForm({ station, device }: UserFormProps) {
  const [, setError] = useState<string | null>(null);

  const initialState = {
    name: "",
    tel: "",
    email: "",
  };

  const handleSubmit = useCallback(
    async (_: UserType | null, fd: FormData) => {
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

      const promise = addNewData(gsec(), {
        user: validated.data,
        station,
        device,
      });

      await toast.promise(promise, {
        loading: "Submitting",
        success: "Sumitted Successfully!",
        error: "Failed to submit.",
      });

      return validated.data;
    },
    [station, device],
  );

  const [state, action, pending] = useActionState(handleSubmit, initialState);

  const user_fields = useMemo(
    () =>
      [
        {
          id: "name",
          name: "name",
          label: "name",
          value: state?.name,
          required: true,
        },
        {
          id: "tel",
          name: "tel",
          label: "tel",
          value: state?.tel,
        },
        {
          id: "email",
          name: "email",
          label: "email",
          value: state?.email,
        },
      ] as IFieldItem[],
    [state],
  );

  return (
    <div className="bg-gray-300 p-1.5 pb-0 rounded-[42px]">
      <form action={action}>
        <div className="py-5 px-3 border-gray-300 border space-y-4 bg-gray-100 rounded-b-3xl rounded-t-[38px]">
          <h2 className="text-lg ps-2 font-semibold font-quick tracking-tighter mb-4 text-hot-dark">
            Please enter your contact details.
          </h2>
          {/* TODO: Implement error handling */}
          {true ? (
            <HyperList
              keyId="id"
              data={user_fields}
              container="space-y-4"
              component={FieldItem}
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

          <Inquiry />
        </div>

        <div className="h-20 flex items-center justify-between gap-3 px-3">
          <div className="h-14 gap-4 flex flex-row items-center justify-center">
            <div className="h-10 rounded-3xl text-green-500 font-quick font-bold gap-x-1.5 ps-2 pe-2.5 bg-white flex items-center justify-center">
              <Icon name="phone" className="mt-0.5 select-none" />
              <a href="tel:+639275770777" className="text-[15px]">
                Call
              </a>
            </div>
            <div className="h-10 rounded-3xl text-blue-500 font-quick font-semibold gap-x-1.5 ps-2 pe-2.5 bg-white flex items-center justify-center">
              <Icon name="messenger" className="mt-0" />
              <a
                href="https://m.me/Bestdealinsuranceph"
                className="text-[15px]"
              >
                Chat
              </a>
            </div>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-fit px-6 h-12 text-[15px] font-semibold font-quick rounded-full border-transparent text-white bg-hot-dark hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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

/*

{error && (
  <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
    {error}
  </div>
)}
*/
