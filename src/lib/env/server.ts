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

  createFinalSchema: (env) => {
    return z.object(env).transform((val) => {
      const { AWS_BUCKET_NAME, AWS_BUCKET_REGION } = val;

      return {
        ...val,
        AWS_BUCKET: `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com`,
      };
    });
  },

  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
