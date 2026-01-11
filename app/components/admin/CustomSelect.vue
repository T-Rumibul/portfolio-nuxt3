<template>
    <div v-click-outside="handleClickOutside" class="min-w-64 max-w-80">
        <h4 class="text-gray-200 text-lg mb-4 uppercase" v-if="label">{{ label }}</h4>
        <div class="relative border border-gray-700 rounded bg-gray-800 text-gray-200">
            <div class="px-4 py-2 cursor-pointer" @click="isOpen = !isOpen">
                <div class="flex">
                    <div class="flex items-center" v-if="selectedOption">
                        <Icon v-if="selectedOption.icon" :name="selectedOption.icon.name"
                            :class="selectedOption.icon.color" class="mr-3 text-xl min-w-5" />
                        <span>{{ selectedOption.value }}</span>
                    </div>
                    <div class="flex items-center" v-else-if="selectedOptionModel">
                        <Icon v-if="selectedOptionModel.icon" :name="selectedOptionModel.icon.name" :class="selectedOptionModel.icon.color"
                            class="mr-3 text-xl min-w-5" />
                        <span>{{ selectedOptionModel.value }}</span>
                    </div>
                    <div class="flex items-center" v-else-if="options && options[0]">
                        <Icon v-if="options[0].icon" :name="options[0].icon.name" :class="options[0].icon.color"
                            class="mr-3 text-xl min-w-5" />
                        <span>{{ options[0].value }}</span>
                    </div>
                    <Icon name="mdi:arrow-down" class="ml-auto text-xl min-w-5 self-end" />
                </div>
            </div>
            <div class="absolute top-full -left-px bg-scroll w-full  bg-gray-800 border border-gray-700  rounded-b max-h-48 overflow-y-scroll z-10"
                :class="{ 'hidden': !isOpen }">

                <ul>

                    <li v-for="option in options" :key="option.value"
                        class="hover:bg-gray-900 cursor-pointer flex flex-col items-center w-full px-4 py-2"
                        @click="handleUpdate(option);">
                        <div class="overflow-clip flex w-full">
                            <Icon :name="option.icon?.name" :class="option.icon?.color" class="mr-3 text-xl min-w-5"
                                v-if="option.icon" />
                            <span>{{ option.value }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps <{
    options: Array<{ icon: { name: string, color: string }, value: string }>;
    selectedOption?: { icon: { name: string, color: string }, value: string };
    label?: string;
}>()
const selectedOptionModel = defineModel <{ icon?: { name: string, color?: string }, value: string }>();
const emit = defineEmits < {
    (e: 'update:selectedOption', option: { icon: { name: string, color: string }, value: string }): void;
}> ();
const isOpen = ref(false);
const handleClickOutside = () => {
    isOpen.value = false;
};

const handleUpdate = (option: { icon: { name: string, color: string }, value: string }) => {
    emit('update:selectedOption', option);
    isOpen.value = false;
    selectedOptionModel.value = option;
};
</script>
<style scoped></style>