<template>
  <div class="max-w-[1783px] mx-auto">

    <LoadingOverlay :visible="isLoading"/>

    <div class="grid grid-cols-1 lg:grid-cols-[390px_1fr] gap-[30px]">
      <aside class="p-4 rounded-md">
        <div class="filters mb-[91px] w-full max-w-[354px] h-[554px] border rounded-[var(--default-rounded)]">
          <Filters/>
        </div>
        <div class="promotional-products text-center">
          <p class="text-[#EF4B4B] mb-[21px] fw-600 text-[20px]">Акційні товари</p>
          <SwiperWrapper :items="products.list" :options="promotionalProductsSwiperOptions">
            <template #default="{ item }">
              <ProductCard class="mt-3 mb-3" :product="item"/>
            </template>
          </SwiperWrapper>
        </div>
      </aside>

      <div class="">
        <div class="sort-select flex max-w-[1340px] w-full justify-end mb-5">
          <div class="min-w-[310px] flex">
            <p class="mr-5">Сортування:</p>
            <SortSelect/>
          </div>
        </div>
        <div
            class="grid gap-[30px] mb-[45px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-full w-full">
          <ProductCard
              v-for="product in products.list"
              :key="product.id"
              :product="product"
          />
        </div>
        <div class="load-more-wrapper mb-3 flex justify-center">
          <LoadMoreButton @click="fetchProducts" label="Показати ще 10 товарів">
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

    <transition v-if="isShoppingCartShow">
      <div class="overlay"/>
    </transition>

    <transition name="slide-right">
      <ShoppingCart
          :is-open="isShoppingCartShow"
          :cart-items="cartProducts"
          @close="isShoppingCartShow = false"
      />
    </transition>

  </div>
</template>

<script setup>
import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";
import AuthWrapper from "~/wrappers/AuthWrapper.vue";
import SortSelect from "~/components/UI/SortSelect/SortSelect.vue";
import LoadMoreButton from "~/components/UI/LoadMoreButton/LoadMoreButton.vue";
import ProductPaginationButton from "~/components/UI/ProductPaginationButton/ProductPaginationButton.vue";
import Filters from "~/components/UI/Filters/Filters.vue";
import {addProductToCart} from "~/utils/index.js";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";
import { useProducts } from "~/composables/useProducts.js";

const promotionalProductsSwiperOptions = {
  slidesPerView: 1,
  loop: true,
}

definePageMeta({
  layout: 'default',
})

const {$eventBus} = useNuxtApp();

const { getAll } = useProducts();

const currentPage = ref(0)

const itemsPerPage = ref(10);

const products = ref([])

const isLoading = ref(true)

const isShoppingCartShow = ref(false)

const cartProducts = ref([])

const fetchProducts = async (params = {}) => {
  try {
    isLoading.value = true
    const response = await getAll({
      limit: itemsPerPage.value,
      skip: currentPage.value * itemsPerPage.value,
    });
    console.log(response)
    products.value = await getAll(params)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {

  await fetchProducts()

  $eventBus.on('show-cart', () => {
    isShoppingCartShow.value = true
  });

  $eventBus.on('add-to-cart', (product) => {
    addProductToCart(cartProducts, product)
  });

  $eventBus.on('handle-delete-cart-item', (product) => {
    cartProducts.value = cartProducts.value.filter(item => item._id !== product._id)
  });
});

onBeforeUnmount(() => {
  $eventBus.off('show-cart');
  $eventBus.off('add-to-cart');
  $eventBus.off('handle-delete-cart-item');
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Sidebar slide */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
}
</style>