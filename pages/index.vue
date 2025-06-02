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
            <div class="responsive-filters-title fw-500">
              <p>Фільтри</p>
            </div>
          </div>
          <div class="sort-select min-w-[320px] p-1 flex">
            <p class="mr-5 sort-title">{{ t("sort_title") }}</p>
            <SortSelect/>
          </div>
        </div>


        <div class="main-content min-h-screen grid-cols-1 grid lg:grid-cols-[354px_1fr] gap-[89px]">
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
              <p class="text-[var(--color-primary-pink)] mb-[21px] fw-600 text-[20px]">{{
                  t('promo_products_title')
                }}</p>
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
              <ProductCard
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  @add-to-cart="showToast"
                  @click="addProductToViewed(product)"

              />
            </div>
          </div>
          <div class="empty-block"></div>
          <div>
            <div class="products-pagination-actions mb-[72px]">
              <div class="product-pagination-wrapper flex justify-center">
                <BasePagination
                    v-if="!isLoading"
                    v-model="page"
                    :totalItems="totalItems"
                />
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
import SortSelect from '~/components/UI/SortSelect/SortSelect.vue'

definePageMeta({
  layout: 'default',
})

useHead({
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'http://localhost:4000/' },
    { property: 'og:title', content: 'Магазин спортивного питания | SP BALKAN' },
    { property: 'og:description', content: 'Лучший выбор протеинов и BCAA в Украине.' },
    { property: 'og:image', content: 'https://example.com/og-image.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Магазин спортивного питания | SP BALKAN' },
    { name: 'twitter:description', content: 'Лучший выбор протеинов и BCAA в Украине.' },
    { name: 'twitter:image', content: 'https://example.com/twitter-image.jpg' },
  ],
  link: [
    { rel: 'canonical', href: 'http://localhost:4000/' },
    { rel: 'alternate', href: 'http://localhost:4000/ua/', hreflang: 'uk' },
    { rel: 'alternate', href: 'http://localhost:4000/en/', hreflang: 'en' }
  ]
})

import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";
import BasePagination from "~/components/UI/BasePagination/BasePagination.vue";
import Filters from "~/components/UI/Filters/Filters.vue";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";
import { useQueryParams } from "~/composables/useQueryParams.js";
import { getAllProducts, getProductsOnSale } from "~/services/api/product-service.js";
import { useToastManager } from "~/composables/useToastManager.js";
import { useViewedProducts } from "~/composables/useViewedProducts.js";
import FiltersSkeleton from "~/components/Skeletons/FiltersSkeleton/FiltersSkeleton.vue";
import { cacheService } from '~/services/cacheService.js'
import {useCurrencyStore} from "~/stores/currency.js";

const { $eventBus } = useNuxtApp()
const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const page = ref(Number(route.query.page) || 1)
const limit = ref(Number(route.query.limit) || 10)
const skip = computed(() => (page.value - 1) * limit.value)
const q = computed(() => (route.query.q ?? ''))

const productsQueryParams = computed(() => {
  return {
    page: page.value,
    limit: limit.value,
    skip: skip.value,
    filters: route.query.filters,
    price: route.query.price,
    sort: route.query.sort,
    ...(q.value ? { q: q.value } : {}),
  }
})

const { updateQueryParams } = useQueryParams(productsQueryParams)
updateQueryParams()

const currencyStore = useCurrencyStore()

const sortQueryParams = (query) => {
  const order = ['page', 'limit', 'skip', 'filters', 'q', 'price', 'sort']
  const sortedQuery = {}
  order.forEach(key => {
    if (query[key] !== undefined) {
      sortedQuery[key] = query[key]
    }
  })
  return sortedQuery
}

const { data: catalog, pending, error } = await useAsyncData(
    'products catalog',
    () => {
      const sortedQuery = sortQueryParams(productsQueryParams.value)
      router.push({ query: sortedQuery })
      const currency =  currencyStore.getCurrency;
      return cacheService.getAllProducts({ ...sortedQuery, locale: locale.value, currency })
    },
    { watch: [productsQueryParams] }
)

const products = computed(() => catalog.value?.list || [])
const totalItems = computed(() => catalog.value?.count || 0)

watch(page, (page) => {
  router.push({query: {...route.query, page}})
})

const promotionalProductsSwiperOptions = {
  slidesPerView: 1,
  loop: true,
}

const { addProductToViewed } = useViewedProducts()
const hydrated = ref(false)
const { showProductAddedToast } = useToastManager()
const isMobileFiltersOpen = ref(false)
const promotionalProducts = ref([])

const showToast = (product) => {
  showProductAddedToast(product)
}

const getPromotionalProducts = async () => {
  const response = await getProductsOnSale()
  promotionalProducts.value = response.list
}

const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await getPromotionalProducts()

  hydrated.value = true
  isLoading.value = false
})

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

.product-pagination-wrapper {
  width: 274px;
  margin: 0 auto;
}

.promo-slider-btn:hover {
  background-color: transparent;
}

.responsive-filters {
  font-size: 12px;
  box-shadow: 0 0 2px #00000040;
  border-radius: 8px;
  cursor: pointer;
  min-width: 92px;
  height: auto;
  padding: 4.5px 6px;
  display: none;
  justify-content: space-between;
  align-items: center;
}

.responsive-filters-icon {
  margin-left: 10px;
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

.responsive-filters-title {
  font-size: 16px;
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

@media (max-width: 1630px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1420px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .main-content {
    gap: 16px;
  }
}

@media (max-width: 1150px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .main-content {
    gap: 8px;
  }
}


@media (max-width: 1022px) {
  .promotional-products {
    display: none;
  }

  .empty-block {
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
    grid-template-columns: repeat(3, 1fr);
  }

  .sort-title {
    margin-right: 4px;
  }
}

@media (max-width: 650px) {
  .product-grid {
    gap: 16px;
  }

}

@media (max-width: 615px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 550px) {
  .products-pagination-actions {
    margin-bottom: 40px;
  }

  .product-grid {
    margin-bottom: 24px;
  }
}


@media (max-width: 510px) {

  .sort-title {
    font-size: 10px;
  }

  .responsive-filters-title {
    font-size: 12px;
  }

  .main-content {
    gap: 0;
  }

  .responsive-filters {
    justify-content: space-between;
  }

  .sort-select {
    justify-content: center;
    align-items: center;
  }

  .select-filters {
    margin-top: 30px;
    padding-top: 25px;
  }
}


</style>
