<template>
  <div class="shopping-cart-content mb-5 grid grid-rows-auto gap-[33px]">
    <div
        :class="['cart-items-wrapper', { 'scrollable-items': isScrollable }]"
    >
      <CartItem v-for="item in productsOverview" :cart-product="item" :key="item.id" @delete="handleDelete"/>
    </div>

    <div class="final-price pr-[50px] mb-[42px]">
      <div class="flex justify-end items-center">
        <p class="fw-600 text-[16px] text-[#999999] mr-[14px] leading-[34px]">{{ t('totalPriceLabel') }}:</p>
        <p>
          {{ totalPriceWithoutDiscount }} <span class="text-[15px] text-[var(--color-primary-dark)]">{{ t('currency') }}</span>
        </p>
      </div>
      <div class="flex text-[var(--color-primary-pink)] justify-end items-center">
        <p class="fw-600 text-[16px] mr-[14px] leading-[34px]">{{ t('discountLabel') }}:</p>
        <p>
          {{ totalDiscount }} <span
            class="text-[15px]">{{ t('currency') }}</span>
        </p>
      </div>
      <div class="flex justify-end items-center">
        <p class="fw-600 text-[16px] text-[#999999] mr-[14px] leading-[34px]">{{ t('amountToPayLabel') }}:</p>
        <p>
          {{ finallyPrice  }} <span class="text-[15px] text-[var(--color-primary-dark)]">{{ t('currency') }}</span>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import CartItem from "~/components/Cards/CartItem/CartItem.vue";
import {calculateTotal} from "~/utils/index.js";

const { $eventBus } = useNuxtApp()

const { t } = useI18n()

const {productsOverview, scrollAfter} = defineProps({
  productsOverview: {
    type: Array,
    required: false,
    default: () => [],
  },
  scrollAfter: {
    type: Number,
    default: 2,
  }
});

const isScrollable = computed(() => {
  return productsOverview.length > scrollAfter;
});

const handleDelete = (product) => {
  $eventBus.emit("handle-delete-cart-item", product);
}

const totalPriceWithoutDiscount = computed(() => calculateTotal(productsOverview, false))

const totalDiscount = computed(() => calculateTotal(productsOverview, true))

const finallyPrice = computed(() => totalPriceWithoutDiscount.value - totalDiscount.value)

</script>

<style scoped>
.cart-items-wrapper {
  display: flex;
  flex-direction: column;
  gap: 33px;
}

.scrollable-items {
  max-height: 345px; /* Можно настроить под размер карточек */
  overflow-y: auto;
  padding-right: 10px;
}

/* Кастомизация скролла по желанию */
.scrollable-items::-webkit-scrollbar {
  width: 8px;
}
.scrollable-items::-webkit-scrollbar-thumb {
  background: var(--color-primary-dark);
  border-radius: 8px;
}
</style>
