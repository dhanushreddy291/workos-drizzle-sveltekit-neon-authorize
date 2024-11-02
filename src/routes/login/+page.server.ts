import { redirect } from "@sveltejs/kit";
import { getAuthURL } from "$lib/server/auth";

export function load() {
  redirect(307, getAuthURL());
}
