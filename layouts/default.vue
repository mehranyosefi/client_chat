<template>
    <div class="3xl:container mx-auto bg-gray-900">
        <div class="grid grid-cols-1">
            <div v-if="items.length && !route.params.id" class="hidden md:block">
                <div class="absolute left-0 h-full w-2/3 flex justify-center items-center">
                    <p class=" bg-gray-800 py-2 px-3 rounded-lg text-sm text-gray-200">برای شروع گفتوگو روی مخاطب ضربه بزنید
                    </p>
                </div>
            </div>
            <div class="flex flex-wrap">
                <section id="users" class="w-full md:w-1/3 bg-gray-700 h-screen overflow-y-auto relative md:z-10">
                    <nav class="h-full">
                        <ul class="text-white p-9 h-full">
                            <template v-if="items.length">
                                <Contact v-for="user in items" :key="user.id" :user="user"
                                    @trigger_conversation="trigger_conversation" />
                                <div class="h-6"></div>
                            </template>
                            <template v-else>
                                <li class="text-center h-full flex items-center justify-center">
                                    <p class=" bg-gray-800 py-2 px-3 rounded-lg text-sm">برای گفتو گو مخاطب خود را ایجاد
                                        کنید</p>
                                </li>
                            </template>
                        </ul>
                    </nav>
                </section>
               <slot />
               
            </div>
            <section v-if="addConversationIcon" class="fixed bottom-6 left-10 md:left-auto  md:right-1/4 z-10 rounded-full bg-blue-700 w-12 h-12
                shadow-md flex items-center justify-center cursor-pointer hover:shadow-2xl hover:bg-blue-800"
                @click="trigger_show_modal()">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                    viewBox="0 0 24 24" class="w-7 h-7 fill-gray-300">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
            </section>
        </div>
        <transition enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut">
            <Modal v-if="show_modal" @close="show_modal = false">
                <v-form class="bg-gray-900 rounded px-8 pt-6 mb-4" @submit="addUser">
                    <div>
                        <label class="block text-white text-sm font-bold mb-2" for="username">
                            نام مخاطب
                        </label>
                        <v-field name="name" id="filed-name" type="text" :rules="customValidate"
                            placeholder="نام مخاطب خود را وارد کنید"
                            class="w-full bg-gray-800 text-white rounded py-2 px-3 border-gray-800 mt-1">
                        </v-field>
                        <v-error-message name="name" class="w-full text-red-400 p-1 block text-xs text-right">
                        </v-error-message>
                        <small v-if="error" v-text="error" class="mt-1 text-red-400"></small>
                    </div>
                    <div class="bg-gray-900 mt-4">
                        <button
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">ثبت</button>
                        <button type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="show_modal = false">انصراف</button>
                    </div>
                </v-form>
            </Modal>
        </transition>
    </div>
</template>
 
 
<script setup lang="ts">
import apiServices from '~/services/apiServices';
import { storeToRefs } from 'pinia'
import { userStore } from '@/stores/user'
import usePromis from '@/composables/use-promis'
import Contact from "@/components/Contact.vue"
import UserId from '@/constants/types/UserId'
import User from '@/constants/types/User'




//hooks
const { data: users } = await useAsyncData('users', apiServices.getUsers)
userStore().state.items = users.value as User[]



//datas
let isActiveConversation = ref<boolean>(false)
let user_id = ref<UserId>(0)
const error = ref<any>(null)
let show_modal = ref<boolean>(false)
const route = useRoute()
const router = useRouter()
const innerWidth = ref<number>(0)
const items = reactive (userStore().state.items)

if(process.client) {
    innerWidth.value = window.innerWidth
    window.addEventListener('resize', ()=> {
        innerWidth.value = window.innerWidth
    })
}

//computed

const addConversationIcon = computed<boolean>(() => {
    if (innerWidth.value >= 768 || !route.params.id) {
        return true 
    }
    
    return false
    
})





//functions
let trigger_conversation = (id: string | number): void => {
    user_id.value = id
    isActiveConversation.value = true
}



function customValidate(value: any) {
    error.value = null
    if (!value) {
        return 'لطفا نام مخاطب را وراد کنید'
    }
    return true
}


async function addUser(value: any, { resetForm }: { resetForm: () => void }) {
  const user = JSON.stringify({
    name: value.name,
    thumbnail: "/img/default_profile.jpeg"
  })
    try {
        await apiServices.addUser(user)
        show_modal.value = false
        const users = await apiServices.getUsers()
        Object.assign(userStore().state.items, users)
    }catch(e) {
        error.value = e     
    }
    
}

function trigger_show_modal(): void {
    show_modal.value = true
    nextTick(() => {
        const input = document.getElementById("filed-name") as HTMLInputElement
        input.focus()
    })
}


</script>
 
 
<style lang="postcss" scoped></style>