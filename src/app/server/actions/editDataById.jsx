"use server";

import { revalidatePath } from "next/cache";

export const editDataById = async (formData, editorContent, id, pathname) => {
  const rawFormData = Object.fromEntries(formData);

  rawFormData.summary = editorContent;

  const url = await getUrl();

  const updateData = await fetch(`${url}/api/post/${id}`, {
    method: "PATCH",
    cache: "no-cache",
    body: JSON.stringify({ id, rawFormData }),
  });

  if (!updateData.ok) {
    throw new Error("Failed to edit post");
  }

  revalidatePath(`${pathname}/blog/${id}`);
  return updateData.json();
};
