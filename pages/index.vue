<template>
  <div class="max-w-[1783px] mx-auto">



    <div class="grid grid-cols-1 lg:grid-cols-[390px_1fr] gap-[30px]">
      <aside class="p-4 rounded-md">
        <div class="filters mb-[91px] w-full max-w-[354px] h-[554px] shadow-lg">
          <Filters/>
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

      <div class="">
        <div class="sort-select flex max-w-[1340px] w-full justify-end mb-5">
          <p class="mr-5">Сортування:</p>
          <SortSelect/>
        </div>
        <div class="grid gap-[30px] mb-[45px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-full w-full">
          <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
          />
        </div>
        <div class="load-more-wrapper mb-3 flex justify-center">
          <LoadMoreButton label="Показати ще 24 товари">
            <template #icon>
              <img src="~/assets/icons/load-more-icon.svg" alt="load-more-icon">
            </template>
          </LoadMoreButton>
        </div>
        <div class="product-pagination-wrapper flex justify-center">
          <ProductPaginationButton :max-pages="5"/>
        </div>
      </div>
    </div>

    <AuthWrapper/>

    <ShoppingCart :is-open="false" @close="handleClose" :cart-items="shoppingCartItems"/>

  </div>
</template>

<script setup>
import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";
import AuthWrapper from "~/wrappers/AuthWrapper.vue";
import SortSelect from "~/components/UI/SortSelect/SortSelect.vue";
import LoadMoreButton from "~/components/UI/LoadMoreButton/LoadMoreButton.vue";
import ProductPaginationButton from "~/components/UI/ProductPaginationButton/ProductPaginationButton.vue";
import Filters from "~/components/UI/Filters/Filters.vue";

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