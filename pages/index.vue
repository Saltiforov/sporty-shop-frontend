<template>
  <div class="max-w-[1783px] mx-auto">

    <div class="grid grid-cols-1 lg:grid-cols-[390px_1fr] gap-[30px]">

      <aside class="p-4 rounded-md">
        <div class="filters mb-[91px] w-full max-w-[354px] h-[554px] shadow-lg">
          <h2>Filters</h2>
        </div>
        <div class="promotional-products text-center">
          <p class="text-[#EF4B4B] mb-[21px] fw-600 text-[20px]">Акційні товари</p>
          <SwiperWrapper :items="products" :options="promotionalProductsSwiperOptions">
            <template #default="{ item }">
              <ProductCard class="mt-3 mb-3" :product="item"/>
            </template>
          </SwiperWrapper>
        </div>
      </aside>

      <div class="grid gap-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-full w-full">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
      </div>
    </div>

    <ShoppingCart :is-open="false" @close="handleClose" :cart-items="shoppingCartItems"/>

  </div>
</template>

<script setup>
import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";

definePageMeta({
  layout: 'default',
})


const shoppingCartItems = ref([
  {image: '@/assets/images/product-image.png', name: 'Nutrex Research Anabol Hardcore - 60 капс', quantity: 3, price: 1121, id: 1, discountPrice: 999},
  {image: '', name: 'Nutrex Research Anabol Hardcore - 60 капс', quantity: 10, price: 1121, id: 2},
])

const promotionalProductsSwiperOptions = {
  slidesPerView: 1,
  loop: true,
}

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
    status: 'sale',
    backgroundStatus: '#cb124c',
  },
  {
    id: 2,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.1',
    countOfReviews: 5,
    price: 3241,
    isFavorite: true,
  },
  {
    id: 2,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.1',
    countOfReviews: 5,
    price: 3241,
    isFavorite: true,
  },
  {
    id: 2,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.1',
    countOfReviews: 5,
    price: 3241,
    isFavorite: true,
  },
  {
    id: 2,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.1',
    countOfReviews: 5,
    price: 3241,
    isFavorite: true,
  },
  {
    id: 2,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.1',
    countOfReviews: 5,
    price: 3241,
    isFavorite: true,
  },
  {
    id: 2,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.1',
    countOfReviews: 5,
    price: 3241,
    isFavorite: true,
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


</script>


<style scoped>

</style>