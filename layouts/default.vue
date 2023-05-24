<template lang="pug">
div
    UINav(class="nav")
    UIButtonsLangSwitch(class="localization")
    slot
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>
.nav
    position: absolute
    top: toRem(16)
    left: toRem(32)
    z-index: 3
    @media (max-width: toRem(400))
        left: calc(50% - toRem(85))
.localization
    position: absolute
    top: toRem(16)
    right: toRem(32)
    z-index: 3
    @media (max-width: toRem(400))
        display: none
</style>
