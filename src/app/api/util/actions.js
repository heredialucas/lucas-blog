"use server";

import { getUrl } from "@/app/api/util/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function postData(formData, editorContent, imageUrl) {
  const rawFormData = Object.fromEntries(formData);

  rawFormData.summary = editorContent;
  if (imageUrl) {
    rawFormData.imageUrl = imageUrl;
  }

  const fetchData = await fetch(`${getUrl()}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!fetchData.ok) {
    throw new Error("Error al crear el post");
  }

  revalidatePath("/blog");
  redirect("/blog");
}

export async function sendEmail(formData) {
  const rawFormData = Object.fromEntries(formData);

  const fetchData = await fetch(`${getUrl()}/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!fetchData.ok) {
    throw new Error("Error al enviar el email");
  }

  redirect("/home");
}

export async function postImage(fileData) {
  const uint8Array = new Uint8Array(fileData.data);
  const blob = new Blob([uint8Array], { type: fileData.type });
  const fetchData = await fetch(
    `${getUrl()}/api/image?filename=${fileData.name}`,
    {
      method: "POST",
      body: blob,
    }
  );

  if (!fetchData.ok) {
    throw new Error("Error al subir la imagen");
  }

  const response = await fetchData.json();

  return response;
}
