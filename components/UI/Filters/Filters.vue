<template>
  <Tree
      :value="nodes"
      :expanded-keys="expandedKeys"
      @update:expandedKeys="onExpandedKeysChange"
      class="w-full p-2 rounded-[var(--default-rounded)]"
      :toggler-icon="null"
  >
    <template #togglericon></template>

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

        <b @click.stop="onNodeLabelClick(slotProps.node)" class="cursor-pointer filters-block-text">
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
            <path d="M8 5L15 12L8 19" stroke="currentColor" stroke-width="2"/>
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
import {ref, computed, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import CustomCheckbox from "~/components/UI/CustomCheckbox/CustomCheckbox.vue"
import SportsNutritionIcon from '~/assets/icons/filters/sports-nutrition-icon.svg'
import InjectionsIcon from '~/assets/icons/filters/injections-icon.svg'
import PriceRangeFilter from "~/components/UI/PriceRangeFilter/PriceRangeFilter.vue";

const {t} = useI18n()
const route = useRoute()
const router = useRouter()

const { $eventBus } = useNuxtApp()

const expandedKeys = ref({"0": true})

const toggle = (node) => {
  expandedKeys.value[node.key] = !expandedKeys.value[node.key]
}

const collectCheckedFilters = (nodes) => {
  let filters = []
  for (const node of nodes) {
    if (node.modelValue && node.filter) {
      filters.push(node.filter)
    }
    if (node.children?.length) {
      filters = filters.concat(collectCheckedFilters(node.children))
    }
  }
  return filters
}

const fetchDataByFilters = async (query) => {

  const {page, ...currentQuery} = route.query

  currentQuery.filters = query

  const {$api} = useNuxtApp()

  try {
    const response = await $api.get('/api/client/products', {
      params: currentQuery
    })
    console.log('Filtered result:', response)
  } catch (error) {
    console.error('Error fetching filtered data:', error)
  }
}

const applyQueryParamsFromUrl = () => {
  const selectedFilters = route.query.filters?.split(',') || []
  applyFiltersToNodes(nodes.value, selectedFilters)
}

const applyFiltersToNodes = (nodes, selectedFilters) => {
  for (const node of nodes) {
    if (node.filter) {
      node.modelValue = selectedFilters.includes(node.filter)
    }
    if (node.children?.length) {
      applyFiltersToNodes(node.children, selectedFilters)
    }
  }
}

const onNodeCheckboxChange = (node, isChecked) => {
  node.modelValue = isChecked
  if (node.children?.length) {
    updateChildrenSelection(node.children, isChecked)
  }

  const filters = collectCheckedFilters(nodes.value)
  const query = { ...route.query }

  if (filters.length > 0) {
    query.filters = filters.join(',')
  } else {
    delete query.filters
  }

  router.replace({ query })

  $eventBus.emit('filters-updated', filters.join(','))
}



const updateChildrenSelection = (children, isChecked) => {
  for (const child of children) {
    child.modelValue = isChecked
    if (child.children?.length) {
      updateChildrenSelection(child.children, isChecked)
    }
  }
}

const isRootNode = (node) => {
  return !node.key.includes('-')
}

const onNodeLabelClick = (node) => {
  toggle(node)
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
        filter: '681f76360c47d4dd8034b851',
        children: [
          {
            key: '0-0-1',
            label: computed(() => t('filters_amino_acids')),
            modelValue: false,
            filter: '681f743c0c47d4dd8034b754',
          },
        ]
      },
      {
        key: '0-1',
        label: computed(() => t('filters_amino_acids')),
        modelValue: false,
        filter: '681f75510c47d4dd8034b7ec',
      },
      {
        key: '0-2',
        label: computed(() => t('filters_creatine')),
        modelValue: false,
        filter: '681f74c30c47d4dd8034b79f',
      },
      {
        key: '0-3',
        label: computed(() => t('filters_collagen')),
        modelValue: false,
        filter: '681f74250c47d4dd8034b748',
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
        filter: '681f75680c47d4dd8034b804',
      },
      {
        key: '1-1',
        label: computed(() => t('filters_amino_acids')),
        modelValue: false,
        filter: '681f75850c47d4dd8034b816',
      },
      {
        key: '1-2',
        label: computed(() => t('filters_creatine')),
        modelValue: false,
        filter: '681f74dd0c47d4dd8034b7af',
      },
    ]
  },
])


onMounted(() => {
  applyQueryParamsFromUrl()
})

const onExpandedKeysChange = (newExpandedKeys) => {
  expandedKeys.value = newExpandedKeys
}
</script>
