<template>
    <div class="flex items-center justify-between p-4 bg-gray-800/50 backdrop-blur-md border-gray-600 w-full">
        <h1 class="text-white text-2xl">{{ title }}</h1>
        <div class="flex items-center">
            <motion.button 
            class="text-white cursor-pointer" 
            @click="logout"
            :while-hover="{scale: 1.1}"
            :while-tap="{scale: 0.9}"
            >
                <Icon name="mdi:logout" class="text-xl"/>
            </motion.button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { motion } from 'motion-v'
defineProps<{
    title: string
}>()
const auth = useAuth()
const logout = () => {
    auth.logout()
    navigateTo('/admin/login')
   
   
}
</script>
<style scoped>
</style>