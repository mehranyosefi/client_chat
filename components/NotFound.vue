<template>
    <div class="w-full h-screen bg-gray-900 flex justify-center items-center">
        <div class="w-80 py-10 rounded-md text-center text-white bg-gray-700">
            <h2 v-text="statusCode" class="font-bold"></h2>
            <p v-text="message" class="mt-1 mb-3"></p>
            <button class="px-3 py-1 rounded bg-blue-800" @click="handleClearError">بازگشت به خانه</button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    message: string
    statusCode: number | string
    url: string
}>()



const handleClearError = ():void => {
    clearError({ redirect: '/' })
}
</script>

<style scoped>

</style>