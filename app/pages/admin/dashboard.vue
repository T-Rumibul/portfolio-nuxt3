<template>
    <div class="w-full">
        <AdminHeader title="Dashboard"/>
        <main class="p-6">
            <h2 class="text-2xl text-white mb-4">Welcome to the Admin Dashboard</h2>
            <p class="text-gray-300">There will be something someday or maybe not</p>
        </main>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  i18n: false,
})
// const auth = useAuth();
// if(!auth.isLoggedIn.value) {
//     navigateTo('/admin/login')
// }
</script>
<style scoped></style>
