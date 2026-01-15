// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-09-19",
  runtimeConfig: {
    turnstile: {
      validateURL: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      secret: process.env.TURNSTILE_SECRET_KEY || "",
    },
    admin: {
      username: process.env.ADMIN_LOGIN || "",
      password: process.env.ADMIN_PASSWORD || "",
    },
    jwtSecret: process.env.JWT_SECRET || "",
    MONGODB_URI: process.env.MONGODB_URI || "",
    public: {
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || "",
      turnstileScript: "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss({
      optimize: {
        minify: true,
      }
      
    })
  ],
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxt/scripts",
    "motion-v/nuxt",
    "@nuxt/icon",
    '@nuxt/test-utils/module'
  ],
  i18n: {
    defaultLocale: "en",
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        file: "en-US.json",
        iso: "en-US",
      
      },
      {
        code: "ru",
        file: "ru-RU.json",
        iso: "ru-RU",
      },
      {
        code: "uk",
        file: "uk-UA.json",
        iso: "uk-UA",
      },
    ],
  },
  nitro: {
    compressPublicAssets: true
  }
});