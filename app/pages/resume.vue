<template>
  <div class="flex items-center justify-center min-h-screen relative" v-if="resumeInfo">

    <div class="text-base-content max-w-6xl px-6 py-12 relative font-[OS]">

      <div class="d-flex justify-center align-center">

        <div class="font-[RC] text-center uppercase overflow-hidden mt-6">
          <motion.h1 ref="titleRef" class="text-3xl font-bold text-base-content">{{
            resumeInfo[locale].name }}</motion.h1>
          <motion.h2 class="mt-2 text-2xl tracking-wide text-accent-blue">{{ resumeInfo[locale].position }}
          </motion.h2>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
        <div class="flex flex-wrap flex-1">
          <div class="bg-base-200 
            p-6 rounded-lg shadow-md shadow-black w-full">
            <h3 class="text-lg font-semibold uppercase tracking-widest text-base-content ">{{
              $t('about_experience_title')
            }}</h3>
            <p class="mt-4 ml-4 text-md text-base-content leading-7" v-html="resumeInfo[locale].aboutme">

            </p>
          </div>
          <div class="mt-4 bg-base-200
            p-6 rounded-lg w-full">
            <h3 class="text-lg font-semibold  tracking-widest uppercase text-base-content ">{{
              $t('about_contacts_title') }}</h3>
            <ResumeContacts class="ml-4 mt-4 text-md" v-for="contact in contactsInfo" :key="contact._id"
              :icon="contact.icon" :name="contact.name" :link="contact.link" />
          </div>
        </div>
        <div class="flex flex-wrap flex-1">
          <div class="bg-base-200 
            p-6 rounded-lg w-full">
            <h3 class="text-lg font-semibold  uppercase tracking-widest text-base-content ">{{
              $t('about_languages') }}</h3>
            <div class="ml-4 flex gap-5 flex-col lg:flex-nowrap mt-4 text-md">

              <div class="flex items-center" v-for="language in languages">
                <span class="flex items-center text-base-content">
                  <Icon :name="language.icon" class="mr-2 text-lg" />{{ language.name }}
                </span>
                <span class="whitespace-nowrap text-subtle-content mx-2">—</span>
                <span class="whitespace-nowrap text-subtle-content">{{ $t(language.level) }}</span>
              </div>


            </div>
          </div>


          <div class="mt-4 bg-base-200
            p-6 rounded-lg w-full">
            <h3 class="text-lg font-semibold  tracking-widest uppercase text-base-content ">{{
              $t('about_skills') }}</h3>

            <ResumeSkills class=" mt-6 text-md" v-for="skill in skills" v-bind="skill" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { motion, useScroll, useTransform } from 'motion-v'
import type { ISkillCat } from '~/../typing';

const languages = ref([{
  icon: 'openmoji:flag-united-states',
  name: 'English',
  level: 'about_languages_upper_intermediate'
}, {
  icon: 'openmoji:flag-russia',
  name: 'Russian',
  level: 'about_languages_fluent'
}, {
  icon: 'openmoji:flag-ukraine',
  name: 'Ukrainian',
  level: 'about_languages_native'
}])

const { locale } = useI18n();
const titleRef = ref()

const translateLeft = {
  translateX: '-100%'
}
const translateZero = {
  translateX: 0
}
const translateRight = {
  translateX: '100%'
}
const { scrollX, scrollY, scrollYProgress } = useScroll({
  target: titleRef,

})
const scaleTitle = useTransform(scrollYProgress as any, [0, 1], [1.5, 1])
const scaleSubtitle = useTransform(scrollYProgress as any, [0, 1], [1, 1.5])
const t = await useResumeData();
const resumeInfo = ref(await useResumeData());

const contactsInfo = ref<Array<{ _id: string; name: string; icon: string, link: string }>>([]);
const skills = ref<ISkillCat[]>([])
skills.value = await useSkillsData();
contactsInfo.value = await useContactsData() as Array<{ _id: string; name: string; icon: string, link: string }>;
</script>
