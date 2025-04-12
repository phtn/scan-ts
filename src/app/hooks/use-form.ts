import { useCallback } from "react";
import { UserType } from "../_components/user-form";
import { DeviceProfile } from "../_lib/utils";
import { Station } from "../types";

export interface SubmitPayload {
  user: UserType;
  station: Record<string, keyof Station> | null;
  device: DeviceProfile | null;
}

export const useForm = (endpoint: string) => {
  const submitFn = useCallback(
    async (payload: SubmitPayload) => {
      try {
        const response = await fetch(`/api/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.RE_UP_API_KEY!,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
      } catch (err) {
        console.log(err);
      }
    },
    [endpoint],
  );

  return {
    submitFn,
  };
};
