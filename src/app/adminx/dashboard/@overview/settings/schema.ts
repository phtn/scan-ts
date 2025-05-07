import { z } from "zod";

export const SettingsFormSchema = z.object({
  phone: z.string().max(15),
  messenger: z.string().max(20),
});
export type SettingsFormType = z.infer<typeof SettingsFormSchema>;

export const settingsForm = {
  defaultValues: {
    phone: "09156984277",
    messenger: "",
  } as SettingsFormType,
  validators: {
    onChange: SettingsFormSchema,
  },
};
