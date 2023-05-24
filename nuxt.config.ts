// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["~/assets/css/normalize.css"],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/css/global.sass"',
        },
      },
    },
  },
  modules: [
    "@nuxtjs/i18n",
    "@rah-emil/vite-plugin-vue-type-imports/nuxt",
    "nuxt-icons",
  ],
  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    langDir: "assets/locales",
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
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
  },
});
