<template>
  <div class="portfolio">

    <h1 class="text-3xl font-bold text-base-content text-center uppercase pt-20 pb-12 m-0">{{ $t('portfolio_title') }}</h1>

    <PortfolioLoadingCircle v-if="!projects" class="loading" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6" v-else>
      <PortfolioProject v-for="project in projects" v-bind="project"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProject } from '~/../typing';

const projects = ref([]) as Ref<IProject[]>;
const data = await useProjectsData()
projects.value = data as IProject[];
</script>

<style lang="sass" scoped>
.portfolio
  min-height: 100vh
    
.loading
  position: absolute
  top: calc(50% - toRem(58))
  left: calc(50% - toRem(58))
</style>
