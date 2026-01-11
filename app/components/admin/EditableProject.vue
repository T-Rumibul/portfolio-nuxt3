<template>
    <div class="p-4 border border-gray-300 rounded-md">
        <div v-show="fold">
            <div class="flex items-center justify-center mb-4 text-gray-300">
                <Icon :name="project.type?.icon?.name" :class="project.type?.icon?.color" class="text-4xl mr-2"
                    v-if="project.type?.icon" />
                <span class="text-2xl font-bold">{{ project.title['en'] }}</span>
            </div>
        </div>
        <AnimatePresence>
            <motion.div v-show="!fold" :animate="{ height: !fold ? 'auto' : '0px' }" class="overflow-hidden ">
                <div class="flex flex-col gap-5 ">

                    <div class="flex items-center">
                        <span class="text-gray-300 mr-4 min-w-30">Type:</span>
                        <AdminCustomSelect class="text-gray-300 mr-2"
                            :selectedOption="project.type" v-model="project.type"
                            :options="typeOptions" />
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-300 mr-4 min-w-30">Lang:</span>
                        <AdminCustomSelect class="text-gray-300 mr-2" v-for="lang, idx in project.lang"
                            v-model="project.lang[idx]" :key="lang.value" :selectedOption="lang"
                            :options="langOptions" />
                        <motion.button @click="addLang" :whileHover="{
                            rotate: 180,

                        }" :transition="{ duration: 0.35 }"
                            class="text-gray-300 flex items-center text-2xl cursor-pointer">
                            <Icon name="mdi:plus" />
                        </motion.button>
                        <motion.button @click="removeLang" :whileHover="{
                            rotate: 180,

                        }" :transition="{ duration: 0.35 }"
                            class="text-red-500 flex items-center text-2xl cursor-pointer">
                            <Icon name="mdi:minus" />
                        </motion.button>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-300 mr-4 min-w-30">Framework:</span>
                        <AdminCustomSelect class="text-gray-300 mr-2 " v-for="framework, idx in project.framework"
                            :key="framework.value" v-model="project.framework[idx]" :selectedOption="framework"
                            :options="frameworkOptions" />
                        <motion.button @click="addFramework" :whileHover="{
                            rotate: 180,

                        }" :transition="{ duration: 0.35 }"
                            class="text-gray-300 flex items-center text-2xl cursor-pointer">
                            <Icon name="mdi:plus" />
                        </motion.button>
                        <motion.button @click="removeFramework" :whileHover="{
                            rotate: 180,

                        }" :transition="{ duration: 0.35 }"
                            class="text-red-500 flex items-center text-2xl cursor-pointer">
                            <Icon name="mdi:minus" />
                        </motion.button>
                    </div>
                </div>
                <div>
                    <div class="border border-gray-500 p-4 mt-4">
                        <AdminEditorLangSwitch class="mb-4" :availableLangs="availableLangs" :currentLang="currentLang"
                            v-model="currentLang" />
                        <AdminEditableField class="mt-4" label="Title" :text="project.title[currentLang] || ''"
                            v-model="project.title[currentLang]" :asList="false" />
                        <AdminEditableField class="mt-4" label="Description"
                            :text="project.description[currentLang] || ''" v-model="project.description[currentLang]"
                            :asList="false" />
                    </div>
                    <div class="mt-4">
                        <AdminEditableField v-if="project.git" label="Github Link" :text="project.git"
                            v-model="project.git" :asList="false" />
                        <button v-if="project.git" @click="removeGithubLink"
                            class="text-red-500 hover:text-red-600 cursor-pointer mt-1">Remove</button>
                        <button v-if="!project.git" @click="addGithubLink"
                            class="text-green-500 cursor-pointer px-4 py-2 border rounded border-green-500 hover:border-green-600 hover:text-green-600">Add
                            link to Github</button>
                    </div>
                    <div class="mt-4">
                        <AdminEditableField v-if="project.link" class="mt-4" label="Demo Link" :text="project.link"
                            v-model="project.link" :asList="false" />
                        <button v-if="project.link" @click="removeLiveLink"
                            class="text-red-500 hover:text-red-600 cursor-pointer mt-1">Remove</button>
                        <button v-if="!project.link" @click="addLiveLink"
                            class="text-green-500 cursor-pointer px-4 py-2 border rounded border-green-500 hover:border-green-600 hover:text-green-600">Add
                            link to demo</button>
                    </div>
                    <div class="max-w-64 mt-4">
                        <span class="text-gray-200 mt-4 mb-2 block text-xl">Thumbnail:</span>
                        <img :src="project.thumbnail" alt="Project Thumbnail"
                            class="w-full object-cover rounded-md border border-gray-500" />
                        <label
                            class="mt-4 text-gray-300 border border-gray-500 rounded-md p-2 bg-gray-800 cursor-pointer flex items-center justify-center">
                            <Icon name="mdi:upload" class="text-4xl" />
                            <input @change="handleUpload($event)" type="file" accept="image/png, image/jpeg, image/webp"
                                class="hidden" />
                        </label>
                    </div>
                    <div class="mt-4 flex items-center">
                        <span class="text-gray-300 mr-4 min-w-30">Hidden:</span>
                        <input type="checkbox" v-model="project.hidden" class="w-5 h-5 cursor-pointer" />

                    </div>
                    <div class="flex justify-center gap-5">
                    <div @click="submit" class="flex justify-center mt-4 mb-4">
                        <motion.button :whileHover="{scale: 1.05}" class="border border-green-400 text-green-400 rounded px-4 py-2 cursor-pointer">Submit</motion.button>
                    </div>
                     <div @click="deleteProject" class="flex justify-center mt-4 mb-4">
                        <motion.button :whileHover="{scale: 1.05}" class="border border-red-400 text-red-400 rounded px-4 py-2 cursor-pointer">Delete</motion.button>
                    </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
        <div class="w-full flex items-center justify-center overflow-hidden">
            <motion.button v-if="!fold" @click="fold = true" :whileHover="{ scale: 1.1, translateY: -5 }"
                class="text-2xl  text-gray-300 text-center mt-4 cursor-pointer">
                <Icon name="mdi:arrow-up" />
            </motion.button>
            <motion.button v-if="fold" @click="fold = false" :whileHover="{ scale: 1.1, translateY: 5 }"
                class="text-2xl  text-gray-300 text-center mt-4 cursor-pointer">
                <Icon name="mdi:arrow-down" />
            </motion.button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
