<template lang="pug">
div.portfolio
    Head
      Title Portfolio | Junior Front-End Developer
    h1 {{ $t('portfolio_title') }}
    div(class="projects")
      Project(v-for="project in projects" :="project")
</template>

<script setup lang="ts">
import { ChooseSlideSide } from "@/helpers";
const { data } = useFetch("/api/projects");
const projects = ref(data);

definePageMeta({
  pageTransition: {
    name: "slide-left",
  },
  middleware(to, from) {
    ChooseSlideSide(to, from);
  },
});
</script>

<style lang="sass" scoped>
.portfolio
  min-height: 100vh
  h1
    color: var(--text-secondary)
    text-align: center
    text-transform: uppercase
    padding-top: toRem(80)
    padding-bottom: toRem(50)
    margin: 0
.projects
  display: flex
  gap: 1rem
  flex-wrap: wrap
  justify-content: center
  max-width: max-content
</style>
