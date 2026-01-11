<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-center min-h-screen relative">

      <Head>
        <Title>Front-End Developer</Title>
      </Head>

      <div class="relative z-10 text-base-content max-w-140 mx-10 md:mx-0">
        <p class="text-[17px] md:text-[19px]  uppercase">{{ $t('home_hello') }}</p>

        <h1 class="text-[25px] md:text-[42px] uppercase font-[OS] whitespace-nowrap">
          {{ $t('home_im') }}
          <MainDynamicText :text="dynamicText" :speed="100" class="text-accent-blue" />
        </h1>

        <div class="my-4">
          <span>{{ $t("home_more") }}</span>
        </div>

        <div class="flex flex-wrap gap-5 mt-8 font-[MS] uppercase justify-center">
          <NuxtLink to="/resume">
            <motion.span initial="rest" animate="rest" while-hover="hover"
              class="min-w-[15.6rem] flex relative items-center overflow-hidden bg-accent-blue text-base-content py-2 rounded rounded-l-full rounded-r-full transition-colors justify-center">
              <span class="flex items-center">
                <Icon name="mdi:account" class="text-xl mr-2 relative z-10" />
                <span class="relative z-10">{{ $t('home_link_about') }}</span>
              </span>
              <motion.span :variants="bgMotion"
                class="-skew-x-22 uppercase absolute w-[110%] h-[112%] top-0 left-[-115%] bg-base-400" />
            </motion.span>
          </NuxtLink>
          <NuxtLink to="/portfolio">
            <motion.span initial="rest" animate="rest" while-hover="hover"
              class="min-w-[15.6rem] flex relative items-center overflow-hidden bg-transparent border border-accent-blue text-base-content py-2 rounded rounded-l-full rounded-r-full transition-colors justify-center">
              <span class="flex items-center">
                <Icon name="mdi:briefcase" class="text-xl mr-2 relative z-10" />
                <span class="relative z-10">{{ $t('home_link_portfolio') }}</span>
              </span>
              <motion.span :variants="bgMotion"
                class="-skew-x-22 absolute w-[110%] h-[112%] top-0 left-[-115%] bg-accent-blue" />
            </motion.span>
          </NuxtLink>

        </div>
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
import { motion } from 'motion-v';

const bgMotion = {
  rest: {
    left: '-115%',
  },
  hover: {
    left: "-5%",
  }
};

const renderAnimation = ref(false);
const dynamicText = ["home_dynamic_text.0", "home_dynamic_text.1"];
onMounted(() => {
  // trick to fix buging animation after language change
  renderAnimation.value = false;
  const id = setTimeout(() => {
    renderAnimation.value = true;
  }, 250);
});
</script>

<style lang="sass">


</style>
