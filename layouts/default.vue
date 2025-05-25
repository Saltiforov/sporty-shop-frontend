<template>
  <div class="min-h-screen flex flex-col">
    <div class="w-full main-banner px-8 mx-auto mt-[98px] mb-[53px]">
      <div class="mx-auto w-full max-w-[1756px]">
        <ClientOnly>
          <template v-if="hydrated">
            <component
                :is="AsyncSwiper"
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
            </component>
          </template>
          <template v-else>
            <MainBannerSkeleton />
          </template>
        </ClientOnly>
      </div>
    </div>

    <main class="flex-1 p-4">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import MainBannerSkeleton from '~/components/Skeletons/MainBannerSkeleton/MainBannerSkeleton.vue'

// 🌙 Lazy load компонента только на клиенте
const AsyncSwiper = defineAsyncComponent(() => import('@/components/Swiper/SwiperWrapper.vue'))

const { data: images } = await useFetch('/api/images')

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
