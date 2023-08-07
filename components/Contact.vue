<template>
   <li class="contact"
      @click="emit('trigger_conversation', user.id)" :class="{ 'active': active }">
      <nuxt-link :to="`#${ user.id }`" class="flex items-center p-3">
         <img class="avatar" :src="user.thumbnail" :alt="`image of ${user.thumbnail}`">
         <span class="mr-2" v-text="user.name"></span>
      </nuxt-link>
   </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import User from '@/constants/types/User'

//props

const props = defineProps<{
   user: User,
}>()

//emits

const emit = defineEmits(['trigger_conversation'])


//data

const route = useRoute()



//computed

const active = computed (()=> {
   if(route.hash){
      console.log(route.hash)
    return route.hash.split('#')[1] == props.user.id
  }
  return false
}) 

</script>


<style lang="postcss" scoped>

.contact {
   @apply cursor-pointer rounded my-3 bg-gray-800 hover:bg-gray-900;

   &.active {
      @apply bg-blue-500 hover:bg-blue-500;
   }
}

</style>
