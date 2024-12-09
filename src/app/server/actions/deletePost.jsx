"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const deletePost = async (id, domain) => {
  try {
    const post = await prisma.post.delete({ where: { id: parseInt(id) } });

    revalidatePath(`/${domain}/blog`);
    return {
      success: true,
      post,
      message: "Post deleted successfully",
    };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return {
      success: false,
      message: "Failed to delete post",
    };
  } finally {
    await prisma.$disconnect();
  }
};
