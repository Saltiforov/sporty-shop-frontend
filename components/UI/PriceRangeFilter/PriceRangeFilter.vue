<template>
  <div class="price-range-filter p-[8px_36px] pb-[36px]">
    <div class="range-title mb-[9px]">{{ t('price_range_title', {currency: currentCurrency}) }}</div>
    <div class="range-fields-wrapper flex flex-col gap-[29px]">
      <div class="range-fields w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <InputNumber
              v-model="min"
              :min="0"
              :max="maxLimit"
              :useGrouping="false"
              class="max-w-[80px] w-full input-no-padding"
              :inputStyle="{ padding: '0 10px', textAlign: 'center', maxWidth: '80px' }"
              @update:modelValue="updatePriceRange"
          />
          <div class="w-6 h-px bg-[var(--color-gray-dark-charcoal)]"></div>
          <InputNumber
              v-model="max"
              :min="0"
              :max="maxLimit"
              :useGrouping="false"
              class="max-w-[80px] w-full input-no-padding"
              :inputStyle="{ padding: '0 10px', textAlign: 'center', maxWidth: '80px' }"
              @update:modelValue="updatePriceRange"
          />
        </div>
        <div>
          <Button
              :pt="{ root: { class: 'range-button w-[100px] max-w-[68px]' } }"
              :label="t('price_range_ok_button')"
              @click="applyPriceRange"
          />
        </div>
      </div>
      <div class="range-slider w-full px-4">
        <Slider
            :pt="{
              root: {
                class: 'h-[1px]',
                style: {
        '--p-slider-handle-width': '12px',
        '--p-slider-handle-height': '12px',
         '--p-slider-handle-content-width': '12px',
        '--p-slider-handle-content-height': '12px',
        '--p-slider-handle-background': 'var(--color-primary-purple)',
        '--p-slider-handle-content-background': 'var(--color-primary-purple)',
        '--p-slider-handle-content-hover-background': 'var(--color-primary-purple)',
        '--p-slider-range-background': 'var(--color-primary-purple)',
         '--p-slider-handle-focus-ring-shadow': 'none',
        '--p-slider-handle-focus-ring-width': '0',
      }
              },
              range: {
                style: sliderRangeStyles
              },
            }"
            v-model="priceRange"
            range
            :min="0"
            :max="maxLimit"
            class="w-full"
            @update:modelValue="updateFromSlider"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {useI18n} from 'vue-i18n'
import {useCurrencyStore} from '~/stores/currency'
import {ref, computed, watch, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'
import Button from 'primevue/button'

const {t} = useI18n()
const route = useRoute()
const router = useRouter()
const currencyStore = useCurrencyStore()

const min = ref(0)
const max = ref(0)
const priceRange = ref([0, 0])

const maxLimit = computed(() => {
  return currencyStore.isUAHSelected ? 10000 : 1000
})

const currentCurrency = computed(() => currencyStore.getCurrency?.toUpperCase())

const sliderRangeStyles = computed(() => {
  return {
    backgroundColor: 'var(--color-primary-purple)',
    height: '2px',
  }
})

const syncQueryParams = () => {
  let newMin = 0
  let newMax = maxLimit.value

  if (route.query.price) {
    const priceParts = route.query.price.split(',')
    const minPart = priceParts[0]?.match(/min-(\d+)/)
    const maxPart = priceParts[1]?.match(/max-(\d+)/)

    if (minPart) newMin = Number(minPart[1])
    if (maxPart) newMax = Number(maxPart[1])
  }

  newMin = Math.max(0, Math.min(newMin, maxLimit.value))
  newMax = Math.max(newMin, Math.min(newMax, maxLimit.value))

  min.value = newMin
  max.value = newMax
  priceRange.value = [min.value, max.value]
}

onMounted(syncQueryParams)

watch(() => currencyStore.getCurrency, () => {
  min.value = 0
  max.value = maxLimit.value
  priceRange.value = [0, maxLimit.value]

  const updatedQuery = {...route.query}
  delete updatedQuery.price
  router.push({query: updatedQuery})
})

const updatePriceRange = () => {
  min.value = Math.max(0, Math.min(min.value, maxLimit.value))
  max.value = Math.max(min.value, Math.min(max.value, maxLimit.value))
  priceRange.value = [min.value, max.value]
}

const updateFromSlider = () => {
  min.value = Math.max(0, Math.min(priceRange.value[0], maxLimit.value))
  max.value = Math.max(min.value, Math.min(priceRange.value[1], maxLimit.value))
  priceRange.value = [min.value, max.value]
}

const applyPriceRange = () => {
  const updatedQuery = {
    ...route.query,
    price: `min-${min.value},max-${max.value}`
  }
  router.push({query: updatedQuery})
}
</script>

<style scoped>
.range-field {
  background: black;
}

.custom-slider-handle::before {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 9999px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.range-button {
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  padding: 0px 22px;
  background-color: var(--color-primary-purple);
  border: none;
}

.range-button:hover {
  padding: 0px 22px;
  background-color: var(--color-primary-purple);
  border: none;
}

@media (max-width: 500px) {
  .range-title {
    font-size: 14px;
  }
  .range-button {
    font-size: 14px;
  }
}
@media (max-width: 450px) {
  .price-range-filter {
    padding: 8px 16px;
  }
}
</style>