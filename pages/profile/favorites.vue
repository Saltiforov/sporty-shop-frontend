<template>
  <main class="favorite-products">
    <LoadingOverlay :visible="isLoading" />

    <h1 class="profile-page-title title-lg-20 mb-8">
      {{ t('favorites') }}
    </h1>

    <section
        class="favorite-products-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        aria-label="Favorite products list"
    >
      <template v-if="!hydrated">
        <ProductSkeleton v-for="i in 5" :key="'loading-skeleton-' + i" />
      </template>

      <template v-else>
        <article
            v-if="!isLoading"
            v-for="product in favoriteProducts"
            :key="product._id"
        >
          <ProductCard
              :product="product"
              @add-to-cart="addToCart"
          />
        </article>
      </template>
    </section>

    <section
        v-if="!favoriteProducts.length"
        class="empty-favorites-text text-center py-10 text-gray-400 text-xl font-medium"
        aria-live="polite"
    >
      <p>{{ t('favorite_products_empty') }}</p>
    </section>
  </main>

  <Toast position="bottom-right" group="br" />
</template>

<script setup>
import ProductSkeleton from "~/components/Skeletons/ProductSkeleton/ProductSkeleton.vue";

definePageMeta({layout: 'profile'})

import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";
import {useToastManager} from "~/composables/useToastManager";

import {getFavorites} from "~/services/api/product-service";

const {showProductAddedToast} = useToastManager()

const {t} = useI18n()

const hydrated = ref(false)

const isLoading = ref(false)

const cartStore = useCartStore();

const favoriteProducts = ref([])

const addToCart = (product) => {
  showProductAddedToast(product)
  cartStore.addToCart(product);
}

onMounted(async () => {
  isLoading.value = true
  const {favorites} = await getFavorites()
  favoriteProducts.value = favorites
  hydrated.value = true
  isLoading.value = false
})
</script>


<style scoped>
@media (max-width: 1500px) {
  .favorite-products-content {
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 1330px) {
  .favorite-products-content {
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 1200px) {
  .favorite-products-content {
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .favorite-products-content {
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 500px) {
  .favorite-products-content {
    gap: 11px;
    grid-template-columns: repeat(2, 1fr);
  }
}


</style>