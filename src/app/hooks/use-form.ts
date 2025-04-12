import { useCallback } from "react";
import { UserType } from "../_components/user-form";
import { DeviceProfile } from "../_lib/utils";
import { Station } from "../types";
import { getAPI } from "../actions";

export interface SubmitPayload {
  user: UserType;
  station: Record<string, keyof Station> | null;
  device: DeviceProfile | null;
}

export const useForm = (endpoint: string) => {
  const submitFn = useCallback(
    async (payload: SubmitPayload) => {
      const apiKey = await getAPI();
      try {
        const response = await fetch(`/api/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey ?? "not-available",
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
