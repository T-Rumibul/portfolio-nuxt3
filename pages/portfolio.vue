<template lang="pug">

div.portfolio

    Head
      Title Portfolio | Junior Front-End Developer

    h1 {{ $t('portfolio_title') }}

    LoadingCircle(v-if="!projects" class="loading")

    div(class="projects")
      Project(v-for="project in projects" :="project")

</template>

<script setup lang="ts">
const { data } = useFetch("/api/projects");
const projects = ref(data);
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
  
.loading
  position: absolute
  top: calc(50% - toRem(58))
  left: calc(50% - toRem(58))
</style>
