<template lang="pug">
div.container
    Head
        Title Junior Front-End Developer 
    PtsAnimatedLines(class="animated-background" v-if="renderAnimation")
    div.text-container
        p {{ $t('home_hello') }}
        h1 {{ $t('home_im') }} 
            DynamicText(:text="dynamicText" :speed="100" class="dynamic-text")
        div(class="learnMore")
            span {{ $t("home_more")}}
        div.button-container
            UIButtonsButton(:to="'/about'"
            :hover-fill="'var(--button-secondary)'"
            :button-bg="'#2196f3'"
            :icon-name="'user'"
            :icon-size="20"
            :min-width="200"
            ) {{ $t('home_link_about') }}
            UIButtonsButton(:to="'/portfolio'" 
            :hover-fill="'var(--button-primary)'"
            :button-bg="'transparent'"
            :icon-name="'portfolio'"
            :icon-size="20"
            :min-width="200"
            ) {{ $t('home_link_portfolio') }}
</template>

<script setup lang="ts">
const renderAnimation = ref(false);
const dynamicText = ["home_dynamic_text.0", "home_dynamic_text.1"];
onMounted(() => {
  // trick to fix buging animation after language change
  renderAnimation.value = false;
  const id = setTimeout(() => {
    renderAnimation.value = true;
  }, 250);
});
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
    @media (max-width: toRem(550))
        margin: 0 toRem(15)

.text-container
    p,h1
        margin: 0
    p
        font-size: toRem(19)
        text-transform: uppercase
        @media (max-width: toRem(550))
            font-size: toRem(17)
    h1
        font-size: toRem(42)
        font-family: "OS"
        font-weight: 500
        text-transform: uppercase
        white-space: nowrap
        @media (max-width: toRem(550))
            font-size: toRem(25)
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
    gap: toRem(15)
</style>
