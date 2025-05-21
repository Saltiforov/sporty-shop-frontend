<template>
  <div class="region-select">
    <p class="mb-2">{{ t('checkout_region_label') }}</p>
    <Select
        class="w-full"
        :modelValue="modelValue"
        @update:modelValue="onUpdate"
        optionLabel="label"
        :options="regionOptions"
    />
  </div>
</template>

<script setup>
import Select from 'primevue/select'

const {t} = useI18n()

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const regionOptions = computed(() => [
  {label: t('checkout_region_ua'), value: 'ua'},
  {label: t('checkout_region_eu'), value: 'eu'}
])

const onUpdate = (value) => {
  emit('update:modelValue', value)
}
</script>
