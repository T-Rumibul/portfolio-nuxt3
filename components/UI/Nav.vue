<template lang="pug">
nav(class="nav")
    UIButtonsBurger(:isActive="isActive" @click="isActive = !isActive")
    ul(:class="isActive ? 'nav-list_active' : ''" class="nav-list")
        li(class="active_page")
            NuxtLink(to="/")
                NuxtIcon(class="navIcon" name="home" :filled="true")
                span Home
        li
            NuxtLink(to="/about")
                NuxtIcon(class="navIcon" name="user" :filled="true")
                span About Me
        li
            NuxtLink(to="/portfolio")
                NuxtIcon(class="navIcon" name="portfolio" :filled="true")
                span Portfolio
        li
            NuxtLink(to="/contacts" )
                NuxtIcon(class="navIcon" name="chat" :filled="true")
                span Contacts
        
</template>

<script setup lang="ts">
let isActive = ref(false);
</script>

<style lang="sass" scoped>
.nav-list
    display: flex
    flex-direction: column
    align-items: center
    background-color: var(--nav-background)
    padding: toRem(25) toRem(15)
    border-radius: 0 0 999px 999px
    margin-top: toRem(-21)
    height: 0
    transition: height 0.2s linear
    visibility: hidden


.nav-list
    li
        list-style: none
        margin-top: toRem(25)
        position: relative
    li:nth-child(1)
        margin-top: toRem(15)



a:hover
    span:nth-child(2)
        color: var(--nav-hover)

@media(max-width: 1025px)
    span:nth-child(2)
        display: none
@media(min-width: 1025px)
    .nav-list
        span:nth-child(2)
            position: absolute
            text-decoration: none
            text-transform: uppercase
            right: toRem(-120)
            width: toRem(95)
            top: 0
            color: var(--text-primary)
            transition: right 0.2s linear
            display: block



.nav-list
    &_active
        visibility: visible
        height: toRem(164)
        @media(min-width: 1025px)
        span
            right: toRem(-125)
            visibility: visible
.router-link-active
    &::before
        content: ''
        width: toRem(5)
        height: toRem(25)
        background-color: var(--nav-active)
        position: absolute
        left: toRem(-15)
        top: toRem(-5)
    span:nth-child(2)
        color: var(--nav-active)
</style>
<style lang="sass">
.navIcon
    svg
        fill: #fff
        width: toRem(18)
        height: toRem(16)
        display: block
        opacity: 0.6
a:hover
    .navIcon
        svg
            fill: var(--nav-hover)
            opacity: 1


.router-link-active
    .navIcon
        svg
            fill: var(--nav-active)
            opacity: 1
</style>
