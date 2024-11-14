import { redirect } from "@sveltejs/kit";
import { getDb } from "$lib/server/db";
import { getJWT } from "$lib/server/auth";
import { posts } from "$lib/server/db/schema";

export async function load({ cookies }) {
  const sessionData = cookies.get("wos-session");

  if (!sessionData) {
    return redirect(307, "/login");
  }
}

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const content = data.get("content")?.toString();
    const title = data.get("title")?.toString();
    if (!title || !content) {
      return {
        status: 400,
        body: {
          status: "error",
          message: "title and content are required",
        },
      };
    }

    // they would have been redirected if they weren't authenticated
    const sessionData = cookies.get("wos-session") as string;

    const jwt = await getJWT(sessionData);
    const db = getDb("auth", jwt);

    const res = await db.insert(posts).values({
      content,
      title,
    });
    throw redirect(303, "/");
  },
};
