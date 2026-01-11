<template>
  <div class="flex items-center mt-2 ">
      <Icon :name="icon" class="text-lg text-accent-blue"/>
      <span class="ml-2 text-base-content">{{ name }}:</span>
      <motion.div 
       class="flex items-center ml-3 cursor-pointer" :while-hover="{scale: 1.05}"
            :while-tap="{scale: 0.9}"
            @click="copyToClipboard"
            >
        <span class=" text-subtle-content hover:text-base-content">{{ link.replace('https://', '') }}</span>
        <Icon name="mdi:content-copy" class="text-subtle-content ml-2 hover:text-base-content"/>
      </motion.div>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
const props = defineProps<{
  icon: string;
  name: string;
  link: string;
}>()
const notificationMessage = useState<string>('notificationMessage');
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(props.link);
        notificationMessage.value = 'Сopied to clipboard!';
    } catch (err) {
        console.error('Failed to copy link: ', err);
    }
};

</script>

<style lang="sass" scoped>
</style>
