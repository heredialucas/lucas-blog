"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function postData(formData, editorContent, imageUrl, pathname) {
  const rawFormData = Object.fromEntries(formData);

  const { title, category, authorName, referencePostUrl } = rawFormData;

  try {
    const newPost = await prisma.post.create({
      data: {
        title: title,
        category: category,
        summary: editorContent,
        authorName: authorName,
        imageUrl: imageUrl,
        referencePostUrl: referencePostUrl,
        date: new Date().toISOString(),
        clientDomain: pathname,
      },
    });

    revalidatePath(`/${pathname}/blog`);

    return { success: true, newPost, message: "Post created successfully" };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, message: "Failed to create post" };
  } finally {
    await prisma.$disconnect();
  }
}
