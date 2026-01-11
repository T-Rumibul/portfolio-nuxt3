export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
        const auth = useAuth()
        const timeSinceLastUpdate = Date.now() - auth.lastUpdated.value;
        if(timeSinceLastUpdate > 5 * 1000) await auth.verifyAuth()
        if (!auth.isLoggedIn.value) {
           
            return navigateTo('/admin/login');
        }
    }
});