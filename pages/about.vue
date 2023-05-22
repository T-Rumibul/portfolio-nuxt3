<template lang="pug">
div
    div(class="photoCredentialsContainer")
        picture(class="photo")
            source(srcset="~assets/images/photo.webp"
            type="image/webp")
            source(srcset="~assets/images/photo.png" type="image/png")
            img(src="~assets/images/photo.png" alt="photo")
        div(class="credentials")
            h1 Andrey K.
            h2 Junior Front-End Developer
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
.photoCredentialsContainer
    display: flex
    max-width: toRem(1000)
    margin: 0 auto
    margin-top: toRem(80)
    align-items: center
.photo
    width: toRem(200)
    height: toRem(200)
    display: flex
    border-radius: 9999px
    overflow: hidden
.credentials
    h1
        color: var(--text-primary)
        text-transform: uppercase
        font-family: "MS"
    h2
        color: var(--text-secondary)
    margin-left: toRem(40)
</style>
