<template>
  <div class="bg-base-200 rounded-2xl p-5 overflow-hidden
                shadow-xl hover:shadow-2xl hover:-translate-y-1 transition grid grid-cols-1"
                v-if="!hidden"
                >


    <div class="aspect-video overflow-hidden rounded-xl mb-4">
      <img :src="thumbnail" class="w-full h-full object-cover" alt="Project image">
    </div>

    <div>
    <span class="text-xs px-2 py-1 rounded-full bg-base-400  text-base-content inline-flex items-center gap-1 mb-3">
      <Icon class="w-3 h-3 opacity-70" :class="type.icon.color" :name="type.icon.name" />
      {{ type.value }}
    </span>
</div>

    <h2 class="text-lg font-semibold mb-2 text-base-content">{{ title[locale] }}</h2>


    <div class="mb-4 flex flex-col">
      <p class="text-sm text-base-content project-description" :class="{ 'line-clamp-3': !expandDescription }"
        ref="descriptionParagraph">
        {{ description[locale] }}

      </p>
      <button @click="expandDescription = !expandDescription" v-if="isOverflow"
        class="mt-2 text-blue-400 hover:underline text-sm self-end cursor-pointer">
        {{ (expandDescription) ? $t('project_hide') : $t('project_show_more') }}
      </button>
    </div>
    <div class="mt-auto">
      <div class="text-sm flex flex-col gap-4">


        <div class="grid grid-cols-3 gap-2 items-center">
          <span class="text-subtle-content">{{ $t('project_languages') }}:</span>
          <div class="col-span-2 flex flex-wrap gap-2">
            <span class="px-3 py-1 text-xs rounded-full flex items-center text-base-content bg-base-400"
              v-for="language in lang">
              <Icon :name="language.icon.name" class="mr-2 text-[1rem]" :class="language.icon.color" />{{ language.value
              }}
            </span>
          </div>
        </div>


        <div class="grid grid-cols-3 gap-2 items-center">
          <span class="text-subtle-content">{{ $t('project_frameworks') }}:</span>
          <div class="col-span-2 flex flex-wrap gap-2">
            <span class="px-3 py-1.5 text-xs rounded-full flex items-center text-base-content bg-base-400"
              v-for="frameworkItem in framework">
              <Icon :name="frameworkItem.icon.name" class="mr-2 text-[1rem]" :class="frameworkItem.icon.color" />{{
                frameworkItem.value }}
            </span>
          </div>
        </div>


        <div class="grid grid-cols-3 gap-2 items-center text-base-content">
          <span class="text-subtle-content">{{ $t('project_links') }}:</span>
          <div class="col-span-2 flex flex-wrap items-center gap-4 text-sm">

            <NuxtLink v-if="git" :to="git" target="_blank" class="flex items-center gap-1 hover:opacity-70 transition">
              <Icon name="mdi:github" class="text-xl mr-2" />
              <span>GitHub</span>
              <Icon class="ml-1" name="mdi:link-variant" />
            </NuxtLink>
            <NuxtLink v-if="link" :to="link" target="_blank"
              class="flex items-center gap-1 hover:opacity-70 transition">
              <Icon name="mdi:presentation" class="text-xl mr-2 " />
              <span>{{ $t('project_demo') }}</span>
              <Icon class="ml-1" name="mdi:link-variant" />
            </NuxtLink>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProject } from "~/../typing";
const expandDescription = ref(false)
const descriptionParagraph = ref<HTMLElement>()
const isOverflow = computed(() => {
  if (!descriptionParagraph.value) return;
  if (descriptionParagraph.value.scrollHeight > descriptionParagraph.value.clientHeight) return true;
  return false;
})

const locale = useI18n().locale;
const props = defineProps<IProject>();
</script>

<style></style>
