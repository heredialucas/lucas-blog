"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
export async function saveTheme(theme, domain) {
  try {
    const user = await prisma.client.update({
      where: {
        domain,
      },
      data: {
        theme,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    cookies().set("theme", theme, { maxAge: 3600 });

    return { success: true, user, message: "Theme saved successfully" };
  } catch (error) {
    console.error("Failed to save theme:", error);
    return { success: false, message: "Failed to save theme" };
  }
}
