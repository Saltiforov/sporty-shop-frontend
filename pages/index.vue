<template>
  <div class="">
    <Toast position="bottom-right" group="br"/>

    <LoadingOverlay :visible="isLoading"/>

    <div class="grid grid-cols-1 lg:grid-cols-[390px_1fr] gap-[30px]">
      <aside class="p-4 rounded-md">
        <div class="filters mb-[91px] w-full max-w-[354px] h-[554px] border rounded-[var(--default-rounded)]">
          <Filters/>
        </div>
        <div class="promotional-products text-center">
          <p class="text-[var(--color-primary-pink)] mb-[21px] fw-600 text-[20px]">{{ t('promo_products_title') }}</p>
          <SwiperWrapper :items="products" :options="promotionalProductsSwiperOptions">
            <template #default="{ item }">
              <ProductCard class="mt-3 mb-3" :product="item"/>
            </template>
          </SwiperWrapper>
        </div>
      </aside>

      <div class="">
        <div class="sort-select flex max-w-[1340px] w-full justify-end mb-5">
          <div class="min-w-[310px] flex">
            <p class="mr-5">{{ sortTitle }}</p>
            <SortSelect/>
          </div>
        </div>
        <div v-if="products.length"
             class="grid gap-[30px] mb-[45px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-full w-full">
          <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @add-to-cart="showBottomRight"
          />
        </div>
        <div class="products-pagination-actions mb-[72px]">
          <div class="load-more-wrapper mb-3 flex justify-center">
            <LoadMoreButton :disabled="allLoaded" @click="fetchProducts(false)" :label="loadMoreLabel">
              <template #icon>
                <img src="~/assets/icons/load-more-icon.svg" alt="load-more-icon">
              </template>
            </LoadMoreButton>
          </div>
          <div class="product-pagination-wrapper flex justify-center">
            <ProductPaginationButton
                v-model="activePage"
                :max-pages="5"
                :all-loaded="allLoaded"
                @update:model-value="getProductsByPage"
            />
          </div>
        </div>
      </div>
    </div>

    <AuthWrapper/>

    <Toast position="bottom-right" group="br"/>

    <transition v-if="isShoppingCartShow">
      <div class="overlay"/>
    </transition>

    <transition @click="handleCartOverlayClick" name="slide-right">
      <ShoppingCart
          :is-open="isShoppingCartShow"
          :cart-items="cartStore.getCartProducts"
          @close="isShoppingCartShow = false"
      />
    </transition>

  </div>

</template>

<script setup>
definePageMeta({
  layout: 'default',
})

const handleCartOverlayClick = (event) => {
  const clickedElement = event.target
  if (clickedElement.classList.contains('overlay')) {
    isShoppingCartShow.value = false
  }
}

import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";
import AuthWrapper from "~/wrappers/AuthWrapper.vue";
import SortSelect from "~/components/UI/SortSelect/SortSelect.vue";
import LoadMoreButton from "~/components/UI/LoadMoreButton/LoadMoreButton.vue";
import ProductPaginationButton from "~/components/UI/ProductPaginationButton/ProductPaginationButton.vue";
import Filters from "~/components/UI/Filters/Filters.vue";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";
import {useQueryParams} from "~/composables/useQueryParams.js";
import { getAllProducts } from "~/services/api/product-service.js";

import {useCartStore} from "~/stores/cart.js";

const promotionalProductsSwiperOptions = {
  slidesPerView: 1,
  loop: true,
}

const {t} = useI18n();

const toast = useToast();

const route = useRoute()

const cartStore = useCartStore()

const {$eventBus} = useNuxtApp();

const sortTitle = computed(() => t('sort_title'))

const activePage = ref(Number(route.query.page))

const page = ref(Number(route.query.page) || 1)

const limit = ref(Number(route.query.limit) || 10)

const skip = computed(() => (page.value - 1) * limit.value)

const totalProductsRecords = ref(0)

const totalPages = computed(() => Math.ceil(totalProductsRecords.value / limit.value))

const allLoaded = computed(() => products.value.length >= totalProductsRecords.value || activePage.value === totalPages.value)

const loadMoreLabel = computed(() => {
  return t('load_more', {count: limit.value});
});

const showBottomRight = (product) => {
  console.log("showBottomRight", product)
  toast.add({
    severity: 'success',
    summary: t('toast_success_title'),
    detail: t('toast_added_to_cart', {productName: product.name}),
    group: 'br',
    life: 3000
  });
};

const productsQueryParams = computed(() => {
  return {
    page: page.value,
    limit: limit.value,
    skip: skip.value
  }
})

const getProductsByPage = async (newPage) => {
  page.value = newPage
  await fetchProducts(true)
}

const syncFromRoute = () => {
  page.value = Number(route.query.page) || 1
}

const {updateQueryParams} = useQueryParams(productsQueryParams);

const products = ref([])

const isLoading = ref(true)

const isShoppingCartShow = ref(false)

const fetchProducts = async (shouldReplace = false) => {
  try {
    isLoading.value = true
    const response = await getAllProducts({...productsQueryParams.value});

    if (totalProductsRecords.value === 0) {
      totalProductsRecords.value = response.count
    }

    updateQueryParams()

    if (shouldReplace) {
      products.value = [...response.list]
    } else {
      products.value.push(...response.list)
      page.value += 1
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  syncFromRoute()

  await fetchProducts()

  $eventBus.on('show-cart', () => {
    isShoppingCartShow.value = true
  });
});

onBeforeUnmount(() => {
  $eventBus.off('show-cart');
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