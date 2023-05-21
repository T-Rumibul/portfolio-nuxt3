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
  modules: ["@rah-emil/vite-plugin-vue-type-imports/nuxt", "nuxt-icons"],
  components: {
    dirs: ["~/components"],
  },
});
