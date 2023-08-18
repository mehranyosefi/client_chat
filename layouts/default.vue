<template>
    <div class="3xl:container mx-auto bg-gray-900">
        <div class="grid grid-cols-1">
            <div v-if="items?.length && !route.params.id" class="hidden md:block">
                <div class="absolute left-0 h-full w-2/3 flex justify-center items-center">
                    <p class=" bg-gray-800 py-2 px-3 rounded-lg text-sm text-gray-200">برای شروع گفتوگو روی مخاطب ضربه بزنید
                    </p>
                </div>
            </div>
            <div class="flex flex-wrap relative">
                <section class="rightMenu w-full md:w-1/3 bg-gray-700 h-screen relative md:z-8">
                    <div class="rightMenu__header bg-green-400 h-14">
                        <button class="mt-3 mr-6" @click.stop="show_menu = !show_menu"><icon class="text-4xl text-white hover:text-gray-200">mdi-menu</icon></button>
                        <lazy-menu v-if="show_menu" :active="show_menu" class="w-3/5" :mLeft="-50" :mTop="5">
                            <nav class="h-80 text-white" v-click-outside="()=> show_menu = false">
                                <ul><li>kdf</li></ul>
                            </nav>
                        </lazy-menu>
                    </div>
                    <nav class="rightMenu__users overflow-y-auto">
                        <ul class="text-white pl-0 pr-3 py-5">
                            <template v-if="items?.length">
                                <Contact v-for="user in items" :key="user.id" :user="user"
                                    @trigger_conversation="trigger_conversation" />
                                <!-- <div class="h-6"></div> -->
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
            <button v-if="addConversationIcon" class="fixed bottom-6 left-10 md:left-auto  md:right-1/4 z-9 rounded-full bg-blue-700 w-12 h-12
                shadow-md flex items-center justify-center cursor-pointer hover:shadow-2xl hover:bg-blue-800"
                @click.stop="trigger_show_modal()">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                    viewBox="0 0 24 24" class="w-7 h-7 fill-gray-300">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
            </button>
        </div>
        <LazyModal v-if="show_modal" :active="show_modal">
            <div class="relative bg-gray-900 rounded-lg overflow-hidden shadow-xl my-8 sm:max-w-lg sm:w-full" v-click-outside="()=> show_modal = false">
                <div class="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <v-form class="bg-gray-900 rounded p-5" @submit="addUser">
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
                </div>
            </div>
        </LazyModal>
    </div>
</template>
 
 
<script setup lang="ts">
import { userStore } from '@/stores/user'
// import usePromis from '@/composables/use-promis'
import Contact from "@/components/Contact.vue"
import UserId from '@/constants/types/UserId'
import User from '@/constants/types/User'







//datas
let isActiveConversation = ref<boolean>(false)
let user_id = ref<UserId>(0)
const error = ref<any>(null)
let show_modal = ref<boolean>(false)
const route = useRoute()
const innerWidth = ref<number>(0)
const user_store = userStore()
const items = user_store.state.items
const show_menu = ref<boolean>(false)


if (process.client) {
    innerWidth.value = window.innerWidth
    window.addEventListener('resize', () => {
        innerWidth.value = window.innerWidth
    })
}


await user_store.get_users()


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
    const user = {
        name: value.name,
        thumbnail: "/img/default_profile.jpeg"
    }
    try {
        await user_store.add_user(user)
        show_modal.value = false
    } catch (e) {
        error.value = e
    }

}

function trigger_show_modal():void {
    show_modal.value = true
    nextTick(()=>{
        const input = document.getElementById("filed-name") as HTMLInputElement
        input?.focus()
    })
}


</script>
 
 
<style lang="postcss" scoped>
.rightMenu{
    &__users{
        height: calc(100vh - 56px);
    }
}
</style>