<template>
  <span>{{ dynamicText }}</span>
</template>
<script setup lang="ts">

import type { DynamicText } from "~/../typing";

const { t, locale } = useI18n();

const props = withDefaults(defineProps<DynamicText>(), {
  speed: 80,
});

const dynamicText = ref<string>("");

const emptyingdynamicText = () => {
  return new Promise<void>((resolve, reject) => {
    let id = setInterval(() => {
      let currentText = dynamicText.value;
      if (currentText.length === 1) {
        dynamicText.value = "";
        clearInterval(id);
        resolve();
      }
      currentText = currentText.slice(0, currentText.length - 1);
      dynamicText.value = currentText;
    }, props.speed);
  });
};

const getText = () => {
  const text = [];
  for (let txt of props.text) {
    text.push(t(txt));
  }
  return text;
};
const filldynamicText = () => {
  let currentLocale = locale.value;
  let currentText: string[] = [];

  let textIndex = 0;
  let letterIndex = 0;
  let isPaused = false;

  setInterval(() => {
    
    const text = getText();
    if (currentLocale !== locale.value) {
      textIndex = 0;
      letterIndex = 0;
      dynamicText.value = "";
      currentText = [];
      currentLocale = locale.value;
      isPaused = false;
      return;
    }

    if (isPaused) return;
    
    const currentLocaleText = text[textIndex];
    if (!currentLocaleText) return;
    if (letterIndex > currentLocaleText.length) {
      isPaused = true;
      textIndex = textIndex == text.length - 1 ? 0 : (textIndex += 1);
      letterIndex = 0;
      currentText = [];
      emptyingdynamicText().then(() => {
        isPaused = false;
      });
      return;
    }

    currentText.push(currentLocaleText[letterIndex]!);
    letterIndex += 1;
    dynamicText.value = currentText.join("");
  }, props.speed);
};

onMounted(() => {
  filldynamicText();
});

</script>

<style lang="sass" scoped></style>
