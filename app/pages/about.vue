<template>
  <div class="aboutContainer">
    <Head>
      <Title>About Me | Junior Front-End Developer</Title>
    </Head>

    <div class="credentialsContainer d-flex justify-center align-center mb-10">
      
      <div class="credentials text-center uppercase">
        <h1 class="text-4xl font-bold">{{ $t("about_name") }}</h1>
        <h2 class="text-2xl">{{ $t("about_spec") }}</h2>
      </div>
    </div>

    <div class="aboutMeContainer">
      <div class="aboutMe">
        <h3 class="text-xl">{{ $t('about_experience_title') }}</h3>
        <p class="ml-2">
          {{ $t("about_experience") }} 
          <NuxtLink :to="path('portfolio')">{{ $t('about_exprerience_link') }}</NuxtLink>
        </p>
      </div>

      <div class="aboutMe">
        <h3 class="text-xl">{{ $t('about_skills') }}</h3>

        <div class="ml-2 flex flex-wrap gap-3 justify-center">
          <h4 class="text-lg ml-3 w-full text-(--text-primary) uppercase">{{ $t('about_skills_main') }}:</h4>
          <p class="font-[RC] bg-(--skill-primary) ml-4 p-2 min-w-[100px] text-center" v-for="main in skillsMain">{{ main }}</p>
          <h4 class="text-lg ml-3 w-full text-(--text-primary) uppercase">{{ $t('about_skills_secondary') }}:</h4>
          <p class="font-[RC] bg-(--skill-secondary) ml-4 p-2 min-w-[100px] text-center" v-for="secondary in skillsSecondary">{{ secondary }}</p>
        </div>
      </div>

      <div class="aboutMe mt-4">
        <h3>{{ $t('about_contacts_title') }}</h3>
        <Contacts />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const path = useLocalePath();
const skillsMain = ref([
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Vue/Nuxt",
  "React.js",
  "Next.js",
  "Sass",
  "Pug",
  "Docker",
  "Git",
  "Webpack",
  "Gulp",
]);
const skillsSecondary = ref([
  "Express.js",
  "Mongodb",
  "Electron.js",
  "Wordpress",
  "SQL"
]);
</script>

<style lang="sass" scoped>
.aboutContainer
    max-width: toRem(1000)
    margin: 0 auto
    margin-top: toRem(80)

    @media(max-width: toRem(1070))
        margin: 0 toRem(40)
        margin-top: toRem(80)

.credentials
    h1
        color: var(--text-primary)

    h2
        color: var(--text-secondary)
    h1,h2
        font-family: "RC"
    
.aboutMe
    h3
        color: var(--text-secondary)
        text-transform: uppercase
        padding-bottom: toRem(10)
    p
        color: var(--text-primary)
        padding-bottom: toRem(10)
.skill
    font-family: "RC"


</style>
