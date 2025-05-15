<template>
  <div class="flex currency-switch items-center">
    <Select
        :pt="{
        root: {
          style: 'background-color: transparent; border: none;'
        },
        label: {
          style: 'color: var(--color-gray-pale-lavender); line-height: 22px; font-weight: 600; font-size: 20px;'
        },
        dropdown: {
          style: 'width: 1.25rem;'
        }
      }"
        class="w-full"
        v-model="selectedCurrency"
        optionLabel="label"
        :options="currencyOptions"
        @change="switchCurrency"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Select from 'primevue/select'

import { useCurrencyStore } from "~/stores/currency.js";

const currencyStore = useCurrencyStore();

const currencyOptions = [
  { label: 'UAH (₴)', code: 'UAH' },
  { label: 'USD ($)', code: 'USD' },
]
const storedCurrencyCode = typeof window !== 'undefined'
    ? localStorage.getItem('currency')
    : null

const selectedCurrency = ref(
    currencyOptions.find(c => c.code === storedCurrencyCode) || currencyOptions[0]
)

const switchCurrency = () => {
  localStorage.setItem('currency', selectedCurrency.value.code)
  currencyStore.setCurrency(selectedCurrency.value.code)
}

watch(selectedCurrency, () => {
  switchCurrency()
})
</script>
