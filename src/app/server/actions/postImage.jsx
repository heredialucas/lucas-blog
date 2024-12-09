"use server";

import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function postImage(fileData) {
  const uint8Array = new Uint8Array(fileData.data);
  const blob = new Blob([uint8Array], { type: fileData.type });

  try {
    const blobUploaded = await put(fileData.name, blob, {
      access: "public",
    });
    return { success: true, blobUploaded };
  } catch (error) {
    console.log(error);
    return { success: false };
  } finally {
    await prisma.$disconnect();
  }
}
