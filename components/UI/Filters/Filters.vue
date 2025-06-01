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

        <div class="ml-auto">
          <CustomCheckbox
              :unchecked-border-color="'#7F7F7F80'"
              :border-radius="'4px'"
              :modelValue="slotProps.node.modelValue"
              @update:modelValue="(val) => onNodeCheckboxChange(slotProps.node, val)"
              @click.stop
          />
        </div>

        <b @click.stop="onNodeCheckboxChange(slotProps.node)" class="cursor-pointer filters-block-text">
          {{ slotProps.node.label }}
        </b>

        <button
            v-if="slotProps.node.children.length"
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
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import CustomCheckbox from "~/components/UI/CustomCheckbox/CustomCheckbox.vue"
import PriceRangeFilter from "~/components/UI/PriceRangeFilter/PriceRangeFilter.vue";
import {getAllFilters} from "~/services/api/filters-http.service.js";

const {t, locale} = useI18n()
const route = useRoute()
const router = useRouter()

const {$eventBus} = useNuxtApp()
const nodes = ref([])
const expandedKeys = ref({"0": true})

const isRootNode = (node) => {
  return !node.key.includes('-')
}

const toggle = (node) => {
  expandedKeys.value[node.key] = !expandedKeys.value[node.key]
}

const collectAllSlugs = (node) => {
  const result = [node.slug]
  if (Array.isArray(node.children) && node.children.length) {
    for (const child of node.children) {
      result.push(...collectAllSlugs(child))
    }
  }
  return result
}

const onNodeCheckboxChange = (node, isChecked) => {
  // node.modelValue = !node.modelValue;

  if (isRootNode(node)) {
    const slugs = collectAllSlugs(node);
    updateFilters(slugs);
  } else {
    updateFilters(node);
  }
}

function getSlugsFromQuery() {
  const raw = route.query.filters
  if (typeof raw === 'string' && raw.length) {
    return raw.split(',').filter(s => s.length)
  }
  return []
}

function buildNewQuery(routerQuery, newSlugs) {
  const nextQuery = { ...routerQuery }
  if (newSlugs.length) {
    nextQuery.filters = newSlugs.join(',')
  } else {
    delete nextQuery.filters
  }
  return nextQuery
}

const findNodeBySlug = (nodes, targetSlug) => {
  for (const node of nodes) {
    if (node.slug === targetSlug) {
      return node
    }
    if (Array.isArray(node.children) && node.children.length) {
      const found = findNodeBySlug(node.children, targetSlug)
      if (found) {
        return found
      }
    }
  }
  return null
}

async function updateFilters(payload) {
    const currentSlugs = getSlugsFromQuery()
    let newSlugs
    let deletedSlugs
    const slugsFromQuery = getSlugsFromQuery()

    if (Array.isArray(payload)) {
      newSlugs = payload.filter(slug => {
        const relatedNode = findNodeBySlug(nodes.value, slug);
        relatedNode.modelValue = !relatedNode.modelValue;
        console.log('relatedNode.modelValue', relatedNode.slug, relatedNode.modelValue)
        // return !isRootNode(relatedNode) && relatedNode.modelValue;
        return relatedNode.modelValue;
      })
    } else {
      const itemSlugs = collectAllSlugs(payload)
      newSlugs = [...currentSlugs]
      payload.modelValue = !payload.modelValue;

      if (payload.modelValue) {
        itemSlugs.forEach(slug => {
          if (!newSlugs.includes(slug)) newSlugs.push(slug)
        })
      } else {
        newSlugs = newSlugs.filter(slug => !itemSlugs.includes(slug))
      }
    }
  console.log('newSlugs', newSlugs);
  console.log('slugsFromQuery', slugsFromQuery);


  // const mergedSlugs = Array.from(new Set([...difference(newSlugs, slugsFromQuery)]))
  const mergedSlugs = Array.from(new Set([...newSlugs, ...slugsFromQuery]))

  console.log('Array.from(mergedSlugs)', mergedSlugs);
  console.log('difference', difference(newSlugs, slugsFromQuery));

    const nextQuery = buildNewQuery(route.query, mergedSlugs)

    await router.replace({
      path:  route.path,
      query: nextQuery
    })
}

const difference = (source, toRemove) => {
  console.log('difference source', source)
  console.log('difference toRemove', toRemove)
  const removeSet = new Set(toRemove)
  return [...source, ...toRemove].filter(item => !removeSet.has(item))
}


function mapNodes(inputArray) {
  const mapNode = (item, idx, parentKey = "") => {
    const key = parentKey ? `${parentKey}-${idx}` : `${idx}`;

    return {
      key: key,
      id: item._id,
      modelValue: null,
      label: t(item.name[locale.value]),
      slug: item.slug[locale.value],
      icon: item.icon || '',
      children: item.children && item.children.length
          ? item.children.map((child, childIdx) => mapNode(child, childIdx, key))
          : [],
    };
  };

  return inputArray.map((item, idx) => mapNode(item, idx));
}

const onExpandedKeysChange = (newExpandedKeys) => {
  expandedKeys.value = newExpandedKeys
}

onMounted(async () => {
  const response = await getAllFilters();

  nodes.value = mapNodes(response.list);
})
</script>
