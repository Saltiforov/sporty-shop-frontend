<template>
  <div class="shopping-cart-content mb-5 grid grid-rows-auto gap-[33px]">
    <div
        :class="['cart-items-wrapper', { 'scrollable-items': isScrollable }]"
    >
      <CartItem v-for="item in productsOverview" :cart-product="item" :key="item.id" @remove-product="confirmDelete"/>
    </div>

    <div class="final-price pr-[50px] mb-[42px]">
      <div class="flex justify-end items-center">
        <p class="fw-600 text-[16px] text-[var(--color-muted-light-gray)] mr-[14px] leading-[34px]">{{ t('total_price_label') }}:</p>
        <p>
          {{ totalPriceWithoutDiscount }} <span class="text-[15px] text-[var(--color-primary-dark)]">{{ t('currency') }}</span>
        </p>
      </div>
      <div class="flex text-[var(--color-primary-pink)] justify-end items-center">
        <p class="fw-600 text-[16px] mr-[14px] leading-[34px]">{{ t('discount_label') }}:</p>
        <p>
          {{ totalDiscount }} <span
            class="text-[15px]">{{ t('currency') }}</span>
        </p>
      </div>
      <div class="flex justify-end items-center">
        <p class="fw-600 text-[16px] text-[var(--color-muted-light-gray)] mr-[14px] leading-[34px]">{{ t('amount_to_pay_label') }}:</p>
        <p>
          {{ finallyPrice  }} <span class="text-[15px] text-[var(--color-primary-dark)]">{{ t('currency') }}</span>
        </p>
      </div>

    </div>
  </div>
  <ConfirmDialog></ConfirmDialog>
  <Toast />
</template>

<script setup>
import CartItem from "~/components/Cards/CartItem/CartItem.vue";
import {calculateTotal} from "~/utils/index.js";
import {useConfirmWithToast} from "~/composables/useConfirmWithToast.js";
import {useCartStore} from "~/stores/cart.js";

const { confirmAction } = useConfirmWithToast()


const { t } = useI18n()

const cartStore = useCartStore();

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

const deleteProduct = (id) => {
  cartStore.removeFromCart(id)
}

const confirmDelete = (id) => {
  confirmAction({
    message: 'Are you sure you want to delete this product?',
    header: 'Delete Confirmation',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    acceptAction: () => deleteProduct(id),
    toastMessages: {
      accept: { severity: 'success', summary: 'Deleted', detail: 'Product deleted', life: 3000 },
      reject: { severity: 'error', summary: 'Cancelled', detail: 'Deletion cancelled', life: 3000 },
    }
  })
};

const isScrollable = computed(() => {
  return productsOverview.length > scrollAfter;
});

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
