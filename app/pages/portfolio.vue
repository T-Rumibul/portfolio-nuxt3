<template>
  <div class="portfolio">
    <Head>
      <Title>Portfolio | Junior Front-End Developer</Title>
    </Head>

    <h1>{{ $t('portfolio_title') }}</h1>

    <LoadingCircle v-if="!projects" class="loading" />

    <div class="projects">
      <Project v-for="project in projects" v-bind="project" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/typing';

const { data } = useFetch("/api/projects");
const projects = ref(data) as Ref<Project[] | null>;
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
