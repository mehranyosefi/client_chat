<!-- <template>
   <div class="relative z-10">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div class="fixed z-10 inset-0 overflow-y-auto">
         <div class="flex items-center justify-center min-h-full p-4 sm:p-0">
            <slot>
            </slot>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">

</script> -->


<template>
   <Teleport to="body">
     <div v-if="active" class="modal"></div>
     <transition enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut">
       <div v-if="active" class="dialog">
         <div class="dialog-container">
             <slot name="prepend"></slot>
             <slot></slot>
             <slot name="append"></slot>
         </div>
       </div>
     </transition>
   </Teleport>
 </template>
 

<script lang="ts" setup>

const props = withDefaults(
  defineProps<{
    active: boolean;
  }>(),
  {
    active: false,
  }
);
</script>

<style lang="postcss" scoped></style>