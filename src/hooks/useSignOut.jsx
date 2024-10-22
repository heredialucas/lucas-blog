import { cookies } from "next/headers";

export async function useCookie() {
  const cookie = cookies().has("token");
  const domain = cookies().get("domain");

  return { cookie, domain };
}
