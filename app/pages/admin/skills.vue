<template>

    <div class="w-full overflow-auto">
        <AdminHeader title="Skills" />
        <main class="ml-4 mt-4 py-6 px-4">
            <AdminEditableSkillCategory class="mt-4" v-for="skill in skills" v-bind="skill"
                @delete.once="deleteSkill(skill._id)" @submit="updateSkill({
                    _id: skill._id,
                    ...$event
                })" />
            <p :class="messageColor" class="mt-4 fixed left-0 bottom-5 w-screen text-center"
                v-if="responseMessage.length > 0">{{ responseMessage }}</p>
            <motion.button
                class="text-gray-200 mt-4 w-full flex items-center justify-center border border-gray-300 p-2 cursor-pointer rounded-lg text-2xl"
                intial="rest" whileHover="hover" @click="addSkill">

                <motion.span :variants="hoverButton" class="flex items-center">
                    <Icon name="mdi:plus" />
                </motion.span>
            </motion.button>
        </main>
    </div>

</template>

<script setup lang="ts">
import type { Types } from 'mongoose';
import { motion } from 'motion-v'
import type { APIResponse, ISkillCat } from '~~/typing';

definePageMeta({
    layout: 'admin',
    i18n: false
})
const auth = useAuth()
// if(!auth.isLoggedIn.value) {
//     navigateTo('/admin/login')
// }
const skills = ref<ISkillCat[]>([])

skills.value = await useSkillsData()

const responseMessage = ref('')
const messageColor = ref('')
let timeoutID: NodeJS.Timeout
const showMessage = (message: string, error = false) => {
    responseMessage.value = message
    messageColor.value = 'text-green-500'
    if (error) messageColor.value = 'text-red-500'
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
        responseMessage.value = ''
        messageColor.value = ''
    }, 5000)
}
const addSkill = async () => {
    const response = await useAdminAPI<APIResponse<ISkillCat>>('/skills/create', {
        method: 'POST',
        body: {
            name: 'New',
            icon: { name: 'mdi:abjad-hebrew', color: 'text-blue-500' },
            skills: [{ icon: { name: 'mdi:access-point', color: 'text-green-500' }, name: 'New' }]
        }
    })
    if (response.data.value && response.data.value.success) {
        skills.value.push(response.data.value.result)
        showMessage(response.data.value.message)
    } else {
        showMessage(response.data.value ? response.data.value.message : 'Error', true)
    }
}
const deleteSkill = async (_id: string | Types.ObjectId) => {
    const response = await useAdminAPI<APIResponse<ISkillCat>>('/skills/delete', {
        method: 'POST',
        body: {
            _id
        }
    })
    if (response.data.value && response.data.value.success) {
        showMessage(response.data.value.message)
        const idx = skills.value.findIndex((value) => value._id === _id)
        skills.value.splice(idx, 1)
    } else {
        showMessage(response.data.value ? response.data.value.message : 'Error', true)
    }
}

const updateSkill = async (data: ISkillCat) => {
    const response = await useAdminAPI<APIResponse<ISkillCat>>('/skills/update', {
        method: 'POST',
        body: {
            ...data
        }
    })
    if (response.data.value && response.data.value.success) {
        showMessage(response.data.value.message)
    } else {
        showMessage(response.data.value ? response.data.value.message : 'Error', true)
    }
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