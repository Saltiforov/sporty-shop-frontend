<template>
  <div>
    <div class="mb-4 text-center">
      <button
          @click="onLoadMore"
          :disabled="currentPage >= totalPages"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Показать ещё товаров
      </button>
    </div>

    <nav aria-label="Pagination" class="flex items-center space-x-2">
      <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage <= FIRST_PAGE"
          aria-label="Previous page"
      >
        ‹
      </button>

      <button
          v-for="page in displayedPages"
          :key="page + '-' + totalPages"
          @click="goToPage(page)"
          :class="[
        'px-2 py-1 rounded',
        { 'bg-gray-800 text-white': page === currentPage }
      ]"
          :disabled="page === currentPage || page === ELLIPSIS"
      >
        <span v-if="page === ELLIPSIS">…</span>
        <span v-else>{{ page }}</span>
      </button>
      <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          aria-label="Next page"
      >
        ›
      </button>
    </nav>
  </div>

</template>

<script setup>
import { computed } from 'vue'

const FIRST_PAGE = 1
const ELLIPSIS   = '...'

const props = defineProps({
  totalItems:   { type: Number, required: true },
  itemsPerPage: { type: Number, default: 10 },
  modelValue:   { type: Number, default: FIRST_PAGE }
})
const emit = defineEmits(['update:modelValue', 'load-more'])

const totalPages = computed(() =>
    Math.max(FIRST_PAGE, Math.ceil(props.totalItems / props.itemsPerPage))
)

const currentPage = computed({
  get() {
    return props.modelValue
  },
  set(newPage) {
    const valid = Math.min(totalPages.value, Math.max(FIRST_PAGE, newPage))
    emit('update:modelValue', valid)
  }
})

const loadedPages = ref(currentPage.value)

watch(currentPage, (newPage) => {
  loadedPages.value = newPage
})

const hasNextPage = computed(() => loadedPages.value < totalPages.value)

function onLoadMore() {
  if (hasNextPage.value) {
    loadedPages.value += 1
    emit('load-more')
  }
}

const isFirstActive  = computed(() => currentPage.value === FIRST_PAGE)
const isLastActive   = computed(() => currentPage.value === totalPages.value)
const isMiddleActive = computed(() => !isFirstActive.value && !isLastActive.value)

const displayedPages = computed(() => {
  const last = totalPages.value
  const current = currentPage.value

  if (last <= 3) {
    return Array.from({ length: last }, (_, i) => i + FIRST_PAGE)
  }

  if (isFirstActive.value) {
    return [FIRST_PAGE, FIRST_PAGE + 1, ELLIPSIS, last]
  }

  if (isLastActive.value) {
    return [FIRST_PAGE, ELLIPSIS, last - 1, last]
  }

  return [FIRST_PAGE, ELLIPSIS, current, ELLIPSIS, last]
})

function goToPage(page) {
  if (page === ELLIPSIS || page === currentPage.value) return
  currentPage.value = page
}
</script>

<style scoped>
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
