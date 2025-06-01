<template>
  <div class="flex currency-switch items-center">
    <Select
        :pt="{
        root: {
          style: 'background-color: transparent; border: none;'
        },
        label: {
          style: labelStyles
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

<script setup>
import {ref, watch, onBeforeMount, computed} from 'vue'
import Select from 'primevue/select'
import { useCurrencyStore } from '~/stores/currency'
import { useCookie } from '#app'
import {useWindowWidthWatcher} from "~/composables/useWindowWidthWatcher";

const currencyStore = useCurrencyStore()
const currencyCookie = useCookie('currency')
const getWidth = useWindowWidthWatcher()


const currencyOptions = [
  { label: 'Ukraine', code: 'UAH', value: 'uah' },
  { label: 'Europe', code: 'EUR', value: 'eur' }
]

const windowWidth = computed(() => getWidth())

const labelStyles = computed(() => {
  return {
    color: 'var(--color-gray-pale-lavender)',
    textAlign: 'end',
    lineHeight: '22px',
    fontWeight: 600,
    fontSize: windowWidth.value < 500 ? '16px' : '20px',
  }
})

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
