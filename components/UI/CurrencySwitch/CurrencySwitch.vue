<template>
  <div class="flex currency-switch items-center">
    <Select
        :pt="{
          root: {
            class: 'currency-select-root'
          },
          label: {
            class: 'currency-select-label'
          },
          dropdown: {
            class: 'currency-select-dropdown'
          }
        }"
        class="w-full"
        v-model="selectedCurrency"
        optionLabel="label"
        :options="currencyOptions"
    />
  </div>
</template>

<script setup>
import {ref, watch, onBeforeMount, computed} from 'vue'
import Select from 'primevue/select'
import {useCurrencyStore} from '~/stores/currency'
import {useCookie} from '#app'

const currencyStore = useCurrencyStore()
const currencyCookie = useCookie('currency')

const currencyOptions = [
  {label: 'Ukraine', code: 'UAH', value: 'uah'},
  {label: 'Europe', code: 'EUR', value: 'eur'}
]

const defaultCode = currencyCookie.value || currencyOptions[0].code

const selectedCurrency = ref(
    currencyOptions.find(el => el.code === defaultCode)
    || currencyOptions[0]
)

onBeforeMount(() => {
  let code = currencyCookie.value

  if (!code) {
    code = localStorage.getItem('currency') || ''
  }

  const match = currencyOptions.find(c => c.code === code)

  if (match) {
    selectedCurrency.value = match
  }

  currencyStore.setCurrency(selectedCurrency.value.code)
  currencyCookie.value = selectedCurrency.value.code
})

watch(selectedCurrency, (newVal) => {
  currencyStore.setCurrency(newVal.code)
  currencyCookie.value = newVal.code
  localStorage.setItem('currency', newVal.code)
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
