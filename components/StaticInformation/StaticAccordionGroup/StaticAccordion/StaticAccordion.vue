<template>
  <section>
    <h1 class="static-title">{{ data.title }}</h1>
    <Accordion :value="openedIndexes" :multiple="true"  @update:value="(val) => openedIndexes = val">
      <AccordionPanel
          class="mb-6"
          v-for="(block, index) in data.blocks"
          :key="index"
          :value="index"
          :pt="{
            root: {
              style: {
                borderWidth: '0'
              }
            }
          }"
      >
        <AccordionHeader>{{ block.title }}</AccordionHeader>
        <AccordionContent>
          <p class="leading-relaxed">
            {{ block.content }}
          </p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </section>
</template>

<script setup>
import {useWindowWidthWatcher} from "~/composables/useWindowWidthWatcher.js";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const getWidth = useWindowWidthWatcher()

const openedIndexes = ref([])

</script>

<style scoped>
.p-accordionheader {
  background-color: var(--color-gray-lavender);
  border: none;
  padding: 12px 24px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 30px !important;
  transition: all 0.3s ease;
  color: var(--color-primary-black) !important;
}

.static-title {
  margin-bottom: 66px;
  font-size: 24px;
}

.p-accordioncontent-content {
  background-color: var(--color-gray-lavender) !important;
}

.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
  background-color: var(--color-gray-lavender);
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-bottom: none;
}

.p-accordionpanel .p-accordion-content {
  padding: 12px 24px;
  border-radius: 0 0 30px 30px;
  border-top: none;
  font-size: 16px;
  transition: all 0.3s ease;
}

:deep(.p-accordioncontent-content) {
  padding: 12px 24px;
  background-color: var(--color-gray-lavender);
  font-size: 20px;
  font-weight: 400;
  color: var(--color-primary-black);
  border-bottom-right-radius: 29px;
  border-bottom-left-radius: 29px;
}

.p-accordionpanel-active .p-accordion-content {
  background-color: var(--color-gray-lavender);
}

.p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) > .p-accordionheader:hover {
  background-color: var(--color-gray-lavender);
  cursor: pointer;
}

@media (max-width: 539px) {
  .p-accordionheader {
    padding: 12px 16px;
    font-size: 12px;
    border-radius: 16px;
  }

  :deep(.p-accordioncontent-content) {
    font-size: 12px;
    padding: 12px 16px;
  }

  .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
    border-radius: 16px 16px 0 0;
  }

  .p-accordionpanel .p-accordion-content {
    padding: 8px 16px;
    font-size: 12px;
    border-radius: 0 0 16px 16px;
  }
}

@media (max-width: 500px) {
  .static-title {
    font-size: 20px;
  }
}
</style>

