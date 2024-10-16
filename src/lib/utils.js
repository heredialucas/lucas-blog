import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatText(text) {
  if (text.length > 20) {
    return `${text.slice(0, 20)}...`;
  }
  return text;
}

export function extractDate(isoString) {
  // Crea un nuevo objeto Date a partir de la cadena ISO
  const date = new Date(isoString);

  // Formatea la fecha como YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() devuelve el mes indexado desde 0
  const day = String(date.getDate()).padStart(2, "0");

  // Retorna la fecha en formato YYYY-MM-DD
  return `${year}-${month}-${day}`;
}
