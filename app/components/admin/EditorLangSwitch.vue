<template>
    <div>
        <select
            class="bg-gray-800 text-gray-200 outline-none p-2 rounded "
            @change.prevent="handleChange($event)"
            :class="disabled ? 'pointer-events-none bg-gray-900 text-gray-400': ''" 
        >
            <option
                v-for="lang in availableLangs"
                :key="lang.code"
                :value="lang.code"
                :selected="lang.code == currentLang"
            >
                {{ lang.name }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    currentLang: string
    availableLangs: { code: string; name: string }[];
    disabled?: boolean
}>();
const lang = defineModel<string>({
    required: false,
});
const emit = defineEmits<{
    (e: 'languageChange', langCode: string): void;
}>()
const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    lang.value = target.value;
    emit('languageChange', target.value);
}


</script>

<style scoped>
</style>