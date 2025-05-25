<template>
  <div>
    <LoadingOverlay :visible="isLoading"/>

    <div class="max-w-[1756px] mx-auto ">

      <div class="main-content-container ">

        <div class="select-filters mb-3 flex w-full px-3 justify-end">
          <div class="responsive-filters" @click="isMobileFiltersOpen = !isMobileFiltersOpen">
            <div class="responsive-filters-icon">
              <svg
                  :class="isMobileFiltersOpen ? 'rotate-90' : 'rotate-0'"
                  class="transition-transform duration-300"
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M1 1L5 5L1 9"
                    stroke="#212094"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="responsive-filters-title">
              <p>Фільтри</p>
            </div>
          </div>
          <div class="sort-select min-w-[320px] p-1 flex">
            <p class="mr-5 sort-title">{{ sortTitle }}</p>
            <SortSelect/>
          </div>
        </div>


        <div class="grid-cols-1 grid lg:grid-cols-[390px_1fr] gap-[30px]">
          <aside class="rounded-md">
            <div class="filters mb-[91px] w-full max-w-[354px] h-[554px] border rounded-[var(--default-rounded)]">
              <Filters v-if="hydrated"/>
              <FiltersSkeleton v-else/>
            </div>

            <transition name="fade-slide">
              <div v-if="isMobileFiltersOpen" class="filters--mobile">
                <Filters v-if="hydrated"/>
                <FiltersSkeleton v-else/>
              </div>
            </transition>

            <div class="promotional-products text-center">
              <p class="text-[var(--color-primary-pink)] mb-[21px] fw-600 text-[20px]">{{ t('promo_products_title') }}</p>
              <SwiperWrapper
                  v-if="hydrated"
                  arrow-color="var(--color-muted-light-gray)"
                  button-class="promo-slider-btn"
                  :items="promotionalProducts"
                  :options="promotionalProductsSwiperOptions"
                  :button-styles="{
                  background: 'transparent',
                  boxShadow: 'none'
                }"
              >
                <template #default="{ item }">
                  <ProductCard
                      class="mt-3 mb-3"
                      :product="item"
                      @add-to-cart="showToast"
                      @click="addProductToViewed(item)"
                  />
                </template>
              </SwiperWrapper>

              <div v-else class="flex gap-4 overflow-x-auto">
                <ProductSkeleton
                    class="min-w-[180px]"
                />
              </div>
            </div>
          </aside>

          <div>
            <div
                class="product-grid">

              <template v-if="!hydrated">
                <ProductSkeleton v-for="i in 10" :key="'loading-skeleton-' + i"/>
              </template>

              <template v-else>
                <ProductCard
                    v-for="product in products"
                    :key="product.id"
                    :product="product"
                    @add-to-cart="showToast"
                    @click="addProductToViewed(product)"

                />
              </template>
            </div>

            <div class="products-pagination-actions mb-[72px]">
              <div class="load-more-wrapper mb-3 flex justify-center">
                <LoadMoreButton
                    v-if="!isLoading"
                    :disabled="allLoaded"
                    :label="loadMoreLabel"
                    @click="fetchProducts(false)"
                >
                  <template #icon>
                    <img src="~/assets/icons/load-more-icon.svg" alt="load-more-icon">
                  </template>
                </LoadMoreButton>
                <LoadMoreButtonSkeleton v-else/>
              </div>
              <div class="product-pagination-wrapper flex justify-center">
                <ProductPaginationButton
                    v-if="!isLoading"
                    v-model="activePage"
                    :max-pages="totalPages"
                    :all-loaded="allLoaded"
                    @update:model-value="getProductsByPage"
                />
                <PaginationButtonSkeleton v-else/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import ProductSkeleton from '~/components/Skeletons/ProductSkeleton/ProductSkeleton.vue'

definePageMeta({
  layout: 'default',
})

import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";
import SortSelect from "~/components/UI/SortSelect/SortSelect.vue";
import LoadMoreButton from "~/components/UI/LoadMoreButton/LoadMoreButton.vue";
import ProductPaginationButton from "~/components/UI/ProductPaginationButton/ProductPaginationButton.vue";
import Filters from "~/components/UI/Filters/Filters.vue";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";
import {useQueryParams} from "~/composables/useQueryParams.js";
import {getAllProducts, getProductsOnSale} from "~/services/api/product-service.js";

import {useToastManager} from "~/composables/useToastManager.js";
import {useViewedProducts} from "~/composables/useViewedProducts.js";
import FiltersSkeleton from "~/components/Skeletons/FiltersSkeleton/FiltersSkeleton.vue";
import PaginationButtonSkeleton from "~/components/Skeletons/PaginationButtonSkeleton/PaginationButtonSkeleton.vue";
import LoadMoreButtonSkeleton from "~/components/Skeletons/LoadMoreButtonSkeleton/LoadMoreButtonSkeleton.vue";

const promotionalProductsSwiperOptions = {
  slidesPerView: 1,
  loop: true,
}

const {addProductToViewed} = useViewedProducts()

const {$eventBus} = useNuxtApp()

const hydrated = ref(false)

const {t} = useI18n();

const {showProductAddedToast} = useToastManager()

