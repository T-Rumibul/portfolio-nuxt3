export default defineNuxtPlugin((nuxtApp) => {
  const { token, refreshToken, username, setAccessToken } = useAuth()

  const adminAPI = $fetch.create({
    onRequest ({ request, options, error }) {

        options.headers.set('access-token', `${token.value}`)
        options.headers.set('refresh-token', `${refreshToken.value}`)
        options.headers.set('username', `${username.value}`)
      
    },
    onResponse ({ request, response, options }) {
      const newAccessToken = response.headers.get('access-token')
      if (newAccessToken) {
        setAccessToken(newAccessToken)
      }
    },
    async onResponseError ({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/admin/login'))
      }
    },
  })


  return {
    provide: {
        adminAPI,
    },
  }
})
