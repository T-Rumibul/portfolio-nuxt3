<template lang="pug">
div
    UINav
    slot
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>
.nav
    position: absolute
    top: toRem(32)
    left: toRem(32)
    z-index: 3
</style>
