export const getCategoryStyle = (category) => {
  const styles = {
    Technology: "bg-blue-100 text-blue-700",
    Food: "bg-orange-100 text-orange-700",
    Automobile: "bg-red-100 text-red-700",
  };
  return styles[category] || "bg-gray-100 text-gray-700";
};

export const formatDate = (isoString) => {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

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
