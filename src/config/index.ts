import { config } from "dotenv";
config({ path: `../../.env.${process.env.NODE_ENV || "development"}.local` });
export const __prod__ = process.env.NODE_ENV === "production";
export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  SERVER_PORT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
} = process.env;
