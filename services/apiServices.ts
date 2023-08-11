// import useFetch from "~/composables/use-custome-fetch"
const APISettings = {
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
   },
   withCredentials: true
}

export default {
   getUsers() {
      return $fetch(`${ useRuntimeConfig().public.base_url }/users`, {
         ...APISettings
      })
   },
   addUser(user: any) {
      return fetch(`${ useRuntimeConfig().public.base_url }/users`,{
         ...APISettings,
         method: "POST",
         body: user
      })
   },
   getUser(user_id: string | number) {
      return $fetch(`${ useRuntimeConfig().public.base_url }/users/?id=${encodeURIComponent( user_id )}`, { ...APISettings })
   },
   // sendMessage(data: Message) {
   //    return $fetch(`messages`, 'POST', data)
   // },
   deleteMessage( id : string | number ) {
      return $fetch(`${ useRuntimeConfig().public.base_url }/messages/${id}`, {
         ...APISettings,
         method: "DELETE"
      })
   },
   deleteUser(id : string | number) {
      return $fetch(`${ useRuntimeConfig().public.base_url }/users/${id}`, {
         ...APISettings,
         method: "DELETE"
      })
   }

}






