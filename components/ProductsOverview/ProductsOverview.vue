<template>
  <div class="shopping-cart-content mb-5 grid grid-rows-auto gap-[33px]">
    <div
        :class="['cart-items-wrapper', { 'scrollable-items': isScrollable }]"
    >
      <CartItem  v-for="item in productsOverview" :cart-product="item" :key="item.id" @remove-product="confirmDelete"/>
    </div>

    <div class="final-price pr-[50px] mb-[42px]">
      <div class="flex justify-end items-center">
        <p class="fw-600 text-[16px] text-[var(--color-muted-light-gray)] mr-[14px] leading-[34px]">
          {{ t('total_price_label') }}:</p>
        <p>
          {{ totalPriceBeforeDiscount }} <span
            class="text-[15px] text-[var(--color-primary-dark)]">{{ t(currencyStore.label) }}</span>
        </p>
      </div>
      <div class="flex text-[var(--color-primary-pink)] justify-end items-center">
        <p class="fw-600 text-[16px] mr-[14px] leading-[34px]">{{ t('discount_label') }}:</p>
        <p>
          {{ totalDiscount }} <span
            class="text-[15px]">{{ t(currencyStore.label) }}</span>
        </p>
      </div>
      <div class="flex justify-end items-center">
        <p class="fw-600 text-[16px] text-[var(--color-muted-light-gray)] mr-[14px] leading-[34px]">
          {{ t('amount_to_pay_label') }}:</p>
        <p>
          {{ totalPriceAfterDiscount }} <span class="text-[15px] text-[var(--color-primary-dark)]">{{
            t(currencyStore.label)
          }}</span>
        </p>
      </div>

    </div>
  </div>
  <ConfirmDialog></ConfirmDialog>
  <Toast/>
</template>

<script setup>
import CartItem from "~/components/Cards/CartItem/CartItem.vue";
import {calculateTotal} from "~/utils/index.js";
import {useConfirmWithToast} from "~/composables/useConfirmWithToast.js";
import {useCartStore} from "~/stores/cart.js";

const {confirmAction} = useConfirmWithToast()


const {t} = useI18n()

const cartStore = useCartStore();

const currencyStore = useCurrencyStore();

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
      accept: {severity: 'success', summary: 'Deleted', detail: 'Product deleted', life: 3000},
      reject: {severity: 'error', summary: 'Cancelled', detail: 'Deletion cancelled', life: 3000},
    }
  })
};

const isScrollable = computed(() => {
  return productsOverview.length > scrollAfter;
});

const currency = computed(() => currencyStore.isUAHSelected ? 'uah' : 'eur')

const totalPriceBeforeDiscount = computed(() => calculateTotal(productsOverview, currency.value, false))

const totalPriceAfterDiscount = computed(() => calculateTotal(productsOverview, currency.value, true))

const totalDiscount = computed(() => totalPriceBeforeDiscount.value - totalPriceAfterDiscount.value)

</script>

<style scoped>
.cart-items-wrapper {
  display: flex;
  flex-direction: column;
  gap: 33px;
}

.scrollable-items {
  max-height: 345px;
  overflow-y: auto;
  padding-right: 10px;
}

.scrollable-items::-webkit-scrollbar {
  width: 8px;
}

.scrollable-items::-webkit-scrollbar-thumb {
  background: var(--color-primary-dark);
  border-radius: 8px;
}
</style>
