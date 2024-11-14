import { WorkOS } from "@workos-inc/node";
import {
  WORKOS_API_KEY,
  WORKOS_CLIENT_ID,
  WORKOS_COOKIE_PASSWORD,
} from "$env/static/private";

const workos = new WorkOS(WORKOS_API_KEY, {
  clientId: WORKOS_CLIENT_ID,
});

export const getAuthURL = () => {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    provider: "authkit",
    redirectUri: "http://localhost:5173/callback",
    clientId: WORKOS_CLIENT_ID,
  });

  return authorizationUrl;
};

export const getLogoutUrl = async (sessionData: string) => {
  const session = await workos.userManagement.loadSealedSession({
    sessionData,
    cookiePassword: WORKOS_COOKIE_PASSWORD,
  });

  if (!session) {
    throw new Error("No session found for the provided session data");
  }

  const logoutUrl = session.getLogoutUrl();

  return logoutUrl;
};

export const getJWT = async (sessionData: string) => {
  const session = await workos.userManagement.loadSealedSession({
    sessionData,
    cookiePassword: WORKOS_COOKIE_PASSWORD,
  });
  let jwt;

  if (!session) {
    throw new Error("No session found for the provided session data");
  }

  const authSession = await session.authenticate();

  if (!authSession.authenticated) {
    const refreshed = await session.refresh();

    if (!refreshed.authenticated || !refreshed.session) {
      // redirect to login

      throw new Error("Failed to refresh session");
    }

    jwt = refreshed.session.accessToken;
  } else {
    // @ts-ignore – we need the JWT, please give it to us WorkOS 🥺
    const unsealed = await session.ironSessionProvider.unsealData(sessionData, {
      password: WORKOS_COOKIE_PASSWORD,
    });
    jwt = unsealed.accessToken;
  }

  return jwt;
};

export { workos };
