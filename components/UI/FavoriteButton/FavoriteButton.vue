<template>
  <Button :pt="{
    root: {
      style: {
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0',
      },
    }
  }" @click="toggleFavorite">
    <svg
        :style="{ fill: isFavorite ? '#B3261E' : '' }"
        :width="iconSize.width"
        :height="iconSize.height"
        viewBox="0 0 26 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      <path
          d="M22.6497 3.3164C24.7119 5.37858 24.7909 8.69688 22.8291 10.8548L12.9993 21.6667L3.17083 10.8548C1.20906 8.69685 1.28806 5.37851 3.35025 3.31632C5.65281 1.01376 9.44496 1.22417 11.4792 3.76692L13 5.66725L14.5195 3.7667C16.5537 1.22395 20.3472 1.01384 22.6497 3.3164Z"
          stroke="#7F7F7F"
          stroke-opacity="0.5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="mix-blend-mode:luminosity"
      />
      <path
          d="M22.6497 3.3164C24.7119 5.37858 24.7909 8.69688 22.8291 10.8548L12.9993 21.6667L3.17083 10.8548C1.20906 8.69685 1.28806 5.37851 3.35025 3.31632C5.65281 1.01376 9.44496 1.22417 11.4792 3.76692L13 5.66725L14.5195 3.7667C16.5537 1.22395 20.3472 1.01384 22.6497 3.3164Z"
          :style="{ stroke: strokeColor }"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="mix-blend-mode:overlay"
      />
    </svg>
  </Button>
</template>

<script setup>

import {addProductToFavorites, deleteProductFromFavorites} from "~/services/api/product-service.js";

const props = defineProps({
  isFavorite: {
    type: Boolean,
    required: true,
  },
  iconSize: {
    type: Object,
    required: true,
    default: () => ({
      width: '26',
      height: '23',
    }),
  },
  product: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  inactiveColor: {
    type: String,
    default: "gray"
  }
})

const emit = defineEmits(['add-to-favorites', 'remove-from-favorites'])

const toggleFavorite = async () => {
  const productId = props.product._id;

  if (props.product.isFavorite) {
    await deleteProductFromFavorites(productId);
    emit('remove-from-favorites', productId);
  } else {
    await addProductToFavorites(productId);
    emit('add-to-favorites', productId);
  }

  props.product.isFavorite = !props.product.isFavorite;
}

const strokeColor = computed(() =>
    props.isFavorite ? '#B3261E' : props.inactiveColor
)
</script>

<style scoped>
.favorite-button {
  background: transparent;
  border: none;
  padding: 0;
}
.favorite-button:hover {
  background: transparent;
  border: none;
}
</style>

