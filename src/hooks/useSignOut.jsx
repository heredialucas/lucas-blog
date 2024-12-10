import { cookies } from "next/headers";

export async function getCookie() {
  const cookieStore = await cookies();
  const cookie = cookieStore.has("tokenBlogui");
  const domain = cookieStore.get("domain");
  const theme = cookieStore.get("theme");

  return { cookie, domain, theme };
}
