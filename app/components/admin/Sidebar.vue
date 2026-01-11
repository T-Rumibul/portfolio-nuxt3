<template>
    <motion.div :animate="{ width: sidebarOpen ? 256 : 70 }"
            :transition="{ type: 'spring', stiffness: 50 }" class="shrink-0" :class="{'w-64': sidebarOpen, 'w-17.5': !sidebarOpen}">
        <div class="h-full bg-gray-800/50 backdrop-blur-md p-2 flex flex-col border-r border-gray-700">
            <div class="flex">
            <motion.button 
            class="text-white cursor-pointer ml-3"
         
            :transition="{ duration: 0.2, delay: 0.3 }" 
            @click="sidebarOpen = !sidebarOpen"
            :whileHover="{ scale: 1.1 }"
            :whileTap="{ scale: 0.9 }"
            >
                <Icon name="meteor-icons:list" class="text-3xl"/>
            </motion.button>
          </div>
            <ul class="mt-8 flex flex-col gap-4 text-white self-center grow">
                <motion.li v-for="item in props.items" :key="item.name" :whileHover="{ scale: 1.1 }"
                                :whileTap="{ scale: 0.9 }">
                    <NuxtLink :to="item.route" class="flex items-center">
                        <Icon :name="item.icon" class="text-xl" :class="`${item.color}`" />
                        <AnimatePresence mode="wait">  
                                        <motion.span
                                            v-if="sidebarOpen"
                                            key="sidebar-item-name"
                                            :initial="{ opacity: 0, x: -10 }"
                                            :animate="{ opacity: 1, x: 0 }"
                                            :exit="{ opacity: 0, x: -10, transition: { duration: 0.3, delay: 0} }"
                                            :transition="{ duration: 0.2, delay: 0.3 }"
                                            class="whitespace-nowrap ml-4"
                                        >
                                            {{item.name}}
                                        </motion.span>
                                </AnimatePresence>
                    </NuxtLink>
                </motion.li>
            </ul>
        </div>
    </motion.div>
</template>

<script setup lang="ts">
import { motion, AnimatePresence, color } from 'motion-v'
const sidebarOpen = ref(true);
const props = defineProps<{
  items: Array<{ name: string; icon: string; color: string; route: string }>
}>()

</script>

<style scoped>
</style>