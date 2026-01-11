<template>
    <div class="w-full overflow-auto">
        <AdminHeader title="About" />
        <main class="ml-4 mt-4 py-6 px-4" v-if="data">
            <div class="mb-4">
                <h2 class="text-2xl font-semibold text-white">About Information</h2>
                <p class="text-gray-400">Edit the about section information below.</p>
                <div class="flex items-center mt-4">
                    <p class=" text-gray-300">Language:</p>
                    <AdminEditorLangSwitch :disabled="textChanged" class="ml-4" @languageChange="langSwitch($event as keyof ILocalized)"
                        :currentLang="currentLang" :availableLangs="availableLangs" />
                </div>
            </div>
            <AdminEditableField :text="data[currentLang].name" label="Name" v-model="data[currentLang].name" class="mt-4" />
            <AdminEditableField :text="data[currentLang].position" label="Position" v-model="data[currentLang].position" class="mt-4" />
            <AdminEditableField :text="data[currentLang].aboutme" label="Description" v-model="data[currentLang].aboutme"
                class="mt-4" />
            <div class="mt-4">
                <button @click="handleSubmit"
                    class="bg-green-800 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors cursor-pointer">Sumbit</button>
                <button @click="handleCancel"
                    class="ml-4 bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors cursor-pointer">Discard</button>
            </div>
            <p v-if="responseMessage.length > 0" :class="(responseMessage === 'Success' ? 'text-green-500' : 'text-red-500')" class="mt-4 ">{{ responseMessage }}</p>
        </main>
    </div>
</template>
<script setup lang="ts">
import type { APIResponse, IResumeLocalized, ILocalized } from '~~/typing';

definePageMeta({
    layout: 'admin',
    i18n: false
})
const auth = useAuth()

// if(!auth.isLoggedIn.value) {
//     navigateTo('/admin/login')
// }
const textChanged = ref(false)

const availableLangs: { code: keyof ILocalized, name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
    { code: 'uk', name: 'Ukrainian' },
];

const currentLang: Ref<keyof ILocalized> = ref('en')

const data = ref<IResumeLocalized>()
const fetchData = async () => {
    const resumeData = await useResumeData();
    data.value = resumeData

}

const langSwitch = async (langCode: keyof ILocalized) => {
    currentLang.value = langCode
}

const responseMessage = ref('')
let timeoutID: NodeJS.Timeout;
const handleSubmit = async () => {
    const response = await useAdminAPI<APIResponse<IResumeLocalized>>('/resume/update', {
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