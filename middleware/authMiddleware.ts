export default defineNuxtRouteMiddleware((to, from)=> {
    const token = useCookie('token')
    if(!token.value && token.value == null) {
        // return navigateTo('/signin')
    }
})