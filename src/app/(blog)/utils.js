export const getCategoryStyle = (category) => {
  const styles = {
    Technology: "bg-blue-100 text-blue-700",
    Food: "bg-orange-100 text-orange-700",
    Automobile: "bg-red-100 text-red-700",
  };
  return styles[category] || "bg-gray-100 text-gray-700";
};