import type { IProject } from '~/../typing';
const fold = ref(true)

const project = defineModel<IProject>({
    required: true,
})
const emit = defineEmits<{
    (e: 'submit', value: IProject): void
    (e: 'delete', value: string): void
}>()


const currentLang = ref<'en' | 'ru' | 'uk'>('en');
const availableLangs = ref([
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
    { code: 'uk', name: 'Ukrainian' },
]);

const typeOptions = ref<Array<{ icon: { name: string, color: string }, value: string }>>([
    { icon: { name: 'mdi:web', color: 'text-blue-500' }, value: 'Website' },
    { icon: { name: 'mdi:npm', color: 'text-red-500' }, value: 'Package' },
    { icon: { name: 'mdi:robot', color: 'text-purple-500' }, value: 'Chatbot' },
    { icon: { name: 'mdi:gamepad-variant', color: 'text-yellow-500' }, value: 'Mod' },
    { icon: { name: 'mdi:source-pull', color: 'text-red-500' }, value: 'Contribution' },
]);

const langOptions = ref<Array<{ icon: { name: string, color: string }, value: string }>>([
    { icon: { name: 'mdi:language-javascript', color: 'text-yellow-500' }, value: 'JavaScript' },
    { icon: { name: 'mdi:language-typescript', color: 'text-blue-500' }, value: 'TypeScript' },
    { icon: { name: 'mdi:language-python', color: 'text-green-500' }, value: 'Python' },
    { icon: { name: 'mdi:language-ruby', color: 'text-red-500' }, value: 'Ruby' },
    { icon: { name: 'mdi:language-go', color: 'text-blue-500' }, value: 'Go' },
    { icon: { name: 'mdi:language-java', color: 'text-red-500' }, value: 'Java' },
    { icon: { name: 'mdi:language-cpp', color: 'text-blue-500' }, value: 'Cpp' },
    { icon: { name: 'mdi:language-csharp', color: 'text-red-500' }, value: 'CSharp' },
    { icon: { name: 'mdi:language-php', color: 'text-blue-500' }, value: 'PHP' },
    { icon: { name: 'mdi:language-swift', color: 'text-red-500' }, value: 'Swift' },
]);


const frameworkOptions = ref<Array<{ icon: { name: string, color: string }, value: string }>>([
    { icon: { name: 'mdi:vuejs', color: 'text-green-500' }, value: 'Vue.js' },
    { icon: { name: 'mdi:nuxt', color: 'text-green-700' }, value: 'Nuxt.js' },
    { icon: { name: 'mdi:react', color: 'text-blue-500' }, value: 'React' },
    { icon: { name: 'mdi:angular', color: 'text-red-500' }, value: 'Angular' },
    { icon: { name: 'carbon:logo-svelte', color: 'text-red-400' }, value: 'Svelte' },
    { icon: { name: 'mdi:nodejs', color: 'text-green-600' }, value: 'Node.js' },
    { icon: { name: 'bx:bxl-django', color: 'text-green-800' }, value: 'Django' },
    { icon: { name: 'mdi:flask', color: 'text-gray-500' }, value: 'Flask' },
    { icon: { name: 'mdi:laravel', color: 'text-red-600' }, value: 'Laravel' },

]);

const addFramework = () => {
    project.value.framework.push({ icon: { name: 'mdi:vuejs', color: 'text-green-500' }, value: 'Vue.js' });
};
const removeFramework = () => {
    project.value.framework.pop();
};
const addLang = () => {

    project.value.lang.push({ icon: { name: 'mdi:language-javascript', color: 'text-yellow-500' }, value: 'JavaScript' });
};
const removeLang = () => {
    project.value.lang.pop();
};

const handleUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
        
        imageToBase64(file).then(base64 => {
            project.value.thumbnail = base64 as string;
        }).catch(error => {
            console.error('Error converting file to base64:', error);
        });

    }
};
const removeGithubLink = () => {
    project.value.git = undefined;
};
const removeLiveLink = () => {
    project.value.link = undefined;
};
const addGithubLink = () => {
    project.value.git = '<github-link>';
};
const addLiveLink = () => {
    project.value.link = '<demo-link>';
};


const submit = () => {
    emit('submit', project.value);
}
const deleteProject = () => {
    emit('delete', project.value._id);
}

</script>

<style></style>