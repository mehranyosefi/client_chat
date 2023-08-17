<script setup lang="ts">
const props = defineProps({
  error: Object
})

// const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
     <template v-if="error?.statusCode == 404">
      <NotFound :message="error.message" :statusCode="error.statusCode" :url="error.url"/>
    </template>
  </div>
</template>
