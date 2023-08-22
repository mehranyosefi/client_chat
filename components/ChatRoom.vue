<template>
   <section id="header" class="bg-gray-800 py-5 px-2 shadow-2xl sticky top-0 z-0">
      <Head>
         <Title>{{ user?.name }}</Title>
      </Head>
      <div class="flex justify-between items-center px-2 relative">
         <div class="flex">
            <svg @click="router.push('/')" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
               viewBox="0 0 24 24" class="w-10 h-10 fill-gray-400 hover:fill-gray-100 md:hidden cursor-pointer mt-2">
               <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
            </svg>
            <div class="flex items-center mr-3">
               <img :src="user?.thumbnail" class="avatar cursor-pointer" @click.stop="showProfile = true">
               <span v-text="user?.name" class="text-white mr-3"></span>
            </div>
         </div>
         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            viewBox="0 0 24 24" class="w-10 h-10 fill-gray-400 hover:fill-gray-100 cursor-pointer" id="icon-option"
            @click="showOption = !showOption">
            <path
               d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
         </svg>
         <transition enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut">
            <div v-if="showOption" class="absolute left-10 top-3 rounded-md w-16 bg-gray-700 p-1">
               <ul class="w-full">
                  <li class="hover:bg-gray-600 text-white">
                     <button class="w-full py-2 px-1 hover:rounded-md" @click="deleteUser">حذف</button>
                  </li>
               </ul>
            </div>
         </transition>
      </div>
   </section>
   <drop-zone @files-dropped="addFiles" #default="{ dropZoneActive }">
      <section id="messages" class="overflow-y-auto pb-14">
         <transition enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut">
            <div v-if="dropZoneActive" class="absolute w-full sm:w-2/3 bg-gray-600 z-10">
               <div class="w-full h-full flex justify-center items-center">
                  <div>فایل ها را رها کنید</div>
               </div>
            </div>
            <div v-else-if="!dropZoneActive && files?.length > 0" class="absolute w-full sm:w-2/3 bg-gray-600 z-10 py-7">
               <h1 class="text-base text-gray-100 px-1 inline-block">فایل های انتخاب شده:</h1>
               <svg @click="files = []" class="inline-block float-left ml-5" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="32" height="32" viewBox="0 0 24 24">
                  <path class="fill-gray-300 hover:fill-gray-100 cursor-pointer"
                     d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
               </svg>
               <div class="h-full">
                  <div class="w-full flex items-center justify-around flex-wrap h-5/6 overflow-auto">
                     <img v-for="file in files" :src="file.url" :alt="`image of ${file.id}`" width="120"
                        class="mx-2 border rounded">
                  </div>
                  <div class="mx-auto text-center">
                     <button @click="trigger_send_file()" class="w-32 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base
                        font-medium text-white hover:bg-blue-800 focus:outline-none ">
                        ارسال
                     </button>

                  </div>
               </div>
            </div>
         </transition>
         <nav>
            <!-- <span class="text-white">{{ percentage }}</span> -->
            <ul class="messages flex flex-col p-3">
               <Pm v-for="(message, i) in messages" :key="i" :message="message" />
            </ul>
         </nav>
      </section>

      <section id="footer" class="w-full md:w-2/3  fixed left-0 bottom-0 px-4 pb-4">
         <v-form class="w-full" @submit.prevent="onSubmit">
            <div class="relative flex justify-center items-end w-100 md:w-3/4 m-auto">
               <div
                  class="w-5/6 md:w-2/3 bg-gray-800 text-white rounded-r-2xl rounded-bl-sm rounded-tl-2xl py-2 px-3 border-gray-800">
                  <div contenteditable="true" class="w-[91%] px-2 py-1 border-transparent outline-none" :class="{ 'pl-0': voiceRecording }"
                     @input="customValidate" id="entry-element" @keydown.enter.prevent="onSubmit">
                     <div v-if="voiceRecording" class="float-left">
                        <span class="text-red-600"> {{ hour }}:{{ minutes }}:{{ second }} </span>
                     </div>
                  </div>
               </div>
               <input type="file" class="hidden" ref="file" id="input-file" multiple @change="uploadFile">
               <button v-if="!validInput && !voiceRecording" @click="selectFile()" type="button" class="absolute icon-upload">
                  <svg class="fill-gray-300 hover:fill-gray-100 " xmlns="http://www.w3.org/2000/svg" fill="red"
                     xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="32" height="32" viewBox="0 0 24 24">
                     <path
                        d="M7.5,18A5.5,5.5 0 0,1 2,12.5A5.5,5.5 0 0,1 7.5,7H18A4,4 0 0,1 22,11A4,4 0 0,1 18,15H9.5A2.5,2.5 0 0,1 7,12.5A2.5,2.5 0 0,1 9.5,10H17V11.5H9.5A1,1 0 0,0 8.5,12.5A1,1 0 0,0 9.5,13.5H18A2.5,2.5 0 0,0 20.5,11A2.5,2.5 0 0,0 18,8.5H7.5A4,4 0 0,0 3.5,12.5A4,4 0 0,0 7.5,16.5H17V18H7.5Z" />
                  </svg>
               </button>
               <button v-show="voiceRecording" type="button" class="cancelRecording">
                  <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28" fill="red">
                     <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/>
                  </svg>
               </button>
               <button class="icon-send" type="button" @click="validInput ? onSubmit() : voiceRecording ? mediaRecorder.stop() :recordTrigger()">
                  <Transition enter-active-class="animate__animated animate__fadeIn"
                     leave-active-class="animate__animated animate__fadeOut">
                     <svg v-if="validInput || voiceRecording" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1" width="28" height="28" viewBox="-8 -5 37 35" style=" transform: rotate(180deg);"
                        fill="white">
                        <path
                           d="M4 6.03L11.5 9.25L4 8.25L4 6.03M11.5 14.75L4 17.97V15.75L11.5 14.75M2 3L2 10L17 12L2 14L2 21L23 12L2 3Z" />
                     </svg>
                     <svg v-else fill="white" xmlns="http://www.w3.org/2000/svg" height="28" viewBox="-8 -5 37 35"
                        width="28">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                           d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                     </svg>
                  </Transition>

               </button>
            </div>
            <!-- <v-error-message name="pm" class="w-full fixed text-gray-200 block text-xs bottom-2 text-right pr-20"></v-error-message> -->
         </v-form>
      </section>

   </drop-zone>
   <LazyModal v-if="showProfile" :active="showProfile">
      <div class="relative bg-gray-900 rounded-lg overflow-hidden shadow-xl my-8 sm:max-w-2xl sm:w-full"> 
         <img :src="user?.thumbnail" v-click-outside="()=> showProfile = false"/>
      </div>
   </LazyModal>
