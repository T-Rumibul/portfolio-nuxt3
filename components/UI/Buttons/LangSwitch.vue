<template lang="pug">
div
    button(type="button" class="button" :class="locale === 'en' ? 'button_active': ''" @click="locale = 'en'") EN
    button(type="button" class="button" :class="locale === 'ru' ? 'button_active': ''" @click="locale = 'ru'") RU
</template>

<script setup lang="ts">
const { locale } = useI18n();
console.log(locale.value);
</script>

<style lang="sass" scoped>

.button
    border: none
    outline: none
    background: var(--button-secondary)
    color: var(--text-primary)
    padding: toRem(10)
    cursor: pointer
.button:nth-child(1)
    border-radius: 5px 0px 0px 5px
.button:nth-child(2)
    border-radius: 0px 5px 5px 0px
.button_active
    background: var(--button-primary)
</style>
