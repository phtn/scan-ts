import { useCallback, useState } from "react";
import { addSub } from "@/lib/firebase/add-sub";
import { gsec } from "@/app/_lib/utils";
import toast from "react-hot-toast";
import type { Device, AffiliateId } from "@/app/types";
import { InquiryFormSchema, InquiryFormType } from "../schema";

export const useInquiry = (affiliateId: AffiliateId, device: Device) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (_: InquiryFormType | null, fd: FormData) => {
      const validated = InquiryFormSchema.safeParse({
        name: fd.get("name") as string,
        tel: fd.get("tel") as string,
        email: fd.get("email") as string,
        inquiry: fd.get("inquiry") as string,
      });

      console.log(validated.data);

      if (validated.error) {
        console.log(validated.error);
        return null;
      }

      const promise = addSub(gsec(), {
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
