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
    />
  </div>
</template>

<script setup lang="ts">
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
