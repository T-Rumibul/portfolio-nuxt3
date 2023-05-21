<template lang="pug">
span {{ dynamicText  }}
</template>
<script setup lang="ts">
import { DynamicText } from '@/typing';



const props = withDefaults(defineProps<DynamicText>(), {
    speed: 80
})
const dynamicText = ref<string>("")


const emptyingdynamicText = () => {

    return new Promise<void>((resolve, reject) => {
        let id = setInterval(() => {
            let currentText = dynamicText.value
            if (currentText.length === 1) {
                dynamicText.value = ""
                clearInterval(id)
                resolve()
            }
            currentText = currentText.slice(0, currentText.length - 1)
            dynamicText.value = currentText
        }, props.speed)
    })
}

const filldynamicText = () => {
    const text = props.text
    let currentText: string[] = []

    let textIndex = 0
    let letterIndex = 0
    let isPaused = false
    setInterval(() => {

        if (isPaused) return;

        if (letterIndex > text[textIndex].length) {
            isPaused = true
            textIndex = (textIndex == text.length - 1) ? 0 : textIndex += 1
            letterIndex = 0
            currentText = []
            emptyingdynamicText().then(() => {
                isPaused = false

            })
            return;

        }

        currentText.push(text[textIndex][letterIndex])
        letterIndex += 1
        dynamicText.value = currentText.join("")
    }, props.speed)
}

onMounted(() => {
    filldynamicText()
})



</script>

<style lang="sass" scoped>

</style>