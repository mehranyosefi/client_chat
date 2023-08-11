import { defineStore } from 'pinia'
import User from '@/constants/types/User'





export const userStore = defineStore('user', ()=> {
   const state = reactive({
      items: [] as User[]
   })



   //getters
   const getUserById =(id: string | number)=> computed(()=> state.items.find((item)=> item.id == id))


   //actions

   function delete_user(id: string | number): boolean {
      const user = getUserById(id)
      if (user) {
         const index = state.items.indexOf(user.value as User) as number
         if (index > -1) {
            state.items.splice(index, 1)
            return true
         }
      }
      return false
   }
   
   function add_user(user: User){
      state.items.push(user)
   }

   return {
      state,
      getUserById,
      delete_user,
      add_user
   }
   
})