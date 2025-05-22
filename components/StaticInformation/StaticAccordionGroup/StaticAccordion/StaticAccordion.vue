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
            style: {
              backgroundColor: 'var(--color-gray-lavender)',
              borderBottomRightRadius: '30px',
              borderBottomLeftRadius: '30px',
              borderTop: 'none',
              padding: '12px 24px',
            }
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
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const openedIndexes = ref([])

const getHeaderStyle = (index) => {
  const isOpened = openedIndexes.value.includes(index)

    return isOpened
        ? {
          padding: '12px 24px',
          backgroundColor: 'var(--color-gray-lavender)',
          borderTop: '1px solid var(--border-color)',
          borderLeft: '1px solid var(--border-color)',
          borderRight: '1px solid var(--border-color)',
          borderRadius: '30px 30px 0 0'
        }
        : {
          padding: '12px 24px',
          backgroundColor: 'var(--color-gray-lavender)',
          borderRadius: '30px'
        }
}
</script>
