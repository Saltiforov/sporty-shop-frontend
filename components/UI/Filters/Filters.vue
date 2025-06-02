<template>
  <Tree
      :pt="{
        nodeChildren: {
          style: {
            display: 'none',
          }
        },
        nodeToggleButton: {
                style: {
                  display: 'none',
                }
              },
      }"
      :value="nodes"
      :expanded-keys="expandedKeys"
      @update:expandedKeys="onExpandedKeysChange"
      class="w-full p-7 pb-[2px] rounded-[var(--default-rounded)]"
      :toggler-icon="null"
  >
    <template #togglericon></template>

    <template #default="slotProps">
      <div
          :class="[
      'flex items-center justify-start gap-2 ',
      isRootNode(slotProps.node) ? 'pb-3' : '',
      isRootNode(slotProps.node) && expandedKeys[slotProps.node.key] ? 'w-[50%] mx-auto' : ''
    ]"
          :style="[isRootNode(slotProps.node) ? 'width: 278px;' : '']"
      >
        <img
            v-if="isRootNode(slotProps.node)"
            :src="slotProps.node.icon"
            alt="icon"
            class="w-5 h-5"
        />

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
            <path d="M8 5L15 12L8 19" stroke="currentColor" stroke-width="2" />
          </svg>
        </button>
      </div>

      <div
          v-if="isRootNode(slotProps.node) || slotProps.node.children.length > 1"
          class="mb-[9px]"
          :class="['border-b border-[var(--color-muted-gray)]', isRootNode(slotProps.node) && expandedKeys[slotProps.node.key] ? 'w-[50%] mx-auto' : '']"
      ></div>

      <transition
          name="expand"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
      >
        <div
            v-show="slotProps.node.children && expandedKeys[slotProps.node.key]"
            class="pl-4 mt-2 overflow-hidden"
            ref="childList"
        >
          <div
              v-for="(child, idx) in slotProps.node.children"
              :key="child.key"
              class="node-child flex items-center"
              :style="{
          marginBottom:
            slotProps.node.children.length > 1 && idx === slotProps.node.children.length - 1
              ? '0px'
              : '12px'
        }"
          >
            <CustomCheckbox
                :modelValue="child.modelValue"
                @update:modelValue="val => onNodeCheckboxChange(child, val)"
                :unchecked-border-color="'#7F7F7F80'"
                :border-radius="'4px'"
                @click.stop
            />
            <span class="filters-block-text text-sm">{{ child.label }}</span>
          </div>

          <div
              v-if="slotProps.node.children && slotProps.node.children.length > 1 && expandedKeys[slotProps.node.key]"
              class="pt-3 mb-3 text-sm cursor-pointer filters-block-text w-[50%] mx-auto flex justify-center"
          >
        <span
            class="text-[12px]"
            :style="{
            color: areAllChildrenSelected(slotProps.node)
              ? 'var(--small-title-color)'
              : 'var(--color-primary-purple)'
          }"
            @click.stop="onNodeCheckboxChange(slotProps.node, !slotProps.node.modelValue)"
        >
          Select all
        </span>
          </div>

          <div
              v-if="slotProps.node.children.length > 1"
              class="mb-[8px]"
              :class="['border-b border-[var(--color-muted-gray)]', isRootNode(slotProps.node) && expandedKeys[slotProps.node.key] ? 'w-full' : '']"
          ></div>
        </div>
      </transition>
    </template>


    <template #nodeicon="slotProps">
      <div></div>
    </template>
  </Tree>

  <PriceRangeFilter class="filters-block-text"/>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import CustomCheckbox from "~/components/UI/CustomCheckbox/CustomCheckbox.vue"
import PriceRangeFilter from "~/components/UI/PriceRangeFilter/PriceRangeFilter.vue"
import {getAllFilters} from "~/services/api/filters-http.service.js"

const {t, locale} = useI18n()
const route = useRoute()
const router = useRouter()

const nodes = ref([])
const expandedKeys = ref({"0": true})

const isRootNode = (node) => !node.key.includes('-')

const toggle = (node) => {
  expandedKeys.value[node.key] = !expandedKeys.value[node.key]
}

