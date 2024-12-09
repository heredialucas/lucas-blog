"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClientInfoByDomain = async (domain) => {
  try {
    const client = await prisma.client.findFirst({
      where: { domain },
    });

    return { success: true, client };
  } catch (error) {
    console.error("Failed to get client:", error);
    return { success: false };
  } finally {
    await prisma.$disconnect();
  }
};
