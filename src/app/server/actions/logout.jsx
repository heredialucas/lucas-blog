"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(domain) {
  cookies().delete("tokenBlogui");
  cookies().delete("domain");
  redirect(`/${domain}`);
}
