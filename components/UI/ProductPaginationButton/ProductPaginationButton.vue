<template>
  <div class="pagination-button-wrapper w-full max-w-[278px]">
    <div class="pagination-button">
      <div class="flex w-full max-w-[220px] items-center gap-4">
        <Button :pt="{
          root: {
            class: 'slide-button'
          }
        }" @click="handlePageChange('left')">
          <svg width="31" height="31" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 13.5L8.5 10.5L11.5 7.5M19.5 10.5C19.5 5.52944 15.4706 1.5 10.5 1.5C5.52944 1.5 1.5 5.52944 1.5 10.5C1.5 15.4706 5.52944 19.5 10.5 19.5C15.4706 19.5 19.5 15.4706 19.5 10.5Z" stroke="#1B1F26" stroke-opacity="0.72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Button>

        <div class="text-[15px] w-full justify-between flex">
          <p v-for="(page, index) in visiblePages" :key="index"
             :class="{ 'active-page': page === currentPage }"
             @click="handleClickPage(page)"
             class="page-count max-w-[32px]">{{ page }}</p>

          <div v-if="showEllipsisBefore" class="text-[#24242ACF] text-[20px] flex justify-center items-center max-w-[42px] w-full">...</div>

          <div v-if="showEllipsisAfter" class="text-[#24242ACF] text-[20px] flex justify-center items-center max-w-[42px] w-full">...</div>
        </div>

        <Button :pt="{
          root: {
            class: 'slide-button'
          }
        }" @click="handlePageChange('right')">
          <svg width="31" height="31" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 7.5L12.5 10.5L9.5 13.5M19.5 10.5C19.5 5.52944 15.4706 1.5 10.5 1.5C5.52944 1.5 1.5 5.52944 1.5 10.5C1.5 15.4706 5.52944 19.5 10.5 19.5C15.4706 19.5 19.5 15.4706 19.5 10.5Z" stroke="#1B1F26" stroke-opacity="0.72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  maxPages: { type: Number, required: true },
  allLoaded: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const currentPage = ref(Number(props.modelValue) || 1)
const totalPages = ref(props.maxPages)

const visiblePages = computed(() => {
  const pages = []

  if (totalPages.value === 1) {
    pages.push(1)
  } else if (totalPages.value === 2) {
    pages.push(1, '...', 2)
  } else {
    const start = Math.max(1, currentPage.value - 1)
    const end = Math.min(totalPages.value, currentPage.value + 1)

    if (start > 1) {
      pages.push(1)
      pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages.value) {
      pages.push('...')
      pages.push(totalPages.value)
    }
  }

  return pages
})

const showEllipsisBefore = computed(() => visiblePages.value[0] === '...')
const showEllipsisAfter = computed(() => visiblePages.value[visiblePages.value.length - 1] === '...')

const handleClickPage = (page) => {
  if (page !== '...') {
    currentPage.value = page
    emit('update:modelValue', page)
  }
}

const handlePageChange = (direction = 'right') => {
  if (direction === 'left' && currentPage.value > 1) {
    currentPage.value -= 1
    emit('update:modelValue', currentPage.value)
  }
  if (direction === 'right' && currentPage.value < totalPages.value) {
    currentPage.value += 1
    emit('update:modelValue', currentPage.value)
  }
}
</script>



<style scoped>
.page-count {
  font-size: 20px;
  width: 33px;
  text-align: center;
  color: black;
  cursor: pointer;
}

.active-page {
  background-color: #24242ACF;
  color: white;
  border-radius: 50%;
}

.pagination-button {
  display: flex;
  justify-content: center;
  padding: 7.5px 21.5px;
  background: transparent;
  border: 1px solid #ADADAD;
  border-radius: 24px;
}

.slide-button {
  padding: 0;
  background: transparent;
  border: none;
}

.slide-button:hover {
  padding: 0;
  background: transparent;
  border: none;
}

.pagination-button:hover {
  background: transparent;
  border: 1px solid #ADADAD;
}

.load-more-button {
  background: transparent;
  border-radius: 24px;
  padding: 12px 23px;
}

.load-more-button:hover {
  background: transparent;
}
</style>
