// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
  },
  components: {
    dirs: ["~/components"],
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
  },
});
