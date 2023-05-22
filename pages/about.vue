<template lang="pug">
div
    div(class="photoCredentialsContainer")
        picture(class="photo")
            source(srcset="~assets/images/photo.webp"
            type="image/webp")
            source(srcset="~assets/images/photo.png" type="image/png")
            img(src="~assets/images/photo.png" alt="photo")
        div(class="credentials")
            h1 Andrey K.
            h2 Junior Front-End Developer
    div.aboutMe
        h3 About Me
        p {{ aboutMe }}
    div.experience
        h3 Experience
        p {{ experience }}

</template>

<script setup lang="ts">
import { ChooseSlideSide } from "@/helpers";

const aboutMe = `My name is Andrii, I'm from Ukraine, Kherson. As a self-taught
developer, I have a passion for web development and a desire to
learn and grow in the field. My strengths lie in my attention to
detail and my ability to problem solve. I enjoy working
collaboratively with others and am always seeking new challenges
to improve my skills. I am motivated, dedicated, and excited to
begin my career in Front-End Development.
`;
const experience = `For the four months, I have worked as a freelance Front-End
Developer. In this role, I have primarily focused on converting
designs from Figma or PSD to HTML/CSS and integrating them
into existing websites. I have also developed new components
and added additional functionality to both landing pages and
Wordpress sites. Additionally, I have experience with integrating
HTML/CSS into Wordpress CMS.`;
definePageMeta({
  pageTransition: {
    name: "slide-left",
  },
  middleware(to, from) {
    ChooseSlideSide(to, from);
  },
});
</script>

<style lang="sass" scoped>
.photoCredentialsContainer
    display: flex
    max-width: toRem(1000)
    margin: 0 auto
    margin-top: toRem(80)
    align-items: center
.photo
    width: toRem(200)
    height: toRem(200)
    display: flex
    border-radius: 9999px
    overflow: hidden
.credentials
    h1
        color: var(--text-primary)
        font-weight: 700
    h2
        color: var(--text-secondary)
        font-weight: 400
    h1,h2
        text-transform: uppercase
        font-family: "RC"
    margin-left: toRem(40)
</style>
