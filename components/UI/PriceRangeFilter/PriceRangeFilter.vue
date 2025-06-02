<template>
  <div class="price-range-filter p-[8px_36px]">
    <div class="range-title mb-[17px]">{{ t('price_range_title') }}</div>
    <div class="range-fields-wrapper flex flex-col gap-4">
      <!-- Поля ввода для min и max -->
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
          <span class="ml-2">{{ currencyLabel }}</span>
        </div>
        <div>
          <Button
              :pt="{ root: { class: 'range-button w-[100px] max-w-[68px]' } }"
              :label="t('price_range_ok_button')"
              @click="applyPriceRange"
          />
        </div>
      </div>
      <!-- Ползунок -->
      <div class="range-slider w-full px-4">
        <Slider
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
import { useI18n } from 'vue-i18n'
import { useCurrencyStore } from '~/stores/currency'
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'
import Button from 'primevue/button'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const currencyStore = useCurrencyStore()

const min = ref(0)
const max = ref(0)
const priceRange = ref([0, 0])

const maxLimit = computed(() => {
  return currencyStore.isUAHSelected ? 10000 : 1000
})

const currencyLabel = computed(() => {
  return currencyStore.isUAHSelected ? 'uah' : 'eur'
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

  const updatedQuery = { ...route.query }
  delete updatedQuery.price
  router.push({ query: updatedQuery })
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
  router.push({ query: updatedQuery })
}
</script>

<style scoped>
.range-field {
  background: black;
}
.range-button {
  padding: 0;
  background-color: var(--color-primary-purple);
  border: none;
}
.range-button:hover {
  padding: 0;
  background-color: var(--color-primary-purple);
  border: none;
}
@media (max-width: 450px) {
  .price-range-filter {
    padding: 8px 16px;
  }
}
</style>