</template>


<script lang="ts" setup>

import User from '@/types/User'
import apiServices from '@/services/apiServices'
import UserId from '@/types/UserId'
import Pm from '@/components/Pm.vue'
import messageStore from '@/stores/message'
import MessagePack from 'what-the-pack'
import { Buffer } from 'buffer'
import { userStore } from '~/stores/user'

//props

let props = defineProps<{
   user_id: UserId
}>()



//emits

const emit = defineEmits(['delete_user'])


//data

let user = reactive({} as User)
let showOption = ref<boolean>(false)
let ws = ref<any>(null)
const { encode, decode, register } = MessagePack.initialize(2 ^ 20)
let validInput = ref<string>('')
const { addFiles, files } = useUploadAbleFile()
const percentage = ref<number>(0)
const voiceRecording = ref<boolean>(false)
let dataArray: Array<ArrayBuffer| Blob> = []
let mediaRecorder: MediaRecorder
const router = useRouter()
const { delete_user } = userStore()

const { second, minutes, hour,startTimer, resetTimer } = useCountTimer()
const showProfile= ref<boolean>(false)

//enum

enum state_ws {
   OPEN = 1,
   CLOSE = 2
}


//computed

const messages = computed(() => {
   return messageStore().items.filter(item => item.user_id == props.user_id)
})


await get_user()
onMessage()


//hooks

onMounted(() => {
   document.addEventListener('click', (e) => {
      hide_option(e)
   })
})

onUnmounted(() => {
   document.removeEventListener('click', hide_option)
   if (ws.readyState === state_ws.OPEN) {
      ws.close()
   }
})



//methods

async function get_user() {
   const { data, error } = await useAsyncData('user', ()=> apiServices.getUser(props.user_id))
   if(data?.value[0]) user = data?.value[0]
   else throw createError({ statusCode: 404, statusMessage: 'User Not Found', fatal: true})
}


function test_websocket() {
   ws = connect_to_ws()
   ws.onopen = () => {
      ws.binaryType = 'arraybuffer';
      console.log('connected to server successfully')
   }
   ws.onerror = (event: any) => {
      console.log(event)
   }
}


