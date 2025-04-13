<template>
  <div>
    <Swiper :images="images" :options="swiperOptions"/>
    <div class="grid gap-[30px] max-w-[1270px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <ProductCard v-for="product in products" :product="product" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
})

const products = [
  {
    id: 1,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.6',
    countOfReviews: 10,
    price: 1116,
  },
]

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


<style scoped>

</style>