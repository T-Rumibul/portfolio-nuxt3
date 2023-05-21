<template lang="pug">
div
    h1 Contacts
</template>

<script setup lang="ts">
import { chooseSlideSide } from '@/assets';

definePageMeta({
    pageTransition: {
        name: "slide-left"
    },
    middleware(to, from) {
        chooseSlideSide(to, from)
    }
})
</script>

<style lang="sass" scoped>
div
    background-color: #222
    width: 100vw
    height: 100vh
    h1
        margin: 0
</style>