const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto"],
        display: ["Bangers"]
      },
      colors: {
        primary: colors.amber,
        gray: colors.warmGray
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: "#bbb",
            a: {
              color: theme("colors.blue.300"),
              "&:hover": {
                color: theme("colors.blue.200")
              }
            },
            h1: {
              color: theme("colors.blue.500")
            },
            h2: {
              color: theme("colors.blue.400")
            },
            h3: {
              color: theme("colors.yellow.500"),
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
