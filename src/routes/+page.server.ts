import { getDb } from "$lib/server/db";
import { posts } from "$lib/server/db/schema";

export async function load() {
  const db = getDb("admin");

  const results = await db.select().from(posts);
  return {
    posts: results,
  };
}
