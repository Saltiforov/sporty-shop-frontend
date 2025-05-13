<template>
  <div class="flex currency-switch items-center">
    <Select
        :pt="{
        root: { class: 'bg-transparent border-0' },
        label: { class: 'text-[var(--color-gray-pale-lavender)] leading-[22px] fw-600 text-[20px]' },
        dropdown: { class: 'w-5' }
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
}

watch(selectedCurrency, () => {
  switchCurrency()
})
</script>
