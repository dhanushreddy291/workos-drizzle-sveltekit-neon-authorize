export function load({ cookies }) {
  const sessionData = cookies.get("wos-session");

  return {
    isAuthenticated: !!sessionData,
  };
}
