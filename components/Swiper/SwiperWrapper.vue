<template>
  <ClientOnly>
    <div class="relative w-full mx-auto">
      <swiper-container
          ref="containerRef"
          class="w-full"
      >
        <swiper-slide
            v-for="(item, idx) in items"
            :key="idx"
            class="flex items-center justify-center"
        >
          <slot :item="item" :index="idx" />
        </swiper-slide>
      </swiper-container>

      <button
          @click="swipeToLeft"
          class="swiper-btn btn-hover-default -left-6"
      >
        <img src="@/assets/images/arrow-left.svg" alt="arrow-left.svg" />
      </button>

      <button
          @click="swipeToRight"
          class="swiper-btn btn-hover-default -right-6"
      >
        <img src="@/assets/images/arrow-right.svg" alt="arrow-right.svg" />
      </button>
    </div>
  </ClientOnly>
</template>


<script setup>

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  options: {
    type: Object,
    required: true,
    default: () => {
    }
  }
})

const emit = defineEmits(['swiper-slide-to-right'])

const swipeToRight = () => {
  swiper.next()
  emit('swiper-slide-to-right')
}
const swipeToLeft = () => {
  swiper.prev()
  emit('swiper-slide-to-left')
}

const containerRef = ref(null)

const swiper = useSwiper(containerRef, props.options)

</script>

<style scoped>
.swiper-btn {
  @apply absolute bg-[#24242ACC] top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full shadow-md hover:bg-[#2A2A2D];
}
</style>