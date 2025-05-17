<template>
  <section>
    <div
        v-for="(section, index) in data"
        :key="index"
        class="mb-10"
    >
      <StaticAccordion :data="section" />
    </div>
  </section>
</template>

<script setup>
import StaticAccordion from "@/components/StaticInformation/StaticAccordionGroup/StaticAccordion/StaticAccordion.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>
