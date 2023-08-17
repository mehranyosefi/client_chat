import { ref } from 'vue'

export const useCountTimer = () => {
    const second = ref<number>(0)
    const minutes = ref<number>(0)
    const hour = ref<number>(0)
    let setTimer: string | number | NodeJS.Timeout | undefined
    function startTimer(): void {
        setTimer = setInterval(()=> {
           second.value++
           if(second.value == 60){
            second.value = 0
            minutes.value++
            if(minutes.value == 60){
                minutes.value = 0
                hour.value++
            }
            // clearInterval(setTimer)
           }
        },1000)
    }
    function resetTimer():void {
        clearInterval(setTimer) 
        second.value = 0
        minutes.value = 0
        hour.value = 0
    }

    return { second, minutes, hour, startTimer, resetTimer }
}