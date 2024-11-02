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
    if (!data.get("title") || !data.get("content")) {
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

    console.log(jwt);

    const db = getDb("auth", jwt);

    const res = await db.insert(posts).values({
      content: data.get("content"),
      title: data.get("title"),
    });

    console.log(res);

    throw redirect(303, "/");
  },
};
