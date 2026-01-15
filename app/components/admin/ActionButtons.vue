<template>
    <div class="flex gap-5 mt-4">
        <motion.button :whileHover="{
            scale: 1.1
        }" 
        class="border border-green-400 text-green-400 rounded px-4 py-2 cursor-pointer"
        @click="$emit('submit')"
        >
            {{submitButton}}</motion.button>
        <motion.button :whileHover="{
            scale: 1.1
        }" 
        class="border border-red-400 text-red-400 rounded px-4 py-2 cursor-pointer"
        @click="$emit('discard')">
        {{discardButton}}
        </motion.button>
    </div>

</template>
<script lang="ts" setup>
import { motion } from 'motion-v'
defineEmits<{
    (e: 'submit'): void;
    (e: 'discard'): void;
}>()
const props = withDefaults(defineProps<{
    discardButton?: string,
    submitButton?: string
}>(), {
    discardButton: 'Discard',
    submitButton: 'Submit'
})
</script>