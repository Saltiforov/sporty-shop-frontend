<template>
  <LoadingOverlay :visible="isLoading" />

  <div v-if="!isLoading" class="static-information">
    <component
        v-if="config.data?.length"
        :is="config.component"
        :data="config.data"
    />
    <p
        v-else
        class="no-data-text"
        style="line-height: 1.4;"
    >
      {{ t('text_no_info') }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import StaticFields from "~/components/StaticInformation/StaticFields/StaticFields.vue";
import StaticAccordionGroup from "~/components/StaticInformation/StaticAccordionGroup/StaticAccordionGroup.vue";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";
import { useStaticInformation } from "~/composables/useStaticInformation.js";

const { staticInformation } = useStaticInformation();
const { t } = useI18n();
const { $eventBus } = useNuxtApp();

const isLoading = ref(true);

const config = computed(() => {
  return {
    component: staticInformation.value?.accordion ? StaticAccordionGroup : StaticFields,
    data: staticInformation.value?.content || []
  };
});

onMounted(() => {
  $eventBus.emit('static-info-mounted');

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>
