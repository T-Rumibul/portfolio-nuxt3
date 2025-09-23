// https://nuxt.com/docs/api/configuration/nuxt-config
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
    ],
  },
  components: {
    dirs: ["~/components"],
  },
  nitro: {
    preset: "netlify",
  },
});
