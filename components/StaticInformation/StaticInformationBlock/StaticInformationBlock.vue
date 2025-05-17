<template>
  <div class="static-information">
    <component
        v-if="config.data?.length"
        :is="config.component"
        :data="config.data"
    />
  </div>
</template>

<script setup>
import StaticFields from "~/components/StaticInformation/StaticFields/StaticFields.vue";
import StaticAccordionGroup from "~/components/StaticInformation/StaticAccordionGroup/StaticAccordionGroup.vue";
import { useStaticInformation } from "~/composables/useStaticInformation.js";
import { computed } from "vue";

const { staticInformation } = useStaticInformation();

const config = computed(() => {
  return {
    component: staticInformation.value?.accordion ? StaticAccordionGroup : StaticFields,
    data: staticInformation.value?.content || []
  };
});
</script>
