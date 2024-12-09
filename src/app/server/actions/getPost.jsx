"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPost = async (id) => {
  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });

    return { success: true, post };
  } catch (error) {
    console.error("Failed to get post:", error);
    return { success: false };
  } finally {
    await prisma.$disconnect();
  }
};
