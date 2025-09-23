<template>
  <div class="aboutContainer">
    <Head>
      <Title>About Me | Junior Front-End Developer</Title>
    </Head>

    <div class="credentialsContainer">
      
      <div class="credentials">
        <h1>{{ $t("about_name") }}</h1>
        <h2>{{ $t("about_spec") }}</h2>
      </div>
    </div>

    <div class="aboutMeContainer">
      <div class="aboutMe">
        <h3>{{ $t('about_experience_title') }}</h3>
        <p>
          {{ $t("about_experience") }} 
          <NuxtLink :to="path('portfolio')">{{ $t('about_exprerience_link') }}</NuxtLink>
        </p>
      </div>

      <div class="aboutMe">
        <h3>{{ $t('about_skills') }}</h3>

        <div class="skillsContainer">
          <h4>{{ $t('about_skills_main') }}:</h4>
          <p class="skill" v-for="main in skillsMain">{{ main }}</p>
          <h4>{{ $t('about_skills_secondary') }}:</h4>
          <p class="skill skillSecondary" v-for="secondary in skillsSecondary">{{ secondary }}</p>
        </div>
      </div>

      <div class="aboutMe">
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
.credentialsContainer
    display: flex
    justify-content: center
    align-items: center
    gap: toRem(40)
    margin-bottom: toRem(50)

    @media(max-width: toRem(600))
        flex-direction: column
        margin: 0 toRem(15)
        margin-top: toRem(80)
        margin-bottom: toRem(30)
.credentials
    margin-left: toRem(40)
    text-align: center
    h1
        color: var(--text-primary)
        font-weight: 700

    h2
        color: var(--text-secondary)
        font-weight: 400

    h1,h2
        text-transform: uppercase
        font-family: "RC"
    
.aboutMe

    h3
        color: var(--text-secondary)
        text-transform: uppercase
        padding-bottom: toRem(10)
        

    p
        color: var(--text-primary)
        padding-bottom: toRem(10)
.skillsContainer
    display: flex
    gap: toRem(5)
    flex-wrap: wrap
    margin-left: toRem(15)
    margin-bottom: toRem(15)

    h4
        width: 100%
        color: var(--text-primary)
        text-transform: uppercase
        padding: toRem(5) 0
    @media(max-width: toRem(360))
        justify-content: center

.skill
    padding: toRem(10)
    background: var(--skill-primary)
    min-width: toRem(100)
    text-align: center
    text-transform: uppercase
    font-family: "RC"
    margin: 0
    font-weight: 700

.skillSecondary
    background: var(--skill-secondary)
.downloadButton
    background: var(--button-primary)
    color: var(--text-primary)
    padding: toRem(15)
    text-align: center
    border-radius: 15px
    text-decoration: none

.downloadButtonContainer
    display: flex
    justify-content: center
    margin-top: toRem(40)
    margin-bottom: toRem(30)

</style>
