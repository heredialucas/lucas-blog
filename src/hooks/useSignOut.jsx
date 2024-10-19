import { cookies } from "next/headers";

export async function useCookie() {
  const cookie = cookies().has("token");

  return cookie;
}
