import { sql } from "drizzle-orm";
import { pgTable, text, integer, pgPolicy } from "drizzle-orm/pg-core";
import {
  authenticatedRole,
  anonymousRole,
  crudPolicy,
  authUid,
} from "drizzle-orm/neon";

/**
 * This defines a simple schema with two tables:
 * - users: a table of users
 * - posts: a table of social posts
 *
 * The schema has two RLS policies:
 * - users: admin-only
 * - posts: anyone can read, authenticated users can modify their own posts
 */

// private table, without RLS policies this is admin-only
// export const users = pgTable("users", {
//   userId: text("user_id").primaryKey(),
//   email: text("email").unique().notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// }).enableRLS();

// posts table with RLS policies
// - anyone can read
// - authenticated users can read any post and can modify their own posts
export const posts = pgTable(
  "posts",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    userId: text("user_id")
      .default(sql`(auth.user_id())`)
      .notNull(),
  },
  (table) => [
    // anyone (anonymous) can read
    crudPolicy({
      role: anonymousRole,
      read: true,
      modify: false,
    }),
    // authenticated users can read any post, and modify only their own posts
    crudPolicy({
      role: authenticatedRole,
      read: true,
      // `userId` column matches `auth.user_id()` allows modify
      modify: authUid(table.userId),
    }),
  ],
);
