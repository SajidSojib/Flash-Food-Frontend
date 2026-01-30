import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    FRONTEND_URL: z.url(),
    BACKEND_URL: z.url(),
    API_URL: z.url(),
  },
  runtimeEnv: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    API_URL: process.env.API_URL,
  },
});
