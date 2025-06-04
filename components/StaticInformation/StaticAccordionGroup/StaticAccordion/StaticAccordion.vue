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
        <AccordionHeader :pt="{
          root: {
            style: getHeaderStyle(index)
          },
        }">{{ block.title }}</AccordionHeader>
        <AccordionContent :pt="{
         content: {
            style: getContentStyle(index)
          }
        }">
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

const isMobile = computed(() => getWidth() < 540)

const openedIndexes = ref([])

const getContentStyle = (index) => {
  const isOpened = openedIndexes.value.includes(index)

  return {
    backgroundColor: isOpened ? 'var(--color-gray-lavender)' : 'white',
    borderBottomRightRadius: isMobile.value ? '16px' : '30px',
    borderBottomLeftRadius: isMobile.value ? '16px' : '30px',
    borderTop: 'none',
    padding: isMobile.value ? '8px 16px' : '12px 24px',
    fontSize: isMobile.value ? '12px' : ''
  }
}

const getHeaderStyle = (index) => {
  const isOpened = openedIndexes.value.includes(index)

  const basePadding = isMobile.value ? '8px 16px' : '12px 24px'
  const baseRadius = isMobile.value ? '16px' : '30px'
  const fontSize = isMobile.value ? '12px' : ''

  return isOpened
      ? {
        padding: basePadding,
        backgroundColor: 'var(--color-gray-lavender)',
        borderTop: '1px solid var(--border-color)',
        borderLeft: '1px solid var(--border-color)',
        borderRight: '1px solid var(--border-color)',
        borderRadius: `${baseRadius} ${baseRadius} 0 0`,
        fontSize: fontSize
      }
      : {
        padding: basePadding,
        backgroundColor: 'var(--color-gray-lavender)',
        borderRadius: baseRadius,
        fontSize: fontSize
      }
}
</script>

<style scoped>
@media (max-width: 500px) {
  .static-title {
    font-size: 20px;
  }
}
</style>
