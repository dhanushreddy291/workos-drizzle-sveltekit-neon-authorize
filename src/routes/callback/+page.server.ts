import { redirect } from "@sveltejs/kit";
import { workos } from "$lib/server/auth";
import { WORKOS_CLIENT_ID, WORKOS_COOKIE_PASSWORD } from "$env/static/private";

export async function load({ url, cookies }) {
  // The authorization code returned by AuthKit
  const code = url.searchParams.get("code");

  if (!code) {
    console.error("No code provided in the URL");
    return;
  }

  try {
    const { sealedSession } = await workos.userManagement.authenticateWithCode({
      code,
      clientId: WORKOS_CLIENT_ID,
      session: {
        sealSession: true,
        cookiePassword: WORKOS_COOKIE_PASSWORD,
      },
    });

    if (!sealedSession) {
      throw new Error("No sealed session returned by WorkOS");
    }

    cookies.set("wos-session", sealedSession, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    // Redirect the user to the homepage
    return redirect(307, "/");
  } catch (error) {
    return redirect(307, "/");
  }
}
