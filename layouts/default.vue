<template>
  <div class="min-h-screen flex flex-col">
    <div class="w-full main-banner px-8 mx-auto mt-[98px] mb-[53px]">
      <div class="mx-auto w-full max-w-[1756px]">
        <SwiperWrapper
            v-if="hydrated"
            :items="images"
            :options="swiperOptions"
        >
          <template #default="{ item }">
            <img
                :src="item"
                loading="lazy"
                decoding="async"
                class="w-full h-[269px] object-cover rounded-lg"
                alt="swiper-image"
            />
          </template>
        </SwiperWrapper>
        <MainBannerSkeleton v-else/>
      </div>
    </div>

    <main class="flex-1 p-4">
      <NuxtPage/>
    </main>
  </div>
</template>

<script setup>
import {ref, onMounted, defineAsyncComponent} from 'vue'
import MainBannerSkeleton from '~/components/Skeletons/MainBannerSkeleton/MainBannerSkeleton.vue'

import Swiper from '~/components/Swiper/SwiperWrapper.vue'

const AsyncSwiper = defineAsyncComponent(() => import('@/components/Swiper/SwiperWrapper.vue'))

const images = [
  'https://wallpapers.com/images/high/fitness-gym-with-equipment-iovhjg9dwfy87bzf.webp',
  'https://wallpapers.com/images/high/home-gym-with-barbell-r4xvbh7jalyuhdme.webp',
  'https://wallpapers.com/images/high/gym-motivation-picture-8rog1fmrp8zbmfkm.webp',
]

const hydrated = ref(false)
onMounted(() => {
  hydrated.value = true
})

const swiperOptions = {
  effect: 'cards',
  loop: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
}
</script>

<style scoped>
@media (max-width: 750px) {
  .main-banner {
    display: none;
  }
}

@media (max-width: 500px) {
  main {
    padding: 0;
  }
}
</style>
