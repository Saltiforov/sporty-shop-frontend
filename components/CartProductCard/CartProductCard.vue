<template>
  <div class="cart-product flex">
    <div class="card-image mr-[22px] max-w-[156px]">
      <img class=" shadow-xl rounded-[16px]" src="@/assets/images/product-image.png" alt="">
    </div>
    <div class="card-content flex flex-col justify-between">
      <p class="card-title max-w-[276px] fw-500 text-[16px] leading-[var(--line-height-base)]">Nutrex Research Anabol Hardcore - 60
        капс</p>
      <div class="card-content__footer justify-between flex pb-4">
        <div class="card-product-count">
          <AmountSelector v-model="quantity" min="1" max="100"/>
        </div>
        <div class="card-product-price flex items-center">
          <div
              :class="[
      'fw-600 leading-[34px]',
      product?.discountPrice ? 'line-through text-[#8E8E93] text-[13px] mr-[14px]' : 'text-[16px]'
    ]"
          >
            {{ product?.price || '1121' }} грн
          </div>

          <div
              v-if="product?.discountPrice"
              class="discount-price text-[#EF4B4B] fw-600 text-[16px] leading-[34px]"
          >
            {{ product?.discountPrice || '600' }} <span class="text-[18px]">грн</span>
          </div>
        </div>

      </div>
    </div>
    <div class="pl-10 flex">
      <Button>
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
              fill="#ADADAD"/>
        </svg>
      </Button>
    </div>
  </div>
</template>

<script setup>
import AmountSelector from "~/components/UI/AmountSelector/AmountSelector.vue";

const quantity = ref(3)

defineProps({
  cartProduct: {
    type: Object,
    required: true,
    default: () => ({}),
  }
})

</script>


<style scoped>

</style>