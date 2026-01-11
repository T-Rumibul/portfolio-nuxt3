<template>
  <div class="flex">
    <NuxtLink 
      v-for="localeSwitch in localList"
      class=" first:rounded-l last:rounded-r  color-gray-200 cursor-pointer py-2 px-3 border border-base-200" 
      :class="locale === localeSwitch.code ? 'bg-accent-blue': 'bg-base-400 '" 
      to=""
      @click.prevent.stop="setLocale(localeSwitch.code)"

    >
      {{ localeSwitch.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v';
const { locale, locales, setLocale } = useI18n()

type LocaleObject = typeof locales.value[number];

type LangCode = LocaleObject["code"];
const route = useRoute()
const props = defineProps<{
  localList: {code: LangCode, name: string}[]
}>()



</script>

<style lang="sass">

</style>
