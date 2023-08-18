<template>
   <li class="contact">
      <nuxt-link :to="`/${ user.id }`" active-class="active">
         <img class="avatar" :src="user.thumbnail" :alt="`image of ${user.thumbnail}`">
         <span class="mr-2" v-text="user.name"></span>
      </nuxt-link>
   </li>
</template>

<script setup lang="ts">
import User from '@/constants/types/User'

//props

const props = defineProps<{
   user: User,
}>()

//emits

const emit = defineEmits(['trigger_conversation'])


//data

const route = useRoute()



// //computed

// const active = computed (()=> {
//    if(route.hash){
//       console.log(route.hash)
//     return route.hash.split('#')[1] == props.user.id
//   }
//   return false
// }) 

</script>


<style lang="postcss" scoped>

.contact {
   @apply cursor-pointer;
   
   >a{
      @apply flex items-center p-3 rounded-lg hover:bg-gray-800/25;
      &.active {
         @apply bg-blue-800;
      }
   }
}

</style>
