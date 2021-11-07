const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        display: ["Bangers", "system-ui", "sans-serif"]
      },
      colors: {
        primary: colors.amber,
        gray: colors.warmGray
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: "#333",
            a: {
              color: theme("colors.blue.700"),
              "&:hover": {
                color: theme("colors.blue.600")
              }
            },
            h1: {
              color: theme("colors.blue.700")
            },
            h2: {
              color: theme("colors.blue.700"),
              fontSize: "2.5rem"
            },
            h3: {
              color: theme("colors.blue.700"),
              fontWeight: "400",
              fontSize: "2rem"
            },
            h4: {
              color: theme("colors.yellow.700"),
              fontWeight: "400",
              fontFamily: "Bangers",
              fontSize: "2rem"
            },
            h5: {
              color: theme("colors.yellow.700")
            },
            h6: {
              color: theme("colors.yellow.700")
            },
            strong: {
              color: "#222"
            }
          }
        },
        dark: {
          css: {
            color: "#bbb",
            a: {
              color: theme("colors.blue.300"),
              "&:hover": {
                color: theme("colors.blue.200")
              }
            },
            h1: {
              color: theme("colors.blue.400")
            },
            h2: {
              color: theme("colors.blue.400")
            },
            h3: {
              color: theme("colors.blue.400"),
              fontWeight: "400",
              fontSize: "2rem"
            },
            h4: {
              color: theme("colors.yellow.500")
            },
            h5: {
              color: theme("colors.yellow.500")
            },
            h6: {
              color: theme("colors.yellow.500")
            },
            strong: {
              color: "#ddd"
            }
          }
        }
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography")]
};
