import { cookies } from "next/headers";

export async function useCookie() {
  const cookie = cookies().has("tokenBlogui");
  const domain = cookies().get("domain");
  const theme = cookies().get("theme");

  return { cookie, domain, theme };
}
