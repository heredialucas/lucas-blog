"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updatePost = async (formData, editorContent, id) => {
  const { title, category, authorName, referencePostUrl } =
    Object.fromEntries(formData);

  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: title,
        category: category,
        summary: editorContent,
        authorName: authorName,
        referencePostUrl: referencePostUrl,
        date: new Date().toISOString(),
      },
    });

    return {
      success: true,
      post,
      message: "Post edited successfully",
    };
  } catch (error) {
    console.error("Failed to edit post:", error);
    return {
      success: false,
      message: "Failed to edit post",
    };
  } finally {
    await prisma.$disconnect();
  }
};
