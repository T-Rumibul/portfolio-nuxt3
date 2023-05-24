<template lang="pug">
div
    Head
        Link( sizes="16x16" rel="icon" href="/icons8-system-information-16.ico")
        Link( sizes="32x32" rel="icon" href="/icons8-system-information-32.ico")
        Link( sizes="96x96" rel="icon" href="/icons8-system-information-96.ico")
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
