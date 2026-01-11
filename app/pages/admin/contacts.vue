<template>
<div class="w-full overflow-auto">
        <AdminHeader title="Contacts" />
        <main class="ml-4 mt-4 py-6 px-4">
               <div class="mt-4">
                <AdminEditableContacts v-if="contactsInfo" v-model="contactsInfo" class="mt-4" @update="handleUpdate($event)"/>
                <button @click="addContact"
                    class="mt-4 bg-transparent w-full border text-gray-300 border-gray-400 hover:border-gray-600 hover:text-gray-600 flex items-center justify-center py-2 px-4 rounded transition-colors cursor-pointer">
                    <Icon class="text-xl " name="mdi:plus-circle" />
                </button>
            </div>
        </main>
</div>

</template>
<script setup lang="ts">
import type { APIResponse, IContact } from '~~/typing';


definePageMeta({
    layout: 'admin',
    i18n: false
})

const authStore = useAuth();
// if(!authStore.isLoggedIn.value) {
//     navigateTo('/admin/login')
// }
const contactsInfo = ref<IContact[]>([]);
contactsInfo.value = await useContactsData();

const addContact = async () => {

    const response = await useAdminAPI<APIResponse<IContact>>('/contacts/create', {
        method: 'POST',
        body: {
            name: 'Email',
            icon: 'mdi:email',
            link: 'email@example.com',
        }
    })

    if (response.data.value && response.data.value.success) {
        contactsInfo.value.push(response.data.value.result);
    }
};

const handleUpdate= async (updatedContact: IContact) => {
    try {
        const response = await useAdminAPI<APIResponse<IContact>>('/contacts/update', {
            method: 'POST',
            body: {
                ...updatedContact,
                accessToken: authStore.token
            }
        });
        if (response.data.value && response.data.value.success) {
            console.log('Contact updated successfully');
        } else {
            console.error('Failed to update contact:', response.data.value);
        }
    } catch (error) {
        console.error('Error updating contacts:', error);
    }
};
</script>
<style scoped></style>