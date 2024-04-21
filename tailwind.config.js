/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      avant: ["Avant Garde", "sans-serif"],
      futura: ["Futura", "sans-serif"],
    },
    extend: {
      animation: {
        shake: "shake 1s ease-in-out infinite",
        slide: "slide 1s ease-in-out infinite",
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        background: "var(--background-color)",
        dark: "var(--dark-color)",
        grey: "var(--grey-color)",
      },
      backgroundImage: {
        "gradient-accent-lighter":
          "linear-gradient(180deg, #FF5348 -2.68%, #FF7D75 99.94%)",
        "gradient-accent":
          "linear-gradient(98deg, #FF5348 0.47%, #BD3A28 100%)",
        "gradient-secondary":
          "linear-gradient(136deg, #EFC625 0%, #E2BC26 98.11%)",
        "gradient-secondary-lighter":
          "linear-gradient(136deg, rgba(239, 198, 37, .5) 0%, rgba(226, 188, 38, .5) 98.11%)",
        "gradient-primary":
          "linear-gradient(136deg, #F68C23 0%, #C57526 98.11%)",
        "gradient-primary-lighter":
          "linear-gradient(136deg, rgba(246, 140, 35, 0.5) 0%, rgba(197, 117, 38, 0.5) 98.11%)",
        "gradient-background":
          "linear-gradient(180deg, #FEFFDC 0%, #FFFFF3 59.79%, #E5E5C7 94.91%)",
      },
    },
  },
  plugins: [],
};
