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
import { cn } from "@/lib/utils";

interface UserFormProps {
  station: Record<string, keyof Station> | null;
  device: DeviceProfile | null;
}

export default function UserForm({ station, device }: UserFormProps) {
  const [, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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

      const promise = addNewData(gsec(), {
        user: validated.data,
        station,
        device,
      });

      const result = await toast.promise(promise, {
        loading: "Submitting",
        success: "Sumitted Successfully!",
        error: "Failed to submit.",
      });

      if (result === "success") {
        setSubmitted(true);
      }

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
          label: "phone",
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
    <div className="bg-gradient-to-b from-gray-100 via-gray-400 to-gray-400 p-1.5 pb-0 rounded-[42px]">
      <form action={action}>
        <div className="pt-5 pb-3 px-3 border-gray-300 border space-y-4 bg-gray-100 rounded-b-3xl rounded-t-[38px]">
          <h2 className="text-lg ps-2 font-semibold font-sans tracking-tight mb-4 text-hot-dark">
            {submitted
              ? "You're all set!"
              : "Please enter your contact details."}
          </h2>
          {/* TODO: Implement error handling */}
          {submitted ? (
            <div className="text-center flex flex-col text-hot-dark justify-center p-4 bg-white rounded-xl font-sans">
              <p className="">Your information has been</p>
              <p>submitted successfully.</p>
            </div>
          ) : (
            <HyperList
              keyId="id"
              data={user_fields}
              container="space-y-4"
              component={FieldItem}
            />
          )}

          <Inquiry />
        </div>

        <div className="h-20 flex items-end justify-between ps-3 pe-1 pb-2">
          <div className="space-y-1">
            <div className="text-xs px-0.5 font-sans text-orange-50 tracking-tight">
              <span className="-ml-0.5 px-[5px] bg-gray-500/10 py-0.5 rounded-sm shadow-inner shadow-hot-dark/10">
                {submitted
                  ? "Call and Chat is now available."
                  : "Submit your info to activate."}
              </span>
            </div>
            <div
              className={cn(
                "flex flex-row items-center justify-center",
                "h-10 gap-0 opacity-40 pointer-events-none",
                { "opacity-100 pointer-events-auto": submitted },
              )}
            >
              <div className="h-9 rounded-bl-3xl border-y border-s border-hot-dark rounded-tl-md text-green-500 font-quick font-bold gap-x-1.5 ps-2 pe-2.5 bg-white flex items-center justify-center">
                <Icon name="phone" className="mt-0.5 select-none" />
                <a
                  href="tel:+639275770777"
                  className="text-[15px] drop-shadow-xs tracking-tight"
                >
                  Call
                </a>
              </div>
              <div className="h-9 w-0.5 bg-gray-100 border-y border-hot-dark" />
              <div className="h-9 rounded-lg rounded-e-full border-y border-e border-hot-dark text-blue-500 font-quick font-semibold gap-x-1.5 ps-2 pe-2.5 bg-white flex items-center justify-center">
                <Icon name="messenger" className="mt-0" />
                <a
                  href="https://m.me/Bestdealinsuranceph"
                  className="text-[15px] tracking-tight"
                >
                  Chat
                </a>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={pending || submitted}
            className="w-fit ps-8 border pe-10 h-12 text-[15px] font-semibold font-quick rounded-br-[38px] rounded-tr-lg rounded-tl-xl rounded-bl-xl text-white bg-hot-dark hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 border-gray-200 shadow-inner shadow-gray-400/80"
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
