<template>
  <div class="price-range-filter p-[8px_36px]">
    <div class="range-title mb-[17px]">{{ t('priceRange.title') }}</div>
    <div class="range-fields-wrapper  flex">
      <div class="range-fields w-full flex justify-between">

        <div class="flex items-center gap-2">
          <InputNumber
              v-model="min"
              :min="min"
              :useGrouping="false"
              class="max-w-[80px] w-full input-no-padding"
              :inputStyle="{ padding: '0 10px', textAlign: 'center', maxWidth: '80px' }"
          />

          <div class="w-6 h-px bg-[var(--color-gray-dark-charcoal)]"></div>

          <InputNumber
              v-model="max"
              :max="max"
              :useGrouping="false"
              class="max-w-[80px] w-full input-no-padding"
              :inputStyle="{ padding: '0 10px', textAlign: 'center', maxWidth: '80px' }"
          />
        </div>

        <div class="">
          <Button :pt="{
                root: {
                  class: 'range-button w-[100px] max-w-[68px]'
                }
              }" :label="t('priceRange.okButton')"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>

const { t } = useI18n();
const min = ref(0);
const max = ref(2000);
</script>


<style scoped>
.range-field {
  background: black;
}
.range-button  {
  padding: 0;
  background-color: var(--color-primary-purple);
  border: none;
}
.range-button:hover {
  padding: 0;
  background-color: var(--color-primary-purple);
  border: none;
}
</style>