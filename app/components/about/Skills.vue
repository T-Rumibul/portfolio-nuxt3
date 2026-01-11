<template>

        <div class="flex flex-col">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
               <Icon :name="icon.name" :class="icon.color"/> {{ name }}
            </h3>
            <div class="flex flex-wrap items-center gap-2 ml-4">
                <span class="px-4 py-1 bg-base-400 rounded-full flex items-center transition-all hover:bg-base-400/10 hover:scale-[1.02]" 
                v-for="skill in skills" ><Icon :name="skill.icon.name" class="text-lg mr-2" :class="skill.icon.color"/>{{ skill.name }}</span>
            </div>
        </div>
 
</template>

<script setup lang="ts">
import type { ISkillCat } from '~/../typing';

const props = defineProps<ISkillCat>()
</script>

<style lang="sass" scoped>
</style>
