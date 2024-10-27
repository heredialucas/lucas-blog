/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      "cupcake",
      "bumblebee",
      "retro",
      "cyberpunk",
      "valentine",
      {
        darkMode: {
          primary: "#a991f7", // Color primario para el modo oscuro
          secondary: "#f6d860", // Color secundario
          accent: "#37cdbe", // Color de acento
          neutral: "#3d4451", // Color neutral
          "base-100": "#1f2937", // Fondo oscuro
        },
      },
    ],
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
};
