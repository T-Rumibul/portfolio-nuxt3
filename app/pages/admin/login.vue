<template>

  <div class="flex items-center justify-center w-full flex-col">

    <h1 class="text-base-content mb-4 uppercase font-bold text-center w-full">Login</h1>
    <form class="flex flex-col w-[300px]" @submit.prevent="handleSubmit($event)">
      <input type="text" placeholder="Username" name="username"
        class="p-2 border border-base-300 rounded bg-base-100 text-base-content"
        @focusout="validateField('username', ($event.target as HTMLInputElement)?.value || '')" />
      <p id="username-error" class="text-sm mt-1 text-red-600 hidden"
        :style="validation.username ? {} : { display: 'block' }">Field
        cannot be empty</p>

      <input type="password" placeholder="Password" name="password"
        class="mt-4 p-2 border border-base-300 rounded bg-base-100 text-base-content"
        @focusout="validateField('password', ($event.target as HTMLInputElement)?.value || '')" />
      <p id="password-error" class="text-sm mt-1 text-red-600 hidden"
        :style="validation.password ? {} : { display: 'block' }">Field
        cannot be empty</p>


      <CommonCFTurnstile id="cf-turnstile" class="self-center mt-4 min-w-[300px] min-h-[65px]" v-show="!!turnstile"
        @loaded="handleLoaded($event)" />
      <p id="turnstile-error" class="text-sm mt-1 text-red-600 hidden text-center"
        :style="validation.turnstile ? {} : { display: 'block' }">Complete
        the security check</p>


      <p id="login-error" class="text-sm mt-1 text-center text-red-600" v-if="loginError">
        Login attempt failed.
      </p>
      <button type="submit"
        class="mt-4 bg-indigo-500 hover:bg-indigo-800 w-full self-center text-white p-2 rounded transition-colors cursor-pointer">
        Login
      </button>
    </form>

  </div>

</template>
<script setup lang="ts">
import type { TurnstileScript } from '~/../typing';

definePageMeta({
  layout: 'admin',
  i18n: false,
})
const authorized = useAuth();

const handleLoaded = (turnstileScript: TurnstileScript) => {
  turnstile.value = turnstileScript;
  turnstileScript.reset();
}
const turnstile = ref<TurnstileScript>()
const validation = ref<{ [key: string]: boolean }>({
  username: true,
  password: true,
  turnstile: true,
})
const loginError = ref(false);

const validateField = (field: string, value: string) => {
  if (value.trim() === '') {
    validation.value[field] = false;
  } else {
    validation.value[field] = true;
  }
}


const turnstileRef = ref<any>(null);

const errorTimer = ref<NodeJS.Timeout | null>(null);
const handleSubmit = (event: Event) => {

  const token = turnstile.value?.getResponse() || '';
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  validateField('username', formData.get('username') as string);
  validateField('password', formData.get('password') as string);
  if (!token) {
    validation.value.turnstile = false;
  } else {
    validation.value.turnstile = true;
  }
  if (!validation.value.username || !validation.value.password || !validation.value.turnstile) {
    return;
  }
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  authorized.login(username, password, token).then((success) => {
    if(success) {
      navigateTo('/admin/resume')
      return;
    }
    loginError.value = true;
    if (errorTimer.value) {
      clearTimeout(errorTimer.value);
    }
    errorTimer.value = setTimeout(() => {
      loginError.value = false;
    }, 5000);
    turnstileRef.value.reset();
    return;



  });

}
</script>
<style scoped></style>