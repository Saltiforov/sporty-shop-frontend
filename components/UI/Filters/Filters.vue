<template>
  <Tree
      :value="filters"
      :expanded-keys="expandedKeys"
      @update:expandedKeys="onExpandedKeysChange"
      class="w-full p-2 rounded-[var(--default-rounded)]"
      :toggler-icon="null"
  >
    <template #togglericon></template>

    <template #default="slotProps">
      <div :class="[
        'flex items-center gap-2 w-full',
        slotProps.node.icon ? 'pb-2' : '',
        slotProps.node.icon && expandedKeys[slotProps.node.key] ? 'w-[50%] mx-auto' : ''
      ]"
           :style="[slotProps.node.icon ? 'width: 278px; ' : '']"
      >
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
            class="ml-auto p-1 rounded transition"
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
      <div v-if="slotProps.node.icon" :class="['border-b border-[var(--color-muted-gray)]', slotProps.node.icon && expandedKeys[slotProps.node.key] ? 'w-[50%] mx-auto' : '']"></div>
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
import {getAllFilters} from "~/services/api/filters-http.service.js";

const {t, locale} = useI18n()
const route = useRoute()
const router = useRouter()

const {$eventBus} = useNuxtApp()
const filters = ref([])

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

const applyQueryParamsFromUrl = () => {
  const selectedFilters = route.query.filters?.split(',') || []
  applyFiltersToNodes(filters.value, selectedFilters)
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
  toggleFilterInQuery(node)
  console.log('onNodeCheckboxChange', node)
  // if (node.children?.length) {
  //   updateChildrenSelection(node.children, isChecked)
  // }
  //
  // const filters = collectCheckedFilters(filters.value)
  // const query = {...route.query}
  //
  // if (filters.length > 0) {
  //   query.filters = filters.join(',')
  // } else {
  //   delete query.filters
  // }
  //
  // router.replace({query})
}

function getSlugsFromQuery() {
  const raw = route.query.filters
  if (typeof raw === 'string' && raw.length) {
    return raw.split(',').filter(s => s.length)
  }
  return []
}


async function toggleFilterInQuery(item) {
  const slug = item.slug
  if (!slug) return

  // Получаем текущие slug-ы
  const slugs = getSlugsFromQuery()
  const index = slugs.indexOf(slug)

  if (index === -1) {
    // Добавляем новый slug
    slugs.push(slug)
  } else {
    // Удаляем существующий
    slugs.splice(index, 1)
  }

  // Формируем новую строку или undefined, если пусто
  const newFilters = slugs.length ? slugs.join(',') : undefined

  // Собираем новый query, не трогая остальные параметры
  const newQuery = { ...route.query }

  if (newFilters) {
    newQuery.filters = newFilters
  } else {
    delete newQuery.filters
  }

  // Пушим обновление в адресную строку без перезагрузки
  await router.replace({
    path:  route.path,
    query: newQuery
  })

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

function mapFilters(inputArray) {
  const mapNode = (item, idx, parentKey = "") => {
    const key = parentKey ? `${parentKey}-${idx}` : `${idx}`;

    return {
      key: key,
      id: item._id,
      label: t(item.name[locale.value]),
      slug: item.slug[locale.value],
      icon: item.icon,
      children: item.children && item.children.length
          ? item.children.map((child, childIdx) => mapNode(child, childIdx, key))
          : [],
    };
  };

  return inputArray.map((item, idx) => mapNode(item, idx));
}


onMounted(async () => {
  applyQueryParamsFromUrl()

  const response = await getAllFilters();

  filters.value = mapFilters(response.list);
})

const onExpandedKeysChange = (newExpandedKeys) => {
  expandedKeys.value = newExpandedKeys
}
</script>
