import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatHeroText = (text) => {
  if (!text) return [];

  const sentences = text
    .split(".")
    .filter((sentence) => sentence.trim().length > 0)
    .map((sentence) => sentence.trim() + ".");

  return sentences;
};

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

export const themes = [
  { nameLower: "light", nameUpper: "Light" },
  { nameLower: "dark", nameUpper: "Dark" },
  { nameLower: "cupcake", nameUpper: "Cupcake" },
  { nameLower: "bumblebee", nameUpper: "Bumblebee" },
  { nameLower: "emerald", nameUpper: "Emerald" },
  { nameLower: "corporate", nameUpper: "Corporate" },
  { nameLower: "synthwave", nameUpper: "Synthwave" },
  { nameLower: "retro", nameUpper: "Retro" },
  { nameLower: "cyberpunk", nameUpper: "Cyberpunk" },
  { nameLower: "valentine", nameUpper: "Valentine" },
  { nameLower: "halloween", nameUpper: "Halloween" },
  { nameLower: "garden", nameUpper: "Garden" },
  { nameLower: "forest", nameUpper: "Forest" },
  { nameLower: "aqua", nameUpper: "Aqua" },
  { nameLower: "lofi", nameUpper: "Lofi" },
  { nameLower: "pastel", nameUpper: "Pastel" },
  { nameLower: "fantasy", nameUpper: "Fantasy" },
  { nameLower: "wireframe", nameUpper: "Wireframe" },
  { nameLower: "black", nameUpper: "Black" },
  { nameLower: "luxury", nameUpper: "Luxury" },
  { nameLower: "dracula", nameUpper: "Dracula" },
  { nameLower: "cmyk", nameUpper: "Cmyk" },
  { nameLower: "autumn", nameUpper: "Autumn" },
  { nameLower: "business", nameUpper: "Business" },
  { nameLower: "acid", nameUpper: "Acid" },
  { nameLower: "lemonade", nameUpper: "Lemonade" },
  { nameLower: "night", nameUpper: "Night" },
  { nameLower: "coffee", nameUpper: "Coffee" },
  { nameLower: "winter", nameUpper: "Winter" },
  { nameLower: "dim", nameUpper: "Dim" },
  { nameLower: "nord", nameUpper: "Nord" },
  { nameLower: "sunset", nameUpper: "Sunset" },
];
