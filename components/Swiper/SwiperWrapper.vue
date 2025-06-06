<template>
  <ClientOnly>
    <div class="relative w-full mx-auto">
      <swiper-container
          ref="containerRef"
          class="w-full"
          :style="paginationStyles"
      >
        <swiper-slide
            v-for="(item, idx) in items"
            :key="idx"
            :class="['flex items-center', alignStart ? 'justify-start px-2' : 'justify-center']"
        >
          <slot :item="item" :index="idx"/>
        </swiper-slide>
      </swiper-container>

      <button
          v-show="isShowSlideButton"
          class="swiper-btn -left-6"
          @click="swipeToLeft"
          :style="buttonStyles"
          :class="buttonClass"
      >
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 15L1 8L8 1" :stroke="arrowColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button
          v-show="isShowSlideButton"
          class="swiper-btn -right-6"
          @click="swipeToRight"
          :style="buttonStyles"
          :class="buttonClass"
      >
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L8 8L1 15" :stroke="arrowColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
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
    required: false,
    default: () => ({})
  },
  buttonStyles: {
    type: Object,
    required: false,
  },
  arrowColor: {
    type: String,
    required: false,
    default: () => 'white'
  },
  buttonClass: {
    type: String,
    default: () => 'btn-hover-default'
  },
  isShowSlideButton: {
    type: Boolean,
    default: true
  },
  alignStart: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['swiper-slide-to-right', 'swiper-slide-to-left'])

const containerRef = ref(null)

// Объединяем переданные опции с настройками пагинации
const swiperOptions = {
  ...props.options,
  pagination: {
    clickable: true,
  }
}

const swiper = useSwiper(containerRef, swiperOptions)

const swipeToRight = () => {
  swiper.next()
  emit('swiper-slide-to-right')
}
const swipeToLeft = () => {
  swiper.prev()
  emit('swiper-slide-to-left')
}

const paginationStyles = {
  "--swiper-pagination-color": "var(--color-muted-gray)",
  "--swiper-pagination-bullet-inactive-color": "var(--color-primary-pure-white)",
  "--swiper-pagination-bullet-inactive-opacity": "1",
  "--swiper-pagination-bullet-size": "12px",
  "--swiper-pagination-bullet-horizontal-gap": "6px"
}
</script>

<style scoped>
.swiper-btn {
  @apply absolute bg-[#24242ACC] top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full shadow-md;
}

@media(max-width: 650px) {
  .swiper-btn {
    display: none;
  }
}
</style>