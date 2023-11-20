export const useIsOnMobile = ()=> {
    const windowWidth = ref<number>(process.client ? window.innerWidth : 0)
    onMounted(()=>{
        window.addEventListener('resize', ()=> {
            windowWidth.value = window.innerWidth
        })
    })
    const isOnMobile = computed(()=> {
            if(windowWidth.value > 768) return false
            return true
    })
    return { windowWidth, isOnMobile }
}