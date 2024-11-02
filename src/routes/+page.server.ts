import { getDb } from "$lib/server/db";
import { posts } from "$lib/server/db/schema";

export function load() {
  const db = getDb("admin");
  const results = db.select().from(posts);
  return {
    posts: results,
  };
}
