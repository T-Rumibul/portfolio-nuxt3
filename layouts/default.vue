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
    top: toRem(32)
    left: toRem(32)
    z-index: 3
.localization
    position: absolute
    top: toRem(32)
    right: toRem(32)
    z-index: 3
</style>
