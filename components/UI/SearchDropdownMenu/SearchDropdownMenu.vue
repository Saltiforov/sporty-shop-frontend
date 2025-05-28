<template>
  <ul
      v-if="show"
      class="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-w-[420px] max-h-[300px] min-h-[50px] overflow-auto"
  >
    <div v-if="items.length" class="flex flex-col">
      <div v-for="(product, index) in items" :key="index">
          <NuxtLink
            v-if="!isCurrent(product)"
            :to="buildRedirectUrlWithLocale(product)"
            class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click.native="selectItem(product)"
        >
          <img
              :src="fullImageUrls(product.images)[0] || DefaultProductImage"
              alt="item image"
              class="w-8 h-8 object-cover mr-3 rounded"
          />
          <span class="text-sm text-gray-800 px-2">{{ product.name }}</span>
          <span class="text-sm text-gray-800 font-bold">{{ getProductPrice(product) }}</span>
        </NuxtLink>
        <div
            v-else
            class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click.native="selectItem(product)"
        >
          <img
              :src="fullImageUrls(product.images)[0] || DefaultProductImage"
              alt="item image"
              class="w-8 h-8 object-cover mr-3 rounded"
          />
          <span class="text-sm text-gray-800 px-2">{{ product.name }}</span>
          <span class="text-sm text-gray-800 font-bold">{{ getProductPrice(product) }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center p-5">{{ t('empty_search_message') }}</p>
    </div>
  </ul>
</template>

<script setup>
import DefaultProductImage from '~/assets/images/product-image.png'
import {useCurrencyStore} from "~/stores/currency.js";
defineProps({
  show: Boolean,
  items: {
    type: Array,
    required: true,
  },
})

const {t, locale} = useI18n();
const currencyStore = useCurrencyStore()
const route = useRoute()

const getProductPrice = (product) => {
  const currency =  currencyStore.getCurrency;
  return `${product.priceAfterDiscount[currency.toLowerCase()]} ${currency}`;
}

const buildRedirectUrlWithLocale = (product) => {
  return `/${locale.value}/product/${product.slug}`
}

const isCurrent = (product) => {
  return route.path === buildRedirectUrlWithLocale(product)
}

const emit = defineEmits(['selected'])

const selectItem = (item) => {
  emit('selected', item)
}
</script>
