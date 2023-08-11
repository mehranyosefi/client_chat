const APISettings = {
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   },
   withCredentials: true
}
// type UseFetchOptions = {
//    key?: string
//    method?: string
//    query?: SearchParams
//    params?: SearchParams
//    body?: RequestInit['body'] | Record<string, any>
//    headers?: Record<string, string> | [key: string, value: string][] | Headers
//    baseURL?: string
//    server?: boolean
//    lazy?: boolean
//    immediate?: boolean
//    default?: () => DataT
//    transform?: (input: DataT) => DataT
//    pick?: string[]
//    watch?: WatchSource[]
//  }



export default async function useCustomeFetch(url: string | Request | Ref<string | Request>, options?: { [key: string ]: any } | undefined ) {
   const config = useRuntimeConfig()
   if(options && options['headers']) options['headers'] = { ...APISettings.headers, ...options['headers'] }
   return await useFetch(config.public.base_url + url, options)
}