import { cookies } from "next/headers";

export async function useCookie() {
  const cookie = (await cookies()).has("tokenBlogui");
  const domain = (await cookies()).get("domain");
  const theme = (await cookies()).get("theme");

  return { cookie, domain, theme };
}
