<template>
  <nav class=" text-base-content select-none text-xl font-[RC] min-w-52 bg-base-300 rounded-xl" v-click-outside="close">
    <motion.div @click="open = !open" class="flex items-center gap-2 cursor-pointer px-4 py-2"
      :class="{ 'border-b-2 border-b-base-500': open }">
      <span class="uppercase">Menu</span>
      <Icon v-show="!open" class="text-3xl ml-auto" name="mdi:menu" />
      <Icon v-show="open" class="text-3xl ml-auto" name="bx:x" />
    </motion.div>
    <AnimatePresence>
      <motion.ul v-show="open" :animate="{
        height: open ? '224px' : '0',
      }" :transition="{
      duration: .1
    }" class="overflow-hidden flex flex-col uppercase pb-8 mt-4">
        <motion.li intial="rest" :whileHover="'hover'"
          v-for="route in routes">
          <NuxtLink @click="open = false" :to="route.to" class="flex gap-4 relative  items-center  w-full px-8 py-2">

            <Icon :name="route.icon" class="text-2xl" />
            <span>{{ route.name }}</span>
            <motion.span class="h-0.5 bg-accent-blue absolute bottom-0 left-0" :variants="lineHover"></motion.span>
          </NuxtLink>
        </motion.li>
        <li class="flex px-8 mt-4">
          <CommonLangSwitch :localList="localList" class="" />
        </li>
      </motion.ul>
    </AnimatePresence>
  </nav>
</template>

<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
const { locale, locales, setLocale } = useI18n()

type LocaleObject = typeof locales.value[number];

type LangCode = LocaleObject["code"];
const open = ref(false)
const lineHover = {
  rest: {
    width: 0
  },
  hover: {
    width: '100%'
  }
}
const props = defineProps<{
  routes: { icon: string, to: string, name: string, selected?: boolean}[],
  localList: {code: LangCode, name: string}[]

}>()

const close = () => {
  open.value = false
}
</script>

<style lang="sass" scoped>

</style>
