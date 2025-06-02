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
              v-if="!isRootNode(slotProps.node)"
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
      <div v-if="slotProps.node.children && slotProps.node.children.length > 1 && expandedKeys[slotProps.node.key]" class="mt-2 text-sm cursor-pointer filters-block-text w-[50%] mx-auto">
        <span
            :class="{'text-green-500': areAllChildrenSelected(slotProps.node), 'text-blue-500': !areAllChildrenSelected(slotProps.node)}"
            @click.stop="onNodeCheckboxChange(slotProps.node, !slotProps.node.modelValue)"
        >Select all</span>
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
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const { $eventBus } = useNuxtApp();

const nodes = ref([]);
const expandedKeys = ref({ "0": true });

const isRootNode = (node) => !node.key.includes('-');

const toggle = (node) => {
  expandedKeys.value[node.key] = !expandedKeys.value[node.key];
};

const collectAllSlugs = (node) => {
  const slugs = [node.slug];
  if (Array.isArray(node.children) && node.children.length) {
    node.children.forEach(child => {
      slugs.push(...collectAllSlugs(child));
    });
  }
  return slugs;
};

const updateNodeAndChildren = (node, isChecked) => {
  node.modelValue = isChecked;
  if (Array.isArray(node.children) && node.children.length) {
    node.children.forEach(child => updateNodeAndChildren(child, isChecked));
  }
};

const findNodeBySlug = (nodes, targetSlug) => {
  for (const node of nodes) {
    if (node.slug === targetSlug) return node;
    if (Array.isArray(node.children) && node.children.length) {
      const found = findNodeBySlug(node.children, targetSlug);
      if (found) return found;
    }
  }
  return null;
};

const getSlugsFromQuery = () => {
  const raw = route.query.filters;
  if (typeof raw === 'string' && raw.length) {
    return raw.split(',').filter(s => s.length);
  }
  return [];
};

const buildNewQuery = (routerQuery, newSlugs) => {
  const nextQuery = { ...routerQuery };
  if (newSlugs.length) {
    nextQuery.filters = newSlugs.join(',');
  } else {
    delete nextQuery.filters;
  }
  return nextQuery;
};

const areAllChildrenSelected = (node) => {
  if (!node.children || node.children.length === 0) return false;
  return node.children.every(child => child.modelValue === true);
};

const onNodeCheckboxChange = async (node, isChecked) => {
  updateNodeAndChildren(node, isChecked);

  const allSlugs = [];
  const collectSelectedSlugs = (nodes) => {
    nodes.forEach(n => {
      if (n.modelValue) {
        allSlugs.push(n.slug);
      }
      if (Array.isArray(n.children) && n.children.length) {
        collectSelectedSlugs(n.children);
      }
    });
  };
  collectSelectedSlugs(nodes.value);

  const nextQuery = buildNewQuery(route.query, allSlugs);
  await router.replace({
    path: route.path,
    query: nextQuery,
  });
};

const mapNodes = (inputArray) => {
  const mapNode = (item, idx, parentKey = '') => {
    const key = parentKey ? `${parentKey}-${idx}` : `${idx}`;
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
    };
  };
  return inputArray.map((item, idx) => mapNode(item, idx));
};

const syncTreeWithQuery = () => {
  const querySlugs = getSlugsFromQuery();
  querySlugs.forEach(slug => {
    const node = findNodeBySlug(nodes.value, slug);
    if (node) {
      updateNodeAndChildren(node, true);
    }
  });
};

const onExpandedKeysChange = (newExpandedKeys) => {
  expandedKeys.value = newExpandedKeys;
};

onMounted(async () => {
  const response = await getAllFilters();
  nodes.value = mapNodes(response.list);
  syncTreeWithQuery();
});
</script>