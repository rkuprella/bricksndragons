export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Bricks & Dragons - A Modular LEGO® Dungeon System",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "description",
        name: "description",
        content:
          "Explore modular micro-scale dungeons built with LEGO® bricks, fully customizable, compatible with LEGO® heroica and micro RPG miniatures"
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "Bricks & Dragons - A Modular LEGO® Dungeon System"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "/images/og-bricksndragons.jpg"
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Explore modular micro-scale dungeons built with LEGO® bricks, fully customizable, compatible with LEGO® heroica and micro RPG miniatures"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://www.bricksndragons.com"
      },
      {
        hid: "twitter:card",
        property: "twitter:card",
        content: "summary_large_image"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxt/image"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/gtm"
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: "Bricks & Dragons",
      lang: "en",
      display: "fullscreen",
      title: "Bricks & Dragons - A Modular Dungeon System",
      "og:title": "Bricks & Dragons - A Modular Dungeon System",
      description:
        "Explore modular micro-scale dungeons built with LEGO® bricks, fully customizable, compatible with LEGO® heroica and standard RPG miniatures",
      "og:description":
        "Explore modular micro-scale dungeons built with LEGO® bricks, fully customizable, compatible with LEGO® heroica and standard RPG miniatures",
      theme_color: "#da730a",
      background_color: "#da730a",
      short_name: "bricksanddragons",
      icons: [
        {
          src: "/icon.png",
          size: "512x512",
          type: "image/png"
        }
      ]
    }
  },

  gtm: {
    id: "GTM-5NS2SQL"
    // autoInit: false
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
