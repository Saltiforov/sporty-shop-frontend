<template>
  <ClientOnly>
    <div class="relative max-w-[1783px] w-full max-h-[269px] mx-auto">
      <swiper-container
          ref="containerRef"
          class="w-full"
      >
        <swiper-slide
            v-for="(src, idx) in images"
            :key="idx"
            class="flex items-center justify-center"
        >
          <img
              :src="src"
              :alt="`Слайд ${idx + 1}`"
              class="w-full h-[269px] object-cover rounded-lg"
          />
        </swiper-slide>
      </swiper-container>

      <button
          @click="swiper.prev()"
          class="absolute bg-[#24242ACC] top-1/2 -left-6 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full shadow-md hover:bg-[#2A2A2D]"
      >
        <img src="@/assets/images/arrow-left.svg" alt="arrow-left.svg">
      </button>

      <button
          @click="swiper.next()"
          class="absolute bg-[#24242ACC] top-1/2 -right-6 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full shadow-md hover:bg-[#2A2A2D]"
      >
        <img src="@/assets/images/arrow-right.svg" alt="arrow-right.svg">
      </button>
    </div>
  </ClientOnly>
</template>


<script setup>

const props = defineProps({
  images: {
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

const containerRef = ref(null)

const swiper = useSwiper(containerRef, props.options)

</script>


<style scoped>
</style>