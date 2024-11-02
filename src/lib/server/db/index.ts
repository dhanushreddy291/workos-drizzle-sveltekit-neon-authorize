import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  DATABASE_ANONYMOUS_URL,
  DATABASE_URL,
  DATABASE_AUTHENTICATED_URL,
} from "$env/static/private";

export function getDb(type: "admin" | "anon" | "auth", authToken?: string) {
  if (type === "admin") {
    return drizzle(neon(DATABASE_URL));
  } else if (!authToken) {
    throw new Error("Missing authToken for authenticated database");
  } else if (type === "anon") {
    return drizzle(neon(DATABASE_ANONYMOUS_URL, { authToken }));
  }
  return drizzle(neon(DATABASE_AUTHENTICATED_URL, { authToken }));
}
