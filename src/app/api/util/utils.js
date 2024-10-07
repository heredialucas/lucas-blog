import { headers } from "next/headers";

export const getUrl = () => {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = headers().get("host");
  return `${protocol}://${host}`;
};

export const getData = async (path) => {
  const fetchData = await fetch(`${getUrl()}/api/${path}`, {
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

export const getDataById = async (path, id) => {
  const fetchData = await fetch(`${getUrl()}/api/${path}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!fetchData.ok) {
    throw new Error("Error al obtener los post");
  }

  const response = await fetchData.json();
  return response;
};

export const deleteData = async (path) => {
  const deleteData = await fetch(`${getUrl()}/api/${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!deleteData.ok) {
    throw new Error("Error al eliminar los posts");
  }

  const response = await deleteData.json();
  return response;
};