function connect_to_ws() {
   return new WebSocket('wss://socketsbay.com/wss/v2/1/demo/')
}


function customValidate(e: any) {
   validInput.value = e.target.innerHTML
   if (!validInput.value || /profanity/gi.test(validInput.value)) {
      return false
   }
   return true
}

async function onSubmit() {
   try {
      ws.send(encode(validInput.value))
   } catch (e) {
      console.log(e)
      return
   }
   push_message(true, validInput.value)
   onMessage()
   validInput.value = ''
   document.getElementById('entry-element')!.innerHTML = ''
}

async function deleteUser() {
   try{
      await apiServices.deleteUser(props.user_id)
      const res = delete_user(props.user_id)
      if (res) {
         router.push('/')
      }
   }catch(e) {
      console.log(e)
   }
}

function hide_option(e: any): void {
   if (!document.getElementById('icon-option')?.contains(e.target)) {
      showOption.value = false
   }
}

function push_message(self: boolean, content?: string, img?: string, audioSrc?: string): void {
   const chatRoom = document.querySelector('#messages')!
   messageStore().push_message(props.user_id, self, content, img, audioSrc)
   chatRoom.scrollTo(0, chatRoom.scrollHeight)
}

function onMessage() {
   ws.onmessage = function (event: any) {
      let pm = null
      if (event.data instanceof ArrayBuffer && decode(Buffer.from(event.data)).pm) {
         pm = decode(Buffer.from(event.data)).pm
      } else {
         pm = event.data
      }
      push_message(false, pm)
   }
}


function selectFile() {
   document.getElementById('input-file')!.click()
}


function uploadFile(event: any) {
   if (event.target.files) addFiles(event.target.files)
}

function trigger_send_file() {
   try {
      files.value.forEach(file => {
         send_file(file.file, function (bufferedAmount: number) {
            if (bufferedAmount == 0) {
               push_message(true, undefined, file.url)
               return
            } else {
               let loaded = file.file.size - bufferedAmount
               percentage.value = Math.round((loaded * 100) / file.file.size)
            }

         })
      })
   } catch (e) {
      console.log(e)
   }
   files.value = []
}

function send_file(file: any, callback: ((bytesNotSent: number) => void) | null) {
   ws.send(encode(file))
   if (callback != null) {
      let interval = setInterval(function () {
         //  console.log(ws.bufferedAmount)
         if (ws.bufferedAmount > 0) {
            callback(ws.bufferedAmount)
         } else {
            callback(0)
            clearInterval(interval);
         }
      }, 100);
   }

}


function recordTrigger() {
   let audioIN = { audio: true };
   navigator.mediaDevices.getUserMedia(audioIN)
      .then((mediaStreamObj) => {

         mediaRecorder = new MediaRecorder(mediaStreamObj);
         mediaRecorder.start()
         startTimer()
         voiceRecording.value = true
         document.querySelector('#footer .cancelRecording')?.addEventListener('click', ()=> {
            voiceRecording.value = false
            mediaStreamObj.getTracks().forEach(track => track.stop())
            resetTimer()
         })

         mediaRecorder.ondataavailable = function (ev: { data: ArrayBuffer | Blob }) {
            dataArray.push(ev.data);
         }

         mediaRecorder.onstop = ()=> {
            if(voiceRecording.value){
               let audioData = new Blob(dataArray,{ 'type': 'audio/mp3' })
               dataArray = [];
               let audioSrc = window.URL.createObjectURL(audioData);
               push_message(true, undefined, undefined, audioSrc)
               voiceRecording.value = false
               resetTimer()
               mediaStreamObj.getTracks().forEach(track => track.stop())
            }

         }

      }).catch((e)=> {
         console.log(e)
      })
}


if(process.client) test_websocket()

</script>

<style lang="postcss" scoped>
#messages {
   height: calc(100vh - 158px);

   &>div {
      height: inherit;
   }
}


.icon-upload {
   left: 16%;
   @apply bottom-2 sm:left-[14%] md:left-[24%] lg:left-[22%];
}

.icon-send {
   @apply rounded-full mr-2 w-11 h-11 flex justify-center items-center shadow-2xl cursor-pointer bg-gray-800 hover:bg-blue-700;
}

.cancelRecording {
   @apply rounded-full mr-2 w-11 h-11 flex justify-center items-center shadow-2xl cursor-pointer bg-gray-800;

   &:hover{
      @apply bg-red-800;

      svg {
         @apply fill-white;
      }
   }
}
.animate__animated {
  --animate-duration: .05s;
}
</style>