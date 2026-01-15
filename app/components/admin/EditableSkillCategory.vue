<template>
    <div class="border border-gray-500 rounded-lg p-6">
        <AdminCustomSelect :options="categoryOptions" :selectedOption="{
            icon: data.icon,
            value: data.name
        }" :label="'Category'" @update:selectedOption="handleCategoryUpdate($event)" />
        <p class="text-gray-200 text-lg uppercase mt-4">Skills</p>
        <div class="flex flex-wrap w-full items-center gap-5 mt-4">
            <AdminCustomSelect :options="skillOptions" v-for="skill, idx in data.skills" :selectedOption="{
                icon: skill.icon,
                value: skill.name
            }" @update:selectedOption="handleSkillUpdate($event, idx)" />
            <motion.button @click="addSkill" :whileHover="{
                rotate: 180,

            }" :transition="{ duration: 0.35 }" class="text-gray-300 flex items-center text-2xl cursor-pointer">
                <Icon name="mdi:plus" />
            </motion.button>
              <motion.button @click="removeSkill" :whileHover="{
                rotate: 180,

            }" :transition="{ duration: 0.35 }" class="text-gray-300 flex items-center text-2xl cursor-pointer">
                <Icon name="mdi:minus" />
            </motion.button>
        </div>
  
             <AdminActionButtons @submit="$emit('submit')" @discard="emit('delete')"
                    :discard-button="'Delete'" />
    
    </div>


</template>
<script setup lang="ts">
import { motion } from 'motion-v'
import type { IIcon, ISkill } from '~~/typing';
const data = defineModel<{
    name: string;
    icon: IIcon;
    skills: ISkill[]

}>({ required: true })
const emit = defineEmits<{
    (e: 'submit'): void;
    (e: 'delete'): void
}>()

const categoryOptions = [
    {
        icon: { name: 'mdi:code-tags', color: 'text-blue-500' },
        value: "Front-end development"
    },
    {
        icon: { name: 'mdi:server', color: 'text-red-500' },
        value: "Back-end development"
    },
    {
        icon: { name: 'mdi:tools', color: 'text-purple-500' },
        value: "Tools"
    },
    {
        icon: { name: 'mdi:code-block-braces', color: 'text-green-500' },
        value: "Software development"
    }
]


const skillOptions = ref<Array<{ icon: IIcon, value: string }>>([
    { icon: { name: 'mdi:language-javascript', color: 'text-yellow-500' }, value: 'JavaScript' },
    { icon: { name: 'mdi:language-typescript', color: 'text-blue-500' }, value: 'TypeScript' },
    {icon: { name: 'mdi:language-html5', color: 'text-orange-500' }, value: 'HTML5' },
    { icon: { name: 'mdi:language-css3', color: 'text-blue-500' }, value: 'CSS3' },
    { icon: { name: 'mdi:tailwind', color: 'text-blue-400' }, value: 'Tailwind CSS' },
    { icon: { name: 'mdi:language-python', color: 'text-green-500' }, value: 'Python' },
    { icon: { name: 'mdi:language-ruby', color: 'text-red-500' }, value: 'Ruby' },
    { icon: { name: 'mdi:language-go', color: 'text-blue-500' }, value: 'Go' },
    { icon: { name: 'mdi:language-java', color: 'text-red-500' }, value: 'Java' },
    { icon: { name: 'mdi:language-cpp', color: 'text-blue-500' }, value: 'Cpp' },
    { icon: { name: 'mdi:language-rust', color: 'text-brown-500' }, value: 'Rust' },
    { icon: { name: 'mdi:language-csharp', color: 'text-red-500' }, value: 'CSharp' },
    { icon: { name: 'mdi:language-php', color: 'text-blue-500' }, value: 'PHP' },
    { icon: { name: 'mdi:language-swift', color: 'text-red-500' }, value: 'Swift' },
    { icon: { name: 'mdi:vuejs', color: 'text-green-500' }, value: 'Vue.js' },
    { icon: { name: 'mdi:nuxt', color: 'text-green-700' }, value: 'Nuxt.js' },
    { icon: { name: 'mdi:react', color: 'text-blue-500' }, value: 'React' },
    { icon: { name: 'mdi:angular', color: 'text-red-500' }, value: 'Angular' },
    { icon: { name: 'carbon:logo-svelte', color: 'text-red-400' }, value: 'Svelte' },
    { icon: { name: 'mdi:nodejs', color: 'text-green-600' }, value: 'Node.js' },
    { icon: { name: 'bx:bxl-django', color: 'text-green-800' }, value: 'Django' },
    { icon: { name: 'mdi:flask', color: 'text-gray-500' }, value: 'Flask' },
    { icon: { name: 'mdi:laravel', color: 'text-red-600' }, value: 'Laravel' },
     {icon: { name: 'mdi:git', color: 'text-orange-600' }, value: 'Git' },
       {icon: { name: 'mdi:docker', color: 'text-blue-600' }, value: 'Docker' },
]);
const addSkill = () => {
    data.value.skills.push(
        { 
            icon: { name: 'mdi:language-javascript', color: 'text-yellow-500' }, 
            name: 'JavaScript' 
        }
    )
}
const removeSkill = () => {
    data.value.skills.pop()
}
const handleSkillUpdate = (newOption: { icon: IIcon, value: string }, idx: number) => {
    data.value.skills[idx] = {
        icon: newOption.icon,
        name: newOption.value
    }
}
const handleCategoryUpdate = (newOption: { icon: IIcon, value: string }) => {
    data.value.icon = newOption.icon
    data.value.name = newOption.value
}
</script>