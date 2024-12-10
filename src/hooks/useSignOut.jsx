import { cookies } from "next/headers";

export function getCookie() {
  const cookieStore = cookies();
  const cookie = cookieStore.has("tokenBlogui");
  const domain = cookieStore.get("domain");
  const theme = cookieStore.get("theme");

  return { cookie, domain, theme };
}
