<template>

    <div class="w-full flex gap-2">

        <div class="w-full">
            <p class="text-gray-200 text-xl" v-if="label">{{ label }}</p>

            <div class="flex items-center gap-2 w-full" v-click-outside="cancel" :class="{'mt-4': label, 'cursor-pointer': !editMode }">
               
                <p :key="textActive" :contenteditable="editMode" @click="handleFieldClick" :class="
                    {'border border-gray-500': editMode, 'border border-gray-800': !editMode,
                    
                    }"
                    class="text-gray-300 min-h-[42px] p-2 whitespace-pre-wrap wrap-break-word max-w-4xl w-full" 
                    ref="paragraphRef" 
                    v-html="textActive"></p>
              
                <button v-show="!editMode" @click="edit" class="cursor-pointer flex">
                    <Icon class="text-xl text-white" name="material-symbols:edit" />
                </button>
                <button v-show="editMode" @click="submit" class="cursor-pointer flex">
                    <Icon class="text-xl text-green-600" name="material-symbols:check-circle-outline" />
                </button>
                <button v-show="editMode"
                    @click="cancel"
                    class="cursor-pointer flex">
                    <Icon class="text-xl text-red-600" name="material-symbols:cancel" />
                </button>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
const props = defineProps<{
    text: string
    label?: string
}>();
const value = defineModel<string>({
    type: [String],
    required: false
});
const paragraphRef = ref<HTMLElement | null>(null);
const emit = defineEmits<{
    (e: 'update', newValue: string): void
}>();

watch(() => props.text, (newVal) => {
    textActive.value = newVal;
});
const textActive = ref(props.text);
const editMode = ref(false);
const edit = () => {
    editMode.value = !editMode.value;
};

const submit = () => {
    if(!paragraphRef.value) return;
    editMode.value = false;
    
    const text = paragraphRef.value.innerText.replace(/\n/g, '<br />');
    emit('update', text);
    value.value = text;
};

const cancel = () => {
   
   textActive.value = props.text; 
   editMode.value = false; 
   if(paragraphRef.value) paragraphRef.value.innerHTML = props.text
};


const handleFieldClick = () => {
    if(!editMode.value) edit()
}
</script>

<style scoped></style>