const collectAllSlugs = (node) => {
  const slugs = [node.slug]
  if (Array.isArray(node.children) && node.children.length) {
    node.children.forEach(child => {
      slugs.push(...collectAllSlugs(child))
    })
  }
  return slugs
}

const updateNodeAndChildren = (node, isChecked) => {
  node.modelValue = isChecked
  if (Array.isArray(node.children) && node.children.length) {
    node.children.forEach(child => updateNodeAndChildren(child, isChecked))
  }
}

const findNodeBySlug = (nodes, targetSlug) => {
  for (const node of nodes) {
    if (node.slug === targetSlug) return node
    if (Array.isArray(node.children) && node.children.length) {
      const found = findNodeBySlug(node.children, targetSlug)
      if (found) return found
    }
  }
  return null
}

const getSlugsFromQuery = () => {
  const raw = route.query.filters
  if (typeof raw === 'string' && raw.length) {
    return raw.split(',').filter(s => s.length)
  }
  return []
}

const buildNewQuery = (routerQuery, newSlugs) => {
  const nextQuery = {...routerQuery}
  if (newSlugs.length) {
    nextQuery.filters = newSlugs.join(',')
  } else {
    delete nextQuery.filters
  }
  return nextQuery
}

const areAllChildrenSelected = (node) => {
  if (!node.children || node.children.length === 0) return false
  return node.children.every(child => child.modelValue === true)
}

const expandParentNodes = (nodeKey) => {
  const keys = nodeKey.split('-')
  keys.forEach((_, index) => {
    const partialKey = keys.slice(0, index + 1).join('-')
    if (partialKey) {
      expandedKeys.value[partialKey] = true
    }
  })
}

const onNodeCheckboxChange = async (node, isChecked) => {
  updateNodeAndChildren(node, isChecked)

  const allSlugs = []
  const collectSelectedSlugs = (nodes) => {
    nodes.forEach(n => {
      if (n.modelValue) {
        allSlugs.push(n.slug)
        expandParentNodes(n.key)
      }
      if (Array.isArray(n.children) && n.children.length) {
        collectSelectedSlugs(n.children)
      }
    })
  }
  collectSelectedSlugs(nodes.value)

  const nextQuery = buildNewQuery(route.query, allSlugs)
  await router.replace({
    path: route.path,
    query: nextQuery,
  })
}

const mapNodes = (inputArray) => {
  const mapNode = (item, idx, parentKey = '') => {
    const key = parentKey ? `${parentKey}-${idx}` : `${idx}`
    return {
      key,
      id: item._id,
      modelValue: false,
      label: t(item.name[locale.value]),
      slug: item.slug[locale.value],
      icon: item.icon || '',
      children: item.children && item.children.length
          ? item.children.map((child, childIdx) => mapNode(child, childIdx, key))
          : [],
    }
  }
  return inputArray.map((item, idx) => mapNode(item, idx))
}

const syncTreeWithQuery = () => {
  const querySlugs = getSlugsFromQuery()
  querySlugs.forEach(slug => {
    const node = findNodeBySlug(nodes.value, slug)
    if (node) {
      updateNodeAndChildren(node, true)
      expandParentNodes(node.key)
    }
  })
}

const onExpandedKeysChange = (newExpandedKeys) => {
  expandedKeys.value = newExpandedKeys
}

onMounted(async () => {
  const response = await getAllFilters()
  nodes.value = mapNodes(response.list)
  syncTreeWithQuery()
})

watch(() => route.query.filters, (newFilters) => {
  if (newFilters) {
    syncTreeWithQuery()
  }
})

const childList = ref(null);

const beforeEnter = el => {
  el.style.height = '0'
}
const enter = el => {
  el.style.height = el.scrollHeight + 'px'
}
const afterEnter = el => {
  el.style.height = 'auto'
}
const beforeLeave = el => {
  el.style.height = el.scrollHeight + 'px'
}
const leave = el => {
  el.style.height = '0'
}
const afterLeave = el => {
  el.style.height = 'auto'
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease;
}
.expand-enter-from,
.expand-leave-to {
  height: 0;
  overflow: hidden;
}
</style>