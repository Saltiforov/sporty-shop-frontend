<template>
  <div class="">

    <LoadingOverlay :visible="isLoading"/>

    <div class="grid grid-cols-1 lg:grid-cols-[390px_1fr] gap-[30px]">
      <aside class="p-4 rounded-md">
        <div class="filters mb-[91px] w-full max-w-[354px] h-[554px] border rounded-[var(--default-rounded)]">
          <Filters v-if="hydrated"/>
          <FiltersSkeleton v-else/>
        </div>

        <div class="promotional-products text-center">
          <p class="text-[var(--color-primary-pink)] mb-[21px] fw-600 text-[20px]">{{ t('promo_products_title') }}</p>
          <SwiperWrapper
              v-if="hydrated"
              :items="promotionalProducts"
              :options="promotionalProductsSwiperOptions"
          >
            <template #default="{ item }">
              <ProductCard
                  class="mt-3 mb-3"
                  :product="item"
                  @add-to-cart="showProductAddedToast"
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

      <div class="">
        <div class="sort-select flex max-w-[1340px] w-full justify-end mb-5">
          <div class="min-w-[310px] flex">
            <p class="mr-5">{{ sortTitle }}</p>
            <SortSelect/>
          </div>
        </div>

        <div
            class="grid gap-[30px] mb-[45px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-full w-full">

          <template v-if="!hydrated">
            <ProductSkeleton v-for="i in 10" :key="'loading-skeleton-' + i"/>
          </template>

          <template v-else>
            <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                @add-to-cart="showProductAddedToast"
                @click="addProductToViewed(product)"

            />
          </template>
        </div>

        <div class="products-pagination-actions mb-[72px]">
          <div class="load-more-wrapper mb-3 flex justify-center">
            <LoadMoreButton
                :disabled="allLoaded"
                :label="loadMoreLabel"
                @click="fetchProducts(false)"
            >
              <template #icon>
                <img src="~/assets/icons/load-more-icon.svg" alt="load-more-icon">
              </template>
            </LoadMoreButton>
          </div>
          <div class="product-pagination-wrapper flex justify-center">
            <ProductPaginationButton
                v-model="activePage"
                :max-pages="totalPages"
                :all-loaded="allLoaded"
                @update:model-value="getProductsByPage"
            />
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

const promotionalProductsSwiperOptions = {
  slidesPerView: 1,
  loop: true,
}

const {addProductToViewed} = useViewedProducts()

const { $eventBus } = useNuxtApp()

const hydrated = ref(false)

const {t} = useI18n();

const {showProductAddedToast} = useToastManager()

const route = useRoute()

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
  const query = {
    page: page.value,
    limit: limit.value,
    skip: skip.value,
  }
  return query
})

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

  productsQueryParams.value = { ...productsQueryParams.value, page: page.value }
  updateQueryParams()
}

const {updateQueryParams} = useQueryParams(productsQueryParams);

const products = ref([])

const paginationProducts = ref([])

const foundProducts = ref([])

const isLoading = ref(true)

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
    { immediate: true }
)

const searchStore = useSearchStore()

onMounted(async () => {
  syncFromRoute()


  searchStore.setSearchCallback(async (query) => {
    // Вся логика поиска, без query-параметров
    console.log('🔍 Поиск снаружи:', query)
    // await fetchProducts(false, { q: query })
  })

  await getPromotionalProducts()

  await fetchProducts(true)

  hydrated.value = true
});

onBeforeUnmount(() => {
})
</script>