/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B3B3B",
        secondary: "#FCC822",
      },
    },
  },
  plugins: [],
};
