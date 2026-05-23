import { z } from "zod";

export const LoginDtoSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;