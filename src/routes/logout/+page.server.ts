import { redirect } from "@sveltejs/kit";
import { getLogoutUrl } from "$lib/server/auth";

export async function load({ cookies }) {
  const sessionData = cookies.get("wos-session");

  let logoutUrl = "/";
  if (!sessionData) {
    return redirect(307, "/");
  }
  try {
    logoutUrl = await getLogoutUrl(sessionData);
  } catch (error) {
    console.error("Error logging out", error);
  }

  cookies.delete("wos-session", {
    path: "/",
  });
  redirect(307, logoutUrl);
}
