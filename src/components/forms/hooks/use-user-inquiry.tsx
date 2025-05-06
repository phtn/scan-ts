import { useCallback, useState } from "react";
import { UserInquirySchema, UserType } from "../schema";
import { addNewData } from "@/lib/firebase/add-user-doc";
import { gsec } from "@/app/_lib/utils";
import toast from "react-hot-toast";
import type { Device, AffiliateId } from "@/app/types";

export const useUserForm = (affiliateId: AffiliateId, device: Device) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (_: UserType | null, fd: FormData) => {
      const validated = UserInquirySchema.safeParse({
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
        affiliateId,
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
    [affiliateId, device],
  );

  return {
    isSubmitted,
    handleSubmit,
  };
};
