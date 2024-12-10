"use server";

import { getUrl } from "@/app/api/util/utils";
import { cookies } from "next/headers";

export async function login(formData) {
  const rawFormData = Object.fromEntries(formData);

  const url = await getUrl();

  const fetchData = await fetch(`${url}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify(rawFormData),
  });

  if (!fetchData.ok) {
    throw new Error("Failed to login");
  }

  const { authenticated, message, tokenBlogui, domain, theme } =
    await fetchData.json();
  if (authenticated) {
    (await cookies()).set("tokenBlogui", tokenBlogui, { maxAge: 3600 });
    (await cookies()).set("domain", domain, { maxAge: 3600 });
    (await cookies()).set("theme", theme, { maxAge: 3600 });
  }
  return { authenticated, domain, message };
}
