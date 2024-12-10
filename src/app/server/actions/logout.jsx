"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(domain) {
  (await cookies()).delete("tokenBlogui");
  (await cookies()).delete("domain");
  redirect(`/${domain}`);
}
