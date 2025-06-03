<template>
  <div class="min-h-screen flex flex-col">
    <div class="w-full main-banner px-8 mx-auto mb-[53px]">
      <div class="mx-auto w-full max-w-[1756px]">
        <SwiperWrapper
            v-if="hydrated"
            :items="images"
            :options="swiperOptions"
        >
          <template #default="{ item }">
            <NuxtImg
                :src="item.replace('/_nuxt/public', '')"
                format="webp"
                class="w-full object-cover rounded-lg"
                alt="swiper-image"
                loading="lazy"
                decoding="async"
                width="1756"
                height="250"
                :modifiers="{ quality: 90 }"
            />
          </template>
        </SwiperWrapper>
        <MainBannerSkeleton v-else/>
      </div>
    </div>

    <main class="flex-1 pt-4 px-4 pb-0">
      <NuxtPage/>
    </main>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import MainBannerSkeleton from '~/components/Skeletons/MainBannerSkeleton/MainBannerSkeleton.vue'

import BannerImage from '~/public/images/banner-image.webp'

const images = [ BannerImage, BannerImage ]

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
:deep(.swiper-pagination) {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

:deep(.swiper-pagination-bullet) {
  background-color: #d6d6eb;
  opacity: 1;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #7e5bef;
}

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
