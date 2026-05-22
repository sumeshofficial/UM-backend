import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  POSTGRES_URL: z.string().min(1, "POSTGRES_URL is required"),
  MONGODB_URL: z.string().min(1, "MONGODB_URL is required"),
  REDIS_HOST: z.string().min(1, "REDIS_HOST is required"),
  REDIS_PORT: z.coerce.number().int().min(1).max(65535).default(6379),
  BULLMQ_ATTEMPTS: z.coerce.number().int().min(1).default(3),
  BULLMQ_BACKOFF_DELAY: z.coerce.number().min(100).default(1000),
  BULLMQ_REMOVE_ON_COMPLETE: z.coerce.number().int().min(1).default(100),
  BULLMQ_REMOVE_ON_FAIL: z.coerce.number().int().min(1).default(50),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const formattedErrors = parsedEnv.error.issues.map((issue) => { 
    const path = issue.path.join(".");
    return `- ${path}: ${issue.message}`;
  });

  throw new Error(
    `Invalid environment variables:\n${formattedErrors.join("\n")}`
  );
}

export const env = parsedEnv.data;

export type Env = z.infer<typeof envSchema>;
