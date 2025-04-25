import { useCallback, useState } from "react";
import { UserInfoSchema, UserType } from "../schema";
import { addNewData } from "@/lib/firebase/add-user-doc";
import { gsec } from "@/app/_lib/utils";
import toast from "react-hot-toast";
import type { Device, Station } from "@/app/types";

export const useUserForm = (station: Station, device: Device) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (_: UserType | null, fd: FormData) => {
      const validated = UserInfoSchema.safeParse({
        name: fd.get("name") as string,
        tel: fd.get("tel") as string,
        email: fd.get("email") as string,
      });

      if (validated.error) {
        console.log(validated.error);
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
        setIsSubmitted(true);
      }

      return validated.data;
    },
    [station, device],
  );

  return {
    isSubmitted,
    handleSubmit,
  };
};
