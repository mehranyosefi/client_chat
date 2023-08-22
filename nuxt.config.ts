// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   typescript: {
      strict: true
   },
   runtimeConfig :{
      public: {
         base_url: process.env.BASE_URL,
         base_url_api: process.env.BASE_URL_API
      }
   },
   app: {
      head: {
         title: 'my messanger',
         charset: 'utf-8',
         viewport: 'width=device-width, initial-scale=1',
         link: [{
            rel: 'icon',
            href: '/social_facebook_messenger_icon-icons.com_66150.ico'
         }]
      },
      pageTransition: { name: 'page', mode: 'out-in' }
   },
   modules: [
      '@nuxtjs/tailwindcss', '@pinia/nuxt'
   ],

   css: [
      '~/assets/styles/scss/main.scss',
      '~/assets/styles/css/main.css',
      '~/assets/styles/css/tailwind.css',
      '~/assets/icons/main.css',
      '@mdi/font/css/materialdesignicons.min.css',
      'animate.css/animate.min.css'
   ],
   vite: {
      css: {
         preprocessorOptions: {
            scss: {
               additionalData: '@import "@/assets/styles/scss/global.scss";',
            },
         },
      },
   },
})
