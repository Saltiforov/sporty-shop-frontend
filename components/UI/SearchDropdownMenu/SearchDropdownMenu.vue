<template>
  <ul
      v-if="show"
      class="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-w-[420px] max-h-[300px] min-h-[50px] overflow-auto"
  >
    <div v-if="items.length" class="flex flex-col">
      <NuxtLink
          v-for="(product, index) in items"
          :key="index"
          :to="`/product/${product._id}`"
          class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
          @click.native="selectItem(product)"
      >
        <img
            :src="fullImageUrls(product.images)[0] || DefaultProductImage"
            alt="item image"
            class="w-8 h-8 object-cover mr-3 rounded"
        />
        <span class="text-sm text-gray-800">{{ product.name }}</span>
      </NuxtLink>
    </div>
    <div v-else>
      <p class="text-center p-5">{{ t('empty_search_message') }}</p>
    </div>
  </ul>
</template>

<script setup>
import DefaultProductImage from '~/assets/images/product-image.png'
defineProps({
  show: Boolean,
  items: {
    type: Array,
    required: true,
  },
})

const {t} = useI18n();

const emit = defineEmits(['selected'])

const selectItem = (item) => {
  emit('selected', item)
}
</script>
