<template>
    <div>
        <div class="mt-4">
            <div class="flex w-full mt-4 border border-gray-500 rounded-lg p-6" v-for="contact, index in data.contacts">
                <div class="flex items-center w-full mt-4">
                    <AdminCustomSelect class="text-gray-300 mr-2"
                        :selectedOption="{ icon: contact.icon, value: contact.name }" :options="availableOptions"
                        @update:selectedOption="handleUpdateOption(index, $event)" />
                    <AdminEditableField :text="contact.link" @update="handleUpdateLink(index, $event)" />
                </div>
                <AdminActionButtons @submit="$emit('submit')" @discard="handleDiscard(index)"
                    :discard-button="'Delete'" />
            </div>

            <button @click="addContact"
                class="mt-4 bg-transparent w-full border text-gray-300 border-gray-400 hover:border-gray-600 hover:text-gray-600 flex items-center justify-center py-2 px-4 rounded transition-colors cursor-pointer">
                <Icon class="text-xl " name="mdi:plus-circle" />
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IIcon, IResume } from '~~/typing';


const data = defineModel<IResume>({ required: true });
const emit = defineEmits<{
    (e: 'submit'): void;
}>()
const addContact = async () => {

    data.value.contacts.push({
        name: 'Email',
        icon: { name: 'mdi:email', color: '' },
        link: 'email@example.com',
    });

};

const handleUpdateOption = async (index: number, updatedOption: { icon: IIcon, value: string }) => {
    const contact = data.value.contacts[index];
    if (contact) {
        contact.icon = updatedOption.icon;
        contact.name = updatedOption.value;
    }
};
const handleUpdateLink = async (index: number, newLink: string) => {
    const contact = data.value.contacts[index];
    if (contact) {
        contact.link = newLink;
    }
};
const handleDiscard = async (index: number) => {
    data.value.contacts.splice(index, 1);
    emit('submit');
};
const availableOptions = ref([
    { icon: { name: 'mdi:email', color: '' }, value: 'Email' },
    { icon: { name: 'mdi:phone-dial', color: '' }, value: 'Phone' },
    { icon: { name: 'mdi:linkedin', color: '' }, value: 'LinkedIn' },
    { icon: { name: 'mdi:github', color: '' }, value: 'GitHub' },
    { icon: { name: 'mdi:twitter', color: '' }, value: 'Twitter' },
    { icon: { name: 'mdi:facebook', color: '' }, value: 'Facebook' },
    { icon: { name: 'mdi:instagram', color: '' }, value: 'Instagram' },
]);
</script>
<style scoped></style>