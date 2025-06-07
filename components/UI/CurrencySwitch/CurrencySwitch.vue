<template>
  <div class="flex currency-switch items-center">
    <Select
        :pt="{
        root: { class: 'currency-select-root' },
        label: { class: 'currency-select-label' },
        dropdown: { class: 'currency-select-dropdown' }
      }"
        class="w-full"
        v-model="selectedCurrency"
        optionLabel="label"
        :options="currencyOptions"
    />
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import Select from 'primevue/select'
import { useCurrencyStore } from '~/stores/currency'
import { useCookie } from '#app'

const currencyStore = useCurrencyStore()
const currencyCookie = useCookie('currency')

const currencyOptions = [
  { label: 'Ukraine', code: 'UAH', value: 'uah' },
  { label: 'Europe', code: 'EUR', value: 'eur' }
]

const defaultValue = currencyCookie.value || localStorage.getItem('currency') || currencyOptions[0].value

const selectedCurrency = ref(
    currencyOptions.find(el => el.value === defaultValue.toLowerCase()) || currencyOptions[0]
)

onBeforeMount(() => {
  let code = currencyCookie.value || localStorage.getItem('currency') || ''
  code = code.toLowerCase()

  let match = currencyOptions.find(c => c.value === code)
  if (!match) {
    match = currencyOptions[0]
  }

  selectedCurrency.value = match

  currencyStore.setCurrency(match.value)
  currencyCookie.value = match.value
  localStorage.setItem('currency', match.value)
})

watch(selectedCurrency, (newVal) => {
  currencyStore.setCurrency(newVal.value)
  currencyCookie.value = newVal.value
  localStorage.setItem('currency', newVal.value)
})
</script>

<style>
.currency-select-root {
  background-color: transparent !important;
  border: none !important;
}

.currency-select-label {
  color: var(--color-gray-pale-lavender) !important;
  text-align: end !important;
  line-height: 22px !important;
  font-weight: 600 !important;
  font-size: 20px !important;
}

@media (max-width: 500px) {
  .currency-select-label {
    font-size: 16px !important;
  }
}

.currency-select-dropdown {
  width: 1.25rem !important;
}
</style>
