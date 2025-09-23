<template>
  <div>
    <NuxtLink 
      class="button" 
      :class="locale === 'en' ? 'button_active': ''" 
      :to="switchLocalePath('en')"
    >
      EN
    </NuxtLink>
    <NuxtLink 
      type="button" 
      class="button" 
      :class="locale === 'ru' ? 'button_active': ''" 
      :to="switchLocalePath('ru')"
    >
      RU
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<style lang="sass" scoped>

.button
    border: none
    outline: none
    background: var(--button-secondary)
    color: var(--text-primary)
    padding: toRem(10)
    text-decoration: none
    cursor: pointer
.button:nth-child(1)
    border-radius: 5px 0px 0px 5px
.button:nth-child(2)
    border-radius: 0px 5px 5px 0px
.button_active
    background: var(--button-primary)
</style>
