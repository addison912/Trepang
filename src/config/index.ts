import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });
export const __prod__ = process.env.NODE_ENV === "production";
export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  SESSION_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PW,
} = process.env;
