<template>
    <div class="w-full overflow-auto">
        <AdminHeader title="About" />
        <nav>
            <div class="flex border-b border-base-300 ">
                <span v-for="element in nav"
                class="text-base-content text-md uppercase bg-base-200 px-4 py-2 cursor-pointer hover:bg-base-400" 
                :class="{'bg-base-400': editor === element.value}" 
                 @click="editor = element.value" 
                >{{ element.title }}</span>
            </div>
        </nav>
        <main class="ml-4 mt-4 py-6 px-4" v-if="data">
            <AdminResumeText v-if="editor === 'text'" v-model="data" 
                @submit="handleSubmit" @cancel="handleCancel" />
            <AdminResumeSkills v-if="editor === 'skills'" v-model="data"
                @submit="handleSubmit" />
            <AdminResumeContacts v-if="editor === 'contacts'" v-model="data"
                @submit="handleSubmit" />
            <p v-if="responseMessage.length > 0" :class="(responseMessage === 'Success' ? 'text-green-500' : 'text-red-500')" class="mt-4 ">{{ responseMessage }}</p>
        </main>
    </div>
</template>
<script setup lang="ts">
import type { APIResponse, IResume } from '~~/typing';

definePageMeta({
    layout: 'admin',
    i18n: false
})
const nav = [
    { title: 'Text', value: 'text' },
    { title: 'Skills', value: 'skills' },
    { title: 'Contacts', value: 'contacts' },
]
const editor = ref('text')

const data = ref<IResume>()
const fetchData = async () => {
    const response = await $fetch('/api/resume/get', {
        method: 'POST',
    });
    if (response && response.success) {
        data.value = response.result;
    }
  

}

const responseMessage = ref('')
let timeoutID: NodeJS.Timeout;
const handleSubmit = async () => {
    const response = await useAdminAPI<APIResponse<IResume>>('/resume/update', {
        method: 'POST',
        body: {
            data: data.value
        }
    })
    if(response.data.value && response.data.value.success) {
        responseMessage.value = 'Success'
    } else {
        responseMessage.value = response.data.value ? response.data.value.message : 'Error'
    }
    if(timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
        responseMessage.value = ''
    }, 5000)
}
const handleCancel = async () => {
    await fetchData()

}

await fetchData()



</script>
<style scoped></style>