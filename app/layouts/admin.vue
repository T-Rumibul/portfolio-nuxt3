<template>
    <div class="w-screen h-screen flex overflow-hidden">
        <Head>
        <Link sizes="16x16" rel="icon" href="/icons8-system-information-16.ico" />
        <Link sizes="32x32" rel="icon" href="/icons8-system-information-32.ico" />
        <Link sizes="96x96" rel="icon" href="/icons8-system-information-96.ico" />
        </Head>

       
        <AdminSidebar v-if="route.path !== '/admin/login' && route.path.startsWith('/admin')" :items="SIDEBAR_ITEMS"/>
        <slot />
        
        
  </div>
</template>
<script setup lang="ts">

const route = useRoute();

// const isAuthenticated = ref(false)
// isAuthenticated.value = await auth.verifyLogin()
const SIDEBAR_ITEMS = [
    { name: 'Dashboard', icon: 'mdi:view-dashboard-outline', color: 'text-green-500', route: '/admin/dashboard' },
    { name: 'Resume', icon: 'mdi:post-outline', color: 'text-cyan-500', route: '/admin/resume' },
    { name: 'Projects', icon: 'mdi:folder-outline', color: 'text-purple-500', route: '/admin/projects' },
];

</script>
<style scoped></style>
