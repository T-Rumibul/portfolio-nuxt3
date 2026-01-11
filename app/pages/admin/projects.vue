<template>
  <div class="w-full overflow-auto">
    <AdminHeader title="Projects" />
    <main class="ml-4 mt-4 py-6 px-4">
      <AdminEditableProject v-model="projects[idx]!" v-for="project, idx in projects" :key="idx" class="mb-4" @submit="submit($event)" @delete="deleteProject($event)"/>
      <button @click="addProject"
        class="mt-4 px-4 w-full py-2 flex items-center justify-center border rounded border-gray-300 hover:border-gray-400 text-2xl hover:text-gray-400 text-gray-300 cursor-pointer">
        <Icon name="mdi:plus-circle" />
      </button>
    </main>
  </div>
</template>
<script setup lang="ts">
import type { APIResponse, IProject } from '~~/typing';

definePageMeta({
  layout: 'admin',
  i18n: false
})
const auth = useAuth()
// if(!auth.isLoggedIn.value) {
//     navigateTo('/admin/login')
// }
const projects = ref<IProject[]>([]);
const data = await useProjectsData();
projects.value = data as IProject[];

const submit = async (projectData: IProject) => {

    const response = await useAdminAPI<APIResponse<IProject>>('/project/update', {
      method: 'POST',
      body: { projectData }
    });
    if (response.data.value && response.data.value.success) {
      console.log('Project updated successfully');
    } else {
      console.error('Failed to update project:', response);
    }
  
}
const deleteProject = async (_id: string) => {

    const response = await useAdminAPI<APIResponse<IProject>>('/project/delete', {
      method: 'POST',
      body: { _id}
    })
    if (response.data.value && response.data.value.success) {
      console.log('Project deleted successfully');
      projects.value = projects.value.filter(project => project._id !== _id);
    } else {
      console.error('Failed to delete project:', response);
    }
}

const projectExample = {
  type: { icon: { name: 'mdi:web', color: 'text-blue-500' }, value: 'Web' },
  title: {
    en: 'Project Title',
    ru: 'Название проекта',
    uk: 'Назва проєкту',

  },
  description: {
    en: 'This is a description of a project.',
    ru: 'Это описание проекта.',
    uk: 'Це опис проєкту.'

  },
  lang: [{ icon: { name: 'mdi:language-javascript', color: 'text-yellow-500' }, value: 'JavaScript' }, { icon: { name: 'mdi:language-typescript', color: 'text-blue-500' }, value: 'TypeScript' }],
  framework: [{ icon: { name: 'mdi:vuejs', color: 'text-green-500' }, value: 'Vue.js' }, { icon: { name: 'mdi:nuxt', color: 'text-green-500' }, value: 'Nuxt.js' }],
  git: 'https://github.com/my-awesome-project',
  thumbnail: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMzaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzMiA3OS4xNTkyODQsIDIwMTYvMDQvMTktMTM6MTM6NDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1LjUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEU2M0JFRUZBQjZGMTFFNkI2N0Q4RjBBMTNFQUVDNzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEU2M0JFRjBBQjZGMTFFNkI2N0Q4RjBBMTNFQUVDNzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RTYzQkVFREFCNkYxMUU2QjY3RDhGMEExM0VBRUM3NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4RTYzQkVFRUFCNkYxMUU2QjY3RDhGMEExM0VBRUM3NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAICAgICAgICAgID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',
  link: 'https://my-awesome-project.com',
}
const addProject = async () => {
  const response = await useAdminAPI<APIResponse<IProject>>('/project/create', {
    method: 'POST',
    body: {
      projectData: projectExample,
    }
  })
  if (response.data.value && response.data.value.success) {
    projects.value.push(response.data.value.result);
  }
}

</script>
<style scoped></style>