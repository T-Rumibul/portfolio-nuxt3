<template>
  <button 
    type="button" 
    title="navigation" 
    class="button" 
    :class="isActive ? 'button_active' : ''"
    @click="isActive = !isActive"
  >
    <i></i>
    <i></i>
    <i></i>
  </button>
</template>

<script setup lang="ts">
type props = { isActive: boolean };
const props = defineProps<props>();
</script>

<style lang="sass" scoped>
.button
    width: toRem(170)
    height: toRem(50)
    border: none
    outline: none
    padding-top: toRem(15)
    padding-bottom: toRem(15)
    position: relative
    z-index: 5
    border-radius: 9999px
    background-color: var(--nav-background)
    display: flex
    align-items: center
    justify-content: space-around
    flex-direction: column
    cursor: pointer
    i
        width: toRem(16)
        height: toRem(2)
        background: #fff
        transition: transform 0.3s
.button_active
    padding: 0
    justify-content: center
    i:nth-child(2)
        display: none
    i:nth-child(1)
        width: toRem(20)
        transform: rotate(45deg) translateX(toRem(1))

    i:nth-child(3)
        width: toRem(20)
        transform: rotate(-45deg) translateX(toRem(1))
</style>
