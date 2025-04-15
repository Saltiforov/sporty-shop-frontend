<template>
  <div>
    <SwiperWrapper :items="images" :options="swiperOptions">
      <template #default="{ item }">
        <img
            :src="item"
            class="w-full h-[269px] object-cover rounded-lg"
        />
      </template>
    </SwiperWrapper>
    <div class="grid mt-[20px] gap-[30px] max-w-[1270px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <ProductCard v-for="product in products" :product="product"/>
    </div>

    <ShoppingCart :is-open="isShoppingCartShow" @close="handleClose" :cart-items="shoppingCartItems"/>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
})

const shoppingCartItems = ref([
  {image: '@/assets/images/product-image.png', name: 'Nutrex Research Anabol Hardcore - 60 капс', quantity: 3, price: 1121, id: 1, discountPrice: 999},
  {image: '', name: 'Nutrex Research Anabol Hardcore - 60 капс', quantity: 10, price: 1121, id: 2},
])

const isShoppingCartShow = ref(false)

const handleClose = () => {
  isShoppingCartShow.value = false
}

const products = ref([
  {
    id: 1,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.6',
    countOfReviews: 10,
    price: 1116,
    discountPrice: 768,
    isFavorite: false,
    status: 'new',
    backgroundStatus: '#212094',
  },
  {
    id: 2,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.1',
    countOfReviews: 5,
    price: 3241,
    isFavorite: true,
  },
])

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