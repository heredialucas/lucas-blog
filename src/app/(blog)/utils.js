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
