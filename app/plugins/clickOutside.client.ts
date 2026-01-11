export default defineNuxtPlugin((nuxtApp) => {
   const handler = (el: HTMLElement, binding: any) => (e: MouseEvent) => {
    if (!el.contains(e.target as Node)) binding.value(e);
  };
  nuxtApp.vueApp.directive('click-outside', {
    beforeMount(el, binding) {
      el.__clickOutside__ = handler(el, binding);
      document.addEventListener('click', el.__clickOutside__, { passive: true });
    },
     updated(el, binding) {
      document.removeEventListener('click', el.__clickOutside__);
      el.__clickOutside__ = handler(el, binding);
      document.addEventListener('click', el.__clickOutside__, { passive: true });
     },
    unmounted(el) {
      document.removeEventListener('click', el.__clickOutside__);
      delete el.__clickOutside__;
    },
    getSSRProps() {
      return {};
    }
  });
});