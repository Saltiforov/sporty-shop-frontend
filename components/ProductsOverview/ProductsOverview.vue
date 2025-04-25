<template>
  <div class="shopping-cart-content mb-5 grid grid-rows-auto gap-[33px]">
    <CartItem v-for="item in productsOverview" :cart-product="item" :key="item.id" @delete="handleDelete"/>

    <div class="final-price pr-[50px] mb-[42px]">
      <div class="flex justify-end items-center">
        <p class="fw-600 text-[16px] text-[#999999] mr-[14px] leading-[34px]">Загальна сума:</p>
        <p>
          {{ totalPriceWithoutDiscount }} <span class="text-[15px] text-[var(--color-primary-dark)]">грн</span>
        </p>
      </div>
      <div class="flex text-[var(--color-primary-pink)] justify-end items-center">
        <p class="fw-600 text-[16px] mr-[14px] leading-[34px]">Знижка:</p>
        <p>
          {{ totalDiscount }} <span
            class="text-[15px]">грн</span>
        </p>
      </div>
      <div class="flex justify-end items-center">
        <p class="fw-600 text-[16px] text-[#999999] mr-[14px] leading-[34px]">До оплати:</p>
        <p>
          {{ finallyPrice  }} <span class="text-[15px] text-[var(--color-primary-dark)]">грн</span>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import CartItem from "~/components/Cards/CartItem/CartItem.vue";
import {calculateTotal} from "~/utils/index.js";

const { $eventBus } = useNuxtApp()

const {productsOverview} = defineProps({
  productsOverview: {
    type: Array,
    required: false,
    default: () => [],
  }
});

const handleDelete = (product) => {
  $eventBus.emit("handle-delete-cart-item", product);
}

const totalPriceWithoutDiscount = computed(() => calculateTotal(productsOverview, false))

const totalDiscount = computed(() => calculateTotal(productsOverview, true))

const finallyPrice = computed(() => totalPriceWithoutDiscount.value - totalDiscount.value)

</script>