<template>
  <div 
  class="notification fixed bottom-4 text-center w-full text-base-content px-4 py-2 rounded shadow-lg" 
  v-if="visible">
    {{ message }}
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  duration: number;
}>();

const visible = ref(false);
const timeoutID = ref<NodeJS.Timeout | null>(null);
const message = useState<string>('notificationMessage', () => '');
watch(message, (newValue) => {
  if (newValue.length > 0) {
    showNotification();
  }
});
const showNotification = () => {
  visible.value = true;
    if (timeoutID.value) {
        clearTimeout(timeoutID.value);
    }
  timeoutID.value = setTimeout(() => {
    visible.value = false;
    message.value = '';
  }, props.duration);
};
</script>
<style scoped lang="sass">
</style>