<template>
  <Tree
      :value="nodes"
      :expanded-keys="expandedKeys"
      @update:expandedKeys="onExpandedKeysChange"
      class="w-full p-2 rounded-[var(--default-rounded)]"
      :toggler-icon="null"
  >
    <template #togglericon>
    </template>

    <template #default="slotProps">
      <div :class="[
        'flex items-center gap-2 w-full',
        slotProps.node.icon ? 'border-b pb-2' : '',
        slotProps.node.icon && expandedKeys[slotProps.node.key] ? 'w-[50%] mx-auto' : ''
      ]">
        <img
            v-if="slotProps.node.icon"
            :src="slotProps.node.icon"
            alt="icon"
            class="w-5 h-5"
        />

        <div v-if="!isRootNode(slotProps.node)" class="ml-auto">
          <CustomCheckbox
              :unchecked-border-color="'#7F7F7F80'"
              :border-radius="'4px'"
              :modelValue="slotProps.node.modelValue"
              @update:modelValue="(val) => onNodeCheckboxChange(slotProps.node, val)"
              @click.stop
          />
        </div>


        <b @click.stop="toggle(slotProps.node)" class="cursor-pointer filters-block-text">
          {{ slotProps.node.label }}
        </b>

        <button
            v-if="slotProps.node.children"
            @click.stop="toggle(slotProps.node)"
            class="ml-2 p-1 rounded transition"
        >
          <svg
              :class="{
              'rotate-90': expandedKeys[slotProps.node.key],
              'rotate-0': !expandedKeys[slotProps.node.key]
            }"
              class="w-4 h-4 transform transition-transform"
              viewBox="0 0 24 24"
              fill="none"
          >
            <path
                d="M8 5L15 12L8 19"
                stroke="currentColor"
                stroke-width="2"
            />
          </svg>
        </button>
      </div>
    </template>

    <template #nodeicon="slotProps">
      <div></div>
    </template>
  </Tree>

  <PriceRangeFilter class="filters-block-text"/>

</template>

<script setup>
import { ref } from 'vue'
import CustomCheckbox from "~/components/UI/CustomCheckbox/CustomCheckbox.vue"
import SportsNutritionIcon from '~/assets/icons/filters/sports-nutrition-icon.svg'
import InjectionsIcon from '~/assets/icons/filters/injections-icon.svg'
import PriceRangeFilter from "~/components/UI/PriceRangeFilter/PriceRangeFilter.vue";

const { t } = useI18n()

const expandedKeys = ref({"0": true})

const toggle = (node) => {
  expandedKeys.value[node.key] = !expandedKeys.value[node.key]
}

const isRootNode = (node) => {
  return !node.key.includes('-')
}

const onNodeCheckboxChange = (node, isChecked) => {
  node.modelValue = isChecked
  if (node.children?.length) {
    updateChildrenSelection(node.children, isChecked)
  }
}

const updateChildrenSelection = (children, isChecked) => {
  for (const child of children) {
    child.modelValue = isChecked
    if (child.children?.length) {
      updateChildrenSelection(child.children, isChecked)
    }
  }
}

const nodes = ref([
  {
    key: '0',
    label: computed(() => t('filters_sports_nutrition')),
    icon: SportsNutritionIcon,
    children: [
      {
        key: '0-0',
        label: computed(() => t('filters_protein')),
        modelValue: false,
        children: [
          {
            key: '0-0-1',
            label: computed(() => t('filters_amino_acids')),
            modelValue: false,
          },
        ]
      },
      {
        key: '0-1',
        label: computed(() => t('filters_amino_acids')),
        modelValue: false,
      },
      {
        key: '0-2',
        label: computed(() => t('filters_creatine')),
        modelValue: true,
      },
      {
        key: '0-3',
        label: computed(() => t('filters_collagen')),
        modelValue: false,
      },
    ]
  },
  {
    key: '1',
    label: computed(() => t('filters_injections')),
    icon: InjectionsIcon,
    children: [
      {
        key: '1-0',
        label: computed(() => t('filters_protein')),
        modelValue: false,
      },
      {
        key: '1-1',
        label: computed(() => t('filters_amino_acids')),
        modelValue: false,
      },
      {
        key: '1-2',
        label: computed(() => t('filters_creatine')),
        modelValue: true,
      },
    ]
  },
])

const onExpandedKeysChange = (newExpandedKeys) => {
  expandedKeys.value = newExpandedKeys
}
</script>
