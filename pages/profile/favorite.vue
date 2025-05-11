<template>
  <div class="favorite-products">
    <LoadingOverlay :visible="isLoading"/>
    <h1 class="title-lg-20 mb-8">{{ t('menu_favorite_products') }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

      <template v-if="!hydrated">
        <ProductSkeleton v-for="i in 5" :key="'loading-skeleton-' + i" />
      </template>

      <template v-else>
        <ProductCard
            v-if="!isLoading"
            v-for="product in favoriteProducts"
            :key="product._id"
            :product="product"
            @add-to-cart="addToCart"
        />
      </template>



    </div>
  </div>
  <Toast position="bottom-right" group="br"/>
</template>

<script setup lang="ts">
import ProductSkeleton from "~/components/Skeletons/ProductSkeleton/ProductSkeleton.vue";

definePageMeta({layout: 'profile'})

import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";
import {useToastManager} from "~/composables/useToastManager";

import { getFavorites } from "~/services/api/product-service";

const { showProductAddedToast } = useToastManager()

const { t } = useI18n()

const hydrated = ref(false)

const isLoading = ref(false)

const cartStore = useCartStore();

const favoriteProducts = ref([])

const addToCart = (product) => {
  showProductAddedToast(product)
  cartStore.addToCart(product);
}

onMounted(async () => {
  favoriteProducts.value =  await getFavorites()
  hydrated.value = true
})
</script>


<style scoped>

</style>