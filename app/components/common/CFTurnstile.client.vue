<template>

    <div ref="turnstileRef"></div>
  
</template>

<script setup lang="ts">
import type { TurnstileScript } from '~~/typing';

const emit = defineEmits<{
  (e: 'loaded', turnstile: TurnstileScript): void;
}>();
const turnstileRef = ref<HTMLElement>();
const { onLoaded } = useTurnstileScript();

onLoaded(({ turnstile }) => {
  if(!turnstileRef.value) return;
  turnstile.render(turnstileRef.value, {
    sitekey: useRuntimeConfig().public.turnstileSiteKey,
    theme: 'dark',
    appearance: 'always'
  })
    emit('loaded', turnstile);
})

</script>

<style scoped>
</style>