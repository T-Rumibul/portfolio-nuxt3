<template lang="pug">
div(class="project")
    div(class="project__bar")
        h2 {{ title }}
        i
    div(class="project__image")
        img(:src="image" alt="Project preview image")
    div(class="project__hover")
        UIButtonsButton(class="project__button") Preview
</template>

<script setup lang="ts">
import { Project } from "~/typing";

const props = defineProps<Project>();
</script>

<style lang="sass" scoped>
=circle
    height: toRem(12)
    width: toRem(12)
    display: inline-block
    background-color: #ff5f57
    border-radius: 50%
    position: absolute
    top: toRem(6)
    left: toRem(10)
.project
    overflow: hidden
    position: relative
    transition: all 0.5s
    box-shadow: 8px 8px 0px rgb(175 171 171 / 7%)
    border-radius: 0px 0px 8px 8px
    width: toRem(350)
    @media (max-width: toRem(400))
        width: toRem(300)
        margin: 0 toRem(10)
.project__bar
    background-color: #ddd
    height: toRem(24)
    color: #6a6a6a
    z-index: 2
    width: 100%
    position: relative
    display: flex
    flex-direction: column
    justify-content: center
    border-radius: 8px 8px 0px 0px
    i
      +circle
      align-self: start

    i::before
        content: " "
        +circle
        left: toRem(16)
        background-color: #ffbd2e
        top: 0

    i::after
        content: " "
        +circle
        left: toRem(32)
        background-color: #28ca41
        top: 0
.project__bar h2
    font-size: toRem(16)
    text-align: center
.project__image
    height: toRem(187)
    img
        width: 100%
        height: 100%
        object-fit: fill
.project__hover
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(17, 17, 17, 0.89)
    display: flex
    align-items: center
    justify-content: center
    visibility: hidden
    opacity: 0
    transition: opacity 0.3s
.project:hover
    .project__hover
        opacity: 1
        visibility: visible
        transition: opacity 0.3s

.project__button
</style>
