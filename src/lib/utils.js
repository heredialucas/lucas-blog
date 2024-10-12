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
