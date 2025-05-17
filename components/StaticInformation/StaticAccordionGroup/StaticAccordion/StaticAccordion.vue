<template>
  <section>
    <h1 class="static-title">{{ data.title }}</h1>
    <Accordion :multiple="true">
      <AccordionPanel
          class="mb-6"
          v-for="(block, index) in data.blocks"
          :key="index"
          :value="index"
          :pt="{
            root: {
              style: {
                backgroundColor: 'white',
              }
            }
          }"
      >
        <AccordionHeader :pt="{
          root: {
            style: {
              padding: 0,
              marginBottom: '12px',
            }
          },
          toggleicon: {
            style: {
              display: 'none',
            }
          }
        }">{{ block.blockTitle }}</AccordionHeader>
        <AccordionContent :pt="{
          content: {
            style: {
              padding: 0,
            }
          }
        }">
          <p class="leading-relaxed">
            {{ block.blockContent }}
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
</script>

