"use server";

import { getUrl } from "@/app/api/util/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function postData(formData, editorContent, imageUrl, pathname) {
  const rawFormData = Object.fromEntries(formData);

  const id = pathname;
  rawFormData.summary = editorContent;
  if (imageUrl) {
    rawFormData.imageUrl = imageUrl;
  }

  const url = await getUrl();

  const fetchData = await fetch(`${url}/api/post/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!fetchData.ok) {
    throw new Error("Error al crear el post");
  }

  revalidatePath(`/${pathname}/blog`);
}

export async function login(formData) {
  const rawFormData = Object.fromEntries(formData);

  const url = await getUrl();

  const fetchData = await fetch(`${url}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!fetchData.ok) {
    throw new Error("Error al iniciar sesión");
  }

  const { authenticated, message, token, domain } = await fetchData.json();
  cookies().set("token", token, { maxAge: 3600 });
  cookies().set("domain", domain, { maxAge: 3600 });
  return { authenticated, domain, message };
}

export async function logout() {
  cookies().delete("token");
  cookies().delete("domain");
  redirect("/auth/login");
}

export async function register(formData) {
  const rawFormData = Object.fromEntries(formData);

  const url = await getUrl();

  const fetchData = await fetch(`${url}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!fetchData.ok) {
    throw new Error("Error al registrar el usuario");
  }

  const res = await fetchData.json();
  return res;
}

export async function sendEmail(formData, pathname) {
  const rawFormData = Object.fromEntries(formData);

  const url = await getUrl();

  const fetchData = await fetch(`${url}/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!fetchData.ok) {
    throw new Error("Error al enviar el email");
  }

  redirect(`/${pathname}`);
}

export async function postImage(fileData) {
  const uint8Array = new Uint8Array(fileData.data);
  const blob = new Blob([uint8Array], { type: fileData.type });
  const url = await getUrl();
  const fetchData = await fetch(`${url}/api/image?filename=${fileData.name}`, {
    method: "POST",
    body: blob,
  });

  if (!fetchData.ok) {
    throw new Error("Error al subir la imagen");
  }

  const response = await fetchData.json();

  return response;
}

export const getDataById = async (path, id) => {
  const url = await getUrl();
  const fetchData = await fetch(`${url}/api/${path}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!fetchData.ok) {
    throw new Error("Error al obtener el post");
  }

  const response = await fetchData.json();
  return response;
};

export const getClientInfoByDomain = async (domain) => {
  const url = await getUrl();
  const fetchData = await fetch(`${url}/api/clientByDomain/${domain}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "default",
  });

  if (!fetchData.ok) {
    throw new Error("Error al obtener el cliente");
  }

  const response = await fetchData.json();
  return response;
};

export const deleteData = async (path) => {
  const url = await getUrl();
  const deleteData = await fetch(`${url}/api/${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!deleteData.ok) {
    throw new Error("Error al eliminar los posts y clientes");
  }

  const response = await deleteData.json();
  return response;
};

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
    throw new Error("Error al eliminar el post");
  }

  revalidatePath(`/${pathname}/blog`);
  redirect(`/${pathname}/blog`);
};

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
    throw new Error("Error al editar el post");
  }

  revalidatePath(`${pathname}/blog/${id}`);
};

export const getData = async (path, domain) => {
  const url = await getUrl();
  const fetchData = await fetch(`${url}/api/${path}/${domain}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!fetchData.ok) {
    throw new Error("Error al obtener los posts");
  }

  const response = await fetchData.json();
  return response;
};
