<template>
  <div class="favorite-products">
    <LoadingOverlay :visible="isLoading"/>
    <h1 class="title-lg-20 mb-8">{{ t('menu_favorite_products') }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
      />
    </div>
  </div>
  <Toast position="bottom-right" group="br"/>
</template>

<script setup lang="ts">
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";

definePageMeta({layout: 'profile'})
import ProductCard from "~/components/Cards/ProductCard/ProductCard.vue";

const { t } = useI18n()

const toast = useToast();

const isLoading = ref(false)

const cartStore = useCartStore();

const addToCart = (product) => {
  showBottomRightToast(product)
  cartStore.addToCart(product);
}

const showBottomRightToast = (product) => {
  toast.add({
    severity: 'success',
    summary: t('toast_success_title'),
    detail: t('toast_added_to_cart', {productName: product.name}),
    group: 'br',
    life: 3000
  });
};

const products = ref([
  {
    id: 1,
    title: "Nutrex Research Anabol Hardcore - 60 капс",
    grade: '4.6',
    countOfReviews: 10,
    price: 1116,
    discountPrice: 768,
    isFavorite: false,
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