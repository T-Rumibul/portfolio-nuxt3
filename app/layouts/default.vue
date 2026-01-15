<template>
  <div class="relative min-w-screen min-h-screen">
    <Head>
      <Link sizes="16x16" rel="icon" href="/favicon-16x16.ico" />
      <Link sizes="32x32" rel="icon" href="/favicon.ico" />
      <Link sizes="96x96" rel="icon" href="/favicon-96x96.ico" />
    </Head>
    
    <CommonMenu :routes="routes" :localList="localList" class="fixed top-5 left-5 z-10" />
    <div class="absolute inset-0 bg-black/60 backdrop-blur-xs -z-1"></div>
    <video autoplay muted loop class="absolute w-full h-full top-0 left-0 -z-10 object-fill">
      <source src='/assets/video/code_typing_3.webm' type="video/webm">
    </video>
    <slot />
    <CommonNotification :duration="2000" />
  </div>
</template>

<script setup lang="ts">

const routes = [{
  icon: 'mdi:home',
  to: '/',
  name: 'Home',
  selected: true
},
{
  icon: 'mdi:account',
  to: '/resume',
  name: 'Resume'
},
{
  icon: 'mdi:folder',
  to: '/portfolio',
  name: 'Portfolio'
}
]
const localList: { code: 'en' | 'ru' | 'uk', name: string }[] = [
  {
    code: 'en',
    name: 'EN'
  },
  {
    code: 'ru',
    name: 'RU'
  },
  {
    code: 'uk',
    name: 'UA'
  }
]
</script>
