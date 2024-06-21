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
        yellow: "var(--yellow-color)",
        orange: "var(--orange-color)",
        "orange-lighter": "#FFBF1F",
        "purple-lighter": "#D9C8FF",
      },
      backgroundImage: {
        "gradient-accent-lighter":
          "linear-gradient(180deg, #FF5348 -2.68%, #FF7D75 99.94%)",
        "gradient-accent-top":
          "linear-gradient(180deg, #FF5348 -2.68%, #FF7D75 99.94%)",
        "gradient-accent":
          "linear-gradient(136deg, #674290 0%, #36308F 98.11%)",
        "gradient-secondary":
          "linear-gradient(170deg, #D20094 0%, #8120AF 98.11%)",
        "gradient-secondary-lighter":
          "linear-gradient(136deg, rgba(239, 198, 37, .5) 0%, rgba(226, 188, 38, .5) 98.11%)",
        "gradient-primary":
          "linear-gradient(136deg, #674290 0%, #36308F 98.11%)",
        "gradient-primary-lighter":
          "linear-gradient(136deg, #F1F1F1 0%, #F1F1F1 98.11%)",
        "gradient-background":
          "linear-gradient(180deg, #FEFFDC 0%, #FFFFF3 59.79%, #E5E5C7 94.91%)",
      },
    },
  },
  plugins: [],
};
