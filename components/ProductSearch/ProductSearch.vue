<template>
  <form method="get" @submit.prevent="onEnter" class="search-field max-w-[425px] w-full relative">
    <IconField>
      <InputText
          name="q"
          @focus="searchIsFocused = true"
          @blur="handleBlur"
          v-model="searchFieldValue"
          :pt="{ root: { class: 'header-search-field' } }"
          :placeholder="searchFieldPlaceholder"
      />
      <InputIcon
          class="pi pi-search"
          :pt="{ root: { class: 'input-icon' } }"
      />
      <InputIcon
          class="pi pi-shopping-cart"
          :pt="{ root: { class: 'input-icon' } }"
          @click.prevent="handleClear"
      />
    </IconField>

    <SearchDropdownMenu
        :show="searchIsFocused"
        :items="receivedProducts"
        @selected="onSuggestionSelect"
    />
  </form>
</template>

<script setup>
import { useDebouncedRef } from '~/composables/useDebounceRef.js'
import SearchDropdownMenu from '~/components/UI/SearchDropdownMenu/SearchDropdownMenu.vue'
import { getSuggestionProductList } from '~/services/api/product-service.js'

const router = useRouter()
const route  = useRoute()
const { t, locale }  = useI18n()

const searchIsFocused  = ref(false)
const receivedProducts = ref([])

const searchFieldValue = ref(route.query.q || '')

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
