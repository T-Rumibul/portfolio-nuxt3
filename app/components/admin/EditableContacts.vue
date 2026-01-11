<template>
    <div class="flex flex-col">
         <div class="flex items-center">
                
            </div>
        <div class="flex items-center w-full mt-4" v-for="contact, idx in contacts" :key="contact._id">
           <AdminCustomSelect 
           class="text-gray-300 mr-2" 
           :selectedOption="{icon: {name: contact.icon}, value: contact.name }" 
           :options="availableOptions" 
           @update:selectedOption="handleContactUpdate(contact._id, $event, 'icon|name')"
           />
            <AdminEditableField :text="contact.link" :asList="false"
                @update="handleContactUpdate(contact._id, $event as string, 'link')" />
        </div>
    </div>
</template>

<script setup lang="ts">
const chosen = ref(null)

const contacts = defineModel<Array<{ _id: string; name: string; icon: string, link: string }>>({
    default: []
})
const emit = defineEmits<{
    (e: 'update', value: { _id: string; name: string; icon: string, link: string }): void
}>()
const handleContactUpdate = (id: string, newValue: string | { icon?: {name: string, color?: string}, value: string }, field: 'icon|name' | 'link') => {
    const contact = contacts.value.find(c => c._id === id);
    if (contact) {
       if (field === 'link' && typeof newValue === 'string') {
            contact.link = newValue;
            emit('update', contact);
        } else if (field === 'icon|name' && typeof newValue === 'object') {
            if (newValue.icon) contact.icon = newValue.icon.name;
            if (newValue.value) contact.name = newValue.value;
            emit('update', contact);
        }
    }
};

const availableOptions = ref<Array<{ icon: { name: string, color?: string }, value: string }>>([
    { icon: {name: 'mdi:email' }, value: 'Email'},
    { icon: {name: 'mdi:phone-dial'}, value: 'Phone' },
    { icon: {name: 'mdi:linkedin'}, value: 'LinkedIn' },
    { icon: {name: 'mdi:github'}, value: 'GitHub' },
    { icon: {name: 'mdi:twitter'}, value: 'Twitter' },
    { icon: {name: 'mdi:facebook'}, value: 'Facebook' },
    { icon: {name: 'mdi:instagram'}, value: 'Instagram' },
]);
</script>

<style scoped></style>
