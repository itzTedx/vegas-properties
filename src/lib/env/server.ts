import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    PAYLOAD_SECRET: z.string(),
    AWS_BUCKET_NAME: z.string(),
    AWS_BUCKET_REGION: z.string(),
    AWS_ACCESS_KEY_ZMDEALS: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
  },

  experimental__runtimeEnv: process.env,
});
