<template>
   <Teleport to="body">
     <div v-if="active" class="modal"></div>
     <transition appear enter-active-class="animate__animated animate__zoomIn"
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