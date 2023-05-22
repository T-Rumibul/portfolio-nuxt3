<template lang="pug">
div
    h1 Portfolio
</template>

<script setup lang="ts">
import { ChooseSlideSide } from "@/helpers";

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
div
    background-color: #222
    width: 100vw
    height: 100vh
    h1
        margin: 0
</style>
