"use server";

import { headers } from "next/headers";

export const getUrl = async () => {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = headers().get("host");
  return `${protocol}://${host}`;
};

export const formatedString = (string) => {
  const formatedData = string.trim().toLowerCase();
  return formatedData;
};
