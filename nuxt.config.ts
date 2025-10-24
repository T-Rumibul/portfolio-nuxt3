// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-09-19",
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["~/assets/css/normalize.css"],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/css/global.sass" as *;',
        },
      },
    },
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxtjs/i18n",
    "@rah-emil/vite-plugin-vue-type-imports/nuxt",
    "nuxt-icons",
    "@nuxtjs/critters"
  ],
  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
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
  components: {
    dirs: ["~/components"],
  },
  nitro: {
    preset: "netlify",
  },
});