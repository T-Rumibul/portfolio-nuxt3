<template>
  <div class="min-h-screen">

    <h1 class="text-3xl font-bold text-base-content text-center uppercase pt-20 pb-12 m-0">{{ $t('portfolio_title') }}</h1>

    <CommonLoadingCircle v-if="!data" class="absolute top-[50%] left-[50%]"/>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6" v-else>
      <PortfolioProject v-for="project in data" v-bind="project"/>

    </div>
   
  </div>
</template>

<script setup lang="ts">
const data = useProjectsState()
</script>
