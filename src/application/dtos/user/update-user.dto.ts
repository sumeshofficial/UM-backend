import { z } from "zod";

export const UpdateUserDtoSchema = z.object({
  userId: z.string(),
  status: z.enum(["ACTIVE", "BLOCKED"]),
});

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
