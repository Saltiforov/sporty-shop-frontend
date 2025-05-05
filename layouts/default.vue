<template>
  <div class="min-h-screen flex flex-col">

    <div class="w-full px-4 mx-auto mt-[98px] mb-[53px]">
      <div class="mx-auto w-full max-w-[1756px]">
        <SwiperWrapper :items="images" :options="swiperOptions">
          <template #default="{ item }">
            <img
                :src="item"
                class="w-full h-[269px] object-cover rounded-lg"
            />
          </template>
        </SwiperWrapper>
      </div>
    </div>

    <main class="flex-1 p-4">
      <NuxtPage/>
    </main>

  </div>
</template>

<script setup>
const { data: images } = await useFetch('/api/images');

const swiperOptions = {
  effect: 'cards',
  loop: true,
  autoplay: {
    delay: 1000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
}
</script>