<template>
    <div class="inset-0 flex justify-center items-center bg-gray-900 h-screen">
      <div>
          <fieldset class="rounded-lg shadow bg-gray-700">
            <form @submit.prevent="register" class="form p-4">
                    <div class="form__field">
                        <label for="username">نام کاربری:</label>
                        <input v-model="user.username" id="username" placeholder="نام کاربری خود را وارد کنید" />
                    </div>
                    <div class="form__field">
                        <label for="email">ایمیل:</label>
                        <input v-model="user.email" id="email" placeholder="ایمیل خود را وارد کنید" />
                    </div>
                    <div class="form__field">
                        <label for="username">رمز عبور:</label>
                        <input v-model="user.password" type="password" id="username" placeholder="رمز عبور خود را وارد کنید" />
                    </div>
                    <div class="text-left">
                        <nuxt-link to="/signin" class="text-left text-xs underline text-blue-500">قبلا ثبت نام کرده
                            اید؟</nuxt-link>
                    </div>
                    <button
                        class="rounded px-3 py-2 bg-blue-700 text-white hover:bg-blue-800 font-bold mt-3 w-full mx-auto">ثبت
                        نام</button>
                </form>
          </fieldset>
      </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
title: 'صفحه ثبت نام',
meta: [
  { name: 'description', content: 'صفحه ثبت نام' }
],
bodyAttrs: {
  class: 'test'
},
//   script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})
const router = useRouter()

const user = reactive({
    username: '',
    email: '',
    password: ''
})




const register = async (): Promise<void> => {

}


</script>

<style scoped lang="postcss">
.form{
  &__field {
      @apply my-3 flex justify-between items-center;
      input {
          @apply outline-none shadow bg-gray-50/50 mr-2 p-3 rounded-lg text-white;
          &::placeholder {
              @apply text-xs text-white;
          }
      }

      label{
          @apply text-white;
      }
  }
}
</style>