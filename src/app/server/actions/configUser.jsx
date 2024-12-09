"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function configUser(formData, imageUrl, domain) {
  try {
    const rawFormData = Object.fromEntries(formData);

    const { image, ...rest } = rawFormData;

    const user = await prisma.client.findFirst({
      where: {
        domain,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const newUser = await prisma.client.update({
      data: {
        ...rest,
        imageUrl,
      },
      where: {
        domain,
      },
    });

    if (!newUser) {
      return { success: false, message: "User not found" };
    }

    revalidatePath(`/${domain}/jobs`);
    revalidatePath(`/config/${domain}`);

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { success: false, message: "Failed to update user" };
  } finally {
    await prisma.$disconnect();
  }
}
