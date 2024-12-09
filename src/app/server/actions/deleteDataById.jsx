"use server";

export const deleteDataById = async (path, id, pathname) => {
  const url = await getUrl();
  const deleteData = await fetch(`${url}/api/${path}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!deleteData.ok) {
    throw new Error("Failed to delete post");
  }

  revalidatePath(`/${pathname}/blog`);
  return deleteData.json();
};
