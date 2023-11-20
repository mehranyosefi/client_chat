
<template>
    <div class="menu-global" ref="menu">
        <slot name="activator"></slot>
        <Teleport to="body">
            <transition :appear="appear" :name="transitionName" :duration="transitionDuration">
                <div ref="menuContent" :style="style" v-if="activeTransition" class="menu">

                    <slot name="prepend-item"></slot>
                    <slot></slot>
                    <slot name="append-item"></slot>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    mLeft?: number
    mTop?: number
    active?: boolean
    mWidth?: number
    transitionName?: string
    appear?: boolean
    transitionDuration?: { enter: number, leave: number }
}>(),
    {
        mLeft: 0,
        mTop: 0,
        active: false,
        mWidth: 0,
        transitionName: 'fade',
        appear: true,
        transitionDuration:{ enter: 500,leave: 800 }
    }
)

const menu = ref(null)
const menuContent = ref(null)
const activeTransition = ref<boolean>(false)

//TODO reactive style
const style = computed(() => {
    const properties = menu.value?.getBoundingClientRect()
    menuContent.value?.getBoundingClientRect();
    return {
        width: `${properties?.width + props.mWidth}px`,
        left: `${properties?.left + props.mLeft}px`,
        top: `${properties?.top + props.mTop}px`
    }
})
activeTransition.value = props.active

//TODO fix animation on unmounted component
// onBeforeUnmount(() => {
//     activeTransition.value = false
// })
</script>


<style lang="postcss" scoped>
/* .menu-global {
    @apply tw-block tw-w-full;
} */
.menu {
    @apply absolute bg-gray-700/95 outline-none shadow-[1px_0_20px_-5px_] overflow-y-auto p-0 m-0 rounded z-20;
    max-width: 465px;
    max-height: 65vh;
    z-index: 1000;
    backdrop-filter: blur(1px);
}
</style>