const route = useRoute()

const isMobileFiltersOpen = ref(false)

const sortTitle = computed(() => t('sort_title'))

const activePage = ref(Number(route.query.page))

const page = ref(Number(route.query.page) || 1)

const limit = ref(Number(route.query.limit) || 10)

const skip = computed(() => (page.value - 1) * limit.value)

const totalProductsRecords = ref(0)

const promotionalProducts = ref([])

const totalPages = computed(() => Math.ceil(totalProductsRecords.value / limit.value))

const allLoaded = computed(() => products.value.length >= totalProductsRecords.value || activePage.value === totalPages.value)

const loadMoreLabel = computed(() => {
  return t('load_more', {count: limit.value});
});

const productsQueryParams = computed(() => {
  return {
    page: page.value,
    limit: limit.value,
    skip: skip.value,
    filters: route.query.filters,
  }
})

const showToast = (product) => {
  showProductAddedToast(product);
}

const getPromotionalProducts = async () => {
  const response = await getProductsOnSale()
  promotionalProducts.value = response.list
}

const getProductsByPage = async (newPage) => {
  page.value = newPage
  await fetchProducts(true)
}

const syncFromRoute = () => {
  const pageFromQuery = Number(route.query.page) || 1
  if (page.value !== pageFromQuery) {
    page.value = pageFromQuery
  }

  productsQueryParams.value = {...productsQueryParams.value, page: page.value}
  updateQueryParams()
}

const {updateQueryParams} = useQueryParams(productsQueryParams);

const products = ref([])

const foundProducts = ref([])

const isLoading = ref(false)

const fetchProducts = async (shouldReplace = false, params = {}) => {
  try {
    isLoading.value = true

    if (!shouldReplace) {
      page.value += 1
    }

    const queryWithoutPage = Object.fromEntries(
        Object.entries(productsQueryParams.value).filter(([key]) => key !== 'page')
    )

    const response = await getAllProducts({...queryWithoutPage, ...params})

    if (totalProductsRecords.value === 0) {
      totalProductsRecords.value = response.count
    }

    if (shouldReplace) {
      products.value = [...response.list]
      updateQueryParams()
    } else {
      products.value.push(...response.list)
    }


  } finally {
    isLoading.value = false
  }
}

watch(
    () => route.query.q,
    async (newSearch, oldSearch) => {
      if (!newSearch || newSearch.trim() === '') {
        foundProducts.value = []

        $eventBus.emit('products-found', [])
        return
      }

      if (newSearch !== oldSearch) {
        page.value = 1
        products.value = []
        totalProductsRecords.value = 0

        const query = {}

        if (route.query.q && route.query.q.trim() !== '') {
          query.q = route.query.q
        }

        await fetchProducts(true, query)

        foundProducts.value = [...products.value]
        $eventBus.emit('products-found', foundProducts.value)
      }
    },
    {immediate: true}
)

const searchStore = useSearchStore()

onMounted(async () => {
  syncFromRoute()

  searchStore.setSearchCallback(async (query) => {
    console.log('🔍 Поиск снаружи:', query)
  })

  $eventBus.on('filters-updated', (filters) => {
    fetchProducts(true, {filters})
  })

  await getPromotionalProducts()

  await fetchProducts(true)

  hydrated.value = true
});

onBeforeUnmount(() => {
  $eventBus.off('filters-updated')
})
</script>

<style scoped>
.product-grid {
  display: grid;
  max-width: 1264px;
  gap: 48px;
  margin-bottom: 45px;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
}

.promo-slider-btn:hover {
  background-color: transparent;
}

.responsive-filters {
  box-shadow: 0 0 2px #00000040;
  border-radius: 8px;
  cursor: pointer;
  min-width: 100px;
  padding: 5px;
  display: none;
  justify-content: space-between;
  align-items: center;
}

.responsive-filters-icon {
  padding: 5px 12px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  will-change: transform, opacity;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1670px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  .sort-select {
    min-width: auto;
  }
}

@media (max-width: 1610px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1355px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1022px) {
  .promotional-products {
    display: none;
  }

  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .main-content-container {
    display: flex;
    flex-direction: column;
  }

  aside {
    display: block;
    border: none;
  }

  .filters {
    display: none;
  }

  .select-filters {
    justify-content: space-between;
  }

  .responsive-filters {
    display: flex;
  }

  .filters--mobile {
    max-width: 100% !important;
    height: auto !important;
    border: none !important;
    margin-bottom: 10px;
  }
}

@media (max-width: 800px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}


@media (max-width: 750px) {
  .select-filters {
    margin-top: 30px;
    padding-top: 10px;
    justify-content: space-between;
  }
  .sort-title {
    font-size: 15px;
  }
  .product-grid {
    gap: 24px;
  }
}

@media (max-width: 700px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sort-title {
    margin-right: 4px;
  }
}

@media (max-width: 500px) {
  .product-grid {
    gap: 5px;
  }
  .responsive-filters {
    justify-content: center;
  }
  .sort-select {
    justify-content: center;
    margin-bottom: 8px;
  }
  .select-filters {
    margin-top: 30px;
    padding-top: 25px;
    flex-direction: column-reverse;
  }
}


</style>