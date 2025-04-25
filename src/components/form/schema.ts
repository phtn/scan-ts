import { z } from "zod";
export type UserFieldName = "name" | "tel" | "email";
export const UserInfoSchema = z.object({
  name: z.string().min(1).max(100),
  tel: z.string().max(13),
  email: z.string().email().max(255),
});
export type UserType = z.infer<typeof UserInfoSchema>;
