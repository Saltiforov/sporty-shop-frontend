<template>
  <div class="w-full">
    <div class="mb-4 text-center">
      <Button
          @click="onLoadMore"
          :disabled="currentPage >= totalPages"
          :pt="{
            root: {
              class: 'load-more-button btn-hover-default leading-[22px] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
            },
            label: {
              class: 'text-[15px] font-medium'
            }
          }"
      >
              <span class="flex  items-center gap-2">
        <p class="load-more-button-text">{{ t('show_more_products_count', {count: itemsPerPage}) }} </p>
        <slot name="icon">
          <img src="~/assets/icons/load-more-icon.svg" alt="icon" class="w-4 h-4"/>
        </slot>
      </span>


      </Button>
    </div>

    <nav aria-label="Pagination" class="pagination-button flex items-center w-full border rounded-[24px] space-x-2">
      <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage <= FIRST_PAGE"
          aria-label="Previous page"
      >
        <img src="~/assets/icons/pagination-btn-arrow-left.svg" alt="arrow-left">
      </button>


      <button
          v-for="page in displayedPages"
          :key="page + '-' + totalPages"
          @click="goToPage(page)"
          :class="[
        'px-2 py-1 rounded page-button',
        { 'active-button': page === currentPage }
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
        <img src="~/assets/icons/pagination-btn-arrow-right.svg" alt="arrow-right">
      </button>
    </nav>
  </div>

</template>

<script setup>
import {computed} from 'vue'

const {t} = useI18n()

const FIRST_PAGE = 1
const ELLIPSIS = '...'

const props = defineProps({
  totalItems: {type: Number, required: true},
  itemsPerPage: {type: Number, default: 10},
  modelValue: {type: Number, default: FIRST_PAGE},
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

const isFirstActive = computed(() => currentPage.value === FIRST_PAGE)
const isLastActive = computed(() => currentPage.value === totalPages.value)
const isMiddleActive = computed(() => !isFirstActive.value && !isLastActive.value)

const displayedPages = computed(() => {
  const last = totalPages.value
  const current = currentPage.value

  if (last <= 3) {
    return Array.from({length: last}, (_, i) => i + FIRST_PAGE)
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

.load-more-button {
  background: var(--color-primary-dark);
  border-radius: 24px;
  padding: 12px 23px;
  width: 100%;
}

.page-button {
  font-size: 20px;
  line-height: 22px;
}

.active-button {
  background: var(--color-primary-dark);
  color: var(--color-gray-lavender);
  border-radius: 50%;
  width: 33px;
  height: 32px;
}

.load-more-button-text {
  margin-right: 17px;
  font-size: 15px;
}

.pagination-button {
  padding: 7.5px 24.5px;
  justify-content: space-between;
}

@media (max-width: 530px) {
  .load-more-button {
    padding: 8px 23px;
  }
  .pagination-button {
    padding: 3px 24.5px;
  }
  .load-more-button-text {
    font-size: 12px;
  }
  .page-button span {
    font-size: 15px;
  }
}

</style>
