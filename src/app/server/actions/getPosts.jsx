
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPosts = async (domain) => {
  try {
    const posts = await prisma.post.findMany({
      where: { clientDomain: domain },
    });

    return { success: true, posts, message: "Posts fetched successfully" };
  } catch (error) {
    console.error("Failed to get posts:", error);
    return { success: false, message: "Failed to get posts" };
  } finally {
    await prisma.$disconnect();
  }
};
