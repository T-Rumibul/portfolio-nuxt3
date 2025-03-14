<template lang="pug">
div(class="contactsList")
    p 
        NuxtIcon(name="github" class="nuxtIcon" :filled="true") 
        span GitHub:  
        NuxtLink(href="https://github.com/T-Rumibul" target="_blank")  https://github.com/T-Rumibul

    p 
        NuxtIcon(name="email" class="nuxtIcon" :filled="true") 
        span Email:  
        NuxtLink(to="mailto:andr.k.work@gmail.com" target="_blank")  andr.k.work@gmail.com

</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>
.nuxtIcon
    width: toRem(30)
    height: toRem(30)
    display: flex
.contactsList
    p
        display: flex
        flex-wrap: wrap
        align-items: center

        span
            color: var(--text-primary)

        a
            text-decoration: none
            color: var(--text-secondary)
            padding-left: toRem(10)
            overflow: hidden
            text-overflow: ellipsis

            @media(max-width: toRem(400))
                width: 100%
                padding: 0
                
        a:hover
            color: var(--text-primary)
</style>
