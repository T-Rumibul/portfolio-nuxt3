<template lang="pug">
div(class="aboutContainer")
    Head
        Title About Me | Junior Front-End Developer

    div(class="photoCredentialsContainer")
        picture(class="photo")
            source(srcset="~assets/images/photo.webp"
            type="image/webp")
            source(srcset="~assets/images/photo.jpg" type="image/png")
            img(src="~assets/images/photo.jpg" alt="photo")
        div(class="credentials")
            h1 {{ $t("about_name") }}
            h2 {{ $t("about_spec") }}

    div(class="aboutMeContainer")
        div(class="aboutMe")
            h3 {{ $t("about_aboutme_title") }}
            p {{ $t("about_aboutme") }}

        div(class="aboutMe")
            h3 {{ $t('about_experience_title') }}
            p {{ $t("about_experience") }} 
                NuxtLink(:to="path('portfolio')") {{ $t('about_exprerience_link') }}

        div(class="aboutMe")
            h3 {{ $t('about_skills') }}

            div(class="skillsContainer")
                h4 {{ $t('about_skills_main') }}:
                p(class="skill" v-for="main in skillsMain") {{ main }}
                h4 {{ $t('about_skills_secondary') }}:
                p(class="skill skillSecondary" v-for="secondary in skillsSecondary") {{ secondary }}

        div(class="aboutMe")
            h3 {{ $t('about_contacts_title') }}
            Contacts

    div(class="downloadButtonContainer")
        UIButtonsButton(
            :hover-fill="'var(--button-secondary)'"
            :bg="'var(--button-primary)'"
            :download="'/cv.pdf'"
            :min-width="200"
            ) {{ $t('about_download') }}

</template>

<script setup lang="ts">
const path = useLocalePath();
const skillsMain = ref([
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "Vue/Nuxt 3",
  "Sass",
  "Pug",
  "Docker",
  "Git",
  "Webpack",
  "Gulp",
]);
const skillsSecondary = ref([
  "React.js",
  "TypeScript",
  "Express.js",
  "Mongodb",
  "Electron.js",
  "Wordpress",
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
.photoCredentialsContainer
    display: flex
    align-items: center
    justify-content: center

    @media(max-width: toRem(650))
        flex-wrap: wrap
        text-align: center
.photo
    width: toRem(200)
    height: toRem(200)
    display: flex
    justify-content: center
    border-radius: 9999px
    overflow: hidden
.credentials
    margin-left: toRem(40)

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

    p
        color: var(--text-primary)
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
