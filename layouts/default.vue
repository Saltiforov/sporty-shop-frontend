<template>
  <div class="min-h-screen flex flex-col">
    <Header/>

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

    <Footer/>
  </div>
</template>

<script setup>
const images = ref([
  'https://wallpapers.com/images/high/fitness-gym-with-equipment-iovhjg9dwfy87bzf.webp',
  'https://wallpapers.com/images/high/home-gym-with-barbell-r4xvbh7jalyuhdme.webp',
  'https://wallpapers.com/images/high/gym-motivation-picture-8rog1fmrp8zbmfkm.webp',
])

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