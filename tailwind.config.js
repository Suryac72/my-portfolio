module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "Roboto-Slab": ["Roboto Slab", "serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  variants: {
    scrollbar: ['rounded', 'dark'],
  },
};
