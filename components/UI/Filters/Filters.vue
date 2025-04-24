<template>
  <div class="filters">
    <Tree :value="nodes" class="w-full">
      <template #default="slotProps">
        <template v-if="slotProps.node.children">
          <span>
            <b>{{ slotProps.node.label }}</b>
          </span>
        </template>

        <template v-else>
          <div class="flex items-center gap-1">
            <CustomCheckbox border-color="var(--color-primary-purple)" v-model="slotProps.node.modelValue" />
            <label class="text-sm">{{ slotProps.node.label }}:</label>
          </div>
        </template>
      </template>
    </Tree>
  </div>
</template>


<script setup lang="ts">
import CustomCheckbox from "~/components/UI/CustomCheckbox/CustomCheckbox.vue";

const nodes = ref([
  {
    key: '0',
    label: 'Спортивне харчування',
    icon: 'pi pi-folder',
    children: [
      {
        key: '0-0',
        label: 'Протеїн',
        modelValue: false,
      },
      {
        key: '0-1',
        label: 'Амінокислоти',
        modelValue: false,
      },
      {
        key: '0-2',
        label: 'Креатин',
        modelValue: true,
      },
      {
        key: '0-3',
        label: 'Коллаген',
        modelValue: false,
      },
    ]
  },
])


</script>


<style scoped>

</style>