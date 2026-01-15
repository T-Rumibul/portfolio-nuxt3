<template>
    <div>
        <AdminEditableSkillCategory class="mt-4" v-for="_, index in data.skillCategories"
            v-model="data.skillCategories[index]!" @delete.once="handleDelete(index)" @submit="handleSubmit" />
        <motion.button
            class="text-gray-200 mt-4 w-full flex items-center justify-center border border-gray-300 p-2 cursor-pointer rounded-lg text-2xl"
            intial="rest" whileHover="hover" @click="addSkillCategory">

            <motion.span :variants="hoverButton" class="flex items-center">
                <Icon name="mdi:plus" />
            </motion.span>
        </motion.button>
    </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import type { IResume } from '~~/typing';
const emit = defineEmits<{
    (e: 'submit'): void;
}>()
const data = defineModel<IResume>({ required: true })


const addSkillCategory = async () => {

    data.value.skillCategories.push({
        name: 'New',
        icon: { name: 'mdi:abjad-hebrew', color: 'text-blue-500' },
        skills: [{ icon: { name: 'mdi:access-point', color: 'text-green-500' }, name: 'New' }]
    })

}
const handleDelete = async (index: number) => {

    data.value.skillCategories.splice(index, 1)
    emit('submit');
}

const handleSubmit = async () => {
    emit('submit');
}

const hoverButton = {
    rest: {
        rotate: 0
    },
    hover: {
        rotate: 180
    }
}
</script>