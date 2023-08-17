import { defineStore } from 'pinia'
import User from '@/constants/types/User'
import apiServices from '~/services/apiServices'

export const userStore = defineStore('user', ()=> {

   const state = reactive({
      items: [] as User[]
   })

   //getters
   const getUserById =(id: string | number)=> computed(()=> state.items.find((item)=> item.id == id))


   //actions

   async function get_users() {
      const { data: users } = await useAsyncData('users', apiServices.getUsers)
      Object.assign(state.items, users.value as User[])
      //for multiple changes
      // user_store.$patch((state) => {
      //     state.state.items = users.value as User[]
      // })

   }

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
   
   async function add_user(user: { name: string, thumbnail: string }){
      await apiServices.addUser(JSON.stringify(user))
      const users = await apiServices.getUsers()
      Object.assign(state.items, users)
   }

   return {
      state,
      get_users,
      getUserById,
      delete_user,
      add_user
   }
   
})