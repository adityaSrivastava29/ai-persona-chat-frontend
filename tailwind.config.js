/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          500: "#d6b752ff",
          600: "#bac72bff",
          700: "#494711ff",
        },
      },
    },
  },
  plugins: [],
};
