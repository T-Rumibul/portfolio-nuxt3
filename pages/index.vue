<template lang="pug">
div.container
    PtsAnimatedLines(class="animated-background")
    div.text-container
        p Hi there!
        h1 I'm 
            DynamicText(:text="dynamicText" :speed="100" class="dynamic-text")
        h2 I'm a Junior Front-End Developer.
            span To learn more about me or view my portfolio click one of the buttons below or use the nav menu at the top left corner.
        div.button-container
            UIButtonsButton(:to="'/about'"
            :hover-fill="'#555'"
            :bg="'#2196f3'"
            :icon-name="'user'"
            :icon-size="20"
            ) My Resume
            UIButtonsButton(:to="'/portfolio'" 
            :hover-fill="'#2196f3'"
            :button-bg="'transparent'"
            :icon-name="'portfolio'"
            :icon-size="20"
            ) My Portfolio
</template>

<script setup lang="ts">
import { chooseSlideSide } from "@/assets";
definePageMeta({
  pageTransition: {
    name: "slide-left",
  },
  middleware(to, from) {
    chooseSlideSide(to, from);
  },
});

const dynamicText = ref(["Andrey", "A begginer developer"]);
</script>

<style lang="sass" scoped>
.animated-background
    width: 100%
    height: 100%
    z-index: 2
    position: absolute
    left: 0
    top: 0
    overflow: hidden
.container
    display: flex
    align-items: center
    justify-content: center
    height: 100vh
.text-container
    position: relative
    z-index: 5
    color: #fff
    max-width: toRem(550)

.text-container
    p,h1,h2
        margin: 0
    p
        font-size: toRem(19)
        text-transform: uppercase
    h1
        font-size: toRem(42)
        font-family: "OS"
        font-weight: 500
        text-transform: uppercase
        white-space: nowrap
    h2
        font-weight: 400
        font-size: toRem(16)
        font-family: "OS"
        margin: toRem(15) 0
        span
            display: block

    .dynamic-text
        color: #2196f3
.button-container
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: center
    margin-top: toRem(10)
</style>
