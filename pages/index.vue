<template lang="pug">
div.container
    PtsAnimatedLines(class="animated-background")
    <form>
      <select v-model="locale">
        <option value="en">en</option>
        <option value="ru">ru</option>
      </select>
      <p>{{ $t('welcome') }}</p>
    </form>
    div.text-container
        p {{ $t('home_hello') }}
        h1 {{ $t('home_im') }} 
            DynamicText(:text="dynamicText" :speed="100" class="dynamic-text")
        div(class="learnMore")
            span {{ $t("home_more")}}
        div.button-container
            UIButtonsButton(:to="'/about'"
            :hover-fill="'#555'"
            :bg="'#2196f3'"
            :icon-name="'user'"
            :icon-size="20"
            ) {{ $t('home_link_about') }}
            UIButtonsButton(:to="'/portfolio'" 
            :hover-fill="'#2196f3'"
            :button-bg="'transparent'"
            :icon-name="'portfolio'"
            :icon-size="20"
            ) {{ $t('home_link_portfolio') }}
</template>

<script setup lang="ts">
import { ChooseSlideSide } from "@/helpers";

definePageMeta({
  pageTransition: {
    name: "slide-left",
  },
  middleware(to, from) {
    ChooseSlideSide(to, from);
  },
});
const { t, locale } = useI18n();
const dynamicText = ref([t("home_dynamic_text.0"), t("home_dynamic_text.1")]);
</script>

<style lang="sass" scoped>
.animated-background
    width: 100%
    height: 100%
    z-index: 2
    position: absolute
    left: 0
    top: 0
    overflow: hidden
.container
    display: flex
    align-items: center
    justify-content: center
    height: 100vh
.text-container
    position: relative
    z-index: 5
    color: #fff
    max-width: toRem(550)

.text-container
    p,h1
        margin: 0
    p
        font-size: toRem(19)
        text-transform: uppercase
    h1
        font-size: toRem(42)
        font-family: "OS"
        font-weight: 500
        text-transform: uppercase
        white-space: nowrap
    .learnMore
        margin: toRem(15) 0
        span
            display: block

    .dynamic-text
        color: var(--text-secondary)
.button-container
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: center
    margin-top: toRem(10)
</style>
