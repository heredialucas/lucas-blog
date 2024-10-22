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

// Validation functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "Please enter a valid email address";
};

export const validateFirstName = (name) => {
  return name.length >= 2
    ? ""
    : `First Name must be at least 2 characters long`;
};

export const validateLastName = (name) => {
  return name.length >= 2 ? "" : `Last Name must be at least 2 characters long`;
};

export const validateDomain = (domain) => {
  return domain.length >= 3 ? "" : "Domain must be at least 3 characters long";
};

export const validateHero = (hero) => {
  if (hero.length < 200) return " Hero must be at least 200 characters long";
  if (hero.length > 500) return " Hero must be less than 500 characters long";

  return "";
};

export const validateResumeLink = (url) => {
  return url ? "" : "Resume link is required";
};

const validateJobTitle = (title) => {
  return title.length >= 3
    ? ""
    : "Job title must be at least 3 characters long";
};

export const validateJobDates = (startDate, endDate) => {
  if (!startDate) return "Start date is required";
  if (!endDate && !jobs[0].isCurrent) return "End date is required";

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return "End date cannot be before start date";
  }
  return "";
};
