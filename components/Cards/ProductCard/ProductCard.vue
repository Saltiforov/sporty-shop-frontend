<template>
  <div :class="{ 'max-h-[316px]' : variant === 'small' }"
       class="w-full relative bg-white pt-[30px] pr-[12px] pb-[22px] pl-[30px] max-w-[280px] h-auto aspect-[294/426] mx-auto rounded-lg flex flex-col justify-start shadow-md">

    <div v-if="product.status" class="absolute max-w-[82px] w-full -top-3 -left-5 z-100">
      <StatusBadge :label="product.status" :background-color="product.backgroundStatus"/>
    </div>

    <div class="flex relative flex-col items-center justify-center">

      <div class="absolute flex items-center justify-center h-[31px] w-[31px] z-10 -top-3 right-1">
        <FavoriteButton
            :is-favorite="product.isFavorite"
            :toggle-favorite="() => toggleFavorite(product)"
            :icon-size="iconSize"
        />
      </div>
      <NuxtLink :to="`/product/${product.id}`" :style="{ marginBottom: variant === 'small' ? '4px' : '' }"
                class="block mb-6">
        <img :class="{ 'max-w-[137px]': variant === 'small', }" class="rounded-lg"
             src="../../../assets/images/product-image.png" alt="Product image">
      </NuxtLink>
      <div class="product-name">
        <p :style="{ fontSize: variant === 'small' ? '16px' : '' }"
           class="text-[20px] leading-[22px] fw-500 line-clamp-3">{{ product.title }}</p>
      </div>
    </div>

    <div class="product-reviews mb-[27px] flex items-center">
      <svg class="mr-2" width="18" height="18" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.75122 6.75258C1.51628 6.53531 1.6439 6.14254 1.96167 6.10487L6.46436 5.5708C6.59387 5.55544 6.70636 5.47411 6.76099 5.35569L8.66016 1.23835C8.79419 0.947769 9.20728 0.947714 9.34131 1.23829L11.2405 5.3556C11.2951 5.47403 11.4069 5.55558 11.5364 5.57093L16.0393 6.10487C16.3571 6.14254 16.4843 6.53543 16.2494 6.75269L12.9208 9.83143C12.8251 9.91998 12.7824 10.0518 12.8079 10.1797L13.6913 14.627C13.7536 14.9408 13.4196 15.184 13.1404 15.0277L9.18386 12.8125C9.07006 12.7488 8.9318 12.7491 8.818 12.8128L4.86108 15.0271C4.58185 15.1834 4.24721 14.9408 4.30957 14.627L5.19311 10.18C5.21852 10.0521 5.176 9.91995 5.08025 9.8314L1.75122 6.75258Z"
            stroke="#FFCC00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p class="product-grade text-[16px] text-[#8E8E93] fw-500">{{ product.grade }}
        <span>({{ product.countOfReviews }})</span></p>
    </div>

    <div class="flex relative items-center justify-between">
      <div>
        <p v-if="product.discountPrice" class="discount-price absolute -top-2 left-0 fw-500 text-[15px] line-through">
          {{ product.price }} грн
        </p>
        <p :class="{ 'text-[#EF4B4B]': product?.discountPrice }"
           :style="{ fontSize: variant === 'small' ? '16px' : '' }" class="text-[24px] leading-[22px] fw-500">
          {{ product.price }} грн</p>
      </div>


      <slot name="buy-button">
        <button
            @click="$emit('add-to-cart', product)"
            class="text-white self-end flex items-center w-[47px] h-[47px] bg-[#28A745] px-4 py-2 rounded-[50%] hover:bg-gray-800 transition">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1 1H1.26835C1.74213 1 1.97943 1 2.17267 1.08548C2.34304 1.16084 2.48871 1.28218 2.59375 1.43604C2.71269 1.61026 2.75564 1.8429 2.84137 2.30727L5.00004 14L15.4218 14C15.875 14 16.1023 14 16.29 13.9199C16.4559 13.8492 16.5989 13.7346 16.7051 13.5889C16.8252 13.4242 16.8761 13.2037 16.9777 12.7631L16.9785 12.76L18.5477 5.95996L18.5481 5.95854C18.7023 5.29016 18.7796 4.95515 18.6947 4.69238C18.6202 4.46182 18.4635 4.26634 18.2556 4.14192C18.0184 4 17.6758 4 16.9887 4H3.5M16 19C15.4477 19 15 18.5523 15 18C15 17.4477 15.4477 17 16 17C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19ZM6 19C5.44772 19 5 18.5523 5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18C7 18.5523 6.55228 19 6 19Z"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </slot>
    </div>
  </div>
</template>


<script setup>

import StatusBadge from "~/components/UI/StatusBadge/StatusBadge.vue";
import FavoriteButton from "~/components/UI/FavoriteButton/FavoriteButton.vue";

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite;
}

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => {
    }
  },
  variant: {
    type: String,
    default: 'default',
  },
})

const iconSize = computed(() => {
  return props.variant === 'small'
      ? {width: 19, height: 17}
      : {width: 26, height: 23}
})

</script>

<style scoped>
</style>