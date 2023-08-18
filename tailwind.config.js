const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        display: ["Bangers", "system-ui", "sans-serif"],
      },
      colors: {
        primary: colors.amber,
        gray: colors.stone,
        secondary: colors.orange,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: "#333",
            a: {
              color: "#1d4ed8",
              "&:hover": {
                color: "#2563eb",
              },
            },
            h1: {
              color: "#1d4ed8",
            },
            h2: {
              color: "#1d4ed8",
              fontSize: "2.5rem",
            },
            h3: {
              color: "#1d4ed8",
              fontWeight: "400",
              fontSize: "2rem",
            },
            h4: {
              color: "#a16207",
              fontWeight: "400",
              // fontFamily: "Bangers",
              fontSize: "2rem",
            },
            h5: {
              color: "#a16207",
            },
            h6: {
              color: "#a16207",
            },
            strong: {
              color: "#222",
            },
            "ul > li::before": {
              width: "0",
              height: "0",
              top: "auto",
              left: "auto",
            },
            "ul > li": {
              paddingLeft: "0",
            },
          },
        },
        dark: {
          css: {
            color: "#bbb",
            a: {
              color: "#93c5fd",
              "&:hover": {
                color: "#bfdbfe",
              },
            },
            h1: {
              color: "#60a5fa",
            },
            h2: {
              color: "#60a5fa",
            },
            h3: {
              color: "#60a5fa",
              fontWeight: "400",
              fontSize: "2rem",
            },
            h4: {
              color: "#eab308",
            },
            h5: {
              color: "#eab308",
            },
            h6: {
              color: "#eab308",
            },
            strong: {
              color: "#ddd",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
