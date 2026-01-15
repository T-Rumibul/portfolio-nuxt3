<template>
    <div>
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
    <AdminActionButtons @submit="handleSubmit" @discard="handleCancel" />
    </div>
</template>
<script setup lang="ts">
import type { ILocalized, IResume } from '~~/typing';
const data = defineModel<IResume>({required: true});
const emit = defineEmits<{
    (e: 'submit'): void;
    (e: 'cancel'): void;
}>();
const availableLangs: { code: keyof ILocalized, name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
    { code: 'uk', name: 'Ukrainian' },
];
const currentLang = ref<'en' | 'ru' | 'uk'>('en');
const textChanged = ref(false);
const langSwitch = (lang: keyof ILocalized) => {
    currentLang.value = lang;
    textChanged.value = true;
}
const handleSubmit = () => {
    emit('submit');
}
const handleCancel = () => {
    emit('cancel');
}
</script>