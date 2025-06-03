<template>
  <form method="get" @submit.prevent="onEnter" class="search-field  w-full relative">
    <IconField :pt="{
      root: {
        style: {
          borderRadius: '12px'
        }
      }
    }">
      <InputText
          name="q"
          @focus="searchIsFocused = true"
          @blur="handleBlur"
          v-model="searchFieldValue"
          :pt="{ root: { class: 'header-search-field', style: searchFieldStyle } }"
          :placeholder="searchFieldPlaceholder"
      />
      <InputIcon
          v-if="searchFieldValue.length > 0"
          class="pi pi-times cursor-pointer"
          :pt="{ root: { class: 'input-icon' } }"
          @click.prevent="handleClear"
      />
      <InputIcon
          v-else
          class="pi pi-search"
          :pt="{ root: { class: 'input-icon', style: { color: 'var(--color-primary-black)' } } }"
      />
    </IconField>

    <SearchDropdownMenu
        :show="searchIsFocused"
        :items="receivedProducts"
        :searchFieldValue="searchFieldValue"
        @selected="onSuggestionSelect"
    />
  </form>
</template>

<script setup>
import { useDebouncedRef } from '~/composables/useDebounceRef.js'
import SearchDropdownMenu from '~/components/UI/SearchDropdownMenu/SearchDropdownMenu.vue'
import { getSuggestionProductList } from '~/services/api/product-service.js'
import {useWindowWidthWatcher} from "~/composables/useWindowWidthWatcher.js";

const router = useRouter()
const route  = useRoute()
const { t, locale }  = useI18n()

const searchIsFocused  = ref(false)
const receivedProducts = ref([])

const searchFieldValue = ref(route.query.q || '')

const getWidth = useWindowWidthWatcher()

const searchFieldStyle = computed(() => {
  return {
    width: '100%',
    borderRadius: '12px',
    padding: getWidth() <= 500 ? '6px 10px 6px 20px' : '',
    fontSize: getWidth() <= 500 ? '11px' : '',
    border: 'none',
  };
});

const debouncedSearch  = useDebouncedRef(searchFieldValue, 300)

const searchFieldPlaceholder = computed(() => t('search_placeholder'))
const isMainPage = computed(() => route.name === `index___${locale.value}`)

function handleBlur() {
  setTimeout(() => {
    searchIsFocused.value = false
  }, 150)
}

const handleClear = () => {
  searchFieldValue.value = ''
  searchIsFocused.value = false
  receivedProducts.value = []
}

function onEnter() {
  const q = searchFieldValue.value.trim()
  router.push({
    path: route.path,
    query: { ...route.query, q, page: 1 }
  })
}

function onSuggestionSelect(item) {
  if (route.params.slug === item.slug) {
    handleClear();
    return;
  };

  const suggestionUrl = `/${locale.value}/product/${item.slug}`
  router.push(suggestionUrl)
  handleClear();
}

watch(debouncedSearch, async (val) => {
  const q = val.trim()
  if (!q) {
    receivedProducts.value = []
    if (isMainPage.value) {
      const {q: _, ...rest} = route.query
      router.replace({
        path: route.path,
        query: {
          ...rest,
          page: 1
        }
      })
    }

    return
  }

    const {list} = await getSuggestionProductList({q, limit: 5})
    receivedProducts.value = list
})

watch(
    () => route.query.q,
    (value) => {
      searchFieldValue.value = value
    }
)
</script>
