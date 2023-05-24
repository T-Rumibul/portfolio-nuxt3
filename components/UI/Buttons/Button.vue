<template lang="pug">
div(v-if="to")
    NuxtLink(:to="to" class="button"
    :style="buttonStyles" :target="target" )
        NuxtIcon(v-if="iconName" :name="iconName" class="nuxtIcon" :filled="true")
        span
            slot

div(v-else-if="!download")
    button(type="button" class="button" :style="buttonStyles")
        NuxtIcon(v-if="iconName" :name="iconName" class="nuxtIcon" :filled="true")
        span 
            slot
div(v-else-if="download")
    a(:href="download" download class="button" :style="buttonStyles")
        NuxtIcon(v-if="iconName" :name="iconName" class="nuxtIcon" :filled="true") 
        span
            slot

    
</template>
<script setup lang="ts">
import { Button } from "@/typing";
const props = withDefaults(defineProps<Button>(), {
  buttonBg: "var(--button-primary)",
  hoverFill: "var(--button-secondary)",
  textColor: "var(--text-primary)",
  iconColor: "#fff",
  iconSize: 16,
  textSize: 16,
  borderColor: "#2196f3",
  textUpperCase: true,
  textWeight: 500,
  minWidth: 0,
  target: "",
});
const buttonStyles = ref();
const computeButtonStyles = () => {
  const styles = `
        --background-color: ${props.buttonBg};
        --hover-fill: ${props.hoverFill};
        --icon-size: ${props.iconSize / 16}rem;
        --border-color: ${props.borderColor};
        --icon-color: ${props.iconColor};
        --text-color: ${props.textColor};
        --text-size: ${props.textSize};
        --text-transform: ${props.textUpperCase ? "uppercase" : "none"};
        --text-weight: ${props.textWeight};
        --btn-min-width: ${
          props.minWidth / 16 === 0 ? "none" : props.minWidth / 16 + "rem"
        }
    `;

  buttonStyles.value = styles;
};

computeButtonStyles();
</script>

<style lang="sass" scoped>
.button
    display: block
    text-decoration: none
    border: 1px solid var(--border-color)
    text-transform: var(--text-transform)
    font-weight: var(--text-weight)
    color: var(--text-color)
    position: relative
    overflow: hidden
    background-color: var(--background-color)
    padding: .5rem
    padding-left: 1.5rem
    padding-right: 1.5rem
    border-radius: 9999px
    min-width: var(--btn-min-width)
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    span
        position: relative
        font-size: var(--text-size)
        z-index: 5
    &::before
        content: ""
        position: absolute
        top: 0
        left: -53%
        width: 10%
        height: 112%
        z-index: 1
        transition-duration: .6s
        transform: skew(-22deg)
        background-color: var(--hover-fill)
    &:hover
        border-color: var(--hover-fill)
        &::before
            width: 180%
</style>
<style lang="sass">
.nuxtIcon
    svg
        width: var(--icon-size)
        height: var(--icon-size)
        margin-right: toRem(8)
        fill: var(--icon-color)
        position: relative
        z-index: 5
</style>
