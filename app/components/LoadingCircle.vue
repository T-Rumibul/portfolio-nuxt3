<template lang="pug">
div(class="lds-ring")
  div
  div
  div
  div
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>
.lds-ring
  display: inline-block
  position: relative
  width: toRem(116)
  height: toRem(116)

  div
    box-sizing: border-box
    display: block
    position: absolute
    width: toRem(100)
    height: toRem(100)
    margin: toRem(8)
    border: toRem(8) solid #fff
    border-radius: 50%
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite
    border-color: #0acda3 transparent transparent transparent

    &:nth-child(1)
      animation-delay: -0.45s

    &:nth-child(2)
      animation-delay: -0.3s

    &:nth-child(3)
      animation-delay: -0.15s

@keyframes lds-ring
